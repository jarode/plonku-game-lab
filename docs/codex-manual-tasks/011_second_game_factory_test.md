# 011 — Second game factory test

## Gate

Requires task 010 PASS.

## Goal

Prove whether `runner-v1` actually reduces production effort by creating a second playable game from the template without modifying the core unless a genuine template defect is discovered.

## Scope

1. Instantiate a second game from `templates/runner-v1/`.
2. Use a deliberately different theme from Zombie Runner, such as dinosaurs, aliens, traffic, or another lightweight placeholder concept.
3. Change at minimum:
   - player skin;
   - three hazard skins;
   - background/ground set;
   - title/logo text;
   - at least three level chunks;
   - one balancing parameter.
4. Preserve the reusable core unchanged whenever possible.
5. Record measurable production evidence:
   - files changed;
   - template files modified, if any;
   - new assets added;
   - core logic changes;
   - validation steps;
   - friction points encountered.
6. If a template defect is found, make the smallest justified fix and document why it belongs in the template rather than the client game.

## Constraints

- Do not add a large new gameplay mechanic merely to make the second game look different.
- Do not hide template weaknesses by copying Zombie-specific files.
- No final art quality requirement.

## Acceptance criteria

PASS only if the second game is independently playable/exportable, uses the runner template as intended, demonstrates a materially different reskin/chunk set, and the result clearly shows how much core modification was required.

## Result

Create `011_second_game_factory_test-RESULT.md` with the production-effort evidence, template defects found, validations, changed files, limitations, and commit SHA. Stop after push.
