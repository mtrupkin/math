import {
  Angle,
  eq,
  isAngleBetween,
  normalizeAngle,
  normalizeAngleSigned,
} from "../mod.ts";

import { assert, assertFalse } from "@std/assert";

Deno.test("normalize", () => {
  assert(eq(normalizeAngle(Angle.TWO_PI + Angle.PI_8), Angle.PI_8));
});

Deno.test("normalize negative", () => {
  assert(eq(normalizeAngle(Angle.PI_8 - Angle.TWO_PI), Angle.PI_8));
});

Deno.test("normalize to positive", () => {
  assert(eq(normalizeAngle(-Angle.PI_2), 3 * Angle.PI_2));
});

Deno.test("normalize multiples", () => {
  assert(eq(normalizeAngle(Angle.PI_8 + 4 * Angle.TWO_PI), Angle.PI_8));
});

Deno.test("normalize signed", () => {
  assert(eq(normalizeAngleSigned(Angle.PI_8 + 4 * Angle.TWO_PI), Angle.PI_8));
});

Deno.test("normalize negative signed", () => {
  assert(eq(normalizeAngleSigned(-Angle.PI_8), -Angle.PI_8));
});

Deno.test("angle between", () => {
  assert(isAngleBetween(Angle.PI_8, 0, Angle.PI_4));
});

Deno.test("angle not between", () => {
  assertFalse(isAngleBetween(Angle.PI_8, Angle.PI_4, 0));
});

Deno.test("large angle between", () => {
  assert(isAngleBetween(Angle.PI_2, Angle.PI_4, 0));
});
