import { BaseObject } from "./BaseObject";
export declare class CArray extends BaseObject {
    static arrScrambling: (arr: Array<any>) => any[];
    static flatten: (arr: Array<any>) => any[];
    static sample: (arr: Array<any>) => any;
    static arrayFill(array: Array<any>, value: any, start?: number, end?: number): Array<any>;
    static uniqueArray: (arr: Array<any>) => Array<any>;
    static quickArr: (arr: Array<number>) => Array<number>;
    static bubbleSort: (arr: Array<number>) => Array<number>;
    static isNotEmpty: (arr: any) => boolean;
    static merge: (a: Array<any>, b: Array<any>) => Array<any>;
}
//# sourceMappingURL=CArray.d.ts.map