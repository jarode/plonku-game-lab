# GOAL 009 — CITY BREAKER: PLONKU VISUAL IDENTITY → GAME FEEL

## Goal
Take the accepted `CITY BREAKER 2012` prototype and turn it from a technically correct Breakout implementation into a recognizably **Plonku** data-game.

Order matters:

> **first visual identity / UI / art direction → then game feel / movement / feedback**

Do not start movement/gameplay polish until the visual acceptance gate is passed.

## Product truth that must remain unchanged
- `CITY BREAKER 2012` remains a city-data-driven Breakout.
- `2012` is visual/cultural framing, not historical-data provenance.
- Live VGE integration is out of scope.
- Existing deterministic data → board geometry behavior stays intact.
- No site/VGE integration in this goal.
- No third-party UI/IP imitation.

## Approved visual target
The accepted direction is a **Plonku data-punk / retro-browser-game** screen, not a generic breakout clone.

Required visual language:
- near-black / deep navy field,
- acid lime, hot pink and cyan accents,
- strong editorial hierarchy,
- thin technical borders / grid / radar / diagram overlays,
- data labels and arrows around the board,
- city silhouette / map / infrastructure motifs used as atmosphere,
- retro `.EXE` / utility-window energy without copying a real OS,
- blocks that read as data cells / districts / chart fragments rather than plain rectangles,
- visible city factors such as `GĘSTOŚĆ`, `ZIELEŃ`, `ZABUDOWA`, `PODMIOTY`,
- a clearly branded paddle and glowing ball,
- deliberate glitch / compression / low-fi details,
- playful Plonku microcopy,
- dense but legible composition.

Key copy territory:
- `CITYBRK.EXE — PUBLIC DATA / 2012 INTERNET ENERGY`
- `CITY BREAKER 2012`
- `TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.`
- `PROFIL: BALANS`
- `WYNIK … · ŻYCIA …`
- `BLOKI = FAKTY. PIŁKA = ZMIANA.`

## Phase A — visual identity gate
Tasks 054–059.

The game MUST NOT proceed to game-feel tasks unless task 059 returns exact `PASS`.

## Phase B — movement / game feel
Tasks 060–063.

Only after the visual shell is accepted, improve paddle/ball feel, hit feedback, pacing, retry and moment-to-moment responsiveness without changing the approved data contract.

## Chain
```text
054 PASS → 055
055 PASS → 056
056 PASS → 057
057 PASS → 058
058 PASS → 059
059 PASS → 060
060 PASS → 061
061 PASS → 062
062 PASS → 063
063 → STOP
```

Rules:
- exact `PASS` only continues the chain;
- any other status → STOP;
- fresh worker/session per task when possible;
- after 059, if visual target is not accepted, STOP — do not compensate with mechanics;
- after 063 always STOP;
- do not create/start 064 automatically;
- do not modify `jarode/viral-growth-engine`.

## Definition of done
GOAL 009 is accepted only when:
1. a screenshot is immediately recognizable as a Plonku product;
2. the board visually communicates that it comes from city data;
3. desktop and mobile remain readable;
4. the current deterministic data-generated layouts still work;
5. paddle/ball movement feels responsive and intentional;
6. hits, destruction, life loss and retry have satisfying feedback;
7. the game still exports/packages cleanly;
8. no unsupported factual claim or copied third-party interface is introduced.
