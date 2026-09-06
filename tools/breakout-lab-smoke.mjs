#!/usr/bin/env node
/**
 * Headless smoke: Breakout lab export boots Menu then Game with paddle/ball/blocks.
 * Usage: node tools/breakout-lab-smoke.mjs [--skip-export]
 */
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skipExport = process.argv.includes("--skip-export");
const vpIdx = process.argv.indexOf("--viewport");
let viewW = 1280;
let viewH = 720;
if (vpIdx >= 0) {
  const spec = process.argv[vpIdx + 1] || "";
  const m = /^(\d+)x(\d+)$/.exec(spec);
  if (!m) fail("--viewport requires WIDTHxHEIGHT");
  viewW = Number(m[1]);
  viewH = Number(m[2]);
}
const gameDir = path.join(root, "games", "breakout-lab");
const buildDir = path.join(gameDir, "build");

function fail(msg) {
  console.error("BREAKOUT_SMOKE: FAIL");
  console.error(msg);
  process.exit(1);
}

function findChrome() {
  const env = process.env.CHROME_PATH || process.env.EDGE_PATH;
  const candidates = [
    env,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function freePort() {
  return await new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close((err) => (err ? reject(err) : resolve(port)));
    });
    s.on("error", reject);
  });
}

function startStaticServer(dir, port) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const abs = path.normalize(path.join(dir, rel));
    if (!abs.startsWith(path.normalize(dir))) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    let body = fs.readFileSync(abs);
    if (rel === "index.html") {
      let html = body.toString("utf8");
      html = html.replace(
        "var game = new gdjs.RuntimeGame",
        "var game = window.__boGame = new gdjs.RuntimeGame"
      );
      body = Buffer.from(html, "utf8");
    }
    const ext = path.extname(abs);
    const types = {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".ogg": "audio/ogg",
    };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(body);
  });
  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString());
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text || "evaluate failed");
    }
    return result.result?.value;
  }
}

