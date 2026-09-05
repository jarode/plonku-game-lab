# Zombie Runner

Canonical GDevelop 5 source: **`games/zombie-runner/zombie-runner.json`**

**Zombie Runner — Wrocław** is the Plonku product client on Runner Factory v2. Product lock: `PRODUCT.md`. Placeholder dino/desert art is debt for GOAL 004 (tasks 020+), not the shipping look.

## Open and run locally

GDevelop 5.6.281 portable: `F:\gry\GDevelop-5\GDevelop.exe` (not in git).

1. File → Open → `games/zombie-runner/zombie-runner.json`.
2. Preview the **Game** scene (start layout).
3. **Space** or tap to jump. After game over, Space or tap retries.

HTML5 export from the repo root (GDevelop closed):

```text
node tools/gdevelop-web-export.mjs
```

Success: `WEB_EXPORT: PASS`. See `tools/README.md`.

LAN phone preview: `node tools/preview-lan.mjs` (see `MOBILE-PREVIEW.md`).

Do not add a second `.json` project in this folder.

Reusable runner seed for new games: `templates/runner-v1/` (`node tools/instantiate-runner.mjs <slug>`). Do not copy this Wrocław client as a template.
