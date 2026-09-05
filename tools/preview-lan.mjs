#!/usr/bin/env node
/**
 * Serve games/zombie-runner/build on all interfaces for phone testing.
 * Usage: node tools/preview-lan.mjs
 * Then open http://<this-pc-lan-ip>:8765/ from a phone on the same Wi-Fi.
 * Dev mode: http://<ip>:8765/?dev=1
 */
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "games", "zombie-runner", "build");
const port = Number(process.env.PREVIEW_PORT || 8765);

if (!fs.existsSync(path.join(dir, "index.html"))) {
  console.error("No export at", dir, "- run: node tools/gdevelop-web-export.mjs");
  process.exit(1);
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
};

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent((req.url || "/").split("?")[0]);
  if (rel === "/") rel = "/index.html";
  const file = path.normalize(path.join(dir, rel));
  if (!file.startsWith(dir)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("Serving", dir);
  console.log("This PC: http://127.0.0.1:" + port + "/");
  const nets = os.networkInterfaces();
  for (const addrs of Object.values(nets)) {
    for (const a of addrs || []) {
      if (a.family === "IPv4" && !a.internal) {
        console.log("Phone on same Wi-Fi: http://" + a.address + ":" + port + "/");
      }
    }
  }
  console.log("Firewall must allow inbound TCP", port);
});
