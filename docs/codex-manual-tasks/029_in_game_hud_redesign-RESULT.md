# 029 — In-game HUD redesign — RESULT

## Status

PASS

## Summary

Playing HUD is a framed lime score box plus `WROCŁAW` / `FAKTY` tags. `ScoreText` sits inside the box (off-white, 28px). Start overlay hides during play. Jump layer `TouchButtons` is visible so the jump control is not buried.

## Files changed

- `games/zombie-runner/zombie-runner.json` (`UiHud`, ScoreText position/color, TouchButtons visible)

## Validations

| Check | Outcome |
| --- | --- |
| `RUNNER_REGRESSION` `--viewport 360x800` | PASS |

## Known limitations

- Live score is still the time integer with prefix `WYNIK` from `runner.json`.
- Jump control uses the existing Wrocław button art until 031.

## Commit SHA

Implementation: `e0f059d2f968a483ae5d1bb62d47f82f0d217469`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
