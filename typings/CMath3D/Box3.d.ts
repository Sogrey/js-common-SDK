import { Vector3 } from "./Vector3";
import { Matrix4 } from "./Matrix4";
export declare class Box3 {
    min: Vector3;
    max: Vector3;
    constructor(min?: Vector3, max?: Vector3);
    isBox3: boolean;
    set(min: Vector3, max: Vector3): this;
    static fromArray: (array: Array<number>, result?: Box3 | undefined) => Box3 | undefined;
    static fromPoints: (points: Array<Vector3>, result?: Box3 | undefined) => Box3 | undefined;
    expandByPoint: (point: Vector3) => this;
    static fromCenterAndSize: (center: Vector3, size: Vector3, result?: Box3 | undefined) => Box3 | undefined;
    static clone: (value: Box3, result?: Box3 | undefined) => Box3;
    clone: (result?: Box3 | undefined) => Box3;
    makeEmpty: () => this;
    isEmpty: () => boolean;
    getCenter: (target?: Vector3 | undefined) => Vector3 | undefined;
    getSize: (target?: Vector3 | undefined) => Vector3 | undefined;
    expandByVector: (vector: Vector3) => this;
    multiplyByScalar: (scalar: number) => this;
    multiplyComponents: (vector: Vector3) => this;
    containsPoint: (point: Vector3) => boolean;
    containsBox: (box: Box3) => boolean;
    intersectsBox: (box: Box3) => boolean;
    distanceToPoint: (point: Vector3) => number;
    intersect: (box: Box3) => this;
    union: (box: Box3) => this;
    applyMatrix4: (matrix: Matrix4) => Box3 | undefined;
    translate: (offset: Vector3) => this;
    equals: (box: Box3) => boolean;
}
//# sourceMappingURL=Box3.d.ts.map