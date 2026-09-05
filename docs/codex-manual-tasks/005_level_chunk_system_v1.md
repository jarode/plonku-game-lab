# 005 — Level Chunk System v1

## Gate

Requires task 004 PASS.

## Goal

Replace monolithic level authoring with a reusable chunk-based level system so gameplay can be iterated quickly without editing player movement logic.

## Scope

1. Introduce reusable level chunks grouped by difficulty:
   - EASY;
   - MEDIUM;
   - HARD.
2. Provide at least three chunks per group.
3. Compose gameplay from chunks in a deterministic or bounded-random sequence that cannot create impossible transitions.
4. Keep chunk content editable independently from core movement code/events.
5. Document the chunk contract: entry/exit assumptions, dimensions, hazard rules, safe margins, and difficulty semantics.
6. Add a straightforward way to add a new chunk without changing the runner core.

## Constraints

- Do not build a generic procedural-generation framework.
- Avoid hidden dependencies on specific placeholder art.
- Preserve current score, game-over, restart, keyboard, and touch behavior.

## Acceptance criteria

PASS only if at least nine chunks exist, the game can assemble them without visible gaps/impossible joins, a new chunk can be added without touching player movement logic, and export/smoke validation still passes.

## Result

Create `005_level_chunk_system_v1-RESULT.md` with architecture summary, chunk list, validations, changed files, limitations, and commit SHA. Stop after push.
