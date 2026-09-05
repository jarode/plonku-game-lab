#!/usr/bin/env node
/**
 * Runner client regression: export + headless Chrome against GDJS runtime state.
 * Usage: node tools/runner-regression.mjs [--game games/zombie-runner] [--skip-export]
 * Exit 0 = RUNNER_REGRESSION: PASS   Exit 1 = RUNNER_REGRESSION: FAIL
 */
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";
import { loadRunnerConfig } from "./runner-config.mjs";
import { resolveRunnerAsset } from "./runner-pack.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { flags, gameRel } = parseLabArgs(process.argv.slice(2));
const skipExport = flags.has("--skip-export");

function fail(message) {
  console.error("RUNNER_REGRESSION: FAIL");
  console.error(message);
  process.exit(1);
}

function pass(lines) {
  console.log("RUNNER_REGRESSION: PASS");
  for (const line of lines) console.log(line);
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

function validateResources(repoRoot, gameDir, project) {
  const missing = [];
  for (const resource of project.resources?.resources || []) {
    if (!resource.file) continue;
    const resolved = resolveRunnerAsset(repoRoot, gameDir, resource.file);
    if (!resolved) missing.push(resource.file);
  }
  return missing;
}

function startStaticServer(buildDir, port) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const abs = path.normalize(path.join(buildDir, rel));
    if (!abs.startsWith(path.normalize(buildDir))) {
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
        "var game = window.__zrGame = new gdjs.RuntimeGame"
      );
      body = Buffer.from(html, "utf8");
    }
    const ext = path.extname(abs);
    const types = {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".mp3": "audio/mpeg",
      ".wasm": "application/wasm",
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
    this.events = new Map();
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString());
      if (msg.method && this.events.has(msg.method)) {
        for (const fn of this.events.get(msg.method)) fn(msg.params);
      }
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }
  on(method, fn) {
    if (!this.events.has(method)) this.events.set(method, []);
    this.events.get(method).push(fn);
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evaluate(expression, awaitPromise = false) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise,
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

function snapshotExpr() {
  return `(() => {
    const game = window.__zrGame;
    if (!game) return { ready: false };
    const scene = game.getSceneStack().getCurrentScene();
    if (!scene) return { ready: false };
    const sv = scene.getVariables();
    const names = ["CactusObstacle", "IslandObstacle", "WreckObstacle", "BonusObject"];
    const counts = {};
    for (const name of names) counts[name] = scene.getObjects(name).length;
    const hud = scene.getObjects("DevHud");
    let hudText = "";
    if (hud.length && typeof hud[0].getString === "function") hudText = hud[0].getString();
    const hidden = hud.length ? hud[0].isHidden() : true;
    return {
      ready: true,
      scene: scene.getName(),
      status: sv.get("GameStatus").getAsString(),
      score: game.getVariables().get("Score").getAsNumber(),
      invincible: sv.get("Invincible").getAsNumber(),
      devMode: sv.get("DevMode").getAsNumber(),
      counts,
      hazardTotal: counts.CactusObstacle + counts.IslandObstacle + counts.WreckObstacle,
      devHudHidden: hidden,
      devHudText: hudText,
      href: String(location.href),
      width: game.getGameResolutionWidth(),
      height: game.getGameResolutionHeight(),
    };
  })()`;
}

async function waitSnapshot(cdp, pred, timeoutMs, label) {
  const start = Date.now();
  let last = null;
  while (Date.now() - start < timeoutMs) {
    last = await cdp.evaluate(snapshotExpr());
    if (last && pred(last)) return last;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error(`${label}: timed out last=${JSON.stringify(last)}`);
}

async function tapSpace(cdp) {
  await cdp.evaluate(
    `(() => { window.__zrGame.getInputManager().onKeyPressed(32); return true; })()`
  );
  await new Promise((r) => setTimeout(r, 80));
  await cdp.evaluate(
    `(() => { window.__zrGame.getInputManager().onKeyReleased(32); return true; })()`
  );
  await new Promise((r) => setTimeout(r, 80));
}

async function retryInPlace(cdp) {
  const ok = await cdp.evaluate(`(() => {
    const game = window.__zrGame;
    const scene = game.getSceneStack().getCurrentScene();
    if (typeof window.__zrSoftReset !== "function") return false;
    window.__zrSoftReset(scene);
    return true;
  })()`);
  if (!ok) throw new Error("window.__zrSoftReset is missing from the export");
}

function forceDeathExpr() {
  return `(() => {
    const game = window.__zrGame;
    const scene = game.getSceneStack().getCurrentScene();
    const dinos = scene.getObjects("Dino");
    if (!dinos.length) return false;
    const dino = dinos[0];
    const obj = scene.createObject("CactusObstacle");
    if (!obj) return false;
    obj.setX(dino.getX());
    obj.setY(dino.getY());
    return true;
  })()`;
}

async function main() {
  let gameDir;
  try {
    gameDir = resolveGameDir(root, gameRel);
  } catch (err) {
    fail(err.message);
  }

  try {
    loadRunnerConfig(gameDir);
  } catch (err) {
    fail(`runner.json: ${err.message}`);
  }

  let projectPath;
  try {
    projectPath = findProjectJson(gameDir);
  } catch (err) {
    fail(err.message);
  }
  const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
  const missing = validateResources(root, gameDir, project);
  if (missing.length) fail(`missing resources: ${missing.slice(0, 8).join(", ")}`);

  if (!skipExport) {
    const exp = spawnSync(process.execPath, ["tools/gdevelop-web-export.mjs", "--game", gameRel], {
      cwd: root,
      encoding: "utf8",
    });
    if (exp.status !== 0) {
      fail(exp.stderr || exp.stdout || "export failed");
    }
    if (!String(exp.stdout).includes("WEB_EXPORT: PASS")) {
      fail("export did not report WEB_EXPORT: PASS");
    }
  }

  const buildDir = path.join(gameDir, "build");
  if (!fs.existsSync(path.join(buildDir, "index.html"))) {
    fail("build/index.html missing");
  }

  const chrome = findChrome();
  if (!chrome) fail("Chrome/Edge not found (set CHROME_PATH)");

  const httpPort = await freePort();
  const dbgPort = await freePort();
  const server = await startStaticServer(buildDir, httpPort);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "zr-reg-"));
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
      "--no-default-browser-check",
      "--window-size=540,960",
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
      width: 540,
      height: 960,
      deviceScaleFactor: 1,
      mobile: true,
    });
    const pageUrl = `http://127.0.0.1:${httpPort}/`;
    await cdp.send("Page.navigate", { url: pageUrl });
    await waitSnapshot(cdp, (s) => s.ready && s.scene === "Game", 20000, "boot Game scene");

    const preparing = await waitSnapshot(
      cdp,
      (s) => s.status === "Preparing",
      5000,
      "Preparing"
    );
    if (preparing.devMode !== 0) fail("DevMode is on without ?dev=1");
    if (preparing.invincible !== 0) fail("Invincible is on in normal mode");
    if (/DEV I=inv/.test(preparing.devHudText || "")) fail("DevHud exposes invincibility in normal mode");
    if (/[?&#]dev=1\b/.test(preparing.href)) fail("URL exposes ?dev=1");
    if (preparing.height < preparing.width) fail("viewport is not portrait-like");

    await tapSpace(cdp);
    await waitSnapshot(cdp, (s) => s.status === "Playing", 5000, "Preparing -> Playing");

    const spawned = await cdp.evaluate(forceDeathExpr());
    if (!spawned) fail("could not spawn CactusObstacle on the player");
    await waitSnapshot(cdp, (s) => s.status === "Dead", 4000, "hazard death -> Dead");

    const href0 = (await cdp.evaluate(snapshotExpr())).href;

    for (let i = 1; i <= 10; i++) {
      await retryInPlace(cdp);
      const afterRetry = await waitSnapshot(
        cdp,
        (s) => s.status === "Preparing" && s.score === 0 && s.hazardTotal === 0,
        4000,
        `retry ${i} reset`
      );
      if (afterRetry.href !== href0) fail(`page reloaded on retry ${i}`);
      await tapSpace(cdp);
      await waitSnapshot(cdp, (s) => s.status === "Playing", 4000, `retry ${i} Playing`);
      const again = await cdp.evaluate(forceDeathExpr());
      if (!again) fail(`retry ${i}: could not spawn hazard`);
      await waitSnapshot(cdp, (s) => s.status === "Dead", 4000, `retry ${i} Dead`);
    }

    pass([
      `game: ${gameRel}`,
      "export: skipped=" + skipExport,
      "cycles: 10 in-place retries, score 0, hazards cleared",
      "normal mode: no dev HUD / invincibility / ?dev=1",
    ]);
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
