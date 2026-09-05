#!/usr/bin/env node
/** Idempotent 040 lab identity + Game JsCode hooks. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectPath = path.join(root, "games/breakout-lab/breakout-lab.json");
const hooksPath = path.join(root, "games/breakout-lab/runtime/lab-hooks.js");
const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
const hooks = fs.readFileSync(hooksPath, "utf8");
const lines = hooks.split(/\r?\n/).map((line) => line + "\r");

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

const game = project.layouts.find((l) => l.name === "Game");
if (!game) {
  console.error("Game layout missing");
  process.exit(1);
}
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
console.log("PATCH_BREAKOUT_LAB Game hooks firstLayout=Game");
