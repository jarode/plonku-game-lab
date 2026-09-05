# 023 — Mobile device QA gate — RESULT

## Status

OPERATOR_ACTION_REQUIRED

Automated/browser QA passed. A **physical phone on the LAN was not available to this worker**, so GOAL 004 stops here per the goal file. Do not treat emulation as a phone pass.

## Automated results

| Check | Outcome |
| --- | --- |
| `RUNNER_REGRESSION` 360×800 | PASS |
| `RUNNER_REGRESSION` 390×844 | PASS |
| `RUNNER_REGRESSION` 540×960 | PASS |
| Export (022 chain) | WEB_EXPORT PASS |
| Dev HUD / `?dev=1` / invincibility | Not exposed in normal mode |
| Safe-area layout | Score `y=72`, jump button `y=710` (022) |

Commands:

```text
node tools/runner-regression.mjs --game games/zombie-runner --skip-export --viewport 360x800
node tools/runner-regression.mjs --game games/zombie-runner --skip-export --viewport 390x844
node tools/runner-regression.mjs --game games/zombie-runner --skip-export --viewport 540x960
```

## LAN workflow (operator)

On the PC (GDevelop closed), from repo root:

```text
node tools/gdevelop-web-export.mjs --game games/zombie-runner
node tools/preview-lan.mjs --game games/zombie-runner
```

Default port **8765**. This machine’s LAN IPv4 seen during 023: **192.168.5.71**.

Phone (same Wi-Fi): `http://192.168.5.71:8765/`  
If it fails: allow inbound TCP 8765 on Windows Firewall.

Do **not** add `?dev=1`. Mute: key `U` on desktop; on phone use device volume / silent switch plus confirm loop is the short dusk tones (not desert music).

Leave the server running only while testing; stop it after (it previously left music looping in a desktop tab).

## Exact physical-phone checklist (fill and return)

Device: _model / OS / browser_  
URL used: _http://…:8765/_

| # | Test | Pass? |
| --- | --- | --- |
| 1 | Page loads, Wrocław dusk + zombie (not dino/desert) | |
| 2 | First tap starts the run | |
| 3 | Jump on tap feels immediate | |
| 4 | Hit a hazard → GAME OVER readable | |
| 5 | Tap retries in place (no full reload) | |
| 6 | Score / title not under notch; jump button not under home bar | |
| 7 | Stays portrait / usable if rotated | |
| 8 | Audio: dusk loop + jump/death, or acceptable mute/volume | |

Photo or 10s screen recording of start → death → retry is enough evidence.

After you paste results, re-run task 023 to turn this into PASS (or FAIL with fixes).

## Issues / fixes this session

- `preview-lan.mjs` now serves `.wav` (`audio/wav`) so phone audio is not 404.

## Files changed

- `tools/preview-lan.mjs`
- `tools/runner-regression.mjs` (`--viewport`) — landed with 022 RESULT commit `608047c`
- this RESULT

## Known limitations

- Headless Chrome is not a device. Jump on phone is touch; harness uses GDJS input + `zrSoftReset`.
- Worker did not open a LAN preview in a desktop tab (avoids leftover looping music).

## Commit SHA

`5be655ac117770e4d79d56a1b242b348a4f8c287` (RESULT + `preview-lan` wav MIME). Viewport flag: `608047c`.

## Operator actions required

Complete the phone table above on a real device and return the results. GOAL 004 is **stopped** until then. Do not start 024/025.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
