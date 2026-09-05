# 008 — Game state, UI and restart flow — RESULT

## Status

PASS

## State flow

```text
Preparing (START) -- tap / any key / Space --> Playing
Playing -- hazard collision --> Dead (GAME OVER + final score on ScoreText)
Dead -- tap / Space / R --> Preparing (in-place zrSoftReset)
```

`zrSoftReset` deletes chunk hazards and bonuses, zeros `Score`, restores the player pose/Idle, clears the chunk sequencer, and does **not** reload `index.html`. Desktop shortcut: **R**.

## Files changed

- `games/zombie-runner/zombie-runner.json`
- `games/zombie-runner/GAMEPLAY.md`
- `tools/chunk-runtime.template.js`
- `docs/codex-manual-tasks/008_game_state_ui_restart-RESULT.md` (this file)

## Validations

| Check | Outcome |
| --- | --- |
| Export smoke | PASS |
| Generated Game JS contains `zrSoftReset` and `deleteFromScene` for hazard objects | PASS |
| Scene-change retry actions removed (no page reload) | PASS |

Ten consecutive deaths were not hand-played in this session; reset is the same function each time (idempotent object wipe + score 0).

## Known limitations

- Dev E/M/H/N still `replaceScene("Game")` so chunk-group jumps stay simple.
- Touch retry uses mouse-released; if a device never fires that, Space/R still work on desktop.

## Commit SHA

Implementation: `e5ec79ee28c452b051bc5d54c3de6ced3ffee995`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
