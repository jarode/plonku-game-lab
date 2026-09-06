# TASK 048 — CITY BREAKER 2012 mapping: data → level geometry

## Goal
Lock and implement the semantic gameplay mapping that makes city data materially reshape the Breakout board.

## Principle
The player should be able to see that a different city profile produced a different level **before reading any explanation**.

Color-only or label-only differences do not count.

## Required mapping
Start from the four v1 normalized dimensions accepted in task 047.

The mapping must use at least four independent board/gameplay consequences selected from:
- occupied cell density,
- holes / corridors,
- vertical distribution,
- horizontal distribution,
- brick durability / HP,
- cluster size,
- protected/bonus bricks,
- spawn pattern,
- paddle/ball modifiers only as a secondary effect.

## Semantic guidance
The final exact formulas may differ after testing, but preserve an explainable relationship:
- **population density** should materially influence how crowded/packed the board feels,
- **forest cover share** should materially influence openings / breathing room / corridors,
- **dwellings per 1000** should materially influence structure / layers / board mass,
- **registered entities per 1000** should materially influence special or resilient structures / local complexity.

Do not describe these mechanics as scientific causal effects. They are a transparent game interpretation of public statistics.

## Required work
1. Inspect the deterministic board generator from GOAL 007.
2. Define explicit normalized-to-gameplay formulas with bounded min/max values.
3. Ensure extremes `[0,0,0,0]` and `[100,100,100,100]` remain technically playable or are rejected by an explicit bounded-playability transform.
4. Create golden snapshots / serialized board layouts for the accepted fixtures from task 047.
5. Prove:
   - same input → same board,
   - different representative fixtures → materially different topology,
   - at least one fixture creates visible holes/corridors,
   - at least one fixture creates dense wall-like structure,
   - no accepted fixture creates an unwinnable opening state.
6. Add dev/debug output that shows each factor and what parameter(s) it changed.
7. Keep the mapping reusable for future factor packs; do not hard-code Polish copy into the neutral generator.

## Playability guardrails
- opening area cannot be fully sealed,
- paddle start area remains clear,
- ball must have a legal initial path,
- board cannot exceed performance-safe brick count,
- HP values remain bounded,
- no fixture should create a trivial zero-second clear.

## Acceptance gates
PASS only if:
- geometry changes materially across fixtures,
- mapping is explainable in docs,
- deterministic snapshot tests pass,
- playability guardrails pass,
- changes are not merely cosmetic.

## Chain
Exact `PASS` → task 049.
Any other status → STOP.
