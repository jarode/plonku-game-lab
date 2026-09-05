# GOAL 003 — Runner Factory v2

## Goal

Turn the successful runner-v1 experiment into a cleaner, safer and more scalable factory for small 2D one-input GDevelop games.

This goal addresses the bottlenecks identified by task 012:

- resource-name based reskins;
- duplicated placeholder binaries per game;
- client customization hidden in large nested GDevelop JSON;
- regression gaps that allowed the retry bug through;
- lack of a third independent production proof.

## Chain

Execute in strict order, one fresh worker session per task:

```text
013 — slot-based skin contract v2
  -> PASS only
014 — shared asset pack / slim instances
  -> PASS only
015 — runtime config externalization
  -> PASS only
016 — runner regression harness
  -> PASS only
017 — third runner factory v2 proof
  -> PASS only
018 — Runner Factory v2 acceptance
  -> ALWAYS STOP
```

## Stop rule

Continue only when the previous RESULT status is exactly `PASS`.

Any other status, including `FAIL`, `BLOCKED`, `INCONCLUSIVE`, `OPERATOR_ACTION_REQUIRED`, missing RESULT, ambiguous result, or validation failure means:

1. stop the goal immediately;
2. do not start the next numbered task;
3. return the current RESULT/evidence to the operator.

After task 018, stop even when PASS. Do not create or start task 019.

## Safety / scope

- Work on `ai-control`.
- No public deployment, paid services, store publication or secrets.
- Preserve the HYBRID decision from task 012: this factory is for small 2D one-input HTML5/mobile loops, not a replacement for Godot 3D/simulation work.
- Do not expand into a universal game framework.
- Prefer measured evidence and deterministic validation over optimistic PASS claims.
