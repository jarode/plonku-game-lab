# TASK 049 — CITY BREAKER 2012 art direction + copy lock

## Goal
Define the final original visual/copy system for CITY BREAKER 2012 before themed implementation.

## Product hook
Primary:

> **TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.**

Supporting territory:
- `PUBLIC DATA / 2012 INTERNET ENERGY`
- `CITY DATA → GAME LEVEL`
- `.EXE` / loading / file-like microcopy only where original and generic.

## Art direction
Create a compact, implementation-ready visual spec combining:
- Plonku neon editorial identity,
- low-fi browser-game / old-laptop energy,
- deliberate compression / texture / imperfection,
- chunky UI,
- high readability on 9:16 mobile.

`2012` is a mood marker, not a recreation of a branded OS/product.

## Required work
1. Define palette, typography approach, texture rules, border/panel rules, HUD style, button style, brick families, ball/paddle treatment, background treatment, game-over/result treatment.
2. Define which graphics are:
   - generated procedurally,
   - created as original raster/vector assets,
   - reused from generic Plonku brand assets.
3. Record provenance for all new assets.
4. Produce copy for:
   - first screen,
   - start CTA,
   - city/profile label,
   - in-game HUD,
   - game over,
   - retry,
   - result/data explanation,
   - share text placeholder,
   - methodology/disclaimer.
5. Explicitly avoid:
   - copied Windows/macOS/iOS/Android UI,
   - iPhone-specific trade dress,
   - GTA names/characters/UI,
   - third-party sprites or nostalgic packs without approved provenance.
6. Keep copy short enough for mobile and visually test the longest strings.

## Acceptance gates
PASS only if:
- art direction is recognizably Plonku + retro-web without cloning third-party IP,
- copy makes the data-generated-level idea obvious,
- no wording implies the statistics are from 2012,
- mobile typography is legible,
- asset-generation path and provenance are documented.

## Out of scope
- final implementation polish,
- VGE site wrapper,
- live API.

## Chain
Exact `PASS` → task 050.
Any other status → STOP.
