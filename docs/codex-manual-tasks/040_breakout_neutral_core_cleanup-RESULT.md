# 040 — Breakout neutral core cleanup — RESULT

## Status

PASS

## Summary

Lab boots straight into `Game` (Menu/Physics bypassed). GDevelop splash/watermark off; logo and Home parked off-canvas. **R** / `SceneStack.replace("Game", true)` restarts without a page reload. Scene `GameState` is the explicit contract (`NotStarted` / `GamePlay` / `Lost` / `Won`).

## State contract

See `games/breakout-lab/GAMESTATE.md`.

## Files changed

- `games/breakout-lab/breakout-lab.json` (firstLayout, identity, hooks)
- `games/breakout-lab/runtime/lab-hooks.js`
- `games/breakout-lab/GAMESTATE.md`
- `tools/patch-breakout-lab.mjs`
- `tools/breakout-lab-smoke.mjs` (start → play → fail → restart ×2)

## Validations

| Check | Outcome |
| --- | --- |
| `WEB_EXPORT` `--game games/breakout-lab` | PASS |
| `BREAKOUT_SMOKE` start/play/fail/restart ×2 | PASS (one ball, score 0, lives 3; bricks 72 then 90 = random `BrickLayout1–5`, not runaway) |
| Topic art/copy | none added |

## Known limitations

- Menu and `Game(Physics)` still exist in the JSON, unused by lab boot.
- Brick counts differ per restart because the example picks `BrickLayout`+`RandomInRange(1,5)`.
- Paddle is still keyboard A/D; touch is 041.
- Replay button still uses the example `Scene` action (clear=false); lab restart path is **R** / `__boSoftReset`.

## Commit SHA

Implementation: `a4a4d998fd83a87e1e7eabfa4a571a1c0cb83109`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
