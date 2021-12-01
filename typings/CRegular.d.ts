import { BaseObject } from "./BaseObject";
export declare class CRegular extends BaseObject {
    static isRegExp: (value: any) => boolean;
    static checkID: (value: string) => boolean;
    static isCardID: (sId: string) => boolean;
    static haveCNChars: (value: string) => boolean;
    static isPostCode: (value: string) => boolean;
    static isIPv6: (str: string) => boolean;
    static isEmail: (value: string) => boolean;
    static isTel: (value: string) => boolean;
    static isEmojiCharacter: (value: string) => boolean;
}
//# sourceMappingURL=CRegular.d.ts.map