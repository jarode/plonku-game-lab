# 048 — CITY BREAKER 2012 data → geometry — RESULT

## Status

PASS

## Summary

New mapping `city-breaker-v1`: 8×5 grid, density→occupancy, forest→corridor columns, dwellings→row mass, entities→HP/clusters. Bottom row always empty. Caps 8–28 bricks. `?profile=` loads city boards; `?fixture=` stays GOAL 007. `window.__boFactorDebug` lists each factor’s effect (English keys, no Polish in the generator).

## Files

- `games/breakout-lab/data/city-board-from-factors.mjs`
- `games/breakout-lab/data/CITY-BREAKER-MAPPING.md`
- `games/breakout-lab/data/city-breaker/snapshots/*.json`
- `tools/city-breaker-geometry.test.mjs`
- `tools/patch-breakout-lab.mjs` / `runtime/lab-hooks.js` / `tools/breakout-lab-smoke.mjs`

## Fixture topology (smoke)

| profile | bricks | signature prefix |
| --- | --- | --- |
| dense-spike | 28 | `8336f9ea` |
| green-open | 8 | `48ee1800` |
| balanced-mid | 10 | `da07a685` |

## Validations

| Check | Outcome |
| --- | --- |
| geometry + lab contract tests | PASS |
| `BREAKOUT_SMOKE --viewport 360x800` (lab fixtures + 3 city profiles) | PASS |

## Known limitations

- Lab default boot is still `?fixture=` GOAL 007 `balanced-mid`.
- `ballSpeed` not driving launch force.

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
