# 062 — CITY BREAKER pacing + retry + difficulty

## Goal
Tune the session loop after movement and hit feel are accepted.

## Required work
Review and tune:
- time to first meaningful interaction,
- early-game pace,
- life count/recovery timing,
- death/retry delay,
- score pacing,
- dense vs sparse profile difficulty spread,
- avoidance of unwinnable/boring board states,
- consistent restart state.

## Product target
- fast restart,
- short-session browser/mobile energy,
- data-generated profiles feel different but all remain playable,
- difficulty differences are noticeable without making one profile obviously broken.

## Preserve
- data contract and deterministic geometry,
- approved UI/art,
- no live VGE calls,
- no new game mode.

## QA
Run repeated sessions across all six accepted profiles and at least 10 consecutive retries on mobile-size viewport.

## Acceptance
PASS only if pacing is coherent across profiles and retry is fast/reliable.

Next on exact PASS: 063.
