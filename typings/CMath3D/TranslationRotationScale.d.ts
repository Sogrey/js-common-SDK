import { Vector3 } from "./Vector3";
import { Quaternion } from "./Quaternion";
export declare class TranslationRotationScale {
    translation: Vector3;
    rotation: Quaternion;
    scale: Vector3;
    constructor(translation?: Vector3, rotation?: Quaternion, scale?: Vector3);
    equals: (right: TranslationRotationScale) => boolean;
}
//# sourceMappingURL=TranslationRotationScale.d.ts.map