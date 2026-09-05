# 035 — Score meaning and data framing — RESULT

## Status

PASS

## Summary

The integer is **seconds survived this run** (arcade clock, not open data). Start helper: `Przetrwaj Wrocław. Wynik = sekundy w mieście.` HUD tag `SEK`. Game-over line: `Liczba = sekundy w tym mieście.` `WYNIK` remains the numeral label per NAMING.md.

## Files changed

- `games/zombie-runner/runner.json`, `COPY.md`, `zombie-runner.json` (HudTitle)
- `tools/build-plonku-art.py` + `ui/hud_bar.png`, `ui/go_panel.png`

## Validations

| Check | Outcome |
| --- | --- |
| `node --test tools/runner-config.test.mjs` | 5 pass |
| `SYNC_RUNNER_CONFIG` | PASS |

## Known limitations

- No live APIs. Tag `SEK` is a hint; the number is still the factory time score.

## Commit SHA

Implementation: `9dcd7e4102c76c334c01615d5c11ede6f9ae5554`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
