# Dev / test mode

Enabled **only** when the HTML5 URL contains `dev=1`:

```text
http://127.0.0.1:8765/index.html?dev=1
```

Without that query, Invincible stays 0, time scale is 1, and `DevHud` is hidden.

## Keys (same ObstacleSpeed / PlatformerObject jump as the player game)

| Key | Action |
| --- | --- |
| I | Toggle invincibility |
| 1 / 2 / 3 | Time scale 0.5x / 1x / 2x |
| PageUp / PageDown | Scroll/world speed (`ObstacleSpeed`) |
| Numpad +/- | Jump power |
| E / M / H | Restart from EASY / MEDIUM / HARD chunk group |
| N | Restart from the next named chunk |
| R | Restart current test (reload Game scene) |

Disable: open the same build without `?dev=1`.
