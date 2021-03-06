import { BaseObject } from "./BaseObject";
export declare class CArray extends BaseObject {
    static isLength: (value: number) => boolean;
    static isArrayLike: (value: any) => boolean;
    static arrScrambling: (arr: Array<any>) => any[];
    static flatten: (arr: Array<any>) => any[];
    static sample: (arr: Array<any>) => any;
    static arrayFill(array: Array<any>, value: any, start?: number, end?: number): Array<any>;
    static uniqueArray: (arr: Array<any>) => Array<any>;
    static quickArr: (arr: Array<number>) => Array<number>;
    static bubbleSort: (arr: Array<number>) => Array<number>;
    static isNotEmpty: (arr: any) => boolean;
    static merge: (a: Array<any>, b: Array<any>) => Array<any>;
    static union: (a: Array<any>, b: Array<any>) => any[];
    static intersect: (a: Array<any>, b: Array<any>) => any[];
    static remove: (arr: Array<any>, ele: any) => any[];
    static max: (arr: Array<number>) => number;
    static min: (arr: Array<number>) => number;
}
//# sourceMappingURL=CArray.d.ts.map