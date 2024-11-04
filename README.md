# Math Library

This library provides a set of utilities for mathematical operations, including vector arithmetic, matrix manipulation, and geometric calculations.

## Modules

### Point

Defines a point in 2D space and provides utility functions for point arithmetic.

#### Example Usage

```typescript
import { Point, add } from "./point.ts";

const p1: Point = { x: 1, y: 2 };
const p2: Point = { x: 3, y: 4 };

const result = add(p1, p2);
console.log(result); // Output: { x: 4, y: 6 }
```

### Vector

Represents a 2D vector in either Cartesian or Polar coordinate system.

#### Example Usage

```typescript
import { Vector } from "./vector.ts";

const v1 = new Vector(3, 4); // Cartesian coordinates
const v2 = new Vector(5, Math.PI / 4, false); // Polar coordinates

const sum = v1.add(v2);
console.log(sum.toString()); // Output: [6.5355, 7.5355]
```

### Matrix

A mutable matrix class for handling 2D arrays of elements.

#### Example Usage

```typescript
import { Matrix } from "./matrix.ts";
import { Size } from "./size.ts";

const size = new Size(3, 3);
const matrix = new Matrix(size, () => 0);

matrix.set({ x: 1, y: 1 }, 5);
console.log(matrix.get({ x: 1, y: 1 })); // Output: 5
```

### Size

Represents the dimensions of a 2D space.

#### Example Usage

```typescript
import { Size } from "./src/size.ts";

const size = new Size(5, 10);
console.log(size.toString()); // Output: [5, 10]
```

### Angle

Provides constants and utility functions for angle manipulation.

#### Example Usage

```typescript
import { Angle, normalizeAngle } from "./src/angle.ts";

const angle = normalizeAngle(3 * Angle.PI);
console.log(angle); // Output: 3.141592653589793
```

### Utility Functions

Includes various utility functions for mathematical operations.

#### Example Usage

```typescript
import { eq, toFixed } from "./src/util.ts";

console.log(eq(0.1 + 0.2, 0.3)); // Output: true
console.log(toFixed(3.14159, 5, 2)); // Output: " 3.14"
```

## Installation

To use this library, simply import the necessary modules into your project.

