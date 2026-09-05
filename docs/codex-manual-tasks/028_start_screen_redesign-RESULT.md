# 028 — Start screen redesign — RESULT

## Status

PASS

## Summary

Zombie Runner now opens on a Plonku start overlay: stacked title, `WROCŁAW` tag, experiment line, `JAK TO DZIAŁA?` hint, branding/coords, primary `ROZPOCZNIJ GRĘ`, secondary `WYBIERZ MIASTO` (placeholder). Play starts from the lime CTA or Space (harness). City button does not start the run.

## Files changed

- `tools/generate-plonku-ui.py`, `tools/patch-plonku-ui.mjs`
- `games/zombie-runner/assets/wroclaw-v1/ui/*` (start + later HUD/GO sprites generated, only start wired)
- `games/zombie-runner/zombie-runner.json` (`UiStart`, `StartCta`, `CityCta`; Preparing mouse target)
- `templates/runner-v1/runtime/chunk-runtime.template.js` (`zrSyncPlonkuUi`)

## Validations

| Check | Outcome |
| --- | --- |
| `WEB_EXPORT` via regression | PASS |
| `RUNNER_REGRESSION` `--viewport 360x800` | PASS |

## Known limitations

- HUD and game-over panels exist as PNGs but are not shown until 029/030.
- `WYBIERZ MIASTO` is visual only (GOAL 006 / 036).
- Arial Bold used on UI bitmaps so Polish glyphs (`Ł`) render; in-game `ScoreText` still uses Nathaniel.

## Commit SHA

Implementation: `602cebe4373f65a8ee65930004bcf58058a1513f`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
