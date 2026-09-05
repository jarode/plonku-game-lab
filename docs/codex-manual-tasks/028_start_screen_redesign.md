# 028 — Start screen redesign

## Gate

Requires task 027 PASS.

## Goal

Replace the prototype “tap any key on the Game scene” start with a Plonku start screen.

## Scope

Portrait start treatment with: large title, city tag, primary CTA `ROZPOCZNIJ GRĘ`, secondary `WYBIERZ MIASTO`, optional `JAK TO DZIAŁA?`, city-mood background, Plonku branding, subtle data/experiment line.

`WYBIERZ MIASTO` may be a visual/placeholder control (full city flow is GOAL 006 / 036).

## Constraints

- Factory architecture preserved. Prefer GDevelop layouts/objects over a new engine.
- Fast path to play: one tap on primary CTA.
- Export + `RUNNER_REGRESSION` must PASS (adjust harness if start flow changed, without weakening checks).

## Acceptance criteria

PASS only if the start screen is visually distinct from the 025 prototype and aligned with the 026 brief and moodboards.

## Result

`028_start_screen_redesign-RESULT.md`

## Chain behavior

Exact `PASS` → continue to 029. Else STOP GOAL 005.
