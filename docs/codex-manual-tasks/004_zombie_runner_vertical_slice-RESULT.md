# 004 — Zombie Runner vertical slice — RESULT

## Status

PASS

## Gameplay description

**Zombie Runner — Wrocław** is a portrait (540×960, 9:16) one-input endless runner on the Run, Dino run baseline.

- Auto-run: obstacles scroll left at `ObstacleSpeed`.
- Jump: **Space** or tap (jump button still present; duck is disabled/hidden).
- Score: time-based distance (`Score += round(TimeDelta() * 100)`), HUD prefix `Wrocław`.
- Start: Game scene (`firstLayout`), tap/key → `Playing`.
- Game over: collision with a hazard → `Dead` + HUD prompt.
- Retry: tap or Space reloads the Game scene (no editor reload). Leaderboard is no longer in the loop.

Three distinct hazards (placeholder art, named objects):

1. `CactusObstacle` — ground barrier, jump.
2. `IslandObstacle` — overhead, stay low.
3. `WreckObstacle` — wide ground wreck (`Skeleton.png`), jump.

Typical density uses spawn delay 1.2s (about a 45s-scale session). Art is still the upstream dino/desert set.

See `games/zombie-runner/GAMEPLAY.md`.

## Files changed

- `games/zombie-runner/zombie-runner.json`
- `games/zombie-runner/GAMEPLAY.md`
- `games/zombie-runner/README.md`
- `docs/codex-manual-tasks/004_zombie_runner_vertical_slice-RESULT.md` (this file)

## Validations run and outcomes

| Check | Outcome |
| --- | --- |
| `node tools/gdevelop-web-export.mjs` | PASS (no GDevelop expression errors after NewLine() fix) |
| Generated `code1.js` contains Space jump, `WreckObstacle` spawn + collision, GAME OVER retry text | PASS |
| Browser smoke of export | PASS — portrait strip, title “Zombie Runner - Wroclaw”, “Tap or Space to run”, placeholder dino on ground |
| Keyboard path | Space jump compiled; duck key remapped to unused `__disabled_duck__` |
| Touch path | tap-to-jump (mouse/left) + JumpButton; duck button hidden |
| Three hazard types can spawn | ObstacleType 0–3 including wreck |
| Retry without editor reload | Scene `"Game"` on death input / after death anim |
| Canonical project file | still only `zombie-runner.json` |

## Known limitations

- Visuals are temporary (green dino, desert). Wrocław is in title/HUD only.
- Intro and Leaderboard layouts still exist in the file but are unused at runtime.
- Retry via scene reload, not an in-place state machine (task 008).
- ~45s is spawn-rate intent, not a hard timer.
- In-game ASCII uses `Wroclaw` in event strings (GDevelop expression safety); project name still has Wrocław.

## Commit SHA

Implementation: `ac352a1849ca5a12c1731eb81ddb0afee541764a`

## Operator actions required

None. Preview: open the Game scene in GDevelop or run `node tools/gdevelop-web-export.mjs`.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
