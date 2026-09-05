# Chunk contract v1

Chunks are data only. Player jump, collision, score, and game-over events must not change when you add a chunk.

## File

Edit `<game>/chunks.json`, then from repo root:

```text
node tools/sync-chunk-catalog.mjs --game <game-dir>
```

The sequencer source is `templates/runner-v1/runtime/chunk-runtime.template.js`. Do not edit jump/collision events to add a chunk.

## Layout

- Coordinate origin: chunk left edge, X increasing to the right (spawned at the right of the screen).
- `width`: pixels until the next chunk may start (includes margins).
- `hazards[].x`: offset from chunk left; must be `>= safeEntry` and `<= width - safeExit`.
- `hazards[].object`: `CactusObstacle` | `IslandObstacle` | `WreckObstacle` (logic names, not art).
- Island Y is `Platform.AABBTop - 64`. Ground hazards sit on `Platform.AABBTop`.

## Joins

Every chunk has `safeEntry` and `safeExit` empty ground (default 200px).

## Difficulty

| Group | Intent |
| --- | --- |
| EASY | Single hazard, long gaps |
| MEDIUM | Two hazards, still recoverable |
| HARD | Three hazards, tighter timing |

Sequence: EASY pool, then MEDIUM, then HARD, then repeat.

## Add a chunk

1. Append an object to `chunks.json` with a new `id` and `group`.
2. Keep first/last 200px empty.
3. Run sync for that `--game`.
4. Export with `--game`.
