# GOAL 005 — Plonku Visual Re-theme

## Purpose

Restyle the shipping Zombie Runner — Wrocław client from a working factory product into a **Plonku visual product**: neon-editorial, data-punk, cyber-grunge. Looks, screens, branding, and visual language only.

Do **not** integrate with the Plonku website in this goal. Do **not** start GOAL 006 until task 033 PASS.

Moodboards (operator-supplied):

- `docs/codex-manual-tasks/refs/goal-005/moodboard-game-over-wroclaw.jpg`
- `docs/codex-manual-tasks/refs/goal-005/moodboard-ui-kit-plonku.jpg`

## Chain

Execute in fresh worker sessions, in this exact order:

1. `026_plonku_art_direction_brief.md`
2. `027_ui_copy_rewrite_plonku_tone.md`
3. `028_start_screen_redesign.md`
4. `029_in_game_hud_redesign.md`
5. `030_game_over_screen_redesign.md`
6. `031_world_art_pass_wroclaw_plonku.md`
7. `032_branding_cleanup_and_export_polish.md`
8. `033_visual_acceptance_plonku_style_match.md`

## Continuation rule

After each task, read its matching `-RESULT.md`.

- If status is exactly `PASS`, continue to the next task.
- If status is `FAIL`, `BLOCKED`, `OPERATOR_ACTION_REQUIRED`, `INCONCLUSIVE`, missing, ambiguous, or anything other than exact `PASS`, STOP this goal immediately.
- Never skip a failed gate.

Preserve Runner Factory v2 (`runner.json`, slots, regression). Prefer client-only art/UI. Shared-template changes need a demonstrated defect and must keep Zombie, Traffic Dash, and Pigeon Dash `RUNNER_REGRESSION: PASS`.

## Final stop

After task 033, STOP regardless of status. Do not create or start task 034 in this goal (034 belongs to GOAL 006).

## Success definition

GOAL 005 is successful only if task 033 ends with `PASS` and decision:

`ACCEPTED — visually aligned with Plonku style`

No public deployment or Plonku-site modification is authorized.

## Follow-up (not 034)

Operator art drop after 033: `033A_operator_generate_plonku_slot_art.md`  
Drop folder: `docs/codex-manual-tasks/refs/goal-005/art-drop/`  
Do not start GOAL 006 from this follow-up.
