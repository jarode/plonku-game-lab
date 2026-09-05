# 001 — GDevelop toolchain preflight

## Goal

Establish a clean, reproducible local baseline for building GDevelop games in this repository.

This is the first implementation task in the chain.

## Scope

1. Inspect the repository and local toolchain available to Codex.
2. Confirm how the canonical GDevelop project will be stored and edited.
3. Create the initial source structure:

```text
games/
  zombie-runner/
tools/
docs/decisions/
```

4. Add a concise decision note describing the chosen GDevelop project-file convention and the expected local preview/export workflow.
5. Add/update `.gitignore` so generated exports, caches, temporary files, and local-only tooling artifacts are not committed.
6. Do not import a game template yet; that belongs to task 002.

## Constraints

- Work on `ai-control`.
- Do not deploy or publish anything.
- Do not add paid dependencies or services.
- Do not create multiple competing canonical GDevelop project files.

## Acceptance criteria

PASS only if:

- repository structure is present and documented;
- the expected GDevelop project file location is explicit;
- `.gitignore` covers generated/local artifacts;
- the local workflow for opening/previewing/exporting the project is documented truthfully based on available tooling;
- no unrelated files are changed.

## Result

Create `001_gdevelop_toolchain_preflight-RESULT.md` with status, changes, validation evidence, limitations, and commit SHA. Stop after push.
