# Zombie Runner

Canonical GDevelop 5 source: **`games/zombie-runner/zombie-runner.json`**

**Zombie Survival Score / WROCŁAW** — Plonku product client on Runner Factory v2. Locks: `PRODUCT.md`, `NAMING.md`, `COPY.md`. Handoff: `HANDOFF.md`.

## Open and run locally

GDevelop 5.6.281 portable: `F:\gry\GDevelop-5\GDevelop.exe` (not in git).

1. File → Open → `games/zombie-runner/zombie-runner.json`.
2. Preview the **Game** scene (`firstLayout`).
3. **ROZPOCZNIJ GRĘ** or Space starts. Jump: Space / tap / button. After game over: Space, R, or tap retry (not city chrome). **U** mutes.

HTML5 export from the repo root (GDevelop closed):

```text
node tools/gdevelop-web-export.mjs --game games/zombie-runner
```

Success: `WEB_EXPORT: PASS`. See `tools/README.md`.

Regression: `node tools/runner-regression.mjs --game games/zombie-runner --viewport 360x800`

LAN phone preview: `node tools/preview-lan.mjs` (see `MOBILE-PREVIEW.md`). Do not open LAN preview in the Cursor browser (looping music).

Plonku embed contract: `HANDOFF.md` / `plonku-handoff.json`.

Do not add a second `.json` project in this folder.

Reusable runner seed for new games: `templates/runner-v1/` (`node tools/instantiate-runner.mjs <slug>`). Do not copy this Wrocław client as a template.
