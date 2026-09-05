# 024 — Plonku web handoff package

## Gate

Requires task 023 PASS.

## Goal

Prepare Zombie Runner — Wrocław as a clean web-product handoff that can later be integrated into Plonku without coupling this game repo to the Plonku application repo.

## Scope

Produce a reproducible release/handoff package and documentation covering:

- exact production export command;
- expected output directory and required files;
- base-path / relative-asset assumptions;
- iframe/embed vs standalone route compatibility;
- viewport/orientation assumptions;
- cache/versioning considerations;
- no external runtime dependencies unless explicitly documented;
- title/meta/icon/thumbnail assets that belong with the game;
- a small machine-readable manifest with game slug, display title, orientation, entry file and version/build identifier;
- smoke validation of the packaged output from a clean build.

Do not modify or deploy the Plonku website in this task. This task ends at a ready-to-integrate artifact/contract in this repository.

## Constraints

- No public deployment.
- No analytics/ads/login.
- Keep build output generated/gitignored unless the existing workflow has a deliberate release-artifact convention.
- Do not add a second application framework around the GDevelop build.

## Acceptance criteria

PASS only if a future Plonku integration task can consume the documented build without reverse-engineering this repository, and the clean package passes smoke/regression.

## Result

Create `024_plonku_web_handoff_package-RESULT.md` with package contract, commands, manifest path, validations, limitations, and commit SHA.

## Chain behavior

If and only if RESULT status is exactly `PASS`, continue to task 025 in a fresh worker session. Otherwise STOP GOAL 004.