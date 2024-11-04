import { gt, lt } from "./util.ts";

/**
 * Constants for common angles.
 */
export const Angle = {
  PI: Math.PI,
  PI_16: Math.PI / 16,
  PI_2: Math.PI / 2,
  PI_3: Math.PI / 3,
  PI_4: Math.PI / 4,
  PI_5: Math.PI / 5,
  PI_6: Math.PI / 6,
  PI_7: Math.PI / 7,
  PI_8: Math.PI / 8,
  TWO_PI: 2 * Math.PI,
};

/**
 * Normalize angle range to [0 to 2*PI).
 * @param theta - The angle to normalize.
 * @returns The normalized angle.
 */
export function normalizeAngle(theta: number): number {
  const angle = theta % Angle.TWO_PI;
  return angle < 0 ? angle + Angle.TWO_PI : angle;
}

/**
 * Normalize angle range to (-PI to PI].
 * @param theta - The angle to normalize.
 * @returns The normalized angle.
 */
export function normalizeAngleSigned(theta: number): number {
  const angle = normalizeAngle(theta);
  return angle > Angle.PI ? angle - Angle.TWO_PI : angle;
}

/**
 * Check if an angle is between two other angles.
 * @param angle - The angle to check.
 * @param theta0 - The start angle.
 * @param theta1 - The end angle.
 * @returns True if the angle is between theta0 and theta1, false otherwise.
 */
export function isAngleBetween(
  angle: number,
  theta0: number,
  theta1: number,
): boolean {
  const angle0 = normalizeAngle(angle);
  const alpha0 = normalizeAngle(theta0);
  const alpha1 = normalizeAngle(theta1);

  if (alpha1 > alpha0) {
    return gt(angle0, alpha0) && lt(angle0, alpha1);
  }
  return gt(angle0, alpha0) || lt(angle0, alpha1);
}
