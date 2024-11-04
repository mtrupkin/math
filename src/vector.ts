import { Angle, normalizeAngle } from "./angle.ts";
import { EPSILON, eq, toFixed } from "./util.ts";

import type { Point } from "./point.ts";

/**
 * Represents a 2D vector in either Cartesian or Polar coordinate system.
 */
export class Vector implements Point {
  readonly x: number;
  readonly y: number;

  readonly r: number;
  readonly theta: number;

  /**
   * Creates a new Vector.
   * @param x - The x-coordinate or radius.
   * @param y - The y-coordinate or angle.
   * @param cartesian - Whether the coordinates are Cartesian (default: true).
   */
  constructor(
    x = 0,
    y = 0,
    readonly cartesian = true,
  ) {
    if (cartesian) {
      this.x = x;
      this.y = y;
      this.r = Math.sqrt(this.x * this.x + this.y * this.y);
      this.theta = Math.atan2(this.y, this.x);
    } else {
      this.r = x;
      this.theta = y;
      this.x = this.r * Math.cos(this.theta);
      this.y = this.r * Math.sin(this.theta);
    }
  }

  /**
   * Adds another vector to this vector.
   * @param v - The vector to add.
   * @returns A new Vector that is the sum of the two vectors.
   */
  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * Scales this vector by a scalar.
   * @param s - The scalar to scale by.
   * @returns A new Vector that is scaled by the given scalar.
   */
  scale(s: number): Vector {
    return new Vector(this.r * s, this.theta, false);
  }

  /**
   * Gets the length (magnitude) of this vector.
   * @returns The length of the vector.
   */
  length(): number {
    return Math.abs(this.r);
  }

  /**
   * Gets the angle of this vector.
   * @returns The angle of the vector in radians.
   */
  angle(): number {
    return this.theta;
  }

  /**
   * Computes the dot product of this vector and another vector.
   * @param v - The other vector.
   * @returns The dot product of the two vectors.
   */
  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Subtracts another vector from this vector.
   * @param v - The vector to subtract.
   * @returns A new Vector that is the difference of the two vectors.
   */
  subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * Normalizes this vector to a given length.
   * @param d - The length to normalize to (default: 1).
   * @returns A new Vector that is normalized to the given length.
   */
  normalize(d = 1): Vector {
    return new Vector(d, this.theta, false);
  }

  /**
   * Checks if this vector is equal to another vector within a tolerance.
   * @param v - The other vector.
   * @param e - The tolerance (default: EPSILON).
   * @returns True if the vectors are equal within the tolerance, false otherwise.
   */
  equals(v: Vector, e = EPSILON): boolean {
    return vectorEquals(this, v, e);
  }

  /**
   * Converts this vector to a string representation.
   * @returns A string representation of the vector.
   */
  toString(): string {
    return `[${toFixed(this.x)}, ${toFixed(this.y)}]`;
  }
}

/**
 * A constant representing the zero vector.
 */
export const ZERO_VECTOR = new Vector();

/**
 * Gets the neighboring vectors within a given distance.
 * @param v - The vector to find neighbors for.
 * @param d - The distance to find neighbors within (default: 1).
 * @returns An array of neighboring vectors.
 */
export function neighbors(v: Vector, d = 1): Vector[] {
  const ps: Vector[] = [];
  for (let y = -d; y <= d; y += 1) {
    for (let x = -d; x <= d; x += 1) {
      ps.push(new Vector(v.x + x, v.y + y));
    }
  }
  return ps;
}

/**
 * Adds two vectors, integrating their magnitudes and angles.
 * @param v0 - The first vector.
 * @param v - The second vector.
 * @returns A new Vector that is the result of the integration.
 */
export function addIntegrating(v0: Vector, v: Vector): Vector {
  const thetaDiff = angleBetween(v0, v);
  if (thetaDiff < EPSILON) {
    return new Vector(v0.r + v.r, v0.theta, false);
  } else if (eq(thetaDiff, Angle.PI)) {
    return new Vector(v0.r - v.r, v0.theta, false);
  }
  return new Vector(v0.x + v.x, v0.y + v.y);
}

/**
 * Computes the angle between two vectors.
 * @param v1 - The first vector.
 * @param v - The second vector.
 * @returns The angle between the two vectors in radians.
 */
export function angleBetween(v1: Vector, v: Vector): number {
  return Math.abs(normalizeAngle(v1.theta) - normalizeAngle(v.theta));
}

/**
 * Computes the cross product of two vectors.
 * @param v1 - The first vector.
 * @param v - The second vector.
 * @returns The cross product of the two vectors.
 */
export function cross(v1: Vector, v: Vector): number {
  return (v1.x * v.y) - (v1.y * v.x);
}

/**
 * Rotates a vector by a given angle.
 * @param v - The vector to rotate.
 * @param theta - The angle to rotate by in radians.
 * @returns A new Vector that is rotated by the given angle.
 */
export function rotate(v: Vector, theta: number): Vector {
  return fromPolar(v.r, v.theta + theta);
}

/**
 * Creates a vector from polar coordinates.
 * @param r - The radius.
 * @param theta - The angle in radians.
 * @returns A new Vector created from the polar coordinates.
 */
export function fromPolar(r: number, theta: number): Vector {
  return new Vector(r, theta, false);
}

/**
 * Creates a vector from a point.
 * @param p - The point.
 * @returns A new Vector created from the point.
 */
export function fromPoint(p: Point): Vector {
  return new Vector(p.x, p.y);
}

/**
 * Checks if two vectors are equal within a tolerance.
 * @param v0 - The first vector.
 * @param v1 - The second vector.
 * @param e - The tolerance (default: EPSILON).
 * @returns True if the vectors are equal within the tolerance, false otherwise.
 */
export function vectorEquals(v0: Vector, v1: Vector, e = EPSILON): boolean {
  if (v0.cartesian === v1.cartesian) {
    if (v0.cartesian) {
      return eq(v0.x, v1.x, e) && eq(v0.y, v1.y, e);
    } else {
      return eq(v0.r, v1.r, e) && eq(v0.theta, v1.theta, e);
    }
  }
  return eq(v0.r, v1.r, e) && eq(v0.theta, v1.theta, e) &&
    eq(v0.x, v1.x, e) && eq(v0.y, v1.y, e);
}
