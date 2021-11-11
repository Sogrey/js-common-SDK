import { Vector3 } from "./Vector3";
import { Vector4 } from "./Vector4";
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static fromElements: (x: number, y: number, result: Vector2) => Vector2;
    static clone: (v2: Vector2 | Vector3 | Vector4, result: Vector2) => undefined | Vector2;
    static fromVector3: (v2: Vector2 | Vector3 | Vector4, result: Vector2) => undefined | Vector2;
    static fromVector4: (v2: Vector2 | Vector3 | Vector4, result: Vector2) => undefined | Vector2;
    static packedLength: number;
    static magnitudeSquared: (v2: Vector2) => number;
    static magnitude: (v2: Vector2) => number;
    setLength: (length: number, result?: Vector2 | undefined) => Vector2 | undefined;
    static distance: (left: Vector2, right: Vector2) => number;
    static distanceSquared: (left: Vector2, right: Vector2) => number;
    static add: (left: Vector2, right: Vector2, result?: Vector2 | undefined) => Vector2;
    add: (right: Vector2) => Vector2;
    static subtract: (left: Vector2, right: Vector2, result: Vector2) => Vector2;
    static normalize: (V2: Vector2, result: Vector2) => Vector2;
    normalize: (result?: Vector2 | undefined) => Vector2 | undefined;
    static dot: (left: Vector2, right: Vector2) => number;
    static cross: (left: Vector2, right: Vector2) => number;
    static multiplyByScalar: (v2: Vector2, scalar: number, result?: Vector2 | undefined) => Vector2 | undefined;
    static divideByScalar: (v2: Vector2, scalar: number, result: Vector2) => Vector2;
    static negate: (v2: Vector2, result: Vector2) => Vector2;
    static abs: (v2: Vector2, result: Vector2) => Vector2;
    static lerp: (start: Vector2, end: Vector2, t: number, result?: Vector2 | undefined) => Vector2;
    static angleBetween: (left: Vector2, right: Vector2) => number;
    static equals: (left: Vector2, right: Vector2) => boolean;
    static ZERO: Readonly<Vector2>;
    static ONE: Readonly<Vector2>;
    static UNIT_X: Readonly<Vector2>;
    static UNIT_Y: Readonly<Vector2>;
    clone: (result: Vector2) => Vector2 | undefined;
    equals: (right: Vector2) => boolean;
    toString: () => string;
}
//# sourceMappingURL=Vector2.d.ts.map