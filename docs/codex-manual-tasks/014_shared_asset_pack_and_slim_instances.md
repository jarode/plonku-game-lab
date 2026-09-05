# 014 — Shared asset pack and slim instances

## Gate

Requires task 013 PASS.

## Goal

Stop duplicating the whole placeholder art tree into every instantiated runner while keeping each game independently exportable.

## Scope

1. Design a repo-local shared asset-pack strategy for runner-v1.
2. Update instantiation so a new game does not blindly duplicate all ~90 placeholder binaries.
3. Preserve per-game ownership of truly game-specific assets and skin manifests.
4. Keep export deterministic and portable inside this repository.
5. Do not introduce external CDN/runtime network dependencies.
6. Add migration/support for Zombie Runner and Traffic Dash where safe; do not break their existing exports.
7. Measure before/after file count and disk duplication for a fresh instantiated game.

## Constraints

- No symlink-only solution if it makes Windows/Git portability unreliable.
- Do not make the exported HTML5 game depend on repository-relative paths at runtime.
- Do not rewrite gameplay logic.

## Acceptance criteria

PASS only if a fresh runner instance contains materially fewer duplicated binary assets than task 011, exports successfully, and Zombie + Traffic Dash still export `WEB_EXPORT: PASS`.

## Result / chain rule

Create `014_shared_asset_pack_and_slim_instances-RESULT.md` with architecture, before/after measurements, validations, limitations, and commit SHA.

Exact `PASS` -> continue to 015 in a fresh session. Any other status -> STOP GOAL 003.
