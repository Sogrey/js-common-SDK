import { Vector3 } from "./Vector3";
import { Vector4 } from "./Vector4";
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static fromElements: (x: number, y: number, result: Vector2) => Vector2;
    static clone: (v2: Vector2 | Vector3 | Vector4, result: Vector2) => undefined | Vector2;
    static fromVector3: (v2: Vector2 | Vector3 | Vector4, result: Vector2) => undefined | Vector2;
    static fromVector4: (v2: Vector2 | Vector3 | Vector4, result: Vector2) => undefined | Vector2;
    static packedLength: number;
}
//# sourceMappingURL=Vector2.d.ts.map