#!/usr/bin/env node
/**
 * Idempotent Plonku UI objects on the Zombie Runner Game layout.
 * Usage: node tools/patch-plonku-ui.mjs [--screens start,hud,go]
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { flags, gameRel } = parseLabArgs(process.argv.slice(2));
const screensArg = process.argv.find((a, i, arr) => arr[i - 1] === "--screens");
const wanted = new Set(
  (screensArg || "start").split(",").map((s) => s.trim()).filter(Boolean)
);

const gameDir = resolveGameDir(root, gameRel);
const projectPath = findProjectJson(gameDir);
const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
const game = project.layouts.find((l) => l.name === "Game");
if (!game) {
  console.error("Game layout missing");
  process.exit(1);
}

function uuid() {
  return crypto.randomUUID();
}

function spriteObject(name, image) {
  return {
    adaptCollisionMaskAutomatically: false,
    assetStoreId: "",
    name,
    type: "Sprite",
    updateIfNotVisible: false,
    variables: [],
    effects: [],
    behaviors: [],
    animations: [
      {
        name,
        useMultipleDirections: false,
        directions: [
          {
            looping: false,
            timeBetweenFrames: 0.08,
            sprites: [
              {
                hasCustomCollisionMask: false,
                image,
                points: [],
                originPoint: { name: "origine", x: 0, y: 0 },
                centerPoint: { automatic: true, name: "centre", x: 0, y: 0 },
                customCollisionMask: [],
              },
            ],
          },
        ],
      },
    ],
  };
}

function textObject(name, text, size, color) {
  const [r, g, b] = color;
  return {
    assetStoreId: "",
    bold: false,
    italic: false,
    name,
    smoothed: true,
    type: "TextObject::Text",
    underlined: false,
    variables: [],
    effects: [],
    behaviors: [],
    string: text,
    font: "Nathaniel-19.otf",
    textAlignment: "",
    characterSize: size,
    color: { r, g, b },
    content: {
      bold: false,
      isOutlineEnabled: true,
      isShadowEnabled: false,
      italic: false,
      outlineColor: "26;21;16",
      outlineThickness: 2,
      shadowAngle: 90,
      shadowBlurRadius: 2,
      shadowColor: "0;0;0",
      shadowDistance: 4,
      shadowOpacity: 127,
      smoothed: true,
      underlined: false,
      text,
      font: "Nathaniel-19.otf",
      textAlignment: "",
      verticalTextAlignment: "top",
      characterSize: size,
      lineHeight: 0,
      color: `${r};${g};${b}`,
    },
  };
}

function instance(name, { x, y, w, h, z, layer = "" }) {
  return {
    angle: 0,
    customSize: true,
    height: h,
    layer,
    name,
    persistentUuid: uuid(),
    width: w,
    x,
    y,
    zOrder: z,
    numberProperties: [],
    stringProperties: [],
    initialVariables: [],
  };
}

function ensureResource(file, name) {
  project.resources = project.resources || { resources: [] };
  const list = project.resources.resources;
  const abs = path.join(gameDir, file);
  if (!fs.existsSync(abs)) {
    console.error("Missing UI file", abs);
    process.exit(1);
  }
  let rec = list.find((r) => r.name === name);
  if (!rec) {
    rec = { file, kind: "image", metadata: "", name, smoothed: true, userAdded: true };
    list.push(rec);
  } else {
    rec.file = file;
  }
}

function upsertObject(obj) {
  const i = game.objects.findIndex((o) => o.name === obj.name);
  if (i >= 0) game.objects[i] = obj;
  else game.objects.push(obj);
}

function upsertInstance(inst) {
  const existing = game.instances.find((o) => o.name === inst.name);
  if (existing) {
    existing.x = inst.x;
    existing.y = inst.y;
    existing.width = inst.width;
    existing.height = inst.height;
    existing.zOrder = inst.zOrder;
    existing.layer = inst.layer;
    existing.customSize = true;
    return;
  }
  game.instances.push(inst);
}

function ensureFolder(objectName) {
  const ui = game.objectsFolderStructure?.children?.find((c) => c.folderName === "UI");
  if (!ui) return;
  if (!ui.children.some((c) => c.objectName === objectName)) {
    ui.children.push({ objectName });
  }
}

function walkEvents(events, visit) {
  if (!events) return;
  for (const event of events) {
    visit(event);
    walkEvents(event.events, visit);
  }
}

function walkConds(list, visit) {
  if (!list) return;
  for (const c of list) {
    visit(c);
    walkConds(c.subInstructions, visit);
  }
}

const defs = [];
if (wanted.has("start")) {
  defs.push({
    res: ["assets/wroclaw-v1/ui/start_panel.png", "plonku-ui-start.png"],
    obj: spriteObject("UiStart", "plonku-ui-start.png"),
    inst: instance("UiStart", { x: 0, y: 0, w: 540, h: 620, z: 40 }),
  });
  defs.push({
    res: ["assets/wroclaw-v1/ui/cta_start.png", "plonku-ui-cta-start.png"],
    obj: spriteObject("StartCta", "plonku-ui-cta-start.png"),
    inst: instance("StartCta", { x: 40, y: 628, w: 460, h: 88, z: 42 }),
  });
  defs.push({
    res: ["assets/wroclaw-v1/ui/cta_city.png", "plonku-ui-cta-city.png"],
    obj: spriteObject("CityCta", "plonku-ui-cta-city.png"),
    inst: instance("CityCta", { x: 40, y: 736, w: 460, h: 80, z: 42 }),
  });
}
if (wanted.has("hud")) {
  defs.push({
    res: ["assets/wroclaw-v1/ui/hud_bar.png", "plonku-ui-hud.png"],
    obj: spriteObject("UiHud", "plonku-ui-hud.png"),
    inst: instance("UiHud", { x: 12, y: 8, w: 516, h: 96, z: 38 }),
  });
}
if (wanted.has("city")) {
  defs.push({
    res: ["assets/wroclaw-v1/ui/city_panel.png", "plonku-ui-city-panel.png"],
    obj: spriteObject("CityPanel", "plonku-ui-city-panel.png"),
    inst: instance("CityPanel", { x: 24, y: 200, w: 492, h: 400, z: 70 }),
  });
  defs.push({
    res: ["assets/wroclaw-v1/ui/city_play.png", "plonku-ui-city-play.png"],
    obj: spriteObject("CityPlay", "plonku-ui-city-play.png"),
    inst: instance("CityPlay", { x: 40, y: 280, w: 460, h: 80, z: 72 }),
  });
  defs.push({
    res: ["assets/wroclaw-v1/ui/city_soon.png", "plonku-ui-city-soon.png"],
    obj: spriteObject("CitySoon", "plonku-ui-city-soon.png"),
    inst: instance("CitySoon", { x: 40, y: 376, w: 460, h: 80, z: 72 }),
  });
  setSceneVarPicker();
}

function setSceneVarPicker() {
  game.variables = game.variables || [];
  let entry = game.variables.find((v) => v.name === "CityPicker");
  if (!entry) {
    game.variables.push({ name: "CityPicker", type: "number", value: 0 });
  } else {
    entry.type = "number";
    entry.value = 0;
  }
}

if (wanted.has("go")) {
  defs.push({
    res: ["assets/wroclaw-v1/ui/go_panel.png", "plonku-ui-go.png"],
    obj: spriteObject("UiGo", "plonku-ui-go.png"),
    inst: instance("UiGo", { x: 24, y: 160, w: 492, h: 420, z: 50 }),
  });
  defs.push({
    res: ["assets/wroclaw-v1/ui/cta_retry.png", "plonku-ui-retry.png"],
    obj: spriteObject("GoRetry", "plonku-ui-retry.png"),
    inst: instance("GoRetry", { x: 40, y: 600, w: 460, h: 84, z: 52 }),
  });
  defs.push({
    obj: textObject("GoScore", "0", 64, [215, 255, 63]),
    inst: instance("GoScore", { x: 48, y: 330, w: 440, h: 80, z: 53 }),
  });
}

for (const d of defs) {
  if (d.res) ensureResource(d.res[0], d.res[1]);
  upsertObject(d.obj);
  upsertInstance(d.inst);
  ensureFolder(d.obj.name);
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

if (wanted.has("start")) {
  const preparing = findGroup(game.events, "Preparing to start");
  walkEvents(preparing ? [preparing] : [], (event) => {
    walkConds(event.conditions, (c) => {
      if (
        c.type?.value === "MouseButtonFromTextPressed" &&
        (c.parameters?.[0] === "Dino" || c.parameters?.[0] === "StartCta")
      ) {
        c.parameters[0] = "StartCta";
      }
    });
  });
}

if (wanted.has("hud")) {
  const score = game.objects.find((o) => o.name === "ScoreText");
  if (score) {
    score.color = { r: 244, g: 244, b: 241 };
    score.characterSize = 28;
    if (score.content) {
      score.content.color = "244;244;241";
      score.content.characterSize = 28;
      score.content.outlineColor = "26;29;35";
    }
  }
  const inst = game.instances.find((o) => o.name === "ScoreText");
  if (inst) {
    inst.x = 28;
    inst.y = 36;
    inst.zOrder = 39;
  }
  const touch = game.layers?.find((l) => l.name === "TouchButtons");
  if (touch) touch.visibility = true;
}

fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
console.log("PATCH_PLONKU_UI", [...wanted].join(","), "objects", defs.map((d) => d.obj.name).join(" "));
