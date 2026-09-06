# GOAL 008 — CITY BREAKER 2012

## Status
PLANNED

## Goal
Turn the accepted neutral Data-Driven Breakout Lab into the first themed Plonku data-game product: **CITY BREAKER 2012**.

Core promise:

> **Twoje miasto właśnie wygenerowało Ci level.**

The game must prove a new Plonku pattern:

> **real city data → level geometry**

not merely:

> data → label / color / decorative skin.

## Product framing
- Working title: `CITY BREAKER 2012`
- Product language: Polish first.
- `2012` is a **visual / cultural framing only**: retro-web, low-fi digital, early-smartphone / browser-game energy, deliberate imperfection, compressed texture, old-internet attitude.
- `2012` MUST NOT imply that the gameplay uses 2012 historical data unless a future task explicitly sources and validates historical observations.
- Do not copy protected UI, trade dress, logos, game characters, GTA assets, iPhone UI, Windows UI or other third-party IP.
- Open-world / videogame framing may be used generically, without reference to protected franchises in product copy.

## Data boundary
For GOAL 008 use only factors already available and approved in the current Plonku / VGE data stack.

Preferred v1 city-data family:
- population density,
- forest cover share,
- dwellings per 1000 population,
- registered entities per 1000 population.

Additional existing factors may be used only if they are already approved in the VGE factor catalog and add clear gameplay value without weakening interpretability.

Tourism factors are explicitly **not required for v1**. They may be documented as a later game mode if the accepted data contract makes that extension clean.

The game-side runtime contract remains bounded to:

```json
{
  "id": "some-city-or-fixture-id",
  "values": [0, 100]
}
```

with `values.length` between 4 and 16 and every normalized value in `[0,100]`.

## Required product behavior
1. Player selects / receives a city profile.
2. The profile resolves to a deterministic normalized data vector.
3. That vector materially changes the generated Breakout board.
4. Board differences must be visible in **geometry / topology / durability / openings**, not only palette.
5. The same input produces the same board.
6. Different data profiles produce meaningfully different but playable boards.
7. The game remains understandable and fun even before the player reads the methodology.
8. Result framing connects performance back to the selected city without making unsupported factual or causal claims.

## Visual direction
`CITY BREAKER 2012` should feel like a strange browser game discovered on an old laptop rather than a polished modern mobile game.

Desired qualities:
- low-fi / compressed digital texture,
- pixel-ish or bitmap-adjacent typography where legible,
- deliberate roughness,
- chunky panels,
- early-web game HUD energy,
- timestamp / file-name / `.exe` / loading-screen language where original and generic,
- Plonku lime / pink / cyan accents used inside this retro frame,
- fast, readable mobile-first interaction.

Avoid:
- exact imitation of any OS or phone UI,
- nostalgic asset packs copied from third parties,
- fake 2012 factual claims,
- modern glossy SaaS-dashboard look,
- turning the game into a static infographic.

## Recommended copy territory
Primary hook:

> **TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.**

Supporting ideas:
- `PUBLIC DATA / 2012 INTERNET ENERGY`
- `WROCŁAW.EXE`
- `LEVEL GENERATED FROM PUBLIC DATA`
- `ROZBIJ SWOJE MIASTO`
- `CITY DATA → GAME LEVEL`

All copy remains provisional until the dedicated copy/art task.

## Chain
Execute tasks in order:

```text
046 PASS → 047
047 PASS → 048
048 PASS → 049
049 PASS → 050
050 PASS → 051
051 PASS → 052
052 PASS → 053
053 → STOP
```

Rules:
- Continue only after exact `PASS`.
- Any other status (`FAIL`, `BLOCKED`, `OPERATOR_ACTION_REQUIRED`, `INCONCLUSIVE`, etc.) → STOP.
- Use a fresh worker/session for each task when possible.
- Do not auto-create or auto-start task 054.
- After task 053 always STOP and return to ChatGPT/operator review before any integration into `jarode/viral-growth-engine`.

## Tasks
- `046` — product brief + accepted data boundary
- `047` — VGE data-contract adapter + deterministic fixtures
- `048` — gameplay mapping: data → geometry / HP / openings
- `049` — CITY BREAKER 2012 art direction + copy
- `050` — themed implementation pass
- `051` — gameplay tuning + city differentiation
- `052` — mobile / regression / share-result QA
- `053` — final acceptance + Plonku handoff package

## Definition of done
GOAL 008 is accepted only if all are true:
- the player can see that different city profiles create different levels,
- data effects are material and explainable,
- the game is fun independently of the data explanation,
- mobile interaction remains reliable,
- the 2012 treatment is recognizable but original,
- no historical-data claim is implied,
- no third-party IP is copied,
- game and source artifacts are reusable for later city-data modes,
- handoff is ready for a separate Plonku site integration goal.

Final accepted wording in task 053:

`ACCEPTED — CITY BREAKER 2012 ready for Plonku integration review`
