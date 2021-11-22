import { Vector2 } from "./Vector2";
export declare class Box2 {
    min: Vector2;
    max: Vector2;
    constructor(min?: Vector2, max?: Vector2);
    isBox2: boolean;
    set(min: Vector2, max: Vector2): this;
    static fromArray: (array: Array<number>, result?: Box2 | undefined) => Box2 | undefined;
    static fromPoints: (points: Array<Vector2>, result?: Box2 | undefined) => Box2;
    expandByPoint: (point: Vector2) => this;
    static fromCenterAndSize: (center: Vector2, size: Vector2, result?: Box2 | undefined) => Box2;
    static clone: (value: Box2, result?: Box2 | undefined) => Box2;
    clone: (result?: Box2 | undefined) => Box2;
    makeEmpty: () => this;
    isEmpty: () => boolean;
    getCenter: (target?: Vector2 | undefined) => Vector2 | undefined;
    getSize: (target?: Vector2 | undefined) => Vector2 | undefined;
    expandByVector: (vector: Vector2) => this;
    multiplyByScalar: (scalar: number) => this;
    multiplyComponents: (vector: Vector2) => this;
    containsPoint: (point: Vector2) => boolean;
    containsBox: (box: Box2) => boolean;
    intersectsBox: (box: Box2) => boolean;
    distanceToPoint: (point: Vector2) => number;
    intersect: (box: Box2) => this;
    union: (box: Box2) => this;
    translate: (offset: Vector2) => this;
    equals: (box: Box2) => boolean;
}
//# sourceMappingURL=Box2.d.ts.map