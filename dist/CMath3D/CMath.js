var _a;
import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { DeveloperError } from "../DeveloperError";
export class CMath {
}
_a = CMath;
CMath.PI = Math.PI;
CMath.ONE_OVER_PI = 1.0 / Math.PI;
CMath.PI_OVER_TWO = Math.PI / 2.0;
CMath.PI_OVER_THREE = Math.PI / 3.0;
CMath.PI_OVER_FOUR = Math.PI / 4.0;
CMath.PI_OVER_SIX = Math.PI / 6.0;
CMath.THREE_PI_OVER_TWO = (3.0 * Math.PI) / 2.0;
CMath.TWO_PI = 2.0 * Math.PI;
CMath.ONE_OVER_TWO_PI = 1.0 / (2.0 * Math.PI);
CMath.RADIANS_PER_DEGREE = Math.PI / 180.0;
CMath.DEGREES_PER_RADIAN = 180.0 / Math.PI;
CMath.RADIANS_PER_ARCSECOND = _a.RADIANS_PER_DEGREE / 3600.0;
CMath.toRadians = (degrees) => {
    return degrees * _a.RADIANS_PER_DEGREE;
};
CMath.toDegrees = (radians) => {
    return radians * _a.DEGREES_PER_RADIAN;
};
CMath.sign = defaultValue(Math.sign, function sign(value) {
    value = +value;
    if (value === 0 || value !== value) {
        return value;
    }
    return value > 0 ? 1 : -1;
});
CMath.signNotZero = function (value) {
    return value < 0.0 ? -1.0 : 1.0;
};
CMath.mod = (m, n) => {
    if (!defined(m)) {
        throw new DeveloperError("m is required.");
    }
    if (!defined(n)) {
        throw new DeveloperError("n is required.");
    }
    if (n === 0.0) {
        throw new DeveloperError("divisor cannot be 0.");
    }
    if (_a.sign(m) === _a.sign(n) && Math.abs(m) < Math.abs(n)) {
        return m;
    }
    return ((m % n) + n) % n;
};
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