import { BaseObject } from "./BaseObject";
import { CIndexDB } from "./CIndexDB";
export declare class CStorage extends BaseObject {
    static CIndexDB: typeof CIndexDB;
    static setLoalStorage: (key: string, value: any) => void;
    static getLoalStorage: (key: string) => string | null | undefined;
    static removeLoalStorage: (key: string) => void;
    static setSessionStorage: (key: string, value: any) => void;
    static getSessionStorage: (key: string) => string | null | undefined;
    static removeSessionStorage: (key: string) => void;
}
export { CIndexDB } from "./CIndexDB";
//# sourceMappingURL=CStorage.d.ts.map