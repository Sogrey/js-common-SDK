import { Vector3 } from "./Vector3";
import { Matrix3 } from "./Matrix3";
export declare class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    static packedLength: number;
    static toArray: (value: Quaternion, array: Array<number>, startingIndex: number) => number[];
    static fromArray: (array: Array<number>, startingIndex: number, result: Quaternion) => Quaternion;
    static conjugate: (quaternion: Quaternion, result: Quaternion) => Quaternion;
    static magnitudeSquared: (quaternion: Quaternion) => number;
    static magnitude: (quaternion: Quaternion) => number;
    static normalize: (quaternion: Quaternion, result: Quaternion) => Quaternion;
    static inverse: (quaternion: Quaternion, result: Quaternion) => Quaternion;
    static add: (left: Quaternion, right: Quaternion, result: Quaternion) => Quaternion;
    static subtract: (left: Quaternion, right: Quaternion, result: Quaternion) => Quaternion;
    static negate: (quaternion: Quaternion, result: Quaternion) => Quaternion;
    static dot: (left: Quaternion, right: Quaternion) => number;
    static multiply: (left: Quaternion, right: Quaternion, result: Quaternion) => Quaternion;
    static multiplyByScalar: (quaternion: Quaternion, scalar: number, result: Quaternion) => Quaternion;
    static divideByScalar: (quaternion: Quaternion, scalar: number, result: Quaternion) => Quaternion;
    static lerp: (start: Quaternion, end: Quaternion, t: number, result: Quaternion) => Quaternion;
    static slerp: (start: Quaternion, end: Quaternion, t: number, result: Quaternion) => Quaternion;
    static log: (quaternion: Quaternion, result: Vector3) => Vector3;
    static exp: (vector: Vector3, result: Quaternion) => Quaternion;
    static computeInnerQuadrangle: (q0: Quaternion, q1: Quaternion, q2: Quaternion, result: Quaternion) => Quaternion;
    static squad: (q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result: Quaternion) => Quaternion;
    static clone: (quaternion: Quaternion, result: Quaternion) => Quaternion | undefined;
    static fromQuaternion: (quaternion: Quaternion, result: Quaternion) => Quaternion | undefined;
    static equals: (left: Quaternion, right: Quaternion) => boolean;
    static fromAxisAngle: (axis: Vector3, angle: number, result: Quaternion) => Quaternion;
    static fromRotationMatrix: (matrix: Matrix3, result: Quaternion) => Quaternion;
    static ZERO: Quaternion;
    static IDENTITY: Quaternion;
    clone: (result?: Quaternion | undefined) => Quaternion;
    equals: (right: Quaternion) => boolean;
    toString: () => string;
}
//# sourceMappingURL=Quaternion.d.ts.map