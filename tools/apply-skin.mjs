#!/usr/bin/env node
/**
 * Apply a skin to a runner GDevelop project.
 * v2: slots in templates/runner-v1/skins/slot-map.v2.json
 * v1: manifest.resources keyed by GDevelop resource name (compat)
 *
 * Usage:
 *   node tools/apply-skin.mjs <skin> [--game games/zombie-runner]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SLOT_MAP_PATH = path.join(
  root,
  "templates",
  "runner-v1",
  "skins",
  "slot-map.v2.json"
);

function fail(message) {
  console.error("APPLY_SKIN: FAIL");
  console.error(message);
  process.exit(1);
}

const { rest, gameRel } = parseLabArgs(process.argv.slice(2));
const name = rest[0];
if (!name) fail("Usage: node tools/apply-skin.mjs <skin> [--game <dir>]");

const gameDir = resolveGameDir(root, gameRel);
const manifestPath = path.join(gameDir, "skins", name, "manifest.json");
if (!fs.existsSync(manifestPath)) fail("Missing " + manifestPath);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const projectPath = findProjectJson(gameDir);
const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
const resources = project.resources?.resources || [];
const byName = new Map(resources.map((r) => [r.name, r]));

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
  for (const resource of resources) snapshot[resource.name] = resource.file;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(snapshot, null, 2) + "\n");
  return snapshot;
}

function restoreFrom(snapshotPath) {
  const original = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  let changed = 0;
  for (const resource of resources) {
    if (original[resource.name] && resource.file !== original[resource.name]) {
      resource.file = original[resource.name];
      changed += 1;
    }
  }
  return changed;
}

function resolveExistingFile(rel) {
  const full = path.normalize(path.join(gameDir, rel));
  if (!full.startsWith(path.normalize(gameDir))) {
    fail("Path escapes game dir: " + rel);
  }
  if (!fs.existsSync(full)) fail("Missing file for slot/resource: " + rel);
  return rel.replace(/\\/g, "/");
}

function loadSlotMap() {
  if (!fs.existsSync(SLOT_MAP_PATH)) fail("Missing slot map " + SLOT_MAP_PATH);
  return JSON.parse(fs.readFileSync(SLOT_MAP_PATH, "utf8"));
}

function ensureBaseline() {
  let snapshotPath = existingBaseline();
  if (!snapshotPath) {
    snapshotPath = baselineCandidates()[0];
    writeSnapshot(snapshotPath);
    console.log("Wrote baseline snapshot", snapshotPath);
  }
  return snapshotPath;
}

function applyV1Resources(map) {
  let changed = 0;
  for (const resource of resources) {
    const next = map[resource.name] || map[resource.file];
    if (next && resource.file !== next) {
      resolveExistingFile(next);
      resource.file = next.replace(/\\/g, "/");
      changed += 1;
    }
  }
  return changed;
}

function applyV2Slots(slotMap, slots) {
  const known = new Set([
    ...(slotMap.required || []),
    ...(slotMap.optional || []),
  ]);
  for (const key of Object.keys(slots)) {
    if (!known.has(key)) fail("Unknown slot id: " + key);
  }
  const required = slotMap.required || [];
  const missing = required.filter((id) => !(id in slots));
  if (missing.length) fail("Missing required slot(s): " + missing.join(", "));

  let changed = 0;
  for (const [slotId, value] of Object.entries(slots)) {
    const spec = slotMap.slots[slotId];
    if (!spec) fail("Slot not in map: " + slotId);
    const names = spec.resources || [];
    if (names.length === 0) continue;
    if (value === "$baseline") continue;
    const files = Array.isArray(value) ? value : names.map(() => value);
    if (files.length !== names.length) {
      fail(
        "Slot " +
          slotId +
          " expects " +
          names.length +
          " file(s) or one file applied to all, got " +
          files.length
      );
    }
    for (let i = 0; i < names.length; i++) {
      const res = byName.get(names[i]);
      if (!res) fail("Project missing resource " + names[i] + " for slot " + slotId);
      const next = resolveExistingFile(files[i]);
      if (res.file !== next) {
        res.file = next;
        changed += 1;
      }
    }
  }
  return changed;
}

const slotMap = loadSlotMap();
const snapshotPath = ensureBaseline();
const hasSlots =
  manifest.slots && typeof manifest.slots === "object" && !Array.isArray(manifest.slots);
const v1map = manifest.resources && typeof manifest.resources === "object" ? manifest.resources : {};
const restoreOnly =
  (!hasSlots && Object.keys(v1map).length === 0) ||
  (hasSlots && Object.keys(manifest.slots).length === 0 && Object.keys(v1map).length === 0);

let changed = 0;
if (restoreOnly) {
  changed = restoreFrom(snapshotPath);
} else {
  restoreFrom(snapshotPath);
  if (hasSlots) {
    changed = applyV2Slots(slotMap, manifest.slots);
  } else {
    console.warn("APPLY_SKIN: using v1 resource-name map (compat)");
    changed = applyV1Resources(v1map);
  }
}

fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
console.log("apply-skin", name, "updated", changed, "resources");
console.log("APPLY_SKIN: PASS");
