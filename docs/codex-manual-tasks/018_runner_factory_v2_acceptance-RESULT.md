# 018 — Runner Factory v2 acceptance — RESULT

## Status

PASS

## Three-client validation (018 re-check)

| Client | Path | WEB_EXPORT (prior in-chain) | RUNNER_REGRESSION (this task, `--skip-export` on existing `build/`) | Slots v2 | Shared pack | `runner.json` |
| --- | --- | --- | --- | --- | --- | --- |
| Zombie Runner | `games/zombie-runner` | PASS (016) | **PASS** | `wroclaw-v1` | yes (0 local `assets/`) | yes |
| Traffic Dash | `games/traffic-dash` | PASS (016) | **PASS** | `traffic-v1` | yes | yes |
| Pigeon Dash | `games/pigeon-dash` | PASS (017) | **PASS** | `pigeon-v1` | yes | yes |

All three are 2D one-input HTML5 runners. HYBRID from 012 stands: this factory is not a Godot 3D/sim replacement.

## Before / after vs GOAL 002

| Bottleneck (012) | GOAL 002 | GOAL 003 now |
| --- | --- | --- |
| Reskin friction | GDevelop resource names | Slot ids + fail-closed `apply-skin` (013) |
| Binary duplication | ~90 files copied per instance | Shared `templates/runner-v1/assets/`; clients **0** placeholder binaries (014, 017) |
| Nested JSON for title/speed | Hand-edit event strings / scene vars | `runner.json` + `sync-runner-config` (015) |
| Regression | Manual; retry bug slipped through | `RUNNER_REGRESSION: PASS\|FAIL` + fail fixture (016) |
| Third independent proof | Missing | Pigeon Dash, factory-only, 74 ms instantiate, ~3.2 s to first export PASS (017) |

## Remaining bottlenecks

| Item | Classification |
| --- | --- |
| Export still copies ~79 resources into each `build/` | Acceptable for runner-v1/v2 (portable HTML5) |
| Jump/collision still live in GDevelop events | Acceptable; not a universal engine |
| Headless Dead-retry uses `window.__zrSoftReset` (OS keys flaky) | Acceptable for CI; physical phone still required for touch QA |
| Placeholder pack art (desert dino) on themed clients | Next product work (art/IP), not factory v3 |
| Unused Intro/Leaderboard scenes in the seed | Acceptable leftover / later cleanup |
| 3D, simulation, rich camera | Engine limitation — use Godot (012 HYBRID) |

## Recommendation

**Use Runner Factory v2 for a real Plonku game.**

013–017 closed the factory gaps that 012 measured. A fourth “hardening” goal would mostly polish process, not unblock shipping. The scarce inputs are now original art, a distinct hook, and a physical-device pass — not another slot/config/regression layer.

Do not start that product in this task.

## Files changed

- `docs/codex-manual-tasks/018_runner_factory_v2_acceptance-RESULT.md`

## Commit SHA

Documentation: `7ad83c65465887ff9338e205b42711c17ea7140a`

## Operator actions required

None. GOAL 003 stops here. No task 019.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
