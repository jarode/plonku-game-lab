# tools

Repo helpers. Machine-local GDevelop binaries stay in `F:\gry\GDevelop-5` (or `tools/local/`), not in git.

## Web / HTML5 export (task 003)

Safest automated path on this machine: GDevelop 5.6.281 portable CLI, command `EXPORT_HTML5_EXTERNAL` (no cloud export).

From the repository root, with GDevelop **closed**:

```text
node tools/gdevelop-web-export.mjs
```

Smoke-check an existing export without running GDevelop:

```text
node tools/gdevelop-web-export.mjs --smoke-only
```

Optional env:

- `GDEVELOP_HOME` — folder that contains `GDevelop.exe` (default `F:\gry\GDevelop-5`)
- `GDEVELOP_EXE` — full path to `GDevelop.exe`

Output directory (gitignored): `games/zombie-runner/build/`

The script prints `WEB_EXPORT: PASS` or `WEB_EXPORT: FAIL` and exits 0 or 1.
