# 043 — Deterministic data-driven board generator

## Gate

Requires task 042 exact `PASS`.

## Goal

Implement the neutral data-to-board contract so fixture inputs generate visibly and mechanically different playable Breakout boards.

## Scope

1. Implement deterministic board generation from the 042 contract.
2. Keep generation game-local unless a genuinely reusable generic helper is obvious and proven safe.
3. At minimum prove multiple contrasting fixtures, including:
   - low/sparse extreme;
   - high/dense extreme;
   - balanced middle;
   - at least two mixed profiles.
4. Make the resulting differences visible in board structure, not only color.
5. Add a dev/test selector or query parameter to force a named fixture without editing project files, e.g. `?fixture=...` if practical.
6. Add machine-checkable evidence that:
   - same fixture => same board signature/layout;
   - different fixtures => different board signatures/layouts;
   - invalid fixture => documented safe fallback/error behavior.
7. Preserve mobile controls, restart and scoring from 041.
8. Do not connect real Plonku data or choose the final theme.

## Validation

PASS requires:

- at least five fixtures generate playable boards;
- deterministic same-input evidence;
- meaningful different-input evidence;
- start/play/fail/restart still works after generated board reset;
- export PASS;
- no runtime network dependency;
- no topic-specific copy/art introduced.

## Result

Create `docs/codex-manual-tasks/043_deterministic_data_board_generator-RESULT.md`.

Include generator architecture, fixture->board evidence/signatures, restart validation, changed files, limitations and final status.

## Chain behavior

Exact `PASS` -> 044 in a fresh session. Else STOP GOAL 007.
