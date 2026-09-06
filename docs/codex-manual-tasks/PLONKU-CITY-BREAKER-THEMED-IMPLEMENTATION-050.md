# TASK 050 — CITY BREAKER 2012 themed implementation

## Goal
Apply the accepted GOAL 008 product, data mapping, art direction and copy to the working Breakout game without weakening the neutral engine underneath.

## Inputs
Requires exact PASS for 046–049.

Read and follow:
- accepted product brief,
- accepted data contract,
- accepted data→geometry mapping,
- accepted art/copy spec,
- GAME-PRODUCTION-PLAYBOOK.

## Required work
1. Create/convert the themed game product using the existing repo game convention.
2. Keep the neutral generator reusable; themed behavior should live in configuration/adapter/skin layers where practical.
3. Implement:
   - hook/start screen,
   - city/profile identity,
   - deterministic generated board,
   - HUD,
   - themed bricks / paddle / ball,
   - result/game-over state,
   - retry under the established fast-restart target,
   - data explanation panel or post-run reveal.
4. Integrate original retro-2012 visual treatment.
5. Preserve portrait/mobile-first play.
6. Ensure no GDevelop watermark / default template branding leaks into the product if the repo's accepted source normally hides it.
7. Keep dev mode capable of forcing named fixtures for QA.
8. Export a playable HTML5 build using the established tools.

## Required proof
Capture implementation evidence for at least three fixtures:
- balanced-mid,
- dense-spike,
- green-open or equivalent accepted fixture.

Evidence must show visibly different board geometry.

## Acceptance gates
PASS only if:
- game launches and completes a full run loop,
- fixture selection produces deterministic, visibly different boards,
- themed treatment matches task 049,
- copy does not imply 2012 historical statistics,
- no third-party IP is copied,
- export works with the repo's normal web-export path,
- mobile portrait remains the intended product.

## Out of scope
- final balance polish,
- production hosting,
- VGE integration,
- live city selector/network data.

## Chain
Exact `PASS` → task 051.
Any other status → STOP.
