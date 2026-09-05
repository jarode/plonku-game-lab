# 033 — Visual acceptance: Plonku style match

## Gate

Requires task 032 PASS.

## Goal

Judge whether the game is close enough to the GOAL 005 moodboards.

## Scope

Review 026–032 plus current export/screens: palette, type, mobile readability, brand tone (“funny + data + slight dread”). Re-run export + runner regression.

## Decision

Exactly one:

- `ACCEPTED — visually aligned with Plonku style`
- `NOT ACCEPTED — visual gap remains`
- `OPERATOR_ACTION_REQUIRED` if a human look on a phone is still required and missing

Do not start GOAL 006 or task 034 in this task.

## Acceptance criteria

PASS only for `ACCEPTED — visually aligned with Plonku style`.

## Result

`033_visual_acceptance_plonku_style_match-RESULT.md`

## Chain behavior

STOP after 033 regardless of status. Do not create or start 034 here.
