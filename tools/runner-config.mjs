/**
 * Versioned per-game runner.json → GDevelop scene vars + HUD expressions.
 */
import fs from "node:fs";
import path from "node:path";

export const RUNNER_CONFIG_VERSION = 1;

export const HUD_TITLE_EXPR = "VariableString(HudTitle)";
export const SCORE_PLAYING_EXPR =
  "VariableString(ScorePrefix) + GlobalVariableString(Score)";
export const SCORE_DEAD_EXPR =
  '"GAME OVER" + NewLine() + "Tap to retry" + NewLine() + VariableString(ScorePrefix) + GlobalVariableString(Score)';

export function runnerConfigPath(gameDir) {
  return path.join(gameDir, "runner.json");
}

export function validateRunnerConfig(cfg) {
  const errors = [];
  if (!cfg || typeof cfg !== "object" || Array.isArray(cfg)) {
    return ["runner.json must be an object"];
  }
  if (cfg.version !== RUNNER_CONFIG_VERSION) {
    errors.push(`version must be ${RUNNER_CONFIG_VERSION}`);
  }
  if (typeof cfg.title !== "string" || !cfg.title.trim()) {
    errors.push("title must be a non-empty string");
  } else if (cfg.title.length > 80) {
    errors.push("title must be at most 80 characters");
  }
  if (typeof cfg.startPrompt !== "string" || !cfg.startPrompt.trim()) {
    errors.push("startPrompt must be a non-empty string");
  }
  if (typeof cfg.scorePrefix !== "string") {
    errors.push("scorePrefix must be a string");
  }
  const speed = cfg.obstacleSpeed;
  if (typeof speed !== "number" || !Number.isFinite(speed) || speed < 80 || speed > 2000) {
    errors.push("obstacleSpeed must be a number in [80, 2000]");
  }
  const delay = cfg.obstacleSpawnDelay;
  if (typeof delay !== "number" || !Number.isFinite(delay) || delay < 0.2 || delay > 5) {
    errors.push("obstacleSpawnDelay must be a number in [0.2, 5]");
  }
  return errors;
}

export function loadRunnerConfig(gameDir) {
  const file = runnerConfigPath(gameDir);
  if (!fs.existsSync(file)) {
    throw Object.assign(new Error("runner.json missing"), { code: "RUNNER_CONFIG_MISSING" });
  }
  let cfg;
  try {
    cfg = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    throw Object.assign(new Error("runner.json is not valid JSON"), { code: "RUNNER_CONFIG_INVALID" });
  }
  const errors = validateRunnerConfig(cfg);
  if (errors.length) {
    const err = new Error(errors.join("; "));
    err.code = "RUNNER_CONFIG_INVALID";
    err.errors = errors;
    throw err;
  }
  return cfg;
}

export function hudTitleFromConfig(cfg) {
  return `${cfg.title.trim()}\n${cfg.startPrompt.trim()}`;
}

function setSceneVar(layout, name, type, value) {
  layout.variables = layout.variables || [];
  let entry = layout.variables.find((v) => v.name === name);
  if (!entry) {
    entry = { name, type, value };
    layout.variables.push(entry);
  } else {
    entry.type = type;
    entry.value = value;
  }
}

function walkEvents(events, visit) {
  if (!events) return;
  for (const event of events) {
    visit(event);
    walkEvents(event.events, visit);
  }
}

function rewriteScoreTextExpressions(layout) {
  let changed = 0;
  walkEvents(layout.events, (event) => {
    for (const action of event.actions || []) {
      const params = action.parameters;
      if (!params || params[0] !== "ScoreText") continue;
      const expr = params[3];
      if (typeof expr !== "string") continue;
      let next = null;
      if (expr.includes("GAME OVER") || expr.includes("SCORE_DEAD") || expr.includes(SCORE_DEAD_EXPR)) {
        next = SCORE_DEAD_EXPR;
      } else if (
        expr.includes("Tap or Space") ||
        expr.includes("HudTitle") ||
        expr.includes("NewLine()")
      ) {
        next = HUD_TITLE_EXPR;
      } else if (expr.includes("GlobalVariableString(Score)")) {
        next = SCORE_PLAYING_EXPR;
      }
      if (next && expr !== next) {
        params[3] = next;
        changed += 1;
      }
    }
  });
  return changed;
}

export function applyRunnerConfigToProject(project, cfg) {
  const game = project.layouts?.find((l) => l.name === "Game");
  if (!game) {
    throw new Error("Game layout missing");
  }
  project.properties = project.properties || {};
  project.properties.name = cfg.title.trim();
  setSceneVar(game, "ObstacleSpeed", "number", cfg.obstacleSpeed);
  setSceneVar(game, "ObstacleSpawnDelay", "string", String(cfg.obstacleSpawnDelay));
  setSceneVar(game, "HudTitle", "string", hudTitleFromConfig(cfg));
  setSceneVar(game, "ScorePrefix", "string", cfg.scorePrefix);
  const hudRewrites = rewriteScoreTextExpressions(game);
  return { hudRewrites };
}

export function syncRunnerConfigFile(gameDir, projectPath) {
  const cfg = loadRunnerConfig(gameDir);
  const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
  const applied = applyRunnerConfigToProject(project, cfg);
  fs.writeFileSync(projectPath, JSON.stringify(project, null, 2) + "\n");
  return { cfg, applied };
}

export function defaultRunnerConfig({ title, obstacleSpeed = 550, scorePrefix = "" }) {
  return {
    version: 1,
    title,
    startPrompt: "Tap to run · U mutes audio",
    scorePrefix,
    obstacleSpeed,
    obstacleSpawnDelay: 1.2,
  };
}
