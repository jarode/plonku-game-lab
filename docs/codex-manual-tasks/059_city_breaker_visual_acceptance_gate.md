# 059 — CITY BREAKER visual acceptance gate

## Goal
Independently review the completed UI/art pass before any game-feel work begins.

## Mandatory review
Verify:
- visual contract from 054,
- shell/HUD from 055,
- data-block art from 056,
- world layer from 057,
- start/generation/result states from 058,
- desktop/mobile consistency,
- no regression in data-generated board geometry.

## Hard gate
Do not accept screenshots that are merely technically correct. The product must visually read as Plonku at first glance.

Reject if any are true:
- still looks like stock/generic Breakout,
- bricks are only recolored rectangles,
- playfield still feels mostly empty,
- data relationship is not visible,
- mobile becomes illegible,
- retro treatment copies a recognizable third-party interface,
- gameplay readability is harmed by decoration.

## Required evidence
- screenshots 1440 / 1024 / 390 / 320,
- balanced + dense + green/corridor profiles,
- start, active play and result states,
- regression/tests relevant to deterministic layout.

## Result
Exact `PASS` means visual phase is accepted and task 060 may start.
Any other status → STOP and return for visual correction.

Next on exact PASS: 060.
