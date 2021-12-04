import { BaseObject } from "./BaseObject";
export declare class CBuffer extends BaseObject {
    static Uint8ArrayToString: (fileData: Uint8Array) => string;
    static stringToUint8Array: (str: string) => Uint8Array;
    static stringToBytes: (str: string) => any[];
    static byteToString: (byte: string | Array<number>) => string;
    static toInt32: (value: string) => number;
    static toUInt16: (value: string) => number;
    static bytesToFloat: (data: number[]) => number;
}
//# sourceMappingURL=CBuffer.d.ts.map