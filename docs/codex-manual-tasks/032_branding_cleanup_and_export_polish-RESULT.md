# 032 — Branding cleanup and export polish — RESULT

## Status

PASS

## Summary

HTML5 product metadata is Plonku: title `Zombie Survival Score`, package `com.plonku.zombierunner`, new description. `showWatermark: false`, `showGDevelopSplash: false`, navy/lime loading bar. Visible jump button and unused duck frames now point at `wroclaw-v1` files (snapshot updated so apply-skin does not restore desert dino pixels). Export `index.html` has no “Made with GDevelop” string; `data.js` confirms watermark/splash off.

## Files changed

- `games/zombie-runner/zombie-runner.json`
- `games/zombie-runner/skins/wroclaw-v1/resource-files.json`
- `games/zombie-runner/plonku-handoff.json`

## Validations

| Check | Outcome |
| --- | --- |
| `RUNNER_REGRESSION` `--viewport 360x800` | PASS |
| `showWatermark` / `showGDevelopSplash` in export | false / false |
| `Made with GDevelop` in `build/index.html` | absent |
| Visible Game-loop sprites using desert pack files | none (duck remapped) |

## Known limitations

- GDevelop still ships `runtimewatermark.js` in the export; it does not display when `showWatermark` is false.
- Tutorial layouts may still name Desert resources; they are not `firstLayout`.
- Export `theme-color` remains GDevelop default `#000000`.

## Commit SHA

Implementation: `5f94b2a8dbe6c6a24963106304cab9623ebc5365`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
