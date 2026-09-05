#!/usr/bin/env node
/**
 * Copy chunks.json into the Game-scene JsCode event.
 * Adding a chunk: edit chunks.json, run this, do not edit jump/collision events.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "games", "zombie-runner", "chunks.json");
const templatePath = path.join(root, "tools", "chunk-runtime.template.js");
const projectPath = path.join(
  root,
  "games",
  "zombie-runner",
  "zombie-runner.json"
);
const MARK = "Zombie Runner chunk sequencer (task 005)";

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
if (!Array.isArray(catalog.chunks) || catalog.chunks.length < 9) {
  console.error("chunks.json must list at least 9 chunks");
  process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf8");
const code =
  template.replace("__CHUNK_CATALOG__", JSON.stringify(catalog)) + "\n";
const lines = code.split("\n").map((line, i, arr) =>
  i === arr.length - 1 && line === "" ? line : line + (i === arr.length - 1 ? "" : "\r")
);
// GDevelop stores JS as array of lines ending with \r except possibly last
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
  const playing = findPlaying(game.events);
  if (playing) {
    playing.events = playing.events || [];
    playing.events.unshift(jsEvent);
  } else {
    game.events.push({
      type: "BuiltinCommonInstructions::Standard",
      conditions: [
        {
          type: { value: "StringVariable" },
          parameters: ["GameStatus", "=", '"Playing"'],
        },
      ],
      actions: [],
      events: [jsEvent],
    });
  }
  found = true;
}

function findPlaying(events) {
  if (!events) return null;
  for (const event of events) {
    const hit = (event.conditions || []).some(
      (c) =>
        (c.type?.value || c.type) === "StringVariable" &&
        c.parameters?.[0] === "GameStatus" &&
        c.parameters?.[2] === '"Playing"'
    );
    if (hit) return event;
    const nested = findPlaying(event.events);
    if (nested) return nested;
  }
  return null;
}

fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
console.log(
  found
    ? `Synced ${catalog.chunks.length} chunks into Game JsCode event`
    : "failed"
);
