# CITY BREAKER 2012 — data → geometry (048)

Explainable game reading of four normalized factors. Not a scientific model. No Polish copy in the generator.

Source: `data/city-board-from-factors.mjs` (`city-breaker-v1`).

## Playability transform

Raw parsed values stay in `debug.rawValues`. Placement uses:

- density `max(raw, 22)`
- forest unchanged
- dwellings `max(raw, 20)`
- entities unchanged

So `[0,0,0,0]` is a small legal board, not an empty reject. `[100,100,100,100]` keeps vertical corridors from forest=100.

## Independent consequences

| Factor | Board effect |
| --- | --- |
| Population density | Occupancy mask (`token < density`) → packed vs sparse |
| Forest cover | 0 / 1 / 2 / 3 **vertical corridor columns** |
| Dwellings /1000 | Brick rows used: 2–4; **row 4 always empty** (ball path) |
| Entities /1000 | Base HP 1–3 + optional HP clusters |

Grid is always **8×5**. Caps: 8–28 bricks.

## Dev

`?profile=<fixture-id>` loads this mapping (`window.__boFactorDebug`). `?fixture=` remains the GOAL 007 lab catalog.
