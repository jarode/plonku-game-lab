/**
 * CITY BREAKER 2012 adapter (047).
 * Four approved VGE-normalized factors → GOAL 007 `{ id, values }`.
 * No network. Missing factors never become 0.
 */
import { parseBoardInput, BoardContractError } from "./board-from-input.mjs";

export { BoardContractError };

/** Stable order = values[0..3]. */
export const FACTOR_KEYS = [
  "populationDensity",
  "forestCover",
  "dwellingsPer1000",
  "entitiesPer1000",
];

const ID_RE = /^[a-z0-9-]{1,64}$/;

function requireFinite01to100(v, path) {
  if (typeof v !== "number" || !Number.isFinite(v)) {
    throw new BoardContractError("values_not_finite", `${path} must be a finite number (null/missing not allowed)`);
  }
  if (v < 0 || v > 100) {
    throw new BoardContractError("values_range", `${path} must be in [0, 100]`);
  }
  return v;
}

/**
 * @param {object} profile
 *   { id, factors: { populationDensity, forestCover, dwellingsPer1000, entitiesPer1000 } }
 *   or already { id, values } (passthrough via parseBoardInput)
 * @returns {{ id: string, values: number[] }}
 */
export function cityProfileToBoardInput(profile) {
  if (profile == null || typeof profile !== "object" || Array.isArray(profile)) {
    throw new BoardContractError("not_object", "profile must be a JSON object");
  }
  if (Object.prototype.hasOwnProperty.call(profile, "values") && !Object.prototype.hasOwnProperty.call(profile, "factors")) {
    return parseBoardInput({ id: profile.id, values: profile.values });
  }
  if (typeof profile.id !== "string" || !ID_RE.test(profile.id)) {
    throw new BoardContractError("bad_id", "id must match [a-z0-9-]{1,64}");
  }
  if (!Object.prototype.hasOwnProperty.call(profile, "factors")) {
    throw new BoardContractError("missing_factors", "factors is required");
  }
  const f = profile.factors;
  if (f == null || typeof f !== "object" || Array.isArray(f)) {
    throw new BoardContractError("factors_not_object", "factors must be an object");
  }
  const values = [];
  for (const key of FACTOR_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(f, key)) {
      throw new BoardContractError("missing_factor", `factors.${key} is required`);
    }
    if (f[key] === null) {
      throw new BoardContractError("values_not_finite", `factors.${key} must be a finite number (null/missing not allowed)`);
    }
    values.push(requireFinite01to100(f[key], `factors.${key}`));
  }
  return parseBoardInput({ id: profile.id, values });
}

export function stripProfileMetadata(profile) {
  return cityProfileToBoardInput(profile);
}
