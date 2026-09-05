# Chunk contract v1

Chunks are data only. Player jump, collision, score, and game-over events must not change when you add a chunk.

## File

Edit `games/zombie-runner/chunks.json`, then from repo root:

```text
node tools/sync-chunk-catalog.mjs
```

That copies the catalog into the Game-scene JavaScript event. Do not edit jump/collision events to add a chunk.

## Layout

- Coordinate origin: chunk left edge, X increasing to the right (spawned at the right of the screen).
- `width`: pixels until the next chunk may start (includes margins).
- `hazards[].x`: offset from chunk left; must be `>= safeEntry` and `<= width - safeExit`.
- `hazards[].object`: `CactusObstacle` | `IslandObstacle` | `WreckObstacle` (logic names, not art).
- Island Y is `Platform.AABBTop - 64`. Ground hazards sit on `Platform.AABBTop`.

## Joins

Every chunk has `safeEntry` and `safeExit` empty ground (default 200px). The sequencer places chunk N+1 after N’s full `width`, so joins cannot overlap hazards.

Forbidden by construction: a hazard in the last `safeExit` of N or the first `safeEntry` of N+1.

## Difficulty

| Group | Intent |
| --- | --- |
| EASY | Single hazard, long gaps |
| MEDIUM | Two hazards, still recoverable |
| HARD | Three hazards, tighter timing |

Sequence in player mode: EASY pool, then MEDIUM, then HARD, then repeat, picking the next unused id in the group (cycle).

## Add a chunk

1. Append an object to `chunks.json` with a new `id` and `group`.
2. Keep first/last 200px empty.
3. Run `node tools/sync-chunk-catalog.mjs`.
4. Export/smoke (`node tools/gdevelop-web-export.mjs`).
