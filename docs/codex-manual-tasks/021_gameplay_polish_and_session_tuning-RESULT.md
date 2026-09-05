# 021 — Gameplay polish and session tuning — RESULT

## Status

PASS

## Before / after

| Knob | Before | After |
| --- | --- | --- |
| `obstacleSpeed` | 550 | **500** |
| `obstacleSpawnDelay` | 1.2 | **1.0** |
| First EASY cactus `x` / chunk width | 320 / 720 | **180 / 640** (~1.4 s to the player) |
| MEDIUM pair spacing | ~200 px doubles | **~340–400 px** |
| HARD chunk widths | 960–1040 | **1020–1120** |
| Dino `jumpSpeed` / `gravity` / `jumpSustainTime` | 1500 / 2300 / 0 | **1550 / 2150 / 0.08** |

Pacing math (speed 500, spawn x ≈ 580+hazard.x): first jump window ~1.4 s. EASY trio ~4–5 s, MEDIUM ~5–6 s, HARD readable gaps. Typical death in the 019 **20–35 s** band on a first play (not a TAS).

No shared `templates/runner-v1/runtime` change.

## Validations

| Check | Outcome |
| --- | --- |
| `sync-runner-config` / `sync-chunk-catalog` | PASS |
| `RUNNER_REGRESSION` (includes export) | PASS |
| Traffic Dash / Pigeon Dash | Not modified |

## Files changed

- `games/zombie-runner/runner.json`, `chunks.json`, `zombie-runner.json` (jump feel)
- `games/zombie-runner/GAMEPLAY.md`
- RESULT

## Known limitations

- Session length is estimated from chunk widths/speed, not a 100-run telemetry study.
- `obstacleSpawnDelay` is synced to the scene var; chunk sequencer still drives spawns.

## Commit SHA

Implementation: `75815cb357e387b11c05fbc9072e01977751512a`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
