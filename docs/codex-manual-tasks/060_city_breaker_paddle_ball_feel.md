# 060 — CITY BREAKER paddle + ball feel

## Goal
After visual acceptance, improve the moment-to-moment movement quality without changing the city-data contract.

## Required work
Tune:
- paddle acceleration/deceleration,
- touch/mouse responsiveness,
- mobile drag/tap behavior if used,
- ball launch timing,
- initial ball speed,
- horizontal/vertical speed balance,
- bounce consistency,
- minimum/maximum angle safeguards,
- prevention of boring near-horizontal or near-vertical loops where applicable.

## Principles
- responsive before realistic,
- readable before chaotic,
- first hit should happen quickly,
- player must feel control over rebound direction where current engine allows it cleanly,
- no hidden live-data dependencies.

## Preserve
- board determinism,
- factor→geometry mapping,
- approved visual layer,
- score/lives semantics unless a bug requires correction.

## QA
Test keyboard/mouse and portrait touch emulation. Run repeated launch/retry sessions.

## Acceptance
PASS only if movement feels intentionally tuned rather than stock Breakout defaults and no new collision instability is introduced.

Next on exact PASS: 061.
