# Zombie Runner

Canonical GDevelop 5 source: **`games/zombie-runner/zombie-runner.json`**

This folder currently holds the unmodified official **Run, Dino run** example (2D endless runner). Zombie art and custom gameplay come in later tasks.

## Provenance

See `PROVENANCE.md`. Upstream license: MIT (`GDevelopApp/GDevelop-examples`).

## Open and run locally

GDevelop 5.6.281 portable is installed at `F:\gry\GDevelop-5\GDevelop.exe` (not in git).

1. Open the editor, File → Open → `games/zombie-runner/zombie-runner.json`.
2. Preview from the editor (play the **Intro** scene, click **Start**, then any key to run).
3. Keyboard: **Up** jump, **Down** duck. Touch: swipe up/down (plus on-screen jump/duck buttons in the Game scene).

Headless HTML5 export (writes `games/zombie-runner/build/`, gitignored). Close GDevelop first, then from the repo root:

```text
node tools/gdevelop-web-export.mjs
```

Success signal: `WEB_EXPORT: PASS` (exit 0). Failure: `WEB_EXPORT: FAIL` (exit 1). See `tools/README.md`.

Do not add a second `.json` project in this folder.
