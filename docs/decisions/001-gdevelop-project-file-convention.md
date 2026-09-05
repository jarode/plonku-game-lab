# ADR 001 — GDevelop project-file convention

Status: accepted  
Date: 2026-09-05

## Decision

There is one canonical GDevelop 5 project for Zombie Runner:

```text
games/zombie-runner/zombie-runner.json
```

Assets and (after enabling multiple-file save) scene/event/layout/extension files live in the same directory. Generated exports go to `games/zombie-runner/export/` and are not committed.

## Why

GDevelop 5 stores a game as JSON. A single project file avoids competing sources of truth. Multiple-file mode (Project properties) is the GDevelop-recommended git layout: scenes and events become separate files instead of one giant JSON rewrite on every save.

## Local preview / export (truthful for this machine)

Inspected 2026-09-05 (updated in task 002):

| Tool | Result |
| --- | --- |
| GDevelop 5.6.281 portable | `F:\gry\GDevelop-5\GDevelop.exe` (downloaded from GitHub Releases; not committed) |
| Node.js | `v24.15.0` at `F:\nodejs\node.exe` |
| npm | `12.0.1` |

1. **Open** — File → Open → `games/zombie-runner/zombie-runner.json`.
2. **Preview** — editor Preview.
3. **Export** — `GDevelop.exe --disable-update-check --run-command EXPORT_HTML5_EXTERNAL <project.json>` writes `games/zombie-runner/build/` (gitignored). Verified in task 002.

Do not treat a copy under `export/`, Desktop, or another folder as canonical source.

## Consequences

- Task 002 must import the baseline into this path only.
- Later tasks must not introduce a second `.json` project as a competing canonical file.
- GDevelop 5.6.281 portable lives on `F:\gry\GDevelop-5` and stays out of git.
