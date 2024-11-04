export const EPSILON = 0.000001;

/**
 * Checks if two numbers are approximately equal within a small margin of error.
 * @param a - The first number.
 * @param b - The second number.
 * @param [e=EPSILON] - The margin of error.
 * @returns True if the numbers are approximately equal, false otherwise.
 */
export function eq(a: number, b: number, e = EPSILON): boolean {
  return Math.abs(a - b) < e;
}

/**
 * Checks if the first number is greater than the second number within a small margin of error.
 * @param a - The first number.
 * @param b - The second number.
 * @param [e=EPSILON] - The margin of error.
 * @returns True if the first number is greater, false otherwise.
 */
export function gt(a: number, b: number, e = EPSILON): boolean {
  return a > (b - e);
}

/**
 * Checks if the first number is less than the second number within a small margin of error.
 * @param a - The first number.
 * @param b - The second number.
 * @param [e=EPSILON] - The margin of error.
 * @returns True if the first number is less, false otherwise.
 */
export function lt(a: number, b: number, e = EPSILON): boolean {
  return a < (b + e);
}

/**
 * Calculates the Euclidean length of a vector with components x and y.
 * @param x - The x component of the vector.
 * @param y - The y component of the vector.
 * @returns The length of the vector.
 */
export function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

/**
 * Generates an array of numbers from 0 to n-1.
 * @param n - The length of the array.
 * @returns An array of numbers from 0 to n-1.
 */
export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

/**
 * Converts a number to a fixed-point notation string, padded to a specified length.
 * @param n - The number to convert.
 * @param [len=5] - The total length of the resulting string.
 * @param [fixedDigits=1] - The number of digits to appear after the decimal point.
 * @returns The fixed-point notation string.
 */
export function toFixed(n: number, len = 5, fixedDigits = 1): string {
  const fixed = n.toFixed(fixedDigits);
  return fixed.length <= len ? fixed.padStart(len, " ") : "".padStart(len, ".");
}
