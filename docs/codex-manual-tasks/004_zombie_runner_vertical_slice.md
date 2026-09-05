# 004 — Zombie Runner vertical slice

## Gate

Requires task 003 PASS.

## Goal

Turn the clean runner baseline into the first playable Plonku prototype: **Zombie Runner — Wrocław**.

This task proves gameplay first. Art quality is deliberately secondary.

## Product target

- mobile-first portrait experience, target 9:16;
- one-input endless/short-session runner;
- automatic forward movement;
- tap / Space = jump;
- approximately 45-second representative session;
- three distinct hazard types;
- visible score based on distance/survival;
- game-over state;
- immediate retry.

## Scope

1. Replace only the minimum baseline content needed to establish Zombie Runner identity.
2. Use placeholders, simple shapes, existing free assets, or permissively licensed temporary art.
3. Make three hazards mechanically or visually distinguishable.
4. Ensure game-over and restart are reliable.
5. Keep gameplay logic separated from temporary art where practical.
6. Preserve keyboard and touch control.

## Non-goals

- final graphics;
- final city artwork;
- monetization;
- procedural generation framework;
- generalized game factory.

## Acceptance criteria

PASS only if the game can be played from start to game over and restarted repeatedly without reloading the editor, both keyboard and touch paths are preserved, all three hazard types can occur, and the web export from task 003 still passes.

## Result

Create `004_zombie_runner_vertical_slice-RESULT.md` with gameplay description, validations, changed files, limitations, screenshots/paths when practical, and commit SHA. Stop after push.
