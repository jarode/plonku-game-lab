# 056 — CITY BREAKER data-block art system

## Goal
Replace generic Breakout bricks with a visual system that communicates city data directly in the board.

## Required implementation
Create a reusable semantic art system for board cells representing the four accepted factors:
- `GĘSTOŚĆ`
- `ZIELEŃ`
- `ZABUDOWA`
- `PODMIOTY`

Each family must be visually distinct through more than color alone. Use combinations of:
- icon/silhouette,
- texture/pattern,
- border treatment,
- chart fragment,
- fill density,
- durability indicator,
- subtle label/mark.

Board geometry produced by existing data logic must remain authoritative. Art follows geometry; art must not fake data differences.

## Visual target
Blocks should read like:
- data cells,
- city districts,
- mini charts,
- infrastructure fragments,
not plain rounded rectangles.

Include hit/damaged/destroyed visual states prepared for later game-feel tasks, but do not tune movement yet.

## Mobile
At 320/390 width, factor families still need to be distinguishable without microscopic text.

## Evidence
Show at least:
- dense profile,
- green/corridor profile,
- balanced profile,
all using the same art system.

## Acceptance
PASS only if board screenshots visibly explain that different kinds of city data are being broken apart.

Next on exact PASS: 057.
