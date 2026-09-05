# 002 — Import Endless Runner baseline

## Gate

Requires task 001 PASS.

## Goal

Import a clean, working endless-runner baseline into `games/zombie-runner/` using an official/free GDevelop example or another clearly documented permissive source.

## Scope

1. Identify the exact upstream example/source and record provenance and license information.
2. Import only what is needed for the baseline.
3. Preserve core behavior:
   - automatic forward movement;
   - jump/fall;
   - hazards/collision;
   - score/progression;
   - keyboard input;
   - touch/mobile input when supported by the upstream example.
4. Keep the baseline visually unchanged except for changes strictly required to make it work inside this repository.
5. Document how to open and run it locally.

## Constraints

- Do not create Zombie art or custom gameplay yet.
- Do not redesign the UI.
- Do not introduce paid assets.
- Keep upstream attribution/licensing truthful.

## Acceptance criteria

PASS only if the imported baseline opens and runs, the canonical project source is unambiguous, required controls work, asset references are intact, and provenance is documented.

## Result

Create `002_import_endless_runner_baseline-RESULT.md` with status, upstream source, validations, changed files, limitations, and commit SHA. Stop after push.
