#!/usr/bin/env node
/**
 * Point a runner project's resource files at templates/runner-v1/assets.
 * Usage: node tools/relink-runner-pack.mjs --game games/zombie-runner
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";
import {
  rewriteProjectResourcesToPack,
  rewriteSnapshotToPack,
} from "./runner-pack.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { gameRel } = parseLabArgs(process.argv.slice(2));
const gameDir = resolveGameDir(root, gameRel);
const projectPath = findProjectJson(gameDir);
const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
const n = rewriteProjectResourcesToPack(root, gameDir, project);
fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
let snaps = 0;
const skinsDir = path.join(gameDir, "skins");
if (fs.existsSync(skinsDir)) {
  for (const name of fs.readdirSync(skinsDir)) {
    const snapPath = path.join(skinsDir, name, "resource-files.json");
    if (!fs.existsSync(snapPath)) continue;
    const snap = JSON.parse(fs.readFileSync(snapPath, "utf8"));
    fs.writeFileSync(
      snapPath,
      JSON.stringify(rewriteSnapshotToPack(root, gameDir, snap), null, 2) + "\n"
    );
    snaps += 1;
  }
}
console.log("relink-runner-pack", path.relative(root, projectPath), "resources", n, "snapshots", snaps);
