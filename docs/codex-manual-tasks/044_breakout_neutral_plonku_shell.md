# 044 — Neutral Plonku visual shell

## Gate

Requires task 043 exact `PASS`.

## Goal

Give Breakout Lab a reusable Plonku-native visual shell without committing to the final subject matter.

## Scope

1. Apply the established Plonku visual language at a neutral/system level:
   - dark/navy base;
   - acid lime / hot pink / cyan accents;
   - framed editorial labels;
   - bold readable score/state treatment;
   - subtle data-lab/grunge feel.
2. Keep board objects semantically neutral: blocks/tiles/data cells, not pollution, buildings, money, health, cities or another final-theme metaphor.
3. Create coherent player-facing states:
   - start;
   - play HUD;
   - fail/game over;
   - retry.
4. Include a small neutral indicator that the board came from a profile/fixture, e.g. `DATA PROFILE`, but do not expose developer jargon in the main player path.
5. Preserve clear mobile readability and avoid covering the playfield with branding.
6. Remove visible upstream/demo branding from the normal player path where licensing permits; preserve provenance in docs.
7. Do not add final topic copy, public-data claims or Plonku-site integration.

## Validation

PASS requires:

- the prototype reads visually as Plonku rather than upstream demo;
- gameplay remains immediately readable;
- all five data fixtures still work;
- mobile target viewports remain usable;
- export PASS;
- no final topic has been accidentally selected through art/copy.

## Result

Create `docs/codex-manual-tasks/044_breakout_neutral_plonku_shell-RESULT.md` with screenshots/evidence where feasible, changed files, fixture regression, limitations and final status.

## Chain behavior

Exact `PASS` -> 045 in a fresh session. Else STOP GOAL 007.
