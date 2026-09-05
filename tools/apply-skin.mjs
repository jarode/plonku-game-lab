#!/usr/bin/env node
/**
 * Remap GDevelop resource file paths from a skin manifest.
 * Does not edit events, chunks, or object names.
 * Usage: node tools/apply-skin.mjs <skin> [--game games/zombie-runner]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { rest, gameRel } = parseLabArgs(process.argv.slice(2));
const name = rest[0];
if (!name) {
  console.error("Usage: node tools/apply-skin.mjs <skin> [--game <dir>]");
  process.exit(1);
}
const gameDir = resolveGameDir(root, gameRel);
const manifestPath = path.join(gameDir, "skins", name, "manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error("Missing", manifestPath);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const projectPath = findProjectJson(gameDir);
const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
const map = manifest.resources || {};

function baselineCandidates() {
  return [
    path.join(gameDir, "skins", "default", "resource-files.json"),
    path.join(gameDir, "skins", "wroclaw-v1", "resource-files.json"),
  ];
}

function existingBaseline() {
  return baselineCandidates().find((p) => fs.existsSync(p));
}

function writeSnapshot(target) {
  const snapshot = {};
  for (const resource of project.resources.resources) {
    snapshot[resource.name] = resource.file;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(snapshot, null, 2) + "\n");
  return snapshot;
}

function restoreFrom(snapshotPath) {
  const original = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  let changed = 0;
  for (const resource of project.resources.resources) {
    if (original[resource.name] && resource.file !== original[resource.name]) {
      resource.file = original[resource.name];
      changed += 1;
    }
  }
  return changed;
}

let changed = 0;
const restoreBaseline = Object.keys(map).length === 0;
if (restoreBaseline) {
  let backup = existingBaseline();
  if (!backup) {
    backup = baselineCandidates()[0];
    writeSnapshot(backup);
    console.log("Wrote baseline snapshot", backup);
  } else {
    changed = restoreFrom(backup);
  }
} else {
  let snapshotPath = existingBaseline();
  if (!snapshotPath) {
    snapshotPath = baselineCandidates()[0];
    writeSnapshot(snapshotPath);
  }
  for (const resource of project.resources.resources) {
    const next = map[resource.name] || map[resource.file];
    if (next && resource.file !== next) {
      resource.file = next;
      changed += 1;
    }
  }
}
fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
console.log("apply-skin", name, "updated", changed, "resources");
