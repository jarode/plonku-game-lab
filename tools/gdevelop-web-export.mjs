#!/usr/bin/env node
/**
 * Reproducible GDevelop HTML5 export + smoke checks.
 *
 * Usage (from repo root):
 *   node tools/gdevelop-web-export.mjs
 *   node tools/gdevelop-web-export.mjs --smoke-only
 *
 * Env:
 *   GDEVELOP_HOME  Directory that contains GDevelop.exe (default: F:\\gry\\GDevelop-5)
 *   GDEVELOP_EXE   Full path to GDevelop.exe (overrides GDEVELOP_HOME)
 *
 * Output: games/zombie-runner/build/  (gitignored; GDevelop default next to the project)
 * Exit 0 = WEB_EXPORT: PASS   Exit 1 = WEB_EXPORT: FAIL
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const DEFAULT_PROJECT = path.join(
  repoRoot,
  "games",
  "zombie-runner",
  "zombie-runner.json"
);
const DEFAULT_EXPORT_DIR = path.join(
  repoRoot,
  "games",
  "zombie-runner",
  "build"
);
const DEFAULT_GDEVELOP_HOME = "F:\\gry\\GDevelop-5";
const EXPORT_TIMEOUT_MS = 180_000;
const SUCCESS_MARK = '[CLI] Command "EXPORT_HTML5_EXTERNAL" finished successfully.';

const args = new Set(process.argv.slice(2));
const smokeOnly = args.has("--smoke-only");
const noClean = args.has("--no-clean");

function fail(message, extra) {
  console.error("WEB_EXPORT: FAIL");
  console.error(message);
  if (extra) console.error(extra);
  process.exit(1);
}

function resolveGdevelopExe() {
  if (process.env.GDEVELOP_EXE) return process.env.GDEVELOP_EXE;
  const home = process.env.GDEVELOP_HOME || DEFAULT_GDEVELOP_HOME;
  return path.join(home, "GDevelop.exe");
}

function extractQuotedPaths(html, attr) {
  const re = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "gi");
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function smokeExport({ projectPath, exportDir }) {
  const checks = [];
  const record = (name, ok, detail) => {
    checks.push({ name, ok, detail: detail || "" });
    const tag = ok ? "  PASS" : "  FAIL";
    console.log(`${tag}  ${name}${detail ? ` — ${detail}` : ""}`);
  };

  if (!fs.existsSync(exportDir) || !fs.statSync(exportDir).isDirectory()) {
    record("export directory exists", false, exportDir);
    return { ok: false, checks };
  }
  record("export directory exists", true, exportDir);

  const indexPath = path.join(exportDir, "index.html");
  const indexOk = fs.existsSync(indexPath);
  record("index.html exists", indexOk, indexPath);
  if (!indexOk) return { ok: false, checks };

  const html = fs.readFileSync(indexPath, "utf8");
  const refs = [
    ...extractQuotedPaths(html, "src"),
    ...extractQuotedPaths(html, "href"),
  ].filter((ref) => ref && !/^https?:/i.test(ref) && !ref.startsWith("data:"));

  const missingRefs = [];
  for (const ref of refs) {
    const resolved = path.normalize(path.join(exportDir, ref.split("?")[0]));
    if (!fs.existsSync(resolved)) missingRefs.push(ref);
  }
  record(
    "index.html referenced files exist",
    missingRefs.length === 0,
    missingRefs.length ? missingRefs.slice(0, 12).join(", ") : `${refs.length} refs`
  );

  const runtimeMust = ["gd.js", "data.js", "runtimegame.js", "runtimescene.js"];
  const missingRuntime = runtimeMust.filter(
    (name) => !fs.existsSync(path.join(exportDir, name))
  );
  record(
    "GDJS runtime files present",
    missingRuntime.length === 0,
    missingRuntime.length ? missingRuntime.join(", ") : runtimeMust.join(", ")
  );

  const codeFiles = fs
    .readdirSync(exportDir)
    .filter((name) => /^code\d+\.js$/i.test(name));
  record(
    "generated scene code present",
    codeFiles.length >= 1,
    codeFiles.join(", ") || "none"
  );

  const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
  const resources = project.resources?.resources || [];
  const missingAssets = [];
  for (const resource of resources) {
    if (!resource.file) continue;
    const base = path.basename(resource.file);
    if (!fs.existsSync(path.join(exportDir, base))) missingAssets.push(base);
  }
  record(
    "project resource files copied into export",
    missingAssets.length === 0,
    missingAssets.length
      ? `${missingAssets.length} missing (e.g. ${missingAssets.slice(0, 8).join(", ")})`
      : `${resources.length} resources`
  );

  const ok = checks.every((c) => c.ok);
  return { ok, checks };
}

function runGdevelopExport(exe, projectPath) {
  return new Promise((resolve, reject) => {
    const childArgs = [
      "--disable-update-check",
      "--run-command",
      "EXPORT_HTML5_EXTERNAL",
      projectPath,
    ];
    console.log(`Running: ${exe} ${childArgs.join(" ")}`);
    const child = spawn(exe, childArgs, {
      cwd: repoRoot,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      stdout += text;
      process.stdout.write(text);
    });
    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });
    const timer = setTimeout(() => {
      child.kill();
      reject(
        new Error(`GDevelop export timed out after ${EXPORT_TIMEOUT_MS}ms`)
      );
    }, EXPORT_TIMEOUT_MS);
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

async function main() {
  const projectPath = DEFAULT_PROJECT;
  const exportDir = DEFAULT_EXPORT_DIR;

  if (!fs.existsSync(projectPath)) {
    fail(`Project not found: ${projectPath}`);
  }

  if (!smokeOnly) {
    const exe = resolveGdevelopExe();
    if (!fs.existsSync(exe)) {
      fail(
        `GDevelop executable not found: ${exe}`,
        "Set GDEVELOP_EXE or GDEVELOP_HOME. Close a running GDevelop window before CLI export (otherwise the command may not wait for a real result)."
      );
    }
    if (!noClean && fs.existsSync(exportDir)) {
      try {
        fs.rmSync(exportDir, { recursive: true, force: true });
        console.log(`Cleaned ${exportDir}`);
      } catch (err) {
        const code = err && err.code;
        if (code === "EPERM" || code === "EBUSY" || code === "ENOTEMPTY") {
          console.warn(
            `Could not delete ${exportDir} (${code}); exporting over the existing folder.`
          );
        } else {
          throw err;
        }
      }
    }
    const { code, stdout, stderr } = await runGdevelopExport(exe, projectPath);
    const combined = `${stdout}\n${stderr}`;
    if (code !== 0) {
      fail(`GDevelop exited with code ${code}`);
    }
    if (!combined.includes(SUCCESS_MARK)) {
      fail(
        "GDevelop exited 0 but the CLI success marker was not found in output.",
        `Expected: ${SUCCESS_MARK}`
      );
    }
    console.log("Export process: PASS");
  }

  const smoke = smokeExport({ projectPath, exportDir });
  if (!smoke.ok) fail("Smoke validation failed.");

  console.log("WEB_EXPORT: PASS");
  console.log(`outputDir: ${exportDir}`);
}

main().catch((err) => fail(err.message || String(err)));
