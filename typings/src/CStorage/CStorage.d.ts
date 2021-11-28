import { BaseObject } from "../BaseObject";
export declare class CStorage extends BaseObject {
    static setLoalStorage: (key: string, value: any) => void;
    static getLoalStorage: (key: string) => string | null | undefined;
    static removeLoalStorage: (key: string) => void;
    static setSessionStorage: (key: string, value: any) => void;
    static getSessionStorage: (key: string) => string | null | undefined;
    static removeSessionStorage: (key: string) => void;
}
//# sourceMappingURL=CStorage.d.ts.map