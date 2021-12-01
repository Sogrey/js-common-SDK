import { BaseObject } from "./BaseObject";
export declare class CObject extends BaseObject {
    static isStatic: (value: any) => boolean;
    isStatic: (value: any) => boolean;
    static isPrimitive: (value: any) => boolean;
    isPrimitive: (value: any) => boolean;
    static isObject: (value: any) => boolean;
    isObject: (value: any) => boolean;
    static isObjectLike: (value: any) => boolean;
    isObjectLike: (value: any) => boolean;
    static getRawType: (value: any) => string;
    getRawType: (value: any) => string;
    static isPlainObject: (obj: any) => boolean;
    isPlainObject: (obj: any) => boolean;
    static isObjectEqual: (a: any, b: any) => boolean;
    static extend: (to: any, _form: any) => any;
    static getPropByPath: (obj: any, path: string, strict: boolean) => {
        obj: any;
        key: string;
        value: any;
    };
    static keys: (object: any) => string[];
    static values: (object: any) => any[];
    static includes: (array: Array<any>, value: any, start?: number) => boolean;
    static isFunction: (arg: any) => boolean;
}
//# sourceMappingURL=CObject.d.ts.map