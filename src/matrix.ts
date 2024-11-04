import type { Size } from "./size.ts";
import type { Point } from "./point.ts";

/**
 * A mutable matrix class.
 */
export class Matrix<T> {
  readonly matrix: T[][] = [];

  /**
   * Creates an instance of Matrix.
   * @param size - The size of the matrix.
   * @param create - A function to create an element at a given point.
   */
  constructor(readonly size: Size, create: (p: Point) => T) {
    for (let y = 0; y < this.size.height; y += 1) {
      this.matrix[y] = new Array(this.size.width);
      for (let x = 0; x < this.size.width; x += 1) {
        const p = { x, y };
        this.set(p, create(p));
      }
    }
  }

  /**
   * Gets the element at the specified point.
   * @param param0 - The point with x and y coordinates.
   * @returns The element at the specified point.
   */
  get({ x, y }: Point): T {
    return this.matrix[y][x];
  }

  /**
   * Sets the element at the specified point.
   * @param param0 - The point with x and y coordinates.
   * @param elem - The element to set.
   */
  set({ x, y }: Point, elem: T): void {
    this.matrix[y][x] = elem;
  }

  /**
   * Executes a provided function once for each matrix element.
   * @param f - The function to execute for each element, receiving the point and the element.
   */
  forEach(f: (p: Point, elem: T) => void): void {
    this.size.forEach((p) => {
      f(p, this.get(p));
    });
  }
}
