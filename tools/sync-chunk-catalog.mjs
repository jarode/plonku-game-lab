#!/usr/bin/env node
/**
 * Copy chunks.json into the Game-scene JsCode event.
 * Usage: node tools/sync-chunk-catalog.mjs [--game games/zombie-runner]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { gameRel } = parseLabArgs(process.argv.slice(2));
const gameDir = resolveGameDir(root, gameRel);
const catalogPath = path.join(gameDir, "chunks.json");
const templatePath = path.join(
  root,
  "templates",
  "runner-v1",
  "runtime",
  "chunk-runtime.template.js"
);
const projectPath = findProjectJson(gameDir);
const MARK = "zrSoftReset";

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
if (!Array.isArray(catalog.chunks) || catalog.chunks.length < 9) {
  console.error("chunks.json must list at least 9 chunks");
  process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf8");
const code = template.replace("__CHUNK_CATALOG__", JSON.stringify(catalog)) + "\n";
const inlineCode = code.replace(/\r\n/g, "\n").split("\n");
if (inlineCode[inlineCode.length - 1] === "") inlineCode.pop();
const gdLines = inlineCode.map((line) => line + "\r");

const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
const game = project.layouts.find((l) => l.name === "Game");
if (!game) {
  console.error("Game layout missing");
  process.exit(1);
}

function walk(events, visit) {
  if (!events) return;
  for (const event of events) {
    visit(event);
    walk(event.events, visit);
  }
}

let found = false;
walk(game.events, (event) => {
  if (
    event.type === "BuiltinCommonInstructions::JsCode" &&
    JSON.stringify(event.inlineCode || []).includes(MARK)
  ) {
    event.inlineCode = gdLines;
    event.useStrict = true;
    found = true;
  }
});

if (!found) {
  const jsEvent = {
    type: "BuiltinCommonInstructions::JsCode",
    inlineCode: gdLines,
    parameterObjects: "",
    useStrict: true,
    eventsSheetExpanded: true,
  };
  const states = findGroup(game.events, "Game states");
  if (states) {
    states.events = states.events || [];
    states.events.unshift(jsEvent);
  } else {
    game.events.unshift(jsEvent);
  }
  found = true;
}

function findGroup(events, name) {
  if (!events) return null;
  for (const event of events) {
    if (event.type === "BuiltinCommonInstructions::Group" && event.name === name) {
      return event;
    }
    const nested = findGroup(event.events, name);
    if (nested) return nested;
  }
  return null;
}

fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
console.log(`Synced ${catalog.chunks.length} chunks into ${path.relative(root, projectPath)}`);
