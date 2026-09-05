# Zombie Runner — Wrocław (vertical slice)

Placeholder prototype on the Run, Dino run baseline. Art is temporary.

## Loop

1. **START** — Game scene, `GameStatus = Preparing`. Tap or any key / Space starts the run.
2. **PLAYING** — auto-scroll world (obstacles move left). **Space** or **tap** jumps. Score increases with time (distance/survival).
3. **GAME OVER** — hit a hazard. Overlay on `ScoreText`.
4. **RETRY** — tap or Space reloads the Game scene (no editor reload).

Viewport: **540×960**, portrait (9:16).

## Hazards (three types)

Gameplay objects (not tied to final Wrocław art):

| Object | Role | How to survive |
| --- | --- | --- |
| `CactusObstacle` | Ground barrier | Jump |
| `IslandObstacle` | Overhead obstacle | Stay low (do not jump) |
| `WreckObstacle` | Wide ground wreck (skeleton placeholder) | Jump earlier / further |

Spawns come from `chunks.json` (nine EASY/MEDIUM/HARD chunks). See `CHUNK-CONTRACT.md`.

## Controls

- Keyboard: **Space** jump (duck input disabled).
- Touch / mouse: tap anywhere or the jump button.
- Duck button is hidden.

## Art vs logic

Runner sprite is still the upstream dino placeholder. Swap textures later without renaming the three hazard objects if possible.
