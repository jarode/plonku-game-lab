import crypto from "node:crypto";

const ROWS = 5;
const MIN_LEN = 4;
const MAX_LEN = 16;
const ID_RE = /^[a-z0-9-]{1,64}$/;

export class BoardContractError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = "BoardContractError";
  }
}

export function parseBoardInput(raw) {
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) {
    throw new BoardContractError("not_object", "input must be a JSON object");
  }
  if (typeof raw.id !== "string" || !ID_RE.test(raw.id)) {
    throw new BoardContractError("bad_id", "id must match [a-z0-9-]{1,64}");
  }
  if (!Object.prototype.hasOwnProperty.call(raw, "values")) {
    throw new BoardContractError("missing_values", "values is required");
  }
  if (!Array.isArray(raw.values)) {
    throw new BoardContractError("values_not_array", "values must be an array");
  }
  if (raw.values.length < MIN_LEN || raw.values.length > MAX_LEN) {
    throw new BoardContractError("values_length", "values length must be 4–16");
  }
  const values = [];
  for (let i = 0; i < raw.values.length; i++) {
    const v = raw.values[i];
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new BoardContractError("values_not_finite", `values[${i}] must be a finite number (null/missing not allowed)`);
    }
    if (v < 0 || v > 100) {
      throw new BoardContractError("values_range", `values[${i}] must be in [0, 100]`);
    }
    values.push(v);
  }
  return { id: raw.id, values };
}

function cellFor(value, row) {
  if (value < 15) return null;
  const need = 15 + row * 17.5;
  if (value < need) return null;
  const hp = 1 + Math.min(2, Math.floor(value / 34));
  return { hp };
}

export function boardFromInput(raw) {
  const input = parseBoardInput(raw);
  const columns = input.values.length;
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < columns; c++) {
      const cell = cellFor(input.values[c], r);
      row.push(cell);
    }
    cells.push(row);
  }
  const mean = input.values.reduce((a, b) => a + b, 0) / columns;
  const bonusSlots = input.values.filter((v) => v >= 90).length;
  const brickCount = cells.reduce(
    (n, row) => n + row.filter(Boolean).length,
    0
  );
  const body = {
    id: input.id,
    columns,
    rows: ROWS,
    cells,
    brickCount,
    bonusSlots,
    ballSpeed: 320 + Math.round(mean * 1.6),
    paddleWidthScale: Math.max(0.75, Math.min(1.15, 1.15 - mean / 400)),
  };
  const signature = crypto.createHash("sha256").update(JSON.stringify(body)).digest("hex");
  return { ...body, signature };
}
