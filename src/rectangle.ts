import type { Size } from "./size.ts";
import { add, type Point } from "./point.ts";

export class Rectangle {
  /**
   * The opposite corner of p0. It is the corner of the rectangle that extends out in the opposite (negative) direction of the origin.
   * (lower-right for screen coordinates)
   * (upper-right for math coordinates)
   */
  readonly p1: Point;

  /**
   * @param p0 The origin of the rectangle. It is the corner of the rectangle that extends out in the same positive direction as the origin.
   * (upper-left for screen coordinates)
   * (lower-left for math coordinates)
   * @param size Size of the rectangle
   */
  constructor(readonly p0: Point, readonly size: Size) {
    // Corner of the rectangle farthest from the origin.
    this.p1 = add(this.p0, { x: size.width - 1, y: size.height - 1 });
  }

  /**
   * Checks if a point is within the rectangle.
   * @param p The point to check.
   * @returns True if the point is within the rectangle, false otherwise.
   */
  within(p: Point): boolean {
    return p.x > this.p0.x && p.y > this.p0.y && p.x < this.p1.x &&
      p.y < this.p1.y;
  }

  /**
   * Moves the rectangle to a new origin point.
   * @param p The new origin point.
   * @returns A new Rectangle instance with the updated origin.
   */
  moveTo(p: Point): Rectangle {
    return new Rectangle(p, this.size);
  }

  /**
   * Moves the rectangle by a given vector.
   * @param v The vector by which to move the rectangle.
   * @returns A new Rectangle instance with the updated position.
   */
  move(v: Point): Rectangle {
    return this.moveTo(add(this.p0, v));
  }
}
