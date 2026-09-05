# 020 — Original art pack Wrocław v1

## Gate

Requires task 019 PASS.

## Goal

Replace placeholder dino/desert identity with a coherent original/permissively-created Wrocław zombie skin that satisfies the Runner Factory v2 slot contract.

## Scope

Create or assemble a product-ready v1 art pack for the existing slots:

- player;
- hazard_01/02/03;
- background_far / background_near;
- ground;
- button;
- logo/title treatment;
- optional pickup if used.

Use only original assets created for this project or assets with clearly documented permissive rights. Add provenance where needed.

The visual set should clearly read as Wrocław/zombie-runner without requiring text alone. Prefer simple bold mobile-readable silhouettes over detailed illustration.

Integrate through the v2 skin contract; do not hardwire art paths into gameplay logic.

## Constraints

- No paid assets/services.
- No copyrighted franchise characters/logos.
- No gore-heavy content.
- Do not alter jump/collision core to fit artwork unless a real collision defect is demonstrated.

## Acceptance criteria

PASS only if the complete v1 skin applies through slot ids, exports successfully, has no placeholder dino/desert identity in the main gameplay loop, and provenance is documented.

## Result

Create `020_original_art_pack_wroclaw_v1-RESULT.md` with asset inventory, provenance, integration evidence, screenshots/paths when practical, export/regression results, limitations, and commit SHA.

## Chain behavior

If and only if RESULT status is exactly `PASS`, continue to task 021 in a fresh worker session. Otherwise STOP GOAL 004.