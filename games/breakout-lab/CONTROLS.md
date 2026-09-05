# Breakout Lab — controls (041)

## Orientation

Keep **landscape 1920×1080** (`adaptGameResolutionAtRuntime`). Portrait 9:16 letterboxes a wide table; forcing 540×960 made the playfield worse. Mobile phones can rotate to landscape. Emulated 360×800 / 390×844 / 540×960 still boot (letterboxed).

## Pointer / thumb

While `NotStarted` or `GamePlay`, paddle X follows the cursor/touch (`getCursorX`), clamped to the game width. Keyboard A/Left and D/Right still work (example TopDown). Canvas `touch-action: none` to reduce parent scroll stealing.

## Start / restart

- Space or left-click launches (`NotStarted` → `GamePlay`).
- **R** or Replay (example) restarts the Game scene without reloading the page.

## Preview

```text
node tools/gdevelop-web-export.mjs --game games/breakout-lab
node tools/preview-lan.mjs --game games/breakout-lab
```

Open `http://<lan-ip>:8765/` from a phone. Physical device is not a hard gate for this lab task.
