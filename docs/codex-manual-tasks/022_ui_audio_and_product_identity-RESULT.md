# 022 — UI, audio and product identity — RESULT

## Status

PASS

## Changes

- Start HUD: `runner.json` title + `Tap to run · U mutes audio`; ScoreText brick color, size 32, outline, safe-area `y=72`.
- Game over: `GAME OVER` / `Tap to retry` / score prefix (via `SCORE_DEAD_EXPR`).
- Jump button moved to `y=710` for thumb/home-indicator clearance.
- Tutorial sprites parked off-screen so they cannot flash.
- Original procedural audio: jump, death, dusk loop; Intro/Leaderboard music volume 0 and `LeaderboardMusic` → silence wav.
- Mute: `U` toggles `localStorage zr-muted` and `setGlobalVolume` in shared chunk runtime (needed so mute works after catalog sync).
- `firstLayout` remains `Game`. Intro/Leaderboard layouts kept in JSON but are not the player path.

## Provenance

`games/zombie-runner/assets/wroclaw-v1/PROVENANCE.md` (art + `audio/*.wav`). Generator: `tools/generate-wroclaw-v1-audio.py`.

## Validations

| Check | Outcome |
| --- | --- |
| Zombie `RUNNER_REGRESSION` (export) | PASS |
| Traffic Dash / Pigeon Dash regression | PASS (catalog mute hook) |
| No analytics/ads/login | Yes |

## Files changed

- `templates/runner-v1/runtime/chunk-runtime.template.js` (mute)
- `tools/runner-config.mjs`, `tools/generate-wroclaw-v1-audio.py`
- Zombie `runner.json`, project JSON, audio files; factory clients’ inlined JsCode
- RESULT

## Known limitations

- Mute is keyboard `U` (and persists). No extra settings screen.
- WAV loops are simple tones, not licensed music.
- Intro/Leaderboard scene nodes still exist in the GDevelop file; they are not the start layout.

## Commit SHA

Implementation: `32b8dd8299b992dfda4fa5f16ec156353c7d799c`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
