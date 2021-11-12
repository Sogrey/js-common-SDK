import { Vector4 } from "./Vector4";
export declare class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r?: number, g?: number, b?: number, a?: number);
    static fromVector4: (v4: Vector4, result: Color) => Color;
}
//# sourceMappingURL=Color.d.ts.map