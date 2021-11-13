import { defined } from "../defined";
import { DeveloperError } from "../DeveloperError";
export class CMath {
}
CMath.clamp = function (value, min, max) {
    if (!defined(value)) {
        throw new DeveloperError("value is required");
    }
    if (!defined(min)) {
        throw new DeveloperError("min is required.");
    }
    if (!defined(max)) {
        throw new DeveloperError("max is required.");
    }
    return value < min ? min : value > max ? max : value;
};
CMath.acosClamped = function (value) {
    if (!defined(value)) {
        throw new DeveloperError("value is required.");
    }
    return Math.acos(CMath.clamp(value, -1.0, 1.0));
};
CMath.lerp = function (p, q, time) {
    return (1.0 - time) * p + time * q;
};
//# sourceMappingURL=CMath.js.map