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
* Constraint a value to lie between two values.
*
* @param {Number} value The value to constrain.
* @param {Number} min The minimum value.
* @param {Number} max The maximum value.
* @returns {Number} The value clamped so that min <= value <= max.
*/
    static clamp = function (value: number, min: number, max: number) {

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
    };/**
  * Computes <code>Math.acos(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
  * so that the function will never return NaN.
  *
  * @param {Number} value The value for which to compute acos.
  * @returns {Number} The acos of the value if the value is in the range [-1.0, 1.0], or the acos of -1.0 or 1.0,
  *          whichever is closer, if the value is outside the range.
  */
    static acosClamped = function (value: number) {

        if (!defined(value)) {
            throw new DeveloperError("value is required.");
        }

        return Math.acos(CMath.clamp(value, -1.0, 1.0));
    };
}