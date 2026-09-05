# 023 — Mobile device QA gate — RESULT

## Status

PASS

Automated QA plus operator physical-phone confirmation on the LAN preview.

## Automated results

| Check | Outcome |
| --- | --- |
| `RUNNER_REGRESSION` 360×800 | PASS |
| `RUNNER_REGRESSION` 390×844 | PASS |
| `RUNNER_REGRESSION` 540×960 | PASS |
| Export | WEB_EXPORT PASS (prior chain) |
| Dev HUD / `?dev=1` / invincibility | Not exposed in normal mode |

## Physical device

| Field | Evidence |
| --- | --- |
| Date | 2026-09-05 |
| URL | `http://192.168.5.71:8765/` (no `?dev=1`) |
| LAN serve | `node tools/preview-lan.mjs --game games/zombie-runner` |
| Operator | Confirmed playable on a real phone on the same Wi-Fi (“działa”) |

Checklist 1–8 from the OAR gate (load, first tap, jump, game-over, in-place retry, readable UI, orientation usable, audio/volume) treated as **pass** on that session. Device model/OS not recorded.

## LAN workflow

```text
node tools/gdevelop-web-export.mjs --game games/zombie-runner
node tools/preview-lan.mjs --game games/zombie-runner
```

Phone: `http://<pc-lan-ip>:8765/` — this lab PC was `192.168.5.71`. Firewall: inbound TCP 8765.

## Files changed

- `tools/preview-lan.mjs` (`.wav` MIME) — earlier 023 commit
- `tools/runner-regression.mjs` (`--viewport`)
- this RESULT (OAR → PASS after operator evidence)

## Known limitations

- Phone make/model not written down.
- Headless regression still uses `zrSoftReset` for Dead retry, not OS touch.

## Commit SHA

OAR snapshot: `5be655ac117770e4d79d56a1b242b348a4f8c287`. This PASS update: `78c80dcea87bc37a068972eeae56e8bc82b5b80f`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
