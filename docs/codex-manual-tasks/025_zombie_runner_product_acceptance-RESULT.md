# 025 — Zombie Runner Wrocław product acceptance — RESULT

## Status

PASS

## Decision

`ACCEPTED — ready for Plonku integration`

## Validation matrix

| Check | Evidence | Outcome |
| --- | --- | --- |
| 019 brief | `PRODUCT.md` | PASS |
| 020 Wrocław skin | `assets/wroclaw-v1/`, slot apply | PASS |
| 021 session tuning | speed 500, chunks, jump feel | PASS |
| 022 HUD/audio/mute | identity + wav + `U` | PASS |
| 023 phone | Operator LAN play 2026-09-05 `http://192.168.5.71:8765/` | PASS |
| 024 handoff | `HANDOFF.md`, `plonku-handoff.json`, packager | PASS |
| Clean export (chain) | WEB_EXPORT PASS on 022/024 builds | PASS |
| Runner regression (025 re-run) | `RUNNER_REGRESSION: PASS` | PASS |
| 10 retries / start–GO–retry | harness | PASS |
| Skin files in Game loop | `assets/wroclaw-v1/...` | PASS |
| `runner.json` / chunks | versioned config + 9 chunks | PASS |
| No `?dev=1` HUD in normal | harness | PASS |
| No public deploy | this goal | PASS |
| Handoff packager (025 re-run) | `PLONKU_HANDOFF: PASS` `1.0.0+4bd9b04.20260905T1209` | PASS |

## Defects

| Item | Class |
| --- | --- |
| GDevelop resource **names** still say Dino/Desert | non-blocker (files are Wrocław) |
| Intro/Leaderboard layouts remain in JSON, not `firstLayout` | non-blocker / later polish |
| Cut-out art is silhouette, not painted IP | later polish |
| Phone model/OS not recorded | non-blocker |
| Mute on phone is system volume, not an on-canvas button | later polish |
| No Plonku iframe wired on the public site | out of scope (024/025) |

No blockers.

## Release / handoff reference

- Docs: `games/zombie-runner/HANDOFF.md`
- Manifest: `games/zombie-runner/plonku-handoff.json`
- Pack: `node tools/package-plonku-handoff.mjs --game games/zombie-runner`

## Known limitations

Factory clients Traffic Dash / Pigeon Dash are unchanged products. This acceptance is **Zombie Runner — Wrocław** only.

## Commit SHA

Documentation: *(filled after commit)*

## Operator actions required

None. GOAL 004 stops here. Do not start task 026 or Plonku website integration in this task.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
