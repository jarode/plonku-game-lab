import test from "node:test";
import assert from "node:assert/strict";
import { validateRunnerConfig, applyRunnerConfigToProject, HUD_TITLE_EXPR } from "./runner-config.mjs";

const valid = {
  version: 1,
  title: "Probe",
  startPrompt: "Tap or Space to run",
  scorePrefix: "P  ",
  obstacleSpeed: 400,
  obstacleSpawnDelay: 1.2,
};

test("valid runner.json passes", () => {
  assert.deepEqual(validateRunnerConfig(valid), []);
});

test("missing title fails", () => {
  const errors = validateRunnerConfig({ ...valid, title: "" });
  assert.ok(errors.some((e) => e.includes("title")));
});

test("obstacleSpeed out of range fails", () => {
  const errors = validateRunnerConfig({ ...valid, obstacleSpeed: 10 });
  assert.ok(errors.some((e) => e.includes("obstacleSpeed")));
});

test("Polish game over strings land in the dead HUD expr", () => {
  const project = {
    properties: { name: "old" },
    layouts: [
      {
        name: "Game",
        variables: [],
        events: [
          {
            actions: [
              {
                parameters: ["ScoreText", "Text", "=", '"GAME OVER" + NewLine() + "Tap to retry"'],
              },
            ],
          },
        ],
      },
    ],
  };
  applyRunnerConfigToProject(project, {
    ...valid,
    gameOverTitle: "KONIEC GRY",
    gameOverRetry: "Spróbuj jeszcze",
  });
  const expr = project.layouts[0].events[0].actions[0].parameters[3];
  assert.match(expr, /KONIEC GRY/);
  assert.match(expr, /Spróbuj jeszcze/);
});

test("sync writes scene vars and HUD expressions", () => {
  const project = {
    properties: { name: "old" },
    layouts: [
      {
        name: "Game",
        variables: [{ name: "ObstacleSpeed", type: "number", value: 550 }],
        events: [
          {
            actions: [
              {
                parameters: [
                  "ScoreText",
                  "Text",
                  "=",
                  '"Old Title" + NewLine() + "Tap or Space to run"',
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  applyRunnerConfigToProject(project, valid);
  assert.equal(project.properties.name, "Probe");
  const speed = project.layouts[0].variables.find((v) => v.name === "ObstacleSpeed");
  assert.equal(speed.value, 400);
  assert.equal(project.layouts[0].events[0].actions[0].parameters[3], HUD_TITLE_EXPR);
});
