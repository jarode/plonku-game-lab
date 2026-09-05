# 037 — Final mobile readability & interaction pass — RESULT

## Status

PASS

## Summary

Start / city / soon / play rows are at least **80px** tall. Start and city CTAs have a clearer gap. HUD stays at the top (`y=8`, 96px); jump remains `170×170` at `(350, 710)` on the TouchButtons layer — no overlap with HUD or city picker. City CTA hides while the picker is open so the overlay is the only city chrome.

## Files changed

- `tools/patch-plonku-ui.mjs`, `tools/build-plonku-art.py` (`cta_city.png`, `city_soon.png`)
- `templates/runner-v1/runtime/chunk-runtime.template.js`
- `games/zombie-runner/zombie-runner.json`

## Validations

| Check | Outcome |
| --- | --- |
| `RUNNER_REGRESSION` `--viewport 360x800` | PASS |
| `--viewport 390x844 --skip-export` | PASS |
| `--viewport 540x960 --skip-export` | PASS |

## Known limitations

- No physical phone pass; harness viewports only.
- Game canvas is still 540×960 letterboxed into the viewport.

## Commit SHA

Implementation: `a5d84b00b7cd4cc75387f6b844b2dc7eaccb794d`

## Operator actions required

None. No new painted graphics; chrome was packer-drawn.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
