#!/usr/bin/env node
/**
 * Copy a clean GDevelop HTML5 export into dist/plonku-handoff/<slug>/.
 * Usage: node tools/package-plonku-handoff.mjs [--game games/zombie-runner] [--skip-export]
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { flags, gameRel } = parseLabArgs(process.argv.slice(2));
const gameDir = resolveGameDir(root, gameRel);
const skipExport = flags.has("--skip-export");

function fail(msg) {
  console.error("PLONKU_HANDOFF: FAIL");
  console.error(msg);
  process.exit(1);
}

const contractPath = path.join(gameDir, "plonku-handoff.json");
if (!fs.existsSync(contractPath)) fail("missing plonku-handoff.json in " + gameDir);
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
if (contract.schema !== "plonku-web-handoff/v1") fail("unsupported schema");
if (!contract.slug || !contract.entryFile) fail("slug/entryFile required");

if (!skipExport) {
  const exp = spawnSync(
    process.execPath,
    ["tools/gdevelop-web-export.mjs", "--game", gameRel],
    { cwd: root, encoding: "utf8" }
  );
  if (exp.status !== 0 || !String(exp.stdout).includes("WEB_EXPORT: PASS")) {
    fail(exp.stderr || exp.stdout || "export failed");
  }
}

const buildDir = path.join(gameDir, "build");
const indexPath = path.join(buildDir, contract.entryFile);
if (!fs.existsSync(indexPath)) fail("missing " + indexPath);

const html = fs.readFileSync(indexPath, "utf8");
if (!/src="gd\.js"|src='gd\.js'/.test(html)) fail("index.html does not load relative gd.js");
const absApp = [...html.matchAll(/\s(?:src|href)=["'](\/[^"']+)["']/gi)].map((m) => m[1]);
if (absApp.length) fail("root-absolute asset URLs are not embed-safe: " + absApp.slice(0, 5).join(", "));

const git = spawnSync("git", ["rev-parse", "--short", "HEAD"], { cwd: root, encoding: "utf8" });
const sha = (git.stdout || "unknown").trim();
const buildId = `${contract.version}+${sha}.${new Date().toISOString().replace(/[-:]/g, "").slice(0, 13)}`;

const outDir = path.join(root, contract.handoffOutputDir || path.join("dist", "plonku-handoff", contract.slug));
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(path.dirname(outDir), { recursive: true });
fs.cpSync(buildDir, outDir, { recursive: true });

const embed = {
  ...contract,
  buildId,
  packagedAt: new Date().toISOString(),
  gitSha: sha,
};
fs.writeFileSync(path.join(outDir, "plonku-embed.json"), JSON.stringify(embed, null, 2) + "\n");

const packedIndex = path.join(outDir, contract.entryFile);
if (!fs.existsSync(packedIndex)) fail("package missing entry file");

console.log("PLONKU_HANDOFF: PASS");
console.log("out", path.relative(root, outDir));
console.log("buildId", buildId);
