import { Vector4 } from "./Vector4";
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    static fromElements: (x: number, y: number, z: number, result: Vector3) => Vector3;
    static clone: (v3: Vector3 | Vector4, result: Vector3) => undefined | Vector3;
    static fromVector4: (v3: Vector3 | Vector4, result: Vector3) => undefined | Vector3;
    static packedLength: number;
    static magnitudeSquared: (v3: Vector3) => number;
    static magnitude: (v3: Vector3) => number;
    setLength: (length: number, result?: Vector3 | undefined) => Vector3;
    static distance: (left: Vector3, right: Vector3) => number;
    static distanceSquared: (left: Vector3, right: Vector3) => number;
    static add: (left: Vector3, right: Vector3, result?: Vector3 | undefined) => Vector3;
    add: (right: Vector3) => Vector3;
    static subtract: (left: Vector3, right: Vector3, result: Vector3) => Vector3;
    static normalize: (v3: Vector3, result: Vector3) => Vector3;
    normalize: (result?: Vector3 | undefined) => Vector3 | undefined;
    static dot: (left: Vector3, right: Vector3) => number;
    static cross: (left: Vector3, right: Vector3, result: Vector3) => Vector3;
    static multiplyByScalar: (v3: Vector3, scalar: number, result?: Vector3 | undefined) => Vector3 | undefined;
    static divideByScalar: (v3: Vector3, scalar: number, result: Vector3) => Vector3;
    static negate: (v3: Vector3, result: Vector3) => Vector3;
    static abs: (v3: Vector3, result: Vector3) => Vector3;
    static lerp: (start: Vector3, end: Vector3, t: number, result?: Vector3 | undefined) => Vector3;
    static angleBetween: (left: Vector3, right: Vector3) => number;
    static equals: (left: Vector3, right: Vector3) => boolean;
    static ZERO: Readonly<Vector3>;
    static ONE: Readonly<Vector3>;
    static UNIT_X: Readonly<Vector3>;
    static UNIT_Y: Readonly<Vector3>;
    static UNIT_Z: Readonly<Vector3>;
    clone: (result: Vector3) => Vector3 | undefined;
    equals: (right: Vector3) => boolean;
    fromArray: (array: Array<number>, offset?: number) => this;
    toArray: (offset?: number, result?: number[] | undefined) => number[];
    static random: (result?: Vector3 | undefined) => Vector3;
    toString: () => string;
}
//# sourceMappingURL=Vector3.d.ts.map