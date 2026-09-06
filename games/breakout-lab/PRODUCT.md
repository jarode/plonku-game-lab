# CITY BREAKER 2012 — product brief (GOAL 008 / task 046)

Locked for tasks 047–053. Do not reopen identity unless a blocker appears. No live API, no VGE site, no final art in this file.

**Slug (v1):** `breakout-lab` (canonical GDevelop client). Display product is **CITY BREAKER 2012**. A later rename/copy of the client is allowed only if a dedicated task says so.

**Display title:** CITY BREAKER 2012  
**Language:** Polish first  
**Platform:** HTML5, **portrait 9:16 intended** for Plonku embed (GOAL 007 lab is still landscape 1920×1080; task 050 must make the playfield product-portrait, not letterbox-as-MVP).  
**Engine:** GDevelop Breakout Lab + GOAL 007 board contract (`id` + `values[4..16]` in `[0,100]`).

## vs Zombie Runner

| | Zombie Runner | CITY BREAKER 2012 |
| --- | --- | --- |
| Mechanic | Endless one-thumb runner | Paddle / ball / bricks |
| Data role | Mostly difficulty / city label | **Level geometry** from a 4-factor vector |
| Session | Survive seconds | Clear or fail a generated board |
| Score | Time | Bricks / run result on a named **profile** |
| 2012 | N/A | Visual mood only |

## Player fantasy

You got a tiny `.exe` from the public-data internet. You pick (or receive) a **city profile**. The machine **builds a Breakout board from four official statistics**. You smash it. Fun first; methodology after.

Hook (1–2 s):

> **TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.**

Visible immediately: profile chip + a board whose **holes and mass** already look like that profile. Not a splash of city name on a generic wall.

## Interaction

- One thumb: paddle X follows pointer/touch (`touch-action: none`). Keyboard A/D kept for desktop.
- Launch: tap / Space.
- Retry: in-place scene replace (**R** / retry CTA), no full page reload. Target: feel instant (same as lab).
- No account, ads, tutorial wall, leaderboard in GOAL 008.

## Session and score

- First session: understand hook → one launch → fail or clear in **about 30–90 s** (tune in 051).
- Score: existing Breakout score (bricks). Result screen shows **profile id/label + score + one-line data framing**.
- Retry keeps the **same profile → same board**. Skill/physics still vary the run.
- Lives: keep lab default (3) until 051.

## v1 data boundary (exactly four factors)

Normalized `[0,100]` each. Order in the future adapter / `values[0..3]`:

| Index | Factor (VGE family) | What the player should *feel* (not a formula; 048) |
| --- | --- | --- |
| 0 | Population density | Crowding / packed bricks |
| 1 | Forest cover share | Openings / corridors / breathing room |
| 2 | Dwellings per 1000 population | Structure / layers / board mass |
| 3 | Registered entities per 1000 population | Local complexity / tougher or special clusters |

Runtime stays the GOAL 007 object:

```json
{ "id": "profile-id", "values": [0, 100] }
```

`values.length` 4–16. v1 **uses length 4** (one slot per factor). Extra slots are reserved for later packs, not tourism, not 2012 history.

**No live fetch in GOAL 008.** Fixtures only. Future VGE hands off the same four normalized numbers; GDevelop never imports VGE internals.

### Semantic mapping (human; formulas in 048)

- Density up → denser occupied field.
- Forest up → more gaps / corridors (not a prettier green skin).
- Dwellings up → more mass / stacked structure.
- Entities up → more resilient or locally complex bricks.

These are a **game reading** of public stats, not causal science (“las powoduje dziury w cegłach”).

### MUST NOT claim

- That gameplay uses **2012 observations** (year is costume).
- That a loss **proves** anything about a real city (pollution, crime, quality of life).
- That fixtures **are** named real cities unless a later task sources production ids.
- That missing data is zero.
- Tourism as a v1 factor.

## QA archetypes (fixtures, not facts)

Deterministic profiles for 047+. Labels are QA names, not census.

| QA id | Intent | Rough vector mood |
| --- | --- | --- |
| `dense-urban` | Packed city, little green | High density, low forest, high dwellings |
| `green-open` | Breathing room | Low density, high forest |
| `mixed-spike` | One sharp local complexity | Mid field + high entities spike |

047 may add `balanced-mid`, low-edge, high-edge without changing this identity.

## 2012 art framing

Mood: weird browser game on an old laptop — low-fi, chunky panels, compressed texture, Plonku lime/pink/cyan **inside** that frame. Copy like `WROCŁAW.EXE` / `PUBLIC DATA` is **generic file-language**, not a real OS.

**Do not:** clone Windows/macOS/iOS/Android chrome, iPhone trade dress, GTA names/UI/characters, Kenney-as-Plonku-brand (Kenney bricks are lab placeholders until 049/050 original art), fake “data from 2012”.

## Out of scope (GOAL 008)

Live VGE API, Plonku site embed, tourism mode, historical datasets, paid assets, production deploy, task 054.

## Implementation-ready checklist (047–053)

- [ ] 047 adapter: 4 factors → `{ id, values }` + fixtures + fail-closed tests  
- [ ] 048 geometry formulas + snapshots + playability  
- [ ] 049 art/copy lock  
- [ ] 050 themed product + portrait playfield + `?fixture=`  
- [ ] 051 tuning ≥ 6 profiles  
- [ ] 052 mobile/share QA  
- [ ] 053 handoff package, no VGE repo edits  
