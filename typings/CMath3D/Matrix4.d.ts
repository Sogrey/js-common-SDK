import { Quaternion } from "./Quaternion";
import { Matrix3 } from "./Matrix3";
import { Vector3 } from "./Vector3";
import { TranslationRotationScale } from "./TranslationRotationScale";
import { Vector4 } from "./Vector4";
import { Euler } from "./Euler";
export declare class Matrix4 {
    elements: number[];
    constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column3Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column3Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number, column3Row2?: number, column0Row3?: number, column1Row3?: number, column2Row3?: number, column3Row3?: number);
    static packedLength: number;
    static toArray: (value: Matrix4, array: Array<number>, startingIndex: number) => number[];
    static fromArray: (array: Array<number>, startingIndex: number, result: Matrix4) => Matrix4;
    static clone: (matrix: Matrix4, result: Matrix4) => Matrix4 | undefined;
    static fromRotationTranslation: (rotation: Matrix3, translation: Vector3, result: Matrix4) => Matrix4;
    static fromTranslationQuaternionRotationScale: (translation: Vector3, rotation: Quaternion, scale: Vector3, result: Matrix4) => Matrix4;
    static fromTranslationRotationScale: (translationRotationScale: TranslationRotationScale, result: Matrix4) => Matrix4;
    static fromTranslation: (translation: Vector3, result: Matrix4) => Matrix4;
    static fromScale: (scale: Vector3, result: Matrix4) => Matrix4;
    static fromUniformScale: (scale: number, result: Matrix4) => Matrix4;
    static getElementIndex: (column: number, row: number) => number;
    static getColumn: (matrix: Matrix4, index: number, result: Vector4) => Vector4;
    static setColumn: (matrix: Matrix4, index: number, vector: Vector4, result: Matrix4) => Matrix4;
    static setTranslation: (matrix: Matrix4, translation: Vector3, result: Matrix4) => Matrix4;
    static setScale: (matrix: Matrix4, scale: Vector3, result: Matrix4) => Matrix4;
    static getRow: (matrix: Matrix4, index: number, result: Vector4) => Vector4;
    static setRow: (matrix: Matrix4, index: number, vector: Vector4, result: Matrix4) => Matrix4;
    static getScale: (matrix: Matrix4, result: Vector3) => Vector3;
    static multiply: (left: Matrix4, right: Matrix4, result: Matrix4) => Matrix4;
    static add: (left: Matrix4, right: Matrix4, result: Matrix4) => Matrix4;
    static subtract: (left: Matrix4, right: Matrix4, result: Matrix4) => Matrix4;
    static multiplyTransformation: (left: Matrix4, right: Matrix4, result: Matrix4) => Matrix4;
    static multiplyByMatrix3: (matrix: Matrix4, rotation: Matrix3, result: Matrix4) => Matrix4;
    static multiplyByTranslation: (matrix: Matrix4, translation: Vector3, result: Matrix4) => Matrix4;
    static multiplyByUniformScale: (matrix: Matrix4, scale: number, result: Matrix4) => Matrix4;
    static multiplyByScale: (matrix: Matrix4, scale: Vector3, result: Matrix4) => Matrix4;
    static multiplyByVector: (matrix: Matrix4, vector: Vector4, result: Vector4) => Vector4;
    static multiplyByPointAsVector: (matrix: Matrix4, vector: Vector3, result: Vector3) => Vector3;
    static multiplyByPoint: (matrix: Matrix4, vector: Vector3, result: Vector3) => Vector3;
    static multiplyByScalar: (matrix: Matrix4, scalar: number, result: Matrix4) => Matrix4;
    static makeRotationFromEuler: (euler: Euler, result?: Matrix4 | undefined) => Matrix4;
    makeRotationFromEuler: (euler: Euler) => Matrix4;
    static makeRotationFromQuaternion: (q: Quaternion, result?: Matrix4 | undefined) => Matrix4;
    makeRotationFromQuaternion: (q: Quaternion) => Matrix4;
    static compose: (position: Vector3, quaternion: Quaternion, scale: Vector3, result?: Matrix4 | undefined) => Matrix4;
    compose: (position: Vector3, quaternion: Quaternion, scale: Vector3) => Matrix4;
    static decompose: (value: Matrix4, position: Vector3, quaternion: Quaternion, scale: Vector3) => Matrix4;
    static negate: (matrix: Matrix4, result: Matrix4) => Matrix4;
    determinant: () => number;
    static transpose: (matrix: Matrix4, result: Matrix4) => Matrix4;
    static abs: (matrix: Matrix4, result: Matrix4) => Matrix4;
    static equals: (left: Matrix4, right: Matrix4) => boolean;
    static getTranslation: (matrix: Matrix4, result: Vector3) => Vector3;
    static getMatrix3: (matrix: Matrix4, result: Matrix3) => Matrix3;
    static IDENTITY: Matrix4;
    static ZERO: Matrix4;
    length: number;
    clone: (result: Matrix4) => Matrix4;
    equals: (right: Matrix4) => boolean;
    static equalsArray: (matrix: Matrix4, array: Array<number>, offset: number) => boolean;
    toString: () => string;
}
//# sourceMappingURL=Matrix4.d.ts.map