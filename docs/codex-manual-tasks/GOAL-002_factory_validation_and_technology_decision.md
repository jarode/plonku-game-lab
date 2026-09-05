# GOAL 002 — Factory validation and technology decision

## Goal

Validate whether `runner-v1` is actually reusable in production and then make an evidence-based technology decision for simple Plonku web/mobile games.

This goal is a sequential chain:

```text
011 — Second game factory test
  PASS ->
012 — GDevelop vs Godot benchmark and GO/HYBRID/NO-GO
  -> STOP for ChatGPT review
```

## Entry gate

Requires task 010 `PASS` and an accepted `templates/runner-v1/` seed.

## Execution rule

Run exactly one task at a time, in order, on `ai-control`.

After each task:

1. Create the matching `-RESULT.md`.
2. Commit and push implementation + RESULT according to the normal manual-task workflow.
3. Read the RESULT status.
4. Continue automatically only when the status is exactly `PASS` and there is another task in this goal.
5. For `FAIL`, `BLOCKED`, `OPERATOR_ACTION_REQUIRED`, `INCONCLUSIVE`, missing status, or any other status, STOP immediately.

## Task chain

### 011 — Second game factory test

Purpose: instantiate a genuinely different second runner from `templates/runner-v1/`, measure how much client work vs core/template work is needed, and expose any real template defects.

If and only if 011 = PASS, continue to 012 in a fresh worker/session.

### 012 — Technology decision

Purpose: use evidence from the completed lab, especially the second-game test, to compare GDevelop with the prior Godot workflow and choose GO / HYBRID / NO-GO for this class of simple games.

After 012 RESULT is pushed, STOP regardless of the decision. Do not create or start task 013.

## Important constraints

- Do not start a third game.
- Do not broaden task 011 into a framework rewrite.
- Do not manipulate benchmark criteria to force GDevelop to win.
- Keep measured evidence separate from qualitative judgment.
- Preserve Zombie Runner as the golden client.
- Do not copy `games/zombie-runner/` to create the second game; instantiate from `templates/runner-v1/`.

## Goal completion

GOAL 002 is complete only when:

- 011 has a PASS RESULT;
- 012 has a completed RESULT with a clear GO / HYBRID / NO-GO decision;
- worker has stopped after 012 for ChatGPT review.
