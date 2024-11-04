export interface Point {
  x: number;
  y: number;
}

/**
 * Adds two points.
 * @param p0 - The first point.
 * @param p1 - The second point.
 * @returns The resulting point after addition.
 */
export function add(p0: Point, p1: Point): Point {
  return { x: p0.x + p1.x, y: p0.y + p1.y };
}

/**
 * Subtracts the second point from the first point.
 * @param p0 - The first point.
 * @param p1 - The second point.
 * @returns The resulting point after subtraction.
 */
export function subtract(p0: Point, p1: Point): Point {
  return { x: p0.x - p1.x, y: p0.y - p1.y };
}

/**
 * Scales a point by a given factor.
 * @param p - The point to scale.
 * @param s - The scaling factor.
 * @returns The resulting point after scaling.
 */
export function scale(p: Point, s: number): Point {
  return { x: p.x * s, y: p.y * s };
}
