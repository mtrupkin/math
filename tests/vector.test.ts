import { Angle, angleBetween, rotate, Vector, vectorEquals } from "../mod.ts";
import { assert, assertFalse } from "@std/assert";

function closeTo(actual: number, expected: number, tolerance: number = 1e-10) {
  return Math.abs(actual - expected) < tolerance;
}

Deno.test("add", () => {
  const v0 = new Vector(1, 1);
  assert(vectorEquals(v0.add(new Vector(1, 1)), new Vector(2, 2)));
});

Deno.test("subtract", () => {
  const v0 = new Vector(2, 2);
  assert(vectorEquals(v0.subtract(new Vector(1, 1)), new Vector(1, 1)));
});

Deno.test("length", () => {
  assert(new Vector(1, 1).length() > 1);
});

Deno.test("dot", () => {
  assert(closeTo(new Vector(1, 0).dot(new Vector(0, 1)), 0));
});

Deno.test("angle 0", () => {
  assert(closeTo(new Vector(1, 0).angle(), 0));
});

Deno.test("angle PI/2", () => {
  assert(closeTo(new Vector(0, 1).angle(), Angle.PI_2));
});

Deno.test("angle between", () => {
  assert(closeTo(angleBetween(new Vector(0, 1), new Vector(1, 0)), Angle.PI_2));
});

Deno.test("rotate", () => {
  assert(vectorEquals(rotate(new Vector(1, 0), Angle.PI_2), new Vector(0, 1)));
});

Deno.test("scale", () => {
  assert(vectorEquals(new Vector(1, 1).scale(2), new Vector(2, 2)));
});

Deno.test("normalize", () => {
  assert(vectorEquals(new Vector(2, 0).normalize(), new Vector(1, 0)));
});

Deno.test("normalize cartesian zero vector", () => {
  assert(
    vectorEquals(
      new Vector(0, 0).normalize(),
      new Vector(1, 0, false),
    ),
  );
});

Deno.test("equals", () => {
  assert(new Vector(2, 2).equals(new Vector(2, 2)));
});

Deno.test("toString", () => {
  assert(new Vector(1, 1).toString() === "[  1.0,   1.0]");
});
