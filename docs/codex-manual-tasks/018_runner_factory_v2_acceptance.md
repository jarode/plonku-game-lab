# 018 — Runner Factory v2 acceptance

## Gate

Requires task 017 PASS.

## Goal

Close GOAL 003 with an evidence-based acceptance of Runner Factory v2 and a concrete next-product recommendation.

## Scope

1. Review tasks 013–017 and current repository state.
2. Verify Zombie Runner, Traffic Dash and the third client all:
   - export PASS;
   - pass the common regression harness;
   - use the v2 slot/config/shared-asset path as intended.
3. Summarize before/after improvements versus GOAL 002:
   - reskin friction;
   - per-game binary duplication;
   - manual nested JSON edits;
   - regression confidence;
   - time to instantiate/export a new runner.
4. Identify remaining bottlenecks and explicitly classify each as:
   - acceptable for runner-v1/v2;
   - next optimization;
   - engine limitation / reason to use Godot instead.
5. Recommend exactly one next direction:
   - use Runner Factory v2 for a real Plonku game;
   - one bounded factory-v3 hardening goal;
   - stop investing in the factory.
6. Do not start implementation of that recommendation in this task.

## Acceptance criteria

PASS only if all three clients pass the final common checks and the report provides a clear recommendation grounded in measured evidence.

## Result / chain rule

Create `018_runner_factory_v2_acceptance-RESULT.md` with final metrics, three-client validation table, limitations, recommendation and commit SHA if applicable.

After task 018: ALWAYS STOP. Do not create or start task 019. Return control to ChatGPT for review.
