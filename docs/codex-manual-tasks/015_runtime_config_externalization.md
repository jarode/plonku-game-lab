# 015 — Runtime config externalization

## Gate

Requires task 014 PASS.

## Goal

Reduce direct editing of the huge GDevelop event-sheet JSON by moving runner-specific configuration out of nested event structures wherever this can be done safely.

## Scope

1. Identify values currently duplicated or patched in large JSON/event strings, including title/HUD copy, balance, chunk/runtime config and other client-level settings.
2. Introduce a small versioned per-game runner config consumed by the shared runtime/tooling.
3. Prefer config + deterministic sync/generation over hand-editing nested GDevelop events.
4. Keep GDevelop JSON as the actual project source, but reduce the number of places a client customization must touch.
5. Preserve the current `?dev=1`, retry, score, chunk and input behavior.
6. Add validation for missing/invalid config values.

## Non-goals

- Do not attempt to replace GDevelop's event system wholesale.
- Do not build a universal game engine or generic N-mechanic schema.

## Acceptance criteria

PASS only if a client title, obstacle speed and at least one additional safe client-level setting can be changed through config without manually editing nested event JSON, and Zombie + Traffic Dash both export PASS afterward.

## Result / chain rule

Create `015_runtime_config_externalization-RESULT.md` with before/after customization path, validations, known remaining JSON touchpoints, and commit SHA.

Exact `PASS` -> continue to 016. Any other status -> STOP GOAL 003.
