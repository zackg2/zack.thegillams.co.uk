// @ts-check

export const TPS = 10;
/**
 *
 * @param {number} low
 * @param {number} high
 * @returns
 */
export function rand(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

/** @typedef {{laneno: number, x: number, w: number}} Hitbox */
/**
 *
 * @param {Hitbox} a
 * @param {Hitbox} b
 * @returns
 */
export function hitboxOverlaps(a, b) {
  if (a.laneno !== b.laneno) return false;
  const [left, right] = a.x > b.x ? [b, a] : [a, b];
  const end = left.x + left.w;
  if (right.x < end) return true;
  else return false;
}
