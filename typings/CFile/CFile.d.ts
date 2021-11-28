import { BaseObject } from "../BaseObject";
export declare class CFile extends BaseObject {
    static getExt: (filename: string) => string;
    static downloadLink: (link: string, name: string) => void;
    static downloadFile: (name: string, content: string | Blob) => void;
}
//# sourceMappingURL=CFile.d.ts.map