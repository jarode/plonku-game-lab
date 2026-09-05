# 008 — Game state, UI and restart flow

## Gate

Requires task 007 PASS.

## Goal

Make the first prototype feel like a complete playable loop instead of an editor demo.

## Scope

Implement a clear state flow:

```text
START
  -> PLAYING
  -> GAME OVER
  -> RETRY
```

Add/standardize:

- start state/screen;
- current score display;
- game-over presentation;
- final score;
- retry action;
- reliable reset of player, world/chunks, score, timers, hazards and temporary state;
- touch-friendly UI sizing;
- keyboard shortcut for rapid desktop testing where useful.

## Constraints

- Keep visuals simple; final art is not the purpose of this task.
- Do not reload the entire page as the primary retry mechanism unless a documented engine limitation makes this unavoidable.
- Do not duplicate gameplay state in multiple competing variables/systems.

## Acceptance criteria

PASS only if at least ten consecutive start -> play -> game-over -> retry cycles can be performed without stale state, duplicated hazards, broken score, or accumulating gameplay errors. Mobile and desktop input must both remain usable and export validation must pass.

## Result

Create `008_game_state_ui_restart-RESULT.md` with state-flow summary, validation evidence, known limitations, changed files, and commit SHA.

## Chain behavior

When executed under `GOAL-001_zombie_runner_mvp.md`, push implementation + RESULT, then inspect the RESULT status. Continue to task 009 only when status is exactly `PASS`. For any other status, STOP and do not start task 009.
