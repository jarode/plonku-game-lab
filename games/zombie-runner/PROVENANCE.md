# Provenance — endless runner baseline

Imported for task 002. Visuals and gameplay are unchanged from upstream except the canonical filename.

## Upstream

| Field | Value |
| --- | --- |
| Name | Run, Dino run |
| Official listing | https://gdevelop.io/game-example/free/run-dino-run |
| Source repo | https://github.com/GDevelopApp/GDevelop-examples |
| Path in repo | `examples/run-dino-run/` |
| Commit | `3294639da3a7c8f079304381b4a08877ea42b9de` (2026-08-27, `main`) |
| License | MIT (repo `package.json` `"license": "MIT"`; README: examples are MIT unless specified otherwise; this example does not specify otherwise) |
| Why this example | Official free GDevelop 2D endless runner: auto-run, jump/duck, hazards, score, keyboard and touch. Fits later 2D Zombie Runner work better than the 3D starter. |

## Mapping

- `examples/run-dino-run/run-dino-run.json` → `games/zombie-runner/zombie-runner.json`
- `examples/run-dino-run/assets/` → `games/zombie-runner/assets/`
- `examples/run-dino-run/README.md` → `games/zombie-runner/UPSTREAM-README.md`
- `examples/run-dino-run/preview.png` → `games/zombie-runner/preview.png`

No paid assets. Leaderboard UI in the example may call GDevelop's free leaderboard service at runtime; that is upstream behavior, not a new paid dependency added here.
