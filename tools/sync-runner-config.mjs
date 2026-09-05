#!/usr/bin/env node
/**
 * Apply games/<slug>/runner.json onto the GDevelop project.
 * Usage: node tools/sync-runner-config.mjs [--game games/zombie-runner]
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseLabArgs, resolveGameDir, findProjectJson } from "./game-dir.mjs";
import { syncRunnerConfigFile } from "./runner-config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { gameRel } = parseLabArgs(process.argv.slice(2));
const gameDir = resolveGameDir(root, gameRel);
const projectPath = findProjectJson(gameDir);

try {
  const { cfg, applied } = syncRunnerConfigFile(gameDir, projectPath);
  console.log("SYNC_RUNNER_CONFIG: PASS");
  console.log("title", cfg.title);
  console.log("obstacleSpeed", cfg.obstacleSpeed);
  console.log("obstacleSpawnDelay", cfg.obstacleSpawnDelay);
  console.log("scorePrefix", JSON.stringify(cfg.scorePrefix));
  console.log("hudRewrites", applied.hudRewrites);
} catch (err) {
  console.error("SYNC_RUNNER_CONFIG: FAIL");
  console.error(err.message);
  process.exit(1);
}
