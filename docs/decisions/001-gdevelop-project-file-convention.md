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

Inspected 2026-09-05:

| Tool | Result |
| --- | --- |
| GDevelop desktop / CLI (`gdevelop`, `GDevelop.exe`) | **Not installed** (PATH, Start Menu, uninstall registry, `F:\nodejs` npm globals) |
| Node.js | `v24.15.0` at `F:\nodejs\node.exe` |
| npm | `12.0.1` |

Until GDevelop 5 is installed (free download from [gdevelop.io](https://gdevelop.io)):

1. **Open** — File → Open → `games/zombie-runner/zombie-runner.json` (file appears in task 002).
2. **Preview** — editor Preview (keyboard/touch as available in the editor). Headless preview is not available without the editor.
3. **Export** — editor Export → HTML5 into `games/zombie-runner/export/web`. Recent GDevelop builds also support `--run-command EXPORT_HTML5_EXTERNAL` for CI; that path is **unverified** here because the editor is missing.

Do not treat a copy under `export/`, Desktop, or another folder as canonical source.

## Consequences

- Task 002 must import the baseline into this path only.
- Later tasks must not introduce a second `.json` project as a competing canonical file.
- Operator should install GDevelop 5 locally before preview/export work (task 003).
