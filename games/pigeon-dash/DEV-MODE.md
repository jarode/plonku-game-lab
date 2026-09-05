# Dev / test mode

Enabled **only** when the HTML5 URL contains `dev=1`.

Without that query, Invincible stays 0, time scale is 1, and `DevHud` is hidden.

| Key | Action |
| --- | --- |
| I | Toggle invincibility |
| 1 / 2 / 3 | Time scale 0.5x / 1x / 2x |
| PageUp / PageDown | `ObstacleSpeed` |
| Numpad +/- | Jump power |
| E / M / H | Reload Game from EASY / MEDIUM / HARD |
| N | Reload Game on the next named chunk |
| R | In-place `zrSoftReset` |

Serve: `node tools/preview-lan.mjs --game <dir>` then add `?dev=1`.
