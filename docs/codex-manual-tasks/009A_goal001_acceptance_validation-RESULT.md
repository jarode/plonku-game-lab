# 009A — GOAL 001 acceptance validation — RESULT

## Status

PASS

## Gate

Tasks 004–009 RESULT files exist with status PASS.

## Defect found and fixed

In-place retry from task 008 did not run after GAME OVER: the chunk/`zrSoftReset` JsCode event was nested under `GameStatus = "Playing"`, so Dead never saw Space/tap/R. Event-sheet Dead handlers were no-ops (`GameStatus` set to `"Dead"` again).

Fix: move that JsCode to the first child of the Game-scene **Game states** group so it runs every frame, including Dead. `tools/sync-chunk-catalog.mjs` now inserts a missing event there instead of under Playing.

## 10 consecutive cycles (exported build, no `?dev=1`)

Served at `http://127.0.0.1:8765/?v=009a3`. Same page token; `performance` navigation count stayed **1** (no reload).

| Cycle | Start score/hazards | Death (cactus) | After retry |
| --- | --- | --- | --- |
| 1–10 | 0 / 0, Preparing, Idle | 1 cactus, scores 93–105 | Score 0, hazards 0, Idle, dino (48, 728), `_zrChunk` null |

All 10 `ok: true`. Sequencer restarted on EASY cactus each time (no leftover island/wreck, no score carry). Collision was the standing player vs the first ground cactus.

## Touch / mobile

Physical phone was not used. Chrome device metrics **390×844**, `mobile: true`, URL `http://127.0.0.1:8765/` (no `?dev=1`). Pointer/touch on the dino started Playing; after GAME OVER (score 107) a center tap returned Preparing with score 0 and 0 hazards.

## LAN preview

`node tools/preview-lan.mjs` served `games/zombie-runner/build/` on **port 8765** (default). Override: env `PREVIEW_PORT` (previous session used 8767). Bind `0.0.0.0`. This-PC URL: `http://127.0.0.1:8765/`. Process was stopped after validation (not a serve failure).

## Exports

- After the retry placement fix: **WEB_EXPORT: PASS**
- After `node tools/apply-skin.mjs wroclaw-v1` (0 resources changed): **WEB_EXPORT: PASS**

Task **010 was not started**.

## Files changed

- `games/zombie-runner/zombie-runner.json`
- `games/zombie-runner/GAMEPLAY.md`
- `tools/sync-chunk-catalog.mjs`
- `docs/codex-manual-tasks/009A_goal001_acceptance_validation-RESULT.md` (this file)

## Known limitations

- Preparing start still uses Dino left-click / any-key-released; Dead retry uses mouse **released** anywhere (plus Space/R). A tap that never hits the dino may not start the first run.
- Ten cycles used the exported runtime InputManager / pointer events in the Cursor browser, not a physical handset.
- Dino rest Y is ~728 vs reset target 724 (platform rest); no accumulating drift across the 10 retries.

## Commit SHA

Implementation: `f279b0eb63755749d01eb3a3a3a417f65d37efb8`

## Operator actions required

None for this task. GOAL 001 remains for ChatGPT acceptance; 010 stays gated.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
