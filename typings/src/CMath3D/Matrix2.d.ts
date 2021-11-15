import { Vector2 } from "./Vector2";
export declare class Matrix2 {
    elements: number[];
    constructor(column0Row0?: number, column1Row0?: number, column0Row1?: number, column1Row1?: number);
    static packedLength: number;
    static toArray: (value: Matrix2, array: Array<number>, startingIndex: number) => number[];
    static fromArray: (array: Array<number>, startingIndex: number, result: Matrix2) => Matrix2;
    static clone: (matrix: Matrix2, result: Matrix2) => Matrix2 | undefined;
    static fromScale: (scale: Vector2, result: Matrix2) => Matrix2;
    static fromUniformScale: (scale: number, result: Matrix2) => Matrix2;
    static fromRotation: (angle: number, result: Matrix2) => Matrix2;
    static getScale: (matrix: Matrix2, result: Vector2) => Vector2;
    static multiply: (left: Matrix2, right: Matrix2, result: Matrix2) => Matrix2;
    static add: (left: Matrix2, right: Matrix2, result: Matrix2) => Matrix2;
    static subtract: (left: Matrix2, right: Matrix2, result: Matrix2) => Matrix2;
    static multiplyByVector: (matrix: Matrix2, cartesian: Vector2, result: Vector2) => Vector2;
    static multiplyByScalar: (matrix: Matrix2, scalar: number, result: Matrix2) => Matrix2;
    static multiplyByScale: (matrix: Matrix2, scale: Vector2, result: Matrix2) => Matrix2;
    static negate: (matrix: Matrix2, result: Matrix2) => Matrix2;
    static transpose: (matrix: Matrix2, result: Matrix2) => Matrix2;
    static abs: (matrix: Matrix2, result: Matrix2) => Matrix2;
    static equals: (left: Matrix2, right: Matrix2) => boolean;
    static IDENTITY: Matrix2;
    static ZERO: Matrix2;
    clone: (result: Matrix2) => Matrix2 | undefined;
    equals: (right: Matrix2) => boolean;
    toString: () => string;
}
//# sourceMappingURL=Matrix2.d.ts.map