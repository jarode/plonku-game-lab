#!/usr/bin/env node
/** Idempotent 040–043 lab identity + Game JsCode hooks + fixture catalog. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { boardFromInput } from "../games/breakout-lab/data/board-from-input.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectPath = path.join(root, "games/breakout-lab/breakout-lab.json");
const hooksPath = path.join(root, "games/breakout-lab/runtime/lab-hooks.js");
const fixturesDir = path.join(root, "games/breakout-lab/data/fixtures");
const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));

const catalog = {};
for (const name of fs.readdirSync(fixturesDir).filter((n) => n.endsWith(".json"))) {
  const raw = JSON.parse(fs.readFileSync(path.join(fixturesDir, name), "utf8"));
  catalog[raw.id] = boardFromInput(raw);
}
const hooksSrc = fs.readFileSync(hooksPath, "utf8").replace("__BO_BOARDS__", JSON.stringify(catalog));
if (hooksSrc.includes("__BO_BOARDS__")) {
  console.error("lab-hooks.js missing __BO_BOARDS__ token");
  process.exit(1);
}
const lines = hooksSrc.split(/\r?\n/).map((line) => line + "\r");

project.firstLayout = "Game";
project.properties = project.properties || {};
project.properties.name = "Breakout Lab";
project.properties.packageName = "com.plonku.breakoutlab";
if (project.properties.loadingScreen) {
  project.properties.loadingScreen.showGDevelopSplash = false;
}
if (project.properties.watermark) {
  project.properties.watermark.showWatermark = false;
}

for (const layout of project.layouts || []) {
  for (const inst of layout.instances || []) {
    if (inst.name === "GDevelop_WaterMark" || inst.name === "Home_Button") {
      inst.x = -4000;
      inst.y = -4000;
    }
  }
}

function walkEvents(events, visit) {
  if (!Array.isArray(events)) return;
  for (const ev of events) {
    visit(ev);
    walkEvents(ev.events, visit);
  }
}

function stripRandomBrickLayout(events) {
  walkEvents(events, (ev) => {
    if (!Array.isArray(ev.actions)) return;
    ev.actions = ev.actions.filter(
      (a) => a?.type?.value !== "BuiltinExternalLayouts::CreateObjectsFromExternalLayout"
    );
  });
}

function setTextObject(obj, { text, color }) {
  if (!obj) return;
  const [r, g, b] = color;
  obj.string = text;
  obj.color = { r, g, b };
  if (obj.content) {
    obj.content.text = text;
    obj.content.color = `${r};${g};${b}`;
  }
}

function restyleGameLayout(layout) {
  layout.title = "Breakout Lab";
  layout.r = 8;
  layout.g = 16;
  layout.b = 36;
  layout.v = 16;
  const objects = layout.objects || [];
  const byName = Object.fromEntries(objects.map((o) => [o.name, o]));
  setTextObject(byName.ScoreLabel, { text: "SCORE 0", color: [0, 229, 255] });
  setTextObject(byName.StartCard_title, { text: "LAUNCH", color: [200, 255, 0] });
  setTextObject(byName.StartCard_Sub_title, {
    text: "MOVE THE PADDLE · TAP OR SPACE\nWHITE 1 HIT · YELLOW 2 · RED 3",
    color: [0, 229, 255],
  });
  setTextObject(byName.End_Card_Title, { text: "SIGNAL LOST", color: [255, 45, 149] });
  walkEvents(layout.events, (ev) => {
    if (!Array.isArray(ev.actions)) return;
    for (const a of ev.actions) {
      if (a?.type?.value !== "TextContainerCapability::TextContainerBehavior::SetValue") continue;
      const params = a.parameters || [];
      if (params[0] !== "End_Card_Title") continue;
      if (params[3] === '"YOU LOST"') params[3] = '"SIGNAL LOST"';
      if (params[3] === '"YOU WON"') params[3] = '"BOARD CLEAR"';
    }
  });
}

const game = project.layouts.find((l) => l.name === "Game");
if (!game) {
  console.error("Game layout missing");
  process.exit(1);
}
restyleGameLayout(game);
stripRandomBrickLayout(game.events);
game.events = game.events || [];
const marker = "Breakout Lab hooks";
const existing = game.events.find(
  (e) => e.type === "BuiltinCommonInstructions::JsCode" && (e.inlineCode || []).some((c) => String(c).includes(marker))
);
const jsEvent = {
  type: "BuiltinCommonInstructions::JsCode",
  inlineCode: lines,
  parameterObjects: "",
  useStrict: true,
  eventsSheetExpanded: true,
};
if (existing) Object.assign(existing, jsEvent);
else game.events.push(jsEvent);

fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
console.log("PATCH_BREAKOUT_LAB fixtures", Object.keys(catalog).sort().join(","));
