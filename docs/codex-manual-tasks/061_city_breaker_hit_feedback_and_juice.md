# 061 — CITY BREAKER hit feedback + destruction juice

## Goal
Make every collision/destruction event feel satisfying and consistent with the approved Plonku visual system.

## Required work
Improve:
- brick hit feedback,
- damaged-state readability,
- destruction burst/fragments,
- short-lived glow/flash,
- subtle screen/camera response where safe,
- paddle contact feedback,
- life-loss feedback,
- score feedback.

## Style
Effects should use the existing lime/pink/cyan data-punk language, with glitch/data fragments rather than generic explosions.

## Constraints
- no gore/violent framing,
- no effect may obscure ball tracking,
- no excessive shake on mobile,
- keep performance stable,
- do not alter underlying data values or geometry.

## QA
Test dense and sparse boards, repeated multi-hit sequences, mobile portrait and desktop.

## Acceptance
PASS only if hits feel materially more polished than GOAL 008 and remain readable during fast play.

Next on exact PASS: 062.
