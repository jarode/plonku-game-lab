# 047 — CITY BREAKER 2012 data contract + fixtures — RESULT

## Status

PASS

## Summary

Adapter `cityProfileToBoardInput` maps four approved normalized factors onto GOAL 007 `{ id, values }` (length 4, order locked). Six offline fixtures. Missing/`null` factors fail closed. No new data source, no network, no geometry formulas.

## Files changed

- `games/breakout-lab/data/city-profile-adapter.mjs`
- `games/breakout-lab/data/CITY-BREAKER-CONTRACT.md`
- `games/breakout-lab/data/city-breaker/fixtures/*.json` (6)
- `games/breakout-lab/data/city-breaker/invalid/*.json`
- `tools/city-breaker-contract.test.mjs`

## Validations

| Check | Outcome |
| --- | --- |
| `node --test tools/city-breaker-contract.test.mjs tools/breakout-board-contract.test.mjs` | 13 pass |
| Lab `data/fixtures` unchanged (043 smoke) | Yes |

## Known limitations

- Geometry still the 007 per-column mapper until 048.
- `low-edge` `[0,0,0,0]` is valid input; playability transform is 048.

## Commit SHA

Implementation: `2fc6d2d1c566302c435efef1167a54cc1aa8827f`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
