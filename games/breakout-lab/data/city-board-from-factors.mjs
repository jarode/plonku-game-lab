import crypto from "node:crypto";
import { cityProfileToBoardInput, FACTOR_KEYS } from "./city-profile-adapter.mjs";

export { FACTOR_KEYS };

const COLS = 8;
const ROWS = 5;
const MIN_BRICKS = 8;
const MAX_BRICKS = 28;

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

/** Keep extremes playable without treating missing as zero (caller already parsed). */
export function playableFactors(values) {
  const density = clamp(values[0], 22, 100);
  const forest = clamp(values[1], 0, 100);
  const dwellings = clamp(values[2], 20, 100);
  const entities = clamp(values[3], 0, 100);
  return [density, forest, dwellings, entities];
}

export function corridorColumns(forest) {
  if (forest >= 75) return [1, 4, 6];
  if (forest >= 45) return [2, 5];
  if (forest >= 18) return [3];
  return [];
}

function brickRowCount(dwellings) {
  return clamp(2 + Math.floor(dwellings / 40), 2, 4);
}

function hpFromEntities(entities) {
  return 1 + Math.min(2, Math.floor(entities / 34));
}

function clusterStride(entities) {
  if (entities >= 70) return 2;
  if (entities >= 40) return 4;
  return 0;
}

function occupy(density, r, c) {
  const token = (c * 13 + r * 29) % 100;
  return token < density;
}

function emptyGrid() {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => null));
}

function countBricks(cells) {
  return cells.reduce((n, row) => n + row.filter(Boolean).length, 0);
}

function fillMinimum(cells, corridors, hp, need) {
  for (let r = 0; r < ROWS - 1 && countBricks(cells) < need; r++) {
    for (let c = 0; c < COLS && countBricks(cells) < need; c++) {
      if (corridors.includes(c) || cells[r][c]) continue;
      cells[r][c] = { hp };
    }
  }
}

function trimMaximum(cells, max) {
  for (let r = ROWS - 2; r >= 0 && countBricks(cells) > max; r--) {
    for (let c = COLS - 1; c >= 0 && countBricks(cells) > max; c--) {
      if (cells[r][c]) cells[r][c] = null;
    }
  }
}

/**
 * City-breaker geometry from a 4-factor profile (or {id,values}).
 * Bottom brick row (index 4) stays empty so the ball has an opening.
 */
export function cityBoardFromProfile(profile) {
  const parsed = cityProfileToBoardInput(profile);
  const raw = parsed.values;
  const [density, forest, dwellings, entities] = playableFactors(raw);
  const corridors = corridorColumns(forest);
  const rowsUsed = brickRowCount(dwellings);
  const hp = hpFromEntities(entities);
  const stride = clusterStride(entities);
  const cells = emptyGrid();

  for (let r = 0; r < rowsUsed; r++) {
    for (let c = 0; c < COLS; c++) {
      if (corridors.includes(c)) continue;
      if (!occupy(density, r, c)) continue;
      let cellHp = hp;
      if (stride && (c + r) % stride === 0) cellHp = Math.min(3, hp + 1);
      cells[r][c] = { hp: cellHp };
    }
  }

  fillMinimum(cells, corridors, hp, MIN_BRICKS);
  trimMaximum(cells, MAX_BRICKS);

  const brickCount = countBricks(cells);
  const debug = {
    rawValues: raw,
    playable: { density, forest, dwellings, entities },
    populationDensity: { occupyThreshold: density, note: "higher → more occupied cells" },
    forestCover: { corridorColumns: corridors, note: "higher → more vertical openings" },
    dwellingsPer1000: { brickRows: rowsUsed, note: "higher → more vertical mass (row 4 always clear)" },
    entitiesPer1000: { hp, clusterStride: stride, note: "higher → tougher / clustered HP" },
  };

  const body = {
    id: parsed.id,
    columns: COLS,
    rows: ROWS,
    cells,
    brickCount,
    mapping: "city-breaker-v1",
    paddleWidthScale: Math.max(0.8, Math.min(1.1, 1.08 - density / 400)),
    debug,
  };
  const signature = crypto.createHash("sha256").update(JSON.stringify({ cells, columns: COLS, rows: ROWS })).digest("hex");
  return { ...body, signature };
}
