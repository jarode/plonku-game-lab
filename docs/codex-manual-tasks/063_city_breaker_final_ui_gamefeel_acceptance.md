# 063 — CITY BREAKER final UI + game-feel acceptance

## Goal
Perform final independent acceptance of GOAL 009 and produce a clean handoff-ready state for a later Plonku integration decision.

## Must verify
- visual contract 054 fully satisfied,
- shell/HUD/product identity accepted,
- board reads as city data rather than generic bricks,
- world layer supports rather than obscures gameplay,
- start/generation/result states are coherent,
- paddle/ball movement is responsive,
- hit/destruction feedback is polished,
- pacing/retry works across all accepted profiles,
- data-generated geometry remains deterministic,
- export/package still works,
- no VGE/site integration has occurred.

## Viewport matrix
At minimum:
- 1440 desktop,
- 1024 desktop/tablet,
- 390 portrait,
- 320 portrait,
- one landscape mobile check.

## Runtime matrix
At minimum:
- balanced profile,
- dense profile,
- green/corridor profile,
- all six accepted city/profile fixtures in smoke/regression,
- 10 consecutive restarts.

## Required result wording
If accepted:

`ACCEPTED — CITY BREAKER 2012 visual identity and game feel ready for Plonku integration review`

Any failure or unresolved visual/gameplay concern must use a non-PASS status.

## STOP
After 063 always STOP.
Do not create task 064.
Do not modify `jarode/viral-growth-engine`.
