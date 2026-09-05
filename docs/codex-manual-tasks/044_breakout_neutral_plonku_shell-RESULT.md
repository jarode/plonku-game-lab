# 044 — Neutral Plonku visual shell — RESULT

## Status

PASS

## Summary

Navy playfield, lime / hot pink / cyan framed HUD (`BREAKOUT LAB`, `DATA PROFILE`, score/lives). Start copy is `LAUNCH` plus a short move/launch hint. Fail/win strings are `SIGNAL LOST` / `BOARD CLEAR`. Overlay does not steal pointer events. Blocks stay generic bricks. No city/topic/public-data claims.

## Evidence

Screenshot (letterboxed 360×800): `docs/codex-manual-tasks/evidence/044-breakout-shell.png`

Contract: `games/breakout-lab/SHELL.md`

## Fixture regression

Same five signatures/brick counts as 043; invalid fixture fallback unchanged. Smoke PASS at 360×800 (with export), 390×844, 540×960.

## Validations

| Check | Outcome |
| --- | --- |
| WEB_EXPORT + `BREAKOUT_SMOKE --viewport 360x800 --shot` | PASS |
| `--skip-export --viewport 390x844` | PASS |
| `--skip-export --viewport 540x960` | PASS |
| Topic art/copy | none |

## Known limitations

- Portrait phones still letterbox the 1920×1080 table (intentional from 041).
- Kenney brick sprites unchanged (neutral tiles, not a theme).
- Overlay sits on the HTML canvas parent, so it is outside the GDevelop scene graph.

## Commit SHA

Implementation: `c936c5ee73117cbf46fd41c1c34a9a3eceb6fd29`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
