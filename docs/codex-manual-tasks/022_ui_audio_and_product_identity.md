# 022 — UI, audio and product identity

## Gate

Requires task 021 PASS.

## Goal

Make Zombie Runner — Wrocław feel like a coherent Plonku product rather than a skinned technical demo.

## Scope

Implement/standardize:

- start-state presentation;
- current score and final score readability;
- game-over/retry messaging;
- Wrocław/Zombie Runner title treatment;
- simple product-consistent button/UI visuals;
- lightweight original/permissive sound effects and music or intentionally documented silent design;
- mute control if audio is added;
- responsive safe-area placement for portrait screens;
- remove unused player-facing Intro/Leaderboard remnants from the runtime path and, where safe, from the client project.

Keep first interaction fast. Avoid menus that add friction before play.

## Constraints

- No paid assets/services.
- No analytics, ads, login or monetization.
- Do not add complex settings screens.
- Preserve one-input gameplay and regression compatibility.

## Acceptance criteria

PASS only if normal player flow has a consistent product identity from start through retry, no obsolete leaderboard/demo UI appears, mobile layout remains readable, and export/regression PASS.

## Result

Create `022_ui_audio_and_product_identity-RESULT.md` with UI/audio changes, provenance where applicable, validation evidence, screenshots/paths when practical, limitations, and commit SHA.

## Chain behavior

If and only if RESULT status is exactly `PASS`, continue to task 023 in a fresh worker session. Otherwise STOP GOAL 004.