import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { Vector3 } from "./Vector3";
import { Quaternion } from "./Quaternion";
export class TranslationRotationScale {
    constructor(translation, rotation, scale) {
        this.translation = Vector3.ZERO.clone();
        this.rotation = Quaternion.IDENTITY.clone();
        this.scale = Vector3.ONE.clone();
        this.equals = (right) => {
            return (this === right ||
                (defined(right) &&
                    Vector3.equals(this.translation, right.translation) &&
                    Quaternion.equals(this.rotation, right.rotation) &&
                    Vector3.equals(this.scale, right.scale)));
        };
        Vector3.clone(defaultValue(translation, Vector3.ZERO), this.translation);
        Quaternion.clone(defaultValue(rotation, Quaternion.IDENTITY), this.rotation);
        Vector3.clone(defaultValue(scale, Vector3.ONE), this.scale);
    }
}
//# sourceMappingURL=TranslationRotationScale.js.map