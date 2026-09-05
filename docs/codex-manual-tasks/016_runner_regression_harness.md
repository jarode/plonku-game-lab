# 016 — Runner regression harness

## Gate

Requires task 015 PASS.

## Goal

Turn the manual acceptance checks that caught the retry bug into a repeatable regression command for every runner client.

## Scope

1. Add a repo-local regression harness for a selected runner game.
2. Validate at minimum:
   - export succeeds;
   - Preparing -> Playing;
   - hazard death -> Dead;
   - 10 consecutive in-place retry cycles with no page reload;
   - score resets to 0;
   - no stale hazards/chunks accumulate;
   - normal mode does not expose dev HUD/invincibility;
   - representative portrait viewport loads;
   - skin/config/resource validation passes.
3. Prefer deterministic browser/runtime automation available locally.
4. Produce a single explicit final signal such as `RUNNER_REGRESSION: PASS|FAIL` with non-zero exit on failure.
5. Support at least Zombie Runner and Traffic Dash through a `--game` argument.
6. Document what remains impossible to prove without a physical phone.

## Constraints

- No public deployment.
- No flaky timing-only assertions when runtime state can be inspected directly.
- Do not weaken checks merely to obtain PASS.

## Acceptance criteria

PASS only if both existing clients pass the same regression command and an intentionally broken fixture/setting produces FAIL.

## Result / chain rule

Create `016_runner_regression_harness-RESULT.md` with commands, positive/negative evidence, limitations, and commit SHA.

Exact `PASS` -> continue to 017. Any other status -> STOP GOAL 003.
