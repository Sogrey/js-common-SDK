import { BaseObject } from "./BaseObject";
export declare class CCookie extends BaseObject {
    static setCookie: (key: string, value: any, expire: number) => void;
    static getCookie: (key: string) => string;
    static delCookie: (key: string) => void;
    static clearAllCookies: void;
}
//# sourceMappingURL=CCookie.d.ts.map