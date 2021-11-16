import { Quaternion } from "./Quaternion";
export declare class Matrix3 {
    elements: number[];
    constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number);
    static packedLength: number;
    static toArray: (value: Matrix3, array: Array<number>, startingIndex: number) => number[];
    static fromArray: (array: Array<number>, startingIndex: number, result: Matrix3) => Matrix3;
    static clone: (matrix: Matrix3, result: Matrix3) => Matrix3 | undefined;
    static fromQuaternion: (quaternion: Quaternion, result: Matrix3) => Matrix3;
}
//# sourceMappingURL=Matrix3.d.ts.map