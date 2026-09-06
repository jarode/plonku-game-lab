# 046 — CITY BREAKER 2012 product brief + data boundary — RESULT

## Status

PASS

## Summary

Locked **CITY BREAKER 2012** as a Polish-first Breakout product: city **profile → four VGE factors → board geometry**, not a runner reskin and not 2012 historical data. Canonical brief: `games/breakout-lab/PRODUCT.md`. No gameplay/API/art implementation in this task.

## Files changed

- `games/breakout-lab/PRODUCT.md`
- `games/breakout-lab/README.md` (pointer)
- `docs/codex-manual-tasks/046_city_breaker_2012_product_brief-RESULT.md`

## Identity vs Zombie Runner

Different mechanic (paddle/ball vs endless runner) and different data role (level topology vs difficulty/label).

## Data boundary

Exactly four approved factors, order `values[0..3]`: population density, forest cover share, dwellings/1000, registered entities/1000. Length-4 v1. No live API. `2012` is styling only.

## QA archetypes

`dense-urban`, `green-open`, `mixed-spike` (plus 047 edge/balanced fixtures).

## Validations

| Check | Outcome |
| --- | --- |
| Playbook + GOAL 007/039–045 + lab `BOARD-CONTRACT.md` / `GAMESTATE.md` / `CONTROLS.md` | Read |
| Implementation-ready brief (hook, thumb, session, score, retry, claims, IP, 4 factors) | Yes |
| No live API / no art / no geometry formulas | Yes |

## Known limitations

- Product portrait 9:16 is locked for 050; current export is still landscape lab.
- Exact geometry formulas deferred to 048.

## Commit SHA

Implementation: `PENDING`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
