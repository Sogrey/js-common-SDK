import { BaseObject } from "../BaseObject";
export declare class CString extends BaseObject {
    static randomString: (length?: number) => string;
    static fistLetterUpper: (str: string) => string;
    static telFormat: (tel: (string | number)) => string;
    static getKebabCase: (str: string) => string;
    static getCamelCase: (str: string) => string;
    static toCDB: (str: string) => string;
    static toDBC: (str: string) => string;
    static reverse: (str: string) => string;
    static truncateString: (string: string, length: number) => string;
    static stripHtml: (html: string) => string;
    static deepClone: (target: {
        [x: string]: any;
        hasOwnProperty: (arg0: string) => any;
    }) => {
        [x: string]: any;
        hasOwnProperty: (arg0: string) => any;
    };
    static firstAppear: (string: string) => string | undefined;
    static isPalindrome: (str: string) => boolean;
}
//# sourceMappingURL=CString.d.ts.map