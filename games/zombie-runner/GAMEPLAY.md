# Zombie Runner — Wrocław (gameplay)

Portrait 540×960 one-input runner. Product lock: `PRODUCT.md`. Skin: `wroclaw-v1`. Naming: `NAMING.md`.

## Loop

1. **START** — `GameStatus = Preparing`. `ROZPOCZNIJ GRĘ` or Space starts. Do not start from `WYBIERZ MIASTO`.
2. **CITY** — overlay: Wrocław playable, other cities placeholder. Closes back to start or game over.
3. **PLAYING** — world scrolls left. Space/tap/jump button. Score = seconds survived.
4. **GAME OVER** — hazard collision.
5. **RETRY** — tap (not city chrome), Space, or R → in-place reset (no reload).

Target first-session death **20–35 s**. First ground hazard ~1.4 s after run start (`ObstacleSpeed` 500, `easy-cactus` x=180).

## Hazards

| Object | Reads as | Survive |
| --- | --- | --- |
| `CactusObstacle` | Bollard / street clutter | Jump |
| `IslandObstacle` | Overhead sign | Stay low |
| `WreckObstacle` | Wide wreck | Jump early |

Nine EASY/MEDIUM/HARD chunks in `chunks.json`.

## Controls

Space / tap anywhere / jump button while Playing. Duck control hidden. **U** mutes. Music: `cybernyczny-zmrok.mp3` on one channel for the whole session.
