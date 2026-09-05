# Plonku Game Production Playbook

Purpose: reusable best-practice workflow for building the next small experimental Plonku game without repeating the discovery work done for Zombie Runner.

This document summarizes the validated path from idea -> engine choice -> prototype -> graphics -> gameplay tuning -> regression -> mobile -> handoff -> Plonku integration.

## 1. Engine decision

### Default for small Plonku games: GDevelop

Use GDevelop for:

- 2D games;
- portrait/mobile-first experiences;
- one-thumb / one-input mechanics;
- short sessions;
- HTML5 delivery;
- fast reskins and rapid experiments;
- games that fit a small reusable template.

Why this was accepted:

- fast instantiate/export loop;
- no need to build a rendering/game runtime from scratch;
- good HTML5 output;
- easy mobile preview;
- gameplay can be changed through data/config/chunks instead of rebuilding the game;
- factory was proven on multiple independent clients.

### Keep Godot for larger games

Use Godot instead when the project needs:

- 3D;
- simulation / tycoon systems;
- complex state or world models;
- rich camera behavior;
- large GDScript/data architecture;
- gameplay that no longer fits the runner factory.

The engine policy is HYBRID, not "GDevelop for everything".

## 2. Start from product, not code

Before touching the game project, lock a short product brief.

Minimum questions:

- What is the hook in the first 1-2 seconds?
- What does the player do with one thumb / one input?
- What is the expected first-session length?
- What makes the game clearly Plonku rather than a generic web game?
- What data/theme from Plonku does the game reinterpret?
- What is deliberately out of scope?

For Zombie the useful constraints were:

- portrait 9:16;
- one-thumb;
- immediate start;
- typical death around tens of seconds;
- instant retry;
- no account, ads, leaderboard or tutorial wall in MVP.

## 3. Reuse the factory before inventing mechanics

For another runner-like game, instantiate from the existing seed:

```text
node tools/instantiate-runner.mjs <slug> --title "Game title"
```

Then customize through supported contracts rather than editing deep GDevelop JSON manually.

Preferred customization surfaces:

- `runner.json` for title/balance/runtime settings;
- `chunks.json` for level composition;
- slot-based skin manifests for art;
- game-local assets;
- shared tooling for export, preview and regression.

Do not fork Zombie Runner as the starting point for a new client. Instantiate from the template.

## 4. Graphics workflow

### A. Concept / art direction

First create one or two strong visual concepts outside the game implementation.

The successful sequence was:

1. inspect current game screenshot;
2. inspect real Plonku visual language;
3. generate a polished target mockup / style board;
4. translate the mockup into a written style contract;
5. only then implement assets and UI.

For Plonku the validated language is:

- neon-editorial;
- data-punk;
- cyber-grunge;
- humor first, slight tension second;
- dark background;
- lime / hot pink / cyan accents;
- large editorial titles;
- small framed data labels;
- visual references to real place/data without becoming a tourist poster.

Canonical Zombie style doc:

`games/zombie-runner/PLONKU-STYLE.md`

### B. Where assets are generated

Game-specific product art belongs under:

```text
games/<slug>/assets/<skin>/
```

Do not put product-specific art into the shared factory pack.

The repo already contains examples/tools used during Zombie production:

- `tools/build-plonku-art.py`
- `tools/generate-plonku-ui.py`
- `tools/generate-wroclaw-v1-art.py`
- `tools/generate-wroclaw-v1-audio.py`

Treat these as production helpers/examples, not mandatory universal generators.

For new games, the preferred model is:

- ChatGPT/image generation for moodboards, concepts and target visuals;
- Codex/Python tooling for deterministic export-ready sprites/UI when practical;
- human review of the result in the actual game;
- iterate until the in-game visual matches the accepted concept closely enough.

### C. Asset contract

Use semantic slots, not raw resource names.

Typical runner slots include:

- player idle/run/jump/dead;
- hazard 01/02/03;
- background far/near;
- ground;
- jump button;
- optional logo/power-up.

Apply with the shared skin tooling. Required slots should fail closed if missing.

## 5. Gameplay workflow

### Keep mechanics small

The strongest lesson from Zombie: do not add systems until the core loop is fun and testable.

Preferred MVP loop:

```text
Preparing -> Playing -> Dead -> instant retry
```

Start with:

- one input;
- 3-5 hazard types;
- short chunks;
- score;
- difficulty progression;
- no menu complexity unless product needs it.

### Use chunks instead of hand-building long levels

Store level patterns in `chunks.json` and synchronize through tooling.

Chunk groups should have intentional difficulty, e.g.:

- EASY;
- MEDIUM;
- HARD.

Keep safe entry/exit space and validate impossible combinations.

### Tune through config

Prefer changing values in `runner.json` instead of nested event-sheet edits.

Examples:

- obstacle speed;
- spawn delay;
- score prefix/title;
- safe client-specific runtime values.

If a new game requires repeated direct edits to large nested GDevelop JSON, first consider whether that setting should be promoted to config.

## 6. Data-driven Plonku games

For future games, data should ideally affect gameplay, not only decoration.

Recommended pattern:

```text
Plonku data/theme
    -> derived score / factors
    -> gameplay parameters
    -> player experience
    -> result / comparison / share
```

Example principle discovered during Zombie:

- overall score can control base difficulty;
- separate factors can control the *type* of difficulty.

This lets two entities with a similar overall score feel different in play.

Do not force data into every mechanic. Use a small number of understandable mappings that a player can feel.

## 7. Development / test mode

Every reusable game should have a development mode that is invisible in production.

