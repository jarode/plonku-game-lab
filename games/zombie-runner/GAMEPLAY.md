# Zombie Runner — Wrocław (gameplay)

Portrait 540×960 one-input runner. Product lock: `PRODUCT.md`. Skin: `wroclaw-v1`.

## Loop

1. **START** — `GameStatus = Preparing`. Tap or Space starts.
2. **PLAYING** — world scrolls left. Space/tap jumps. Score = survival time.
3. **GAME OVER** — hazard collision.
4. **RETRY** — tap, Space, or R → in-place reset (no reload).

Target first-session death **20–35 s**. First ground hazard ~1.4 s after run start (`ObstacleSpeed` 500, `easy-cactus` x=180).

## Hazards

| Object | Reads as | Survive |
| --- | --- | --- |
| `CactusObstacle` | Bollard / street clutter | Jump |
| `IslandObstacle` | Overhead sign | Stay low |
| `WreckObstacle` | Wide wreck | Jump early |

Nine EASY/MEDIUM/HARD chunks in `chunks.json`.

## Controls

Space / tap anywhere / jump button. Duck control hidden.
