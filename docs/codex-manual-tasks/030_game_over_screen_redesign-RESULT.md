# 030 — Game over screen redesign — RESULT

## Status

PASS

## Summary

Dead state shows a framed Plonku panel (`KONIEC GRY`, `TWÓJ WYNIK`, microcopy, coords) with lime `SPRÓBUJ JESZCZE` and the same `WYBIERZ MIASTO` placeholder. `GoScore` mirrors the global score. Retry is still `zrSoftReset` (Space / R / click except city CTA). Ten in-place retries passed.

## Files changed

- `games/zombie-runner/zombie-runner.json` (`UiGo`, `GoRetry`, `GoScore`)

## Validations

| Check | Outcome |
| --- | --- |
| `RUNNER_REGRESSION` `--viewport 360x800` (10 retries) | PASS |

## Known limitations

- Change-city remains a no-op until GOAL 006 / 036.
- Mini-stats (time / hazards / chunks) not added; score + microcopy stay readable on 360-wide.

## Commit SHA

Implementation: `acf00ce54784910eeba9d893bbb6186b41d1bcee`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
