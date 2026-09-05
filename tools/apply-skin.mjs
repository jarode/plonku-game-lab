#!/usr/bin/env node
/**
 * Remap GDevelop resource file paths from a skin manifest.
 * Does not edit events, chunks, or object names.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const name = process.argv[2];
if (!name) {
  console.error("Usage: node tools/apply-skin.mjs <wroclaw-v1|alt-blocky>");
  process.exit(1);
}
const manifestPath = path.join(
  root,
  "games",
  "zombie-runner",
  "skins",
  name,
  "manifest.json"
);
if (!fs.existsSync(manifestPath)) {
  console.error("Missing", manifestPath);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const projectPath = path.join(
  root,
  "games",
  "zombie-runner",
  "zombie-runner.json"
);
const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
const map = manifest.resources || {};
let changed = 0;
if (name === "wroclaw-v1" || Object.keys(map).length === 0) {
  const backup = path.join(
    root,
    "games",
    "zombie-runner",
    "skins",
    "wroclaw-v1",
    "resource-files.json"
  );
  if (fs.existsSync(backup)) {
    const original = JSON.parse(fs.readFileSync(backup, "utf8"));
    for (const resource of project.resources.resources) {
      if (original[resource.name] && resource.file !== original[resource.name]) {
        resource.file = original[resource.name];
        changed += 1;
      }
    }
  } else {
    const snapshot = {};
    for (const resource of project.resources.resources) {
      snapshot[resource.name] = resource.file;
    }
    fs.writeFileSync(backup, JSON.stringify(snapshot, null, 2) + "\n");
    console.log("Wrote baseline snapshot", backup);
  }
} else {
  const snapshotPath = path.join(
    root,
    "games",
    "zombie-runner",
    "skins",
    "wroclaw-v1",
    "resource-files.json"
  );
  if (!fs.existsSync(snapshotPath)) {
    const snapshot = {};
    for (const resource of project.resources.resources) {
      snapshot[resource.name] = resource.file;
    }
    fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
    fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2) + "\n");
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
