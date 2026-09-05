# Breakout Lab — data-to-board contract v1

Neutral structured input. No city, ranking, or production API. Later Plonku series can supply the same `values` array.

## Schema

JSON object:

| Field | Rule |
| --- | --- |
| `id` | string, `[a-z0-9-]{1,64}` |
| `values` | array of numbers, length **4–16**, each finite and in **[0, 100]** |

`0` is a real corridor (empty column contribution). **Missing** `values`, non-array, `null` holes, `NaN`, out-of-range, or wrong length → **reject**. Do not coerce missing to 0.

## Mapping (board shape, not just color)

Fixed **5 rows**. **Columns** = `values.length`.

For column `c` and row `r` (0 = top):

- If `values[c] < 15` → empty (gap).
- Else if `values[c] < 15 + r * 17.5` → empty (density falls off downward).
- Else brick with `hp = 1 + min(2, floor(values[c] / 34))` (1–3).

Secondary (difficulty, not shape):

- `ballSpeed = 320 + round(mean(values) * 1.6)`
- `paddleWidthScale = clamp(1.15 - mean(values)/400, 0.75, 1.15)`
- `bonusSlots = count(values[c] >= 90)`

Same input → same `cells` grid and SHA-256 `signature` of canonical JSON.

## Fixtures

| id | Intent |
| --- | --- |
| `sparse-low` | Top-row crumbs only (playable, mostly gaps) |
| `dense-high` | Almost full high HP |
| `balanced-mid` | 4 stepped columns |
| `mixed-corridor` | Alternating low/high |
| `mixed-spike` | One 100 among zeros |

Invalid examples live in `data/invalid/` for tests only.
