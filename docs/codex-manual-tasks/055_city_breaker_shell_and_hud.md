# 055 — CITY BREAKER Plonku shell + HUD

## Goal
Rebuild the outer game shell and HUD so the first frame already reads as Plonku before the board is touched.

## Required implementation
- Replace the plain top strip with a strong original `.EXE` utility-window frame.
- Build a clear title block: `CITY BREAKER 2012`.
- Add readable status chips for profile, score and lives.
- Keep the hook visible: `TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.`
- Add subtle technical borders, grid, micro-labels and retro-digital texture.
- Use Plonku dark navy/black + acid lime/hot pink/cyan.
- Create desktop and portrait variants from the same design system.

## Quality bar
The page must not look like a generic HTML wrapper around a game. The shell itself must feel authored, branded and game-specific.

## Preserve
- current gameplay logic,
- current data fixtures,
- current board generation,
- current input behavior.

## Evidence
Screenshots at minimum:
- 1440 desktop,
- 390 portrait,
- 320 portrait.

## Acceptance
PASS only if shell/HUD is recognizably Plonku and no longer resembles the GOAL 008 plain prototype.

Next on exact PASS: 056.
