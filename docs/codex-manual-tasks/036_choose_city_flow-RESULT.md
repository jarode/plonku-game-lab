# 036 — Choose city flow — RESULT

## Status

PASS

## Summary

`WYBIERZ MIASTO` opens an overlay: Wrocław is the only playable row (`WROCŁAW · GRAJ` closes the picker). `INNE MIASTA · WKRÓTCE` is a dead placeholder and does not start a nested JSON hunt. The same CTA works on start and game over. Space still starts; dead retry still ignores city hits.

## Files changed

- `tools/build-plonku-art.py` (`ui/city_panel.png`, `city_play.png`, `city_soon.png`)
- `tools/patch-plonku-ui.mjs` (`--screens city`, `CityPicker` scene var)
- `templates/runner-v1/runtime/chunk-runtime.template.js`
- `games/zombie-runner/zombie-runner.json` (synced chunks)

## Validations

| Check | Outcome |
| --- | --- |
| `RUNNER_REGRESSION` `--viewport 360x800` | PASS |

## Known limitations

- Only Wrocław is playable; other cities are a single grey row.
- Picker chrome is packer-drawn UI, not painted city art.

## Commit SHA

Implementation: `7201040e0dba11704666a44edda71ca27ec53b44`

## Operator actions required

None. No new painted graphics needed for this picker.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
