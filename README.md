# Plonku Game Lab

Experimental game-production lab focused on building a fast, repeatable workflow for simple web/mobile games.

## First experiment

Build **Zombie Runner — Wrocław** in GDevelop, then extract a reusable runner template and prove it by creating a second game.

## Working model

- development/control branch: `ai-control`
- manual Codex tasks: `docs/codex-manual-tasks/`
- execute tasks in ascending numeric order
- one task at a time
- every task creates a matching `-RESULT.md`
- ChatGPT reviews repository evidence before dependent work is accepted

See `.ai/WORKFLOW.md` for the full contract.

## Repository layout

```text
games/zombie-runner/   canonical GDevelop project (see games/zombie-runner/README.md)
tools/                 shared scripts; machine-local binaries stay in tools/local/
docs/decisions/        architecture decision records
docs/codex-manual-tasks/  numbered tasks and -RESULT.md files
```

Canonical project file: `games/zombie-runner/zombie-runner.json` (created in task 002).
Preview/export workflow: `docs/decisions/001-gdevelop-project-file-convention.md`.

## Initial task chain

1. `001` — GDevelop toolchain preflight
2. `002` — import Endless Runner baseline
3. `003` — reproducible web export
4. `004` — Zombie Runner vertical slice
5. `005` — Level Chunk System v1
6. `006` — Dev/Test Mode
7. `007` — mobile preview and input hardening
8. `008` — game state, UI and restart flow
9. `009` — Asset/Reskin Contract v1
10. `010` — extract Runner Template v1
11. `011` — second game factory test
12. `012` — GDevelop vs Godot benchmark and GO/NO-GO

## Safety

No paid services, public deployment, app-store publication, or secret material unless explicitly authorized in a task.