Useful controls already proven:

- invincibility;
- speed/time scale;
- jump tuning;
- difficulty selection;
- chunk cycling;
- reset;
- dev HUD.

Use `?dev=1` or equivalent and ensure production mode does not expose debug UI.

## 8. Regression is mandatory

Do not accept a worker PASS based only on build/export.

The runner regression harness exists because a retry bug previously passed implementation review but failed repeated real cycles.

Run:

```text
node tools/runner-regression.mjs --game games/<slug>
```

Expected success marker:

```text
RUNNER_REGRESSION: PASS
```

Minimum regression expectations for runner clients:

- export succeeds;
- Preparing -> Playing;
- death -> Dead;
- repeated in-place retries without reload;
- score resets;
- hazards/chunks do not accumulate stale state;
- dev mode is absent in normal mode;
- portrait viewport loads;
- invalid/broken fixture fails non-zero.

## 9. Export and preview

### Web export

From repo root with GDevelop closed:

```text
node tools/gdevelop-web-export.mjs --game games/<slug>
```

Success marker:

```text
WEB_EXPORT: PASS
```

Build output is game-local and ignored by git.

### LAN/mobile preview

```text
node tools/preview-lan.mjs --game games/<slug>
```

Use browser emulation during development, but a physical phone remains the final interaction gate before calling a mobile product ready.

Check especially:

- one-thumb reach;
- browser scroll vs game tap;
- safe top/bottom insets;
- readable score/UI;
- audio starting only after user gesture where browser policy requires it;
- landscape is allowed to degrade if portrait is the declared product.

## 10. Handoff to Plonku

The game repo owns the game source. The Plonku site consumes a static package.

For Zombie the reusable pattern is:

```text
node tools/package-plonku-handoff.mjs --game games/<slug>
```

Expected model:

```text
dist/plonku-handoff/<slug>/
```

The entire directory is deployed as one unit. Do not copy only `index.html` and do not mix GDevelop runtime siblings from multiple games.

A game should ship a small machine-readable handoff manifest describing at minimum:

- slug;
- display title;
- orientation/resolution;
- entry file;
- export command;
- package command;
- icon/thumbnail;
- source/version/build identity;
- any runtime notes.

Zombie reference:

- `games/zombie-runner/HANDOFF.md`
- `games/zombie-runner/plonku-handoff.json`

## 11. Plonku site integration model

Do not rebuild GDevelop inside React/Next.

Preferred architecture:

```text
Plonku page/wrapper
    -> responsive iframe
    -> same-origin static game directory
```

Example target shape:

```text
/gra/<slug>
/games/<slug>/index.html
```

The website repo owns:

- wrapper page;
- Plonku navigation/card/CTA;
- responsive iframe behavior;
- discoverability from related experiments;
- production release and rollback.

The game repo owns:

- gameplay;
- art/audio;
- GDevelop project;
- regression/export;
- static handoff package.

Keep that boundary explicit.

## 12. Task / Codex workflow

Use manual tasks in:

```text
docs/codex-manual-tasks/
```

Rules that worked well:

- one bounded task at a time;
- larger goals may contain a clear chain;
- fresh worker/session per task when possible;
- exact PASS continues;
- FAIL/BLOCKED/OPERATOR_ACTION_REQUIRED/INCONCLUSIVE/missing evidence -> STOP;
- ChatGPT reviews repository evidence, not only worker prose;
- production deployment is a separate final gate with rollback.

ChatGPT should do directly:

- research;
- product reasoning;
- audits;
- visual concepts;
- task design;
- GitHub docs/workflow changes;
- final acceptance review.

Codex should do heavier implementation/testing work.

## 13. Proven reusable sequence

For the next small Plonku game, use this default sequence:

1. **Theme/data audit** — identify a Plonku topic that can become a game.
2. **Game concept** — one clear mechanic and one sentence hook.
3. **Engine gate** — runner/factory fit? If yes GDevelop; if no reassess Godot/other.
4. **Instantiate** — create independent client from template.
5. **Product brief** — session, input, score, tone, out-of-scope.
6. **Visual concept** — generate target mockup/style board before implementation.
7. **Style contract** — palette/type/UI/world rules.
8. **Art + UI pass** — game-local assets through semantic slots.
9. **Gameplay/chunks tuning** — config first, event-sheet edits only when truly necessary.
10. **Regression** — same automated harness plus negative check.
11. **Mobile physical pass** — hard gate.
12. **Handoff package** — static self-contained web directory.
13. **Site wrapper** — separate VGE/Plonku integration goal.
14. **Candidate + production release** — live smoke and rollback evidence.
15. **Post-launch review** — decide whether the mechanic/data coupling is worth repeating.

## 14. What not to repeat

Avoid these mistakes from early experimentation:

- spending time building a universal factory before proving one real product;
- accepting build success as gameplay QA;
- changing many things directly in nested GDevelop JSON;
- treating a city/theme as only a label/skin when data could influence gameplay;
- producing art before the target visual direction is agreed;
- copying another game client as a seed instead of using the template;
- mixing game runtime files with site application code;
- deploying before a bounded candidate/live smoke gate.

## 15. Definition of success for the next experiment

A new game is a successful Plonku experiment when:

- the hook is understandable within seconds;
- the game looks recognizably Plonku;
- the data/theme has an understandable relationship to gameplay;
- it works on a real phone;
- export/regression are reproducible;
- it can be packaged and embedded without special backend work;
- adding it to Plonku does not require copying the game engine into the site repo;
- the whole experiment can be repeated faster than Zombie because this playbook and factory already exist.
