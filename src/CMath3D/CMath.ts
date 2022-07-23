/**
 * CMath
 * 
 * This is the doc comment for CMath
 *
 * @module CMath
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"
import { DeveloperError } from "../DeveloperError"

export class CMath {

    /**
     * pi
     *
     * @type {Number}
     * @constant
     */
    static PI: number = Math.PI;

    /**
     * 1/pi
     *
     * @type {Number}
     * @constant
     */
    static ONE_OVER_PI: number = 1.0 / Math.PI;

    /**
     * pi/2
     *
     * @type {Number}
     * @constant
     */
    static PI_OVER_TWO: number = Math.PI / 2.0;

    /**
     * pi/3
     *
     * @type {Number}
     * @constant
     */
    static PI_OVER_THREE: number = Math.PI / 3.0;

    /**
     * pi/4
     *
     * @type {Number}
     * @constant
     */
    static PI_OVER_FOUR: number = Math.PI / 4.0;

    /**
     * pi/6
     *
     * @type {Number}
     * @constant
     */
    static PI_OVER_SIX: number = Math.PI / 6.0;

    /**
     * 3pi/2
     *
     * @type {Number}
     * @constant
     */
    static THREE_PI_OVER_TWO: number = (3.0 * Math.PI) / 2.0;

    /**
     * 2pi
     *
     * @type {Number}
     * @constant
     */
    static TWO_PI: number = 2.0 * Math.PI;

    /**
     * 1/2pi
     *
     * @type {Number}
     * @constant
     */
    static ONE_OVER_TWO_PI: number = 1.0 / (2.0 * Math.PI);

    /**
     * The number of radians in a degree.
     *
     * @type {Number}
     * @constant
     */
    static RADIANS_PER_DEGREE: number = Math.PI / 180.0;

    /**
     * The number of degrees in a radian.
     *
     * @type {Number}
     * @constant
     */
    static DEGREES_PER_RADIAN: number = 180.0 / Math.PI;

    /**
     * The number of radians in an arc second.
     *
     * @type {Number}
     * @constant
     */
    static RADIANS_PER_ARCSECOND: number = CMath.RADIANS_PER_DEGREE / 3600.0;

    /**
 * Converts degrees to radians.
 * @param {Number} degrees The angle to convert in degrees.
 * @returns {Number} The corresponding angle in radians.
 */
    static toRadians = (degrees: number): number => {
        return degrees * CMath.RADIANS_PER_DEGREE;
    };

    /**
     * Converts radians to degrees.
     * @param {Number} radians The angle to convert in radians.
     * @returns {Number} The corresponding angle in degrees.
     */
    static toDegrees = (radians: number): number => {
        return radians * CMath.DEGREES_PER_RADIAN;
    };
    /**
     * Returns the sign of the value; 1 if the value is positive, -1 if the value is
     * negative, or 0 if the value is 0.
     *
     * @function
     * @param {Number} value The value to return the sign of.
     * @returns {Number} The sign of value.
     */
    // eslint-disable-next-line es/no-math-sign
    static sign = defaultValue(Math.sign, function sign(value: number) {
        value = +value; // coerce to number
        if (value === 0 || value !== value) {
            // zero or NaN
            return value;
        }
        return value > 0 ? 1 : -1;
    });

    /**
     * Returns 1.0 if the given value is positive or zero, and -1.0 if it is negative.
     * This is similar to {@link CMath#sign} except that returns 1.0 instead of
     * 0.0 when the input value is 0.0.
     * @param {Number} value The value to return the sign of.
     * @returns {Number} The sign of value.
     */
    static signNotZero = function (value: number): number {
        return value < 0.0 ? -1.0 : 1.0;
    };
    /**
     * The modulo operation that also works for negative dividends.
     *
     * @param {Number} m The dividend.
     * @param {Number} n The divisor.
     * @returns {Number} The remainder.
     */
    static mod = (m: number, n: number): number => {
        if (!defined(m)) {
            throw new DeveloperError("m is required.");
        }
        if (!defined(n)) {
            throw new DeveloperError("n is required.");
        }
        if (n === 0.0) {
            throw new DeveloperError("divisor cannot be 0.");
        }

        if (CMath.sign(m) === CMath.sign(n) && Math.abs(m) < Math.abs(n)) {
            // Early exit if the input does not need to be modded. This avoids
            // unnecessary math which could introduce floating point error.
            return m;
        }

        return ((m % n) + n) % n;
    };
    /**
    * Constraint a value to lie between two values.
    *
    * @param {Number} value The value to constrain.
    * @param {Number} min The minimum value.
    * @param {Number} max The maximum value.
    * @returns {Number} The value clamped so that min <= value <= max.
    */
    static clamp = function (value: number, min: number, max: number): number {

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
    /**
     * Computes <code>Math.acos(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
     * so that the function will never return NaN.
     *
     * @param {Number} value The value for which to compute acos.
     * @returns {Number} The acos of the value if the value is in the range [-1.0, 1.0], or the acos of -1.0 or 1.0,
     *          whichever is closer, if the value is outside the range.
     */
    static acosClamped = function (value: number): number {

        if (!defined(value)) {
            throw new DeveloperError("value is required.");
        }

        return Math.acos(CMath.clamp(value, -1.0, 1.0));
    };
    /**
     * Computes the linear interpolation of two values.
     *
     * @param {Number} p The start value to interpolate.
     * @param {Number} q The end value to interpolate.
     * @param {Number} time The time of interpolation generally in the range <code>[0.0, 1.0]</code>.
     * @returns {Number} The linearly interpolated value.
     *
     * @example
     * var n = Cesium.Math.lerp(0.0, 2.0, 0.5); // returns 1.0
     */
    static lerp = function (p: number, q: number, time: number): number {
        return (1.0 - time) * p + time * q;
    };
}