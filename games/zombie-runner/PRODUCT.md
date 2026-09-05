# Zombie Runner — Wrocław — product brief (GOAL 004 / task 019)

Locked direction for tasks 020–025. Do not reopen identity questions in later tasks unless a blocker appears.

**Slug:** `zombie-runner`  
**Display title:** Zombie Runner — Wrocław  
**Platform:** portrait HTML5, one-thumb, Plonku web embed later (not in this goal)  
**Engine:** GDevelop client on Runner Factory v2 (`runner.json`, slots, shared pack for unused placeholders only)

## Player and session

| Item | Lock |
| --- | --- |
| Player | Casual phone user, one thumb, no tutorial wall |
| Session | Typical first-session death at **20–35 seconds**; retry in **under 1 second** |
| Score | Survival time (keep time-based integer; HUD prefix `Wrocław`) |
| Depth | Endless; EASY → MEDIUM → HARD chunks, never a menu |

## Hook (first 1–2 seconds)

The first painted frame must already be **Wrocław at dusk + a cartoon zombie**, not a desert dino. Copy on start: title + one line “Tap to run”. On start of Playing, a **ground hazard appears within ~1.0–1.5 s** so the player learns jump immediately. No logo splash, no name-entry, no leaderboard.

## Fantasy and tone

You are a slightly undead night-shift local jogging home. **Fun / viral / slapstick**, not horror. Round shapes, torn hoodie, pale green-gray skin, no blood, no viscera, no rotting faces. Readable at 540 px wide.

## Wrocław identity

**Use (original drawings only):**

- Brick tenement / kamienica rhythm on the far skyline
- Gothic **spire pair** (Tumski-like, generic — not a photo, not a branded crest)
- Odra-colored dusk (teal water / amber brick / dirty gold sky)
- City obstacles: bollard or bin; overhead tram-ish bar or hanging sign; wide bike/tram bumper wreck
- Wordmark **Wrocław** on the HUD
- Optional tiny original **krasnal silhouette** as logo only (not a copy of a specific souvenir dwarf)

**Do not use:**

- Franchise zombies or other games’ characters
- Real logos (MPK, clubs, shops, churches as trademarks)
- Photos of identifiable people or copyrighted posters
- Gore, Nazi/WW2 gag imagery, memorials as jokes
- Desert, cactus, dino, duck, “Run Dino Run” look

City references are **silhouette + palette + wordmark**, not a tourist checklist.

## Scoring / fail / retry

1. Preparing → tap/Space → Playing (world auto-scrolls).
2. Score counts up while Playing.
3. Collision → Dead, big **GAME OVER**, score still readable, **Tap to retry**.
4. Retry = in-place `zrSoftReset` (no reload). Same as factory.

No accounts, ads, or leaderboards in MVP.

## Visual direction (task 020)

Bold **cut-out sprites**, 3–5 flat colors, 4–8 px outline, side view. Prefer silhouette over detail.

| Slot | Product meaning | Survive by |
| --- | --- | --- |
| `player_*` | Cartoon Wrocław zombie (hoodie) | — |
| `hazard_01` | Ground city clutter (bollard/bin) | Jump |
| `hazard_02` | Overhead bar / hanging sign | Stay low |
| `hazard_03` | Wide wreck (bikes / bumper) | Jump early |
| `background_far` | Dusk skyline + water | — |
| `background_near` | Optional wires; empty OK if unused in project | — |
| `ground` | Cobble / brick sidewalk | — |
| `jump_button` | Large round thumb button | — |
| `logo_optional` | Compact wordmark / krasnal mark | — |

Integrate **only** via `skins/wroclaw-v1` slot ids. Client files live under `games/zombie-runner/assets/wroclaw-v1/` (game-local overrides; do not dump product art into the shared factory pack).

## Audio direction (task 022)

Replace desert/leaderboard loops. MVP: **original or clearly permissive** jump + death SFX and a short non-desert loop, **plus a mute control**. If a loop cannot be cleared for rights, ship SFX-only and document silence for music. No licensed pop songs.

## Mobile-first (task 023)

Portrait 9:16, tap-anywhere jump + visible button, score in a safe top inset, button above home indicator. Physical phone is a **hard gate**.

## What is not the placeholder runner

A stranger must see **zombie + brick city at night**, not “dino in a desert with Wrocław in the HUD”. Placeholder MIT pack may remain on disk as factory baseline but **must not appear** in the normal Game loop after 020.

## MVP-ready vs later

**MVP (020–025):** original slot skin, 20–35 s pacing, product HUD/GO/retry, mute, no Intro/Leaderboard in the player path, phone pass, web handoff manifest.

**Later (not this goal):** PL/EN copy, extra chunks, haptics, collectible krasnale, store icons beyond handoff, Plonku site iframe wiring.

## Placeholder debt to remove (inspect 2026-09-05)

| Surface | Current debt |
| --- | --- |
| Player frames | `Dino_Idle/Run/Jump/Dead` from shared pack |
| Hazards | Cactus, duck island, skeleton |
| World | Desert background, desert 9-patch / sand tiles |
| Audio | `DesertMusic.mp3`, `LeaderboardMusic.mp3` |
| Skin | `wroclaw-v1` empty slots → restores dino baseline |
| Scenes | `Intro` + `Leaderboard` still in JSON (`firstLayout` is already `Game`) |
| Copy | README/GAMEPLAY still say “placeholder / Run, Dino run” |
| UI | Example jump/restart buttons, tutorial duck sprites if they flash |
| Thumbnail | `thumbnail-game.png` desert |

Logic object names (`CactusObstacle`, `Dino`, …) may stay; **pixels and player-facing copy** must not.

## Acceptance checklist for 020–025

| Task | Must prove |
| --- | --- |
| 020 | Slot skin applies; Game loop has no dino/desert pixels; provenance; export + regression |
| 021 | Speed/chunks/jump tuned to 20–35 s typical death; all groups usable; factory clients still PASS if template touched |
| 022 | Start/score/GO/retry identity; mute if audio; no leaderboard/demo UI in the path; export + regression |
| 023 | Viewport set + **physical phone** (or `OPERATOR_ACTION_REQUIRED`) |
| 024 | Handoff docs + machine-readable manifest; no Plonku site deploy |
| 025 | Decision `ACCEPTED — ready for Plonku integration` |
