# 039 — Breakout upstream import and preflight — RESULT

## Status

PASS

## Summary

Imported the official GDevelop Breakout example into `games/breakout-lab/` at a pinned SHA. MIT license is explicit on the examples repo. Export and a headless smoke reach Menu, then Game with paddle, ball and 45 bricks. No Zombie Runner / factory gameplay edits.

## Upstream

| Field | Value |
| --- | --- |
| Repo | `GDevelopApp/GDevelop-examples` |
| Path | `examples/breakout` |
| SHA | `3294639da3a7c8f079304381b4a08877ea42b9de` |
| License | MIT (repo README: all examples MIT unless specified; Breakout does not specify otherwise) |

## Imported paths

- `games/breakout-lab/breakout-lab.json` (renamed from `breakout.json` only)
- `games/breakout-lab/Assets/`
- `games/breakout-lab/PROVENANCE.md`

## Current mechanics (baseline)

| Item | As imported |
| --- | --- |
| Viewport | 1920×1080 landscape |
| Scenes | `Menu` (start), `Game`, `Game(Physics)` |
| Loop | `GameState`: NotStarted → GamePlay → Won / Lost; lives via `Lifes` |
| Controls | Keyboard A/Left, D/Right (TopDown paddle). Menu/replay via cursor-on-object buttons |
| Scoring | Scene `Score`; bricks Block_1/2/3 (15 each on Game) |
| Restart | Replay button / home on GUI; not yet a factory-style in-place reset |

## Demo debt for 040–041

- Landscape desktop demo, not portrait mobile
- GDevelop logo + Kenney-style branded chrome
- Dual Game / Game(Physics) scenes
- Menu + hover button sprites
- Keyboard-first paddle; touch QA is 041
- Resolution comments mention 1440 for ball-out-of-bounds vs 1080 window

## Files changed

- `games/breakout-lab/**` (import)
- `tools/breakout-lab-smoke.mjs`

## Validations

| Check | Outcome |
| --- | --- |
| Provenance SHA + MIT | recorded |
| `node tools/gdevelop-web-export.mjs --game games/breakout-lab` | WEB_EXPORT: PASS |
| `node tools/breakout-lab-smoke.mjs --skip-export` | BREAKOUT_SMOKE: PASS (Menu; Game Paddle=1 Ball=1 Block_1=15) |
| Zombie/factory gameplay | unchanged |
| `git diff --check` | PASS (after commit staging) |

## Known limitations

- Unmodified example; not Plonku-neutral yet (040).
- Smoke replaces scene in JS; does not click the Menu Play button.

## Commit SHA

Implementation: `842e906d339297746bd36f014ede827f5c1b8a60`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
