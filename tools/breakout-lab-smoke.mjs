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
    try { gameState = scene.getVariables().get("GameState").getAsString(); } catch (e) {}
    const names = ["Paddle", "Ball", "Block_1", "Block_2", "Block_3"];
    const counts = {};
    for (const n of names) counts[n] = scene.getObjects(n).length;
    return { ready: true, scene: scene.getName(), gameState, counts };
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
      `--window-size=1280,720`,
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
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${httpPort}/` });
    const menu = await waitSnap(cdp, (s) => s.ready && s.scene === "Menu", 20000, "boot Menu");
    await cdp.evaluate(`(() => {
      window.__boGame.getSceneStack().replace("Game", true);
      return true;
    })()`);
    const game = await waitSnap(
      cdp,
      (s) => s.ready && s.scene === "Game" && s.counts.Paddle >= 1 && s.counts.Ball >= 1 && s.counts.Block_1 >= 1,
      8000,
      "Game paddle/ball/blocks"
    );
    console.log("BREAKOUT_SMOKE: PASS");
    console.log("menu", menu.scene);
    console.log("game", game.scene, "state", game.gameState, "counts", JSON.stringify(game.counts));
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
