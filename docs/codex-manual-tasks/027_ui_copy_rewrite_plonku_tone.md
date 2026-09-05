# 027 — UI copy rewrite in Plonku tone

## Gate

Requires task 026 PASS.

## Goal

Replace prototype English HUD strings with a complete Plonku-tone copy set (Polish primary) plus a short tone guide.

## Scope

Unify copy for: start, in-run score labels, game over, retry CTA, choose-city CTA, helper labels, optional microcopy.

Direction (examples, not mandatory verbatim): `Spróbuj jeszcze`, `Miasto nie śpi`, `Zmień miasto`, `Więcej danych. Dłuższe życie.`

Ship the strings into the game where they are already driven by `runner.json` / HUD, and document strings that wait for screens in 028–030.

## Constraints

- No paid translation APIs.
- Keep one-thumb play. Do not add login/ads.
- Preserve regression (retry still in-place).

## Acceptance criteria

PASS only if PL copy + tone guide exist and in-game player-facing strings no longer read as generic `Tap to retry` prototype English (except documented leftovers waiting for 028–030 screens).

## Result

`027_ui_copy_rewrite_plonku_tone-RESULT.md`

## Chain behavior

Exact `PASS` → continue to 028. Else STOP GOAL 005.
