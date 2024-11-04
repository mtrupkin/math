import type { Point } from "./point.ts";

export class Size {
  constructor(readonly width: number, readonly height: number = width) {}

  /**
   * Applies a function to each point within the size.
   * @param f - The function to apply to each point.
   */
  forEach(f: (p: Point) => void): void {
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        f({ x, y });
      }
    }
  }

  /**
   * Checks if a point is within the size.
   * @param point - The point to check.
   * @returns True if the point is within the size, false otherwise.
   */
  within({ x, y }: Point): boolean {
    return (x >= 0) && (y >= 0) && (x < this.width) && (y < this.height);
  }

  /**
   * Returns a string representation of the size.
   * @returns A string in the format [width, height].
   */
  toString(): string {
    return `[${this.width}, ${this.height}]`;
  }
}

export const ZERO_SIZE = new Size(0, 0);
