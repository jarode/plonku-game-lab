# AI development workflow

Project: `plonku-game-lab`

Control branch: `ai-control`

## Primary execution mode

Use manual Codex tasks stored in:

```text
docs/codex-manual-tasks/<NNN>_<task-name>.md
```

Codex executes exactly one task at a time, in ascending numeric order, unless ChatGPT explicitly authorizes otherwise.

For every task Codex must create a matching result file:

```text
docs/codex-manual-tasks/<NNN>_<task-name>-RESULT.md
```

The result must state `PASS`, `FAIL`, `BLOCKED`, or `OPERATOR_ACTION_REQUIRED`, list validations performed, and include the implementation commit SHA when applicable.

Codex worker completion is not final acceptance. ChatGPT reviews GitHub evidence before the next dependent task is accepted.

## Branch safety

1. Work on `ai-control` unless a task explicitly says otherwise.
2. Preserve accepted work from earlier tasks.
3. Do not rewrite history or force-push.
4. Do not modify unrelated files.
5. One task = one bounded implementation scope.
6. Only one active task may modify the canonical GDevelop project file at a time.

## Task planning modes

- **CHAIN** — task depends on an earlier task PASS.
- **GATE** — do not continue until ChatGPT reviews the previous result.
- **BATCH** — only for truly independent documentation or analysis tasks.

Game implementation tasks are CHAIN by default.

## GDevelop project protection

The canonical game source must have one clearly documented project file. Avoid parallel copies becoming competing sources of truth.

If GDevelop rewrites large JSON sections, validate that the change is caused by the intended edit and not accidental project reserialization.

## Validation expectations

When relevant, each task should validate:

- project opens/parses correctly;
- web export/build succeeds;
- automated smoke tests pass;
- keyboard input works;
- touch/mobile input works;
- no broken asset references;
- no unintended files are changed;
- generated build artifacts are kept out of source control unless explicitly required.

## Safety defaults

Unless a task explicitly authorizes otherwise:

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```

Do not purchase assets, use paid APIs, publish to app stores, or deploy publicly without explicit authorization.

## Result contract

Each `-RESULT.md` must contain:

1. status;
2. summary of changes;
3. files changed;
4. validations run and outcomes;
5. known limitations;
6. commit SHA;
7. operator actions required, if any.

Stop after producing the result and pushing the task commit(s). Do not automatically begin the next numbered task.
