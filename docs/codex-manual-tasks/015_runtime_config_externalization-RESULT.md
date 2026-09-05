# 015 — Runtime config externalization — RESULT

## Status

PASS

## Before / after customization path

| Setting | Before | After |
| --- | --- | --- |
| Title / Preparing HUD | Nested `ScoreText` expressions + retry JS strings | `runner.json` `title` + `startPrompt` → scene `HudTitle` |
| Obstacle speed | Game scene variable in the huge JSON | `runner.json` `obstacleSpeed` |
| Score HUD prefix | Nested Playing / GAME OVER expressions | `runner.json` `scorePrefix` |
| Spawn delay | Scene variable (string) | `runner.json` `obstacleSpawnDelay` |

Apply: `node tools/sync-runner-config.mjs --game <dir>`. Instantiation writes `runner.json` and applies it.

## Validations

| Check | Outcome |
| --- | --- |
| `node --test tools/runner-config.test.mjs` | 4 pass (happy + missing title + bad speed + apply) |
| Missing `runner.json` | `SYNC_RUNNER_CONFIG: FAIL`, exit 1 |
| `obstacleSpeed: 1` | `SYNC_RUNNER_CONFIG: FAIL`, exit 1 |
| Traffic title/speed round-trip via config only | `properties.name` and `ObstacleSpeed` updated, then restored |
| Zombie `WEB_EXPORT` | PASS |
| Traffic Dash `WEB_EXPORT` | PASS |

## Remaining JSON touchpoints

- `chunks.json` + `sync-chunk-catalog` (catalog still inlined into JsCode)
- Skin manifests / resource files
- Jump, collision, and state-machine events (intentionally not a config schema)
- Unused Intro/Leaderboard scenes

## Files changed

- `tools/runner-config.mjs`, `tools/sync-runner-config.mjs`, `tools/runner-config.test.mjs`
- `tools/instantiate-runner.mjs`, `tools/README.md`
- `games/*/runner.json`, `templates/runner-v1/runner.json`
- Client + template GDevelop JSON (scene vars + HUD expressions + catalog sync)
- `docs/codex-manual-tasks/015_runtime_config_externalization-RESULT.md`

## Known limitations

- First sync rewires HUD expressions to `VariableString(...)`; later title/speed changes do not require editing those expressions.
- Jump height / platformer physics remain GDevelop object behaviors, not `runner.json`.

## Commit SHA

Implementation: `5eb64a553f2f0a682396bd8707e3b9de2481b317`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
