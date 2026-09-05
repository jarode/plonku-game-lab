#!/usr/bin/env node
/**
 * Copy templates/runner-v1 into games/<slug> as a new runner client.
 * Usage: node tools/instantiate-runner.mjs <slug> [--title "My Runner"]
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import {
  rewriteProjectResourcesToPack,
  rewriteSnapshotToPack,
} from "./runner-pack.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const titleIdx = args.indexOf("--title");
const title = titleIdx >= 0 ? args[titleIdx + 1] : null;
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: node tools/instantiate-runner.mjs <slug> [--title \"Display Name\"]");
  process.exit(1);
}

const src = path.join(root, "templates", "runner-v1");
const dest = path.join(root, "games", slug);
if (fs.existsSync(dest)) {
  console.error("Refusing to overwrite", dest);
  process.exit(1);
}

function copyFiltered(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (
      entry.name === "build" ||
      entry.name === "export" ||
      entry.name === "README.md" ||
      entry.name === "runtime" ||
      entry.name === "assets" ||
      entry.name === "preview.png"
    ) {
      continue;
    }
    const s = path.join(from, entry.name);
    const d = path.join(to, entry.name);
    if (entry.isDirectory()) copyFiltered(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyFiltered(src, dest);

const oldJson = path.join(dest, "runner-v1.json");
const newJson = path.join(dest, slug + ".json");
if (!fs.existsSync(oldJson)) {
  console.error("Template project missing:", oldJson);
  process.exit(1);
}
fs.renameSync(oldJson, newJson);

const display = title || slug;
const project = JSON.parse(fs.readFileSync(newJson, "utf8"));
project.properties.name = display;
project.properties.description = "Portrait endless runner instantiated from templates/runner-v1.";
project.properties.packageName = "com.plonku." + slug.replace(/-/g, "");
project.properties.projectUuid = crypto.randomUUID();
rewriteProjectResourcesToPack(root, dest, project);
fs.writeFileSync(newJson, JSON.stringify(project, null, 2) + "\n");

for (const snapName of ["default", "wroclaw-v1"]) {
  const snapPath = path.join(dest, "skins", snapName, "resource-files.json");
  if (!fs.existsSync(snapPath)) continue;
  const snap = JSON.parse(fs.readFileSync(snapPath, "utf8"));
  fs.writeFileSync(
    snapPath,
    JSON.stringify(rewriteSnapshotToPack(root, dest, snap), null, 2) + "\n"
  );
}

const readme = `# ${display}

Instantiated from \`templates/runner-v1/\`. Canonical GDevelop file: \`games/${slug}/${slug}.json\`

Do not copy \`games/zombie-runner/\` as the source of truth. Change skins, \`chunks.json\`, and HUD text here. Leave jump/collision events alone unless the template is defective.

\`\`\`text
node tools/gdevelop-web-export.mjs --game games/${slug}
node tools/preview-lan.mjs --game games/${slug}
node tools/sync-chunk-catalog.mjs --game games/${slug}
node tools/apply-skin.mjs default --game games/${slug}
\`\`\`
`;
fs.writeFileSync(path.join(dest, "README.md"), readme);
console.log("Created", dest);
console.log("Project", path.relative(root, newJson));
