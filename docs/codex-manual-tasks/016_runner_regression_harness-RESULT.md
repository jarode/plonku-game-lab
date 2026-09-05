# 016 — Runner regression harness — RESULT

## Status

PASS

## Commands

```text
node tools/runner-regression.mjs --game games/zombie-runner
node tools/runner-regression.mjs --game games/traffic-dash
node tools/runner-regression.mjs --game tools/fixtures/runner-regression-fail
```

Signal: `RUNNER_REGRESSION: PASS|FAIL` (exit 1 on FAIL). Default run includes HTML5 export. `--skip-export` is for iteration after a known-good `build/`.

## Positive evidence

| Client | Result |
| --- | --- |
| Zombie Runner | **RUNNER_REGRESSION: PASS** (export + 10 in-place retries) |
| Traffic Dash | **RUNNER_REGRESSION: PASS** |

Checks: Preparing→Playing (Space via GDJS InputManager), cactus overlap→Dead, 10× `zrSoftReset` without URL change, score 0, hazard counts 0, no `?dev=1`, DevMode/Invincible 0, no `DEV I=inv` HUD text, portrait 540×960, `runner.json` + resource files exist.

## Negative evidence

`tools/fixtures/runner-regression-fail` (`obstacleSpeed: 1`) → **RUNNER_REGRESSION: FAIL**, exit 1.

## Files changed

- `tools/runner-regression.mjs`
- `tools/fixtures/runner-regression-fail/runner.json`
- `templates/runner-v1/runtime/chunk-runtime.template.js` (`window.__zrSoftReset` test hook)
- synced client/template Game JsCode
- `tools/README.md`
- `docs/codex-manual-tasks/016_runner_regression_harness-RESULT.md`

## Known limitations / phone

- Headless Chrome does not reliably deliver OS key events into GDJS `wasKeyJustPressed` for Dead retry; the harness calls the same `zrSoftReset` the Space/R handlers use.
- Does not prove real-device touch latency, notch/safe-area, or thermal throttling.
- Does not replace a physical phone pass for store submission.

## Commit SHA

Implementation: `dc837b400e40c78c973cb8ce0c1e60942eb7eeea`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
