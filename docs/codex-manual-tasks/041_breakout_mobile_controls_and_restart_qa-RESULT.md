# 041 — Breakout mobile controls and restart QA — RESULT

## Status

PASS

## Summary

Paddle follows pointer/touch X while `NotStarted` or `GamePlay`. Keyboard A/D kept. Canvas `touch-action: none`. Orientation stays **landscape 1920×1080** (portrait letterboxes; not forced to 9:16). Ten start/play/fail/restart cycles passed at 360×800, 390×844, and 540×960 (Chrome mobile metrics, not a physical phone).

## Control contract

`games/breakout-lab/CONTROLS.md`

## Preview

```text
node tools/preview-lan.mjs --game games/breakout-lab
```

`http://<lan-ip>:8765/`

## Validations

| Check | Outcome |
| --- | --- |
| WEB_EXPORT | PASS |
| smoke `--viewport 360x800` 10 restarts | PASS |
| `--viewport 390x844` | PASS |
| `--viewport 540x960` | PASS |

## Known limitations

- Physical phone not run (allowed).
- Brick layout still random per restart.
- Example Replay button still `replace` without clear; lab **R** / smoke uses clear-stack.

## Commit SHA

Implementation: `6d6b6ef720f3831a73d10e7f60e23e67e82dfb3a`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
