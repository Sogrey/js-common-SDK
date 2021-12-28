import { BaseObject } from "./BaseObject";
export declare class CFile extends BaseObject {
    static getFileExt: (filename: string) => string;
    static downloadLink: (link: string, name: string) => void;
    static downloadFile: (name: string, content: string | Blob) => void;
}
//# sourceMappingURL=CFile.d.ts.map