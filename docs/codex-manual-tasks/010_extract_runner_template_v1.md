# 010 — Extract Runner Template v1

## Gate

Requires task 009 PASS and explicit ChatGPT review of tasks 004–009.

## Goal

Extract only the production-proven reusable parts of Zombie Runner into `templates/runner-v1/` so future runner games can start from a clean template instead of copying the whole Zombie project.

## Scope

1. Identify which systems are genuinely reusable based on the completed Zombie Runner:
   - movement/jump core;
   - game state flow;
   - chunk system;
   - score;
   - debug/test mode hooks;
   - input abstraction;
   - asset/reskin contract;
   - export/smoke workflow integration.
2. Create `templates/runner-v1/` with a minimal canonical project/template structure.
3. Remove Zombie/Wrocław-specific content from the reusable layer.
4. Keep Zombie Runner as a golden client/reference implementation.
5. Document exactly how to instantiate a new game from the template.
6. Avoid adding abstractions not already justified by two or more concrete needs observed in tasks 004–009.

## Constraints

- Do not convert the system into a generic game engine.
- Do not break Zombie Runner while extracting the template.
- Do not duplicate canonical gameplay logic unnecessarily between template and Zombie client; document the chosen relationship clearly.

## Acceptance criteria

PASS only if a clean runner template exists, Zombie-specific content is excluded from the reusable layer, Zombie Runner still validates, and the documented new-game procedure is concrete enough for task 011 to execute without rediscovering architecture.

## Result

Create `010_extract_runner_template_v1-RESULT.md` with extracted systems, intentionally non-reusable systems, validations, limitations, and commit SHA. Stop after push.
