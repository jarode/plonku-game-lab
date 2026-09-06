# TASK 046 — CITY BREAKER 2012 product brief + data boundary

## Goal
Lock the product definition for `CITY BREAKER 2012` before implementation changes.

## Context
GOAL 007 proved the neutral Breakout lab. GOAL 008 turns that engine into a themed Plonku product.

Core promise:

> **Twoje miasto właśnie wygenerowało Ci level.**

`2012` is visual framing only. It is NOT historical-data provenance.

## Required work
1. Read:
   - `docs/GAME-PRODUCTION-PLAYBOOK.md`
   - GOAL 007 and all accepted 039–045 RESULT files
   - current Breakout game/docs/config produced by GOAL 007.
2. Produce a concise product brief under the game directory or existing docs convention that locks:
   - working title,
   - player fantasy,
   - first 1–2 second hook,
   - one-thumb / mobile interaction,
   - session goal,
   - score/result behavior,
   - retry loop,
   - what city data changes,
   - what city data MUST NOT claim,
   - 2012 art framing boundary,
   - explicit no-third-party-IP boundary.
3. Lock v1 data dimensions to the already-proven VGE city-data family:
   - population density,
   - forest cover share,
   - dwellings per 1000 population,
   - registered entities per 1000 population.
4. Do not introduce live API integration yet.
5. Record the semantic mapping in human language, but do NOT yet encode final geometry formulas; that belongs to task 048.
6. Define 3 representative city-profile archetypes for QA, for example:
   - dense / urban,
   - greener / lower density,
   - mixed / spiky.
   These are deterministic test fixtures, not factual city claims unless sourced later.

## Acceptance gates
PASS only if:
- product identity is clearly different from Zombie Runner,
- data is central to the level, not decorative,
- `2012` is explicitly non-historical styling,
- no unsupported statement implies real 2012 observations,
- no copied OS/phone/game UI is part of the direction,
- v1 stays bounded to 4 approved factors,
- the brief is implementation-ready.

## Out of scope
- final art assets,
- VGE live API,
- Plonku website integration,
- tourism mode,
- historical data,
- production release.

## Chain
Exact `PASS` → task 047.
Any other status → STOP.