async function waitForPageTarget(dbgPort, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${dbgPort}/json/list`);
      if (res.ok) {
        const pages = await res.json();
        const page = (Array.isArray(pages) ? pages : []).find(
          (p) => p.type === "page" && p.webSocketDebuggerUrl
        );
        if (page) return page;
      }
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("Chrome page target did not come up");
}

function snap() {
  return `(() => {
    const game = window.__boGame;
    if (!game) return { ready: false };
    const scene = game.getSceneStack().getCurrentScene();
    if (!scene) return { ready: false };
    let gameState = "";
    let score = 0;
    let lives = 0;
    try { gameState = scene.getVariables().get("GameState").getAsString(); } catch (e) {}
    try { score = scene.getVariables().get("Score").getAsNumber(); } catch (e2) {}
    try { lives = scene.getVariables().get("Lifes").getAsNumber(); } catch (e3) {}
    const names = ["Paddle", "Ball", "Block_1", "Block_2", "Block_3"];
    const counts = {};
    for (const n of names) counts[n] = scene.getObjects(n).length;
    counts.bricks = counts.Block_1 + counts.Block_2 + counts.Block_3;
    return {
      ready: true,
      scene: scene.getName(),
      gameState,
      score,
      lives,
      counts,
      boardId: window.__boBoardId || "",
      signature: window.__boBoardSignature || "",
      boardError: window.__boBoardError || "",
      expectedBricks: window.__boBoard ? window.__boBoard.brickCount : -1,
      mapping: window.__boBoard && window.__boBoard.mapping ? window.__boBoard.mapping : "",
      factorDebug: !!window.__boFactorDebug,
    };
  })()`;
}

async function waitSnap(cdp, pred, timeoutMs, label) {
  const start = Date.now();
  let last = null;
  while (Date.now() - start < timeoutMs) {
    last = await cdp.evaluate(snap());
    if (last && pred(last)) return last;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error(`${label}: timed out last=${JSON.stringify(last)}`);
}

async function main() {
  if (!skipExport) {
    const exp = spawnSync(process.execPath, ["tools/gdevelop-web-export.mjs", "--game", "games/breakout-lab"], {
      cwd: root,
      encoding: "utf8",
    });
    if (exp.status !== 0 || !String(exp.stdout).includes("WEB_EXPORT: PASS")) {
      fail(exp.stderr || exp.stdout || "export failed");
    }
  }
  if (!fs.existsSync(path.join(buildDir, "index.html"))) fail("missing build/index.html");

  const chrome = findChrome();
  if (!chrome) fail("Chrome/Edge not found");
  const httpPort = await freePort();
  const dbgPort = await freePort();
  const server = await startStaticServer(buildDir, httpPort);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "bo-smoke-"));
  const chromeProc = spawn(
    chrome,
    [
      `--remote-debugging-port=${dbgPort}`,
      `--user-data-dir=${profile}`,
      "--remote-allow-origins=*",
      "--headless=new",
      "--disable-gpu",
      "--disable-extensions",
      "--no-first-run",
      `--window-size=${viewW},${viewH}`,
      "about:blank",
    ],
    { stdio: ["pipe", "pipe", "pipe"] }
  );

  let ws;
  try {
    const page = await waitForPageTarget(dbgPort, 15000);
    ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve);
      ws.addEventListener("error", reject);
    });
    const cdp = new Cdp(ws);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: viewW,
      height: viewH,
      deviceScaleFactor: 1,
      mobile: viewH > viewW,
    });
    const origin = `http://127.0.0.1:${httpPort}`;
    await cdp.send("Page.navigate", { url: `${origin}/` });
    const gameEarly = await waitSnap(
      cdp,
      (s) =>
        s.ready &&
        s.scene === "Game" &&
        s.counts.Paddle >= 1 &&
        s.counts.Ball >= 1 &&
        s.counts.bricks >= 8 &&
        s.mapping === "city-breaker-v1" &&
        s.signature.length === 64,
      20000,
      "boot Game"
    );
    await new Promise((r) => setTimeout(r, 800));
    const game = await cdp.evaluate(snap());
    if (process.argv.includes("--shot")) {
      const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
      const outDir = path.join(root, "docs/codex-manual-tasks/evidence");
      fs.mkdirSync(outDir, { recursive: true });
      const shotPath = path.join(outDir, "050-city-breaker-default.png");
      fs.writeFileSync(shotPath, Buffer.from(shot.data, "base64"));
      console.log("shot", shotPath);
    }

    await cdp.evaluate(`(() => {
      window.__boGame.getInputManager().onKeyPressed(32);
      return true;
    })()`);
    await new Promise((r) => setTimeout(r, 80));
    await cdp.evaluate(`(() => {
      window.__boGame.getInputManager().onKeyReleased(32);
      return true;
    })()`);
    const playing = await waitSnap(
      cdp,
      (s) => s.ready && s.scene === "Game" && s.gameState === "GamePlay",
      5000,
      "Space -> GamePlay"
    );

    async function waitStableBoard(label) {
      let last = -1;
      let stable = 0;
      const start = Date.now();
      let snapShot = null;
      while (Date.now() - start < 8000) {
        snapShot = await cdp.evaluate(snap());
        if (
          snapShot.ready &&
          snapShot.scene === "Game" &&
          snapShot.gameState === "NotStarted" &&
          snapShot.score === 0 &&
          snapShot.counts.Ball === 1 &&
          snapShot.lives === 3 &&
          snapShot.counts.bricks === last &&
          snapShot.counts.bricks >= 8 &&
          snapShot.counts.bricks <= 28 &&
          snapShot.expectedBricks === snapShot.counts.bricks &&
          snapShot.signature.length === 64
        ) {
          stable += 1;
          if (stable >= 3) return snapShot;
        } else {
          stable = 0;
          last = snapShot?.counts?.bricks ?? -1;
        }
        await new Promise((r) => setTimeout(r, 150));
      }
      throw new Error(`${label}: timed out last=${JSON.stringify(snapShot)}`);
    }

    async function failAndRestart(label) {
      await cdp.evaluate(`(() => {
        const scene = window.__boGame.getSceneStack().getCurrentScene();
        scene.getVariables().get("Lifes").setNumber(0);
        const balls = scene.getObjects("Ball").slice();
        for (const b of balls) {
          if (typeof b.deleteFromScene === "function") b.deleteFromScene(scene);
        }
        return true;
      })()`);
      await waitSnap(cdp, (s) => s.gameState === "Lost", 5000, "fail -> Lost");
      await cdp.evaluate(`(() => {
        window.__boGame.getSceneStack().replace("Game", true);
        return true;
      })()`);
      return waitStableBoard(label);
    }

    const r1 = await failAndRestart("restart1");
    let lastBricks = r1.counts.bricks;
    for (let i = 2; i <= 10; i++) {
      await cdp.evaluate(`(() => {
        window.__boGame.getInputManager().onKeyPressed(32);
        return true;
      })()`);
      await new Promise((r) => setTimeout(r, 80));
      await cdp.evaluate(`(() => {
        window.__boGame.getInputManager().onKeyReleased(32);
        return true;
      })()`);
      await waitSnap(cdp, (s) => s.gameState === "GamePlay", 5000, `cycle ${i} GamePlay`);
      const rx = await failAndRestart("restart" + i);
      if (rx.counts.Ball !== 1) fail("ball count not 1 after restart " + i);
      if (rx.counts.bricks < 1 || rx.counts.bricks > 120) fail("bad brick count " + rx.counts.bricks);
      if (rx.signature !== r1.signature) fail("signature drifted after restart " + i);
      lastBricks = rx.counts.bricks;
    }

    const fixtureIds = ["sparse-low", "dense-high", "balanced-mid", "mixed-corridor", "mixed-spike"];
    const signatures = {};
    for (const fid of fixtureIds) {
      await cdp.send("Page.navigate", { url: `${origin}/?fixture=${fid}` });
      const fx = await waitSnap(
        cdp,
        (s) =>
          s.ready &&
          s.scene === "Game" &&
          s.boardId === fid &&
          s.boardError === "" &&
          s.counts.bricks === s.expectedBricks &&
          s.counts.bricks >= 1,
        20000,
        "fixture " + fid
      );
      signatures[fid] = { signature: fx.signature, bricks: fx.counts.bricks, b1: fx.counts.Block_1, b2: fx.counts.Block_2, b3: fx.counts.Block_3 };
    }
    const uniq = new Set(Object.values(signatures).map((x) => x.signature));
    if (uniq.size !== 5) fail("fixture signatures not unique " + JSON.stringify(signatures));
    if (signatures["dense-high"].bricks <= signatures["sparse-low"].bricks + 8) {
      fail("dense vs sparse brick gap too small " + JSON.stringify(signatures));
    }

    await cdp.send("Page.navigate", { url: `${origin}/?fixture=not-a-real-fixture` });
    const bad = await waitSnap(
      cdp,
      (s) =>
        s.ready &&
        s.scene === "Game" &&
        s.boardError === "unknown_fixture" &&
        s.boardId === "balanced-mid" &&
        s.signature === signatures["balanced-mid"].signature,
      20000,
      "invalid fixture fallback"
    );

    const cityProfiles = {};
    for (const pid of ["dense-spike", "green-open", "balanced-mid"]) {
      await cdp.send("Page.navigate", { url: `${origin}/?profile=${pid}` });
      const px = await waitSnap(
        cdp,
        (s) =>
          s.ready &&
          s.scene === "Game" &&
          s.boardId === pid &&
          s.mapping === "city-breaker-v1" &&
          s.factorDebug &&
          s.counts.bricks === s.expectedBricks &&
          s.counts.bricks >= 8 &&
          s.counts.bricks <= 28,
        20000,
        "profile " + pid
      );
      cityProfiles[pid] = { signature: px.signature, bricks: px.counts.bricks };
      if (process.argv.includes("--shot")) {
        const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
        const outDir = path.join(root, "docs/codex-manual-tasks/evidence");
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, "050-profile-" + pid + ".png"), Buffer.from(shot.data, "base64"));
      }
    }
    if (cityProfiles["dense-spike"].bricks < cityProfiles["green-open"].bricks + 10) {
      fail("city profiles not geometrically distinct " + JSON.stringify(cityProfiles));
    }
    if (cityProfiles["dense-spike"].signature === cityProfiles["green-open"].signature) {
      fail("city profile signatures collided");
    }

    console.log("BREAKOUT_SMOKE: PASS");
    console.log("viewport", `${viewW}x${viewH}`);
    console.log("boot", gameEarly.scene, JSON.stringify(game.counts), gameEarly.boardId);
    console.log("play", playing.gameState);
    console.log("restarts", 10, "lastBricks", lastBricks, "sig", r1.signature);
    console.log("fixtures", JSON.stringify(signatures));
    console.log("invalidFallback", bad.boardId, bad.boardError);
    console.log("cityProfiles", JSON.stringify(cityProfiles));
  } finally {
    try {
      ws?.close();
    } catch {
      /* ignore */
    }
    chromeProc.kill();
    server.close();
  }
}

main().catch((err) => fail(err.stack || err.message));
