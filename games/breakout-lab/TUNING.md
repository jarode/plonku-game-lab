# CITY BREAKER 2012 — tuning (051)

Reproducible parameters after 048/050. Not a scientific model.

## Before (048 caps)

| Param | Value |
| --- | --- |
| Grid | 8×5, row 4 empty |
| Bricks | 8–28 |
| Density floor | 22 |
| Dwellings floor | 20 |
| Launch force | example ~400 (unchanged) |
| Lives | 3 |
| Paddle scale | `1.08 - density/400` in `[0.8, 1.1]` |

## After (051)

No numeric cap change: 048 already kept all six fixtures playable and distinct. 051 locks **session intent** and **UI legend**, and requires smoke on all six profiles.

| Intent | Lock |
| --- | --- |
| First session | Understand hook + one launch; typical clear/fail **30–90 s** on phone (headless does not play a human session) |
| Retry | Scene replace, same profile → same board |
| Fairness | No all-empty, no sealed bottom row, max 28 bricks |

## Six profiles (geometry)

| id | bricks (golden) | Noticeable |
| --- | --- | --- |
| low-edge | 8 | Small field |
| green-open | 8 | Corridors |
| mixed-spike | 9 | One empty column + HP 3 |
| balanced-mid | 10 | Mid corridors |
| high-edge | 20 | Corridors + HP 3 mass |
| dense-spike | 28 | Wall, no corridors |

No single factor erases the others: forest still cuts columns on high-edge (forest=100) while density fills the rest; entities still raise HP on mixed-spike.

## Legend (player)

`gestosc → cegly · zielen → przeswity · zabudowa → masa · podmioty → HP`
