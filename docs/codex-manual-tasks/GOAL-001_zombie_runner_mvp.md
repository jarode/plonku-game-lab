# GOAL 001 — Zombie Runner MVP

## Purpose

Execute the next implementation phase as a guarded chain rather than requiring manual supervisor approval after every PASS.

This goal covers tasks:

```text
004 -> 005 -> 006 -> 007 -> 008 -> 009
```

The individual task specifications remain authoritative for scope and acceptance criteria.

## Entry gate

Task 003 must already be accepted as PASS by the supervisor before starting this goal.

## Execution rule

Run tasks strictly in numeric order. For each task:

1. Read the current task specification and all explicitly required prior RESULT files.
2. Implement only that task's bounded scope on `ai-control`.
3. Run the validations required by the task, including the reproducible web export when required.
4. Commit and push the implementation.
5. Create the matching `-RESULT.md` with one explicit status.
6. Commit and push the RESULT.
7. Read the final RESULT status before deciding whether to continue.

### Continue condition

Continue to the next task **only when the current RESULT status is exactly `PASS`**.

### Stop conditions

Immediately STOP the chain for any status other than exact `PASS`, including but not limited to:

- `FAIL`
- `BLOCKED`
- `OPERATOR_ACTION_REQUIRED`
- `INCONCLUSIVE`
- partial success
- missing/ambiguous RESULT status
- validation not actually executed

Do not reinterpret a non-PASS result as PASS. Do not start repair work outside the current task unless the task itself explicitly permits it.

## Chain

### 004 — Zombie Runner vertical slice
Requires accepted task 003 PASS. On exact PASS, continue to 005.

### 005 — Level Chunk System v1
Requires 004 PASS. On exact PASS, continue to 006.

### 006 — Dev/Test Mode
Requires 005 PASS. On exact PASS, continue to 007.

### 007 — Mobile preview and input hardening
Requires 006 PASS. On exact PASS, continue to 008.

### 008 — Game state, UI and restart flow
Requires 007 PASS. On exact PASS, continue to 009.

### 009 — Asset/Reskin Contract v1
Requires 008 PASS. On exact PASS, Goal 001 implementation is complete. STOP successfully and return control to the supervisor for whole-goal review.

## Cross-task safety rules

- One task = one bounded implementation unit + one matching RESULT.
- Preserve the single canonical project: `games/zombie-runner/zombie-runner.json`.
- Do not create a competing GDevelop project source of truth.
- Keep generated `build/` output out of git.
- Do not deploy publicly.
- Do not add paid services or dependencies.
- Do not skip a task because a later implementation seems easier.
- Do not silently weaken acceptance criteria to keep the chain moving.
- If GDevelop/tooling behaves unexpectedly, fail closed and STOP rather than guessing.

## Completion condition

Goal 001 is complete only when RESULT files for 004, 005, 006, 007, 008 and 009 all exist on `ai-control` and every one has status exactly `PASS`.

After 009 PASS, do **not** start task 010 automatically. Task 010 belongs to the next supervisor-reviewed phase.
