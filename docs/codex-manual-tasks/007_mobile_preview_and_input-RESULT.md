# 007 — Mobile preview and input hardening — RESULT

## Status

PASS

## Tested viewports (Chrome emulation)

| Size | Result |
| --- | --- |
| 390×844 | Portrait playfield; title and “Tap or Space to run” fully visible |
| 360×800 | Same; HUD not clipped |
| 540×960 | Design resolution |

Touch jump (full-screen tap + enlarged JumpButton) unchanged in logic. Keyboard Space still compiled. HUD moved to y=52 for a simple safe area.

## Preview workflow

Documented in `games/zombie-runner/MOBILE-PREVIEW.md`: export, then `node tools/preview-lan.mjs`, open `http://<lan-ip>:8765/` on a phone on the same Wi-Fi. Not a public deploy. Firewall must allow TCP 8765.

## Issues fixed

- Score/title sat too high on a desktop letterbox; now padded from the top.
- Jump control enlarged and placed in the lower-right thumb zone.

## Files changed

- `games/zombie-runner/zombie-runner.json`
- `games/zombie-runner/MOBILE-PREVIEW.md`
- `games/zombie-runner/README.md`
- `tools/preview-lan.mjs`
- `tools/README.md`
- `docs/codex-manual-tasks/007_mobile_preview_and_input-RESULT.md` (this file)

## Validations

Export smoke PASS. Viewport screenshots taken in-session (not committed).

## Known limitations

- No physical phone was used in this session; LAN workflow is documented and the server binds `0.0.0.0`.
- GDevelop watermark can sit on the jump button on some heights.
- `viewport-fit=cover` is whatever the stock HTML5 export emits.

## Commit SHA

Implementation: `ab72d817528fee35e1967664b710fe2ec42ad15f`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
