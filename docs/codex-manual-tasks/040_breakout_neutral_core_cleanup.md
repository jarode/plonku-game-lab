# 040 — Breakout neutral core cleanup

## Gate

Requires task 039 exact `PASS`.

## Goal

Turn the imported demo into a minimal neutral Breakout lab client that is easy to reason about, test, reskin and later drive from data.

## Scope

1. Remove or bypass demo-only menus, tutorial clutter, branding and unnecessary scenes that are not required for the core loop.
2. Preserve the essential mechanic:
   - paddle movement;
   - ball launch/motion;
   - brick collision/destruction;
   - score/state;
   - fail/game-over;
   - restart without page reload where practical.
3. Define a small explicit game-state contract (Preparing/Playing/Dead or equivalent).
4. Make restart deterministic enough for automated validation.
5. Keep graphics deliberately neutral/placeholder. Do not introduce the final theme.
6. Document important object names and the smallest set of tuneable gameplay parameters.
7. Avoid large rewrites of GDevelop event sheets unless required by a proven defect.

## Validation

PASS requires:

- start -> play -> fail -> restart loop works;
- restart does not accumulate duplicate balls/bricks/listeners;
- score resets correctly;
- core mechanic remains playable;
- HTML5 export PASS;
- no topic-specific art/copy introduced;
- changed scope is bounded and documented.

## Result

Create `docs/codex-manual-tasks/040_breakout_neutral_core_cleanup-RESULT.md` with state contract, changed files, validation evidence, known limitations and final status.

## Chain behavior

Exact `PASS` -> 041 in a fresh session. Else STOP GOAL 007.
