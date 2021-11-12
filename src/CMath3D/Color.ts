/**
 * Color
 * 
 * This is the doc comment for Color
 *
 * @module Color
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Vector3 } from "./Vector3"
import { Vector4 } from "./Vector4";

export class Color {
    r: number = 1; g: number = 1; b: number = 1; a: number = 1;
    constructor(r?: number, g?: number, b?: number, a?: number) {
        /**
         * The RED component.
         * @type {Number}
         * @default 1.0
         */
        this.r = defaultValue(r, 1.0);

        /**
         * The GREEN component.
         * @type {Number}
         * @default 1.0
         */
        this.g = defaultValue(g, 1.0);
        /**
         * The BLUE component.
         * @type {Number}
         * @default 1.0
         */
        this.b = defaultValue(b, 1.0);
        /**
         * The ALPHA component.
         * @type {Number}
         * @default 1.0
         */
        this.a = defaultValue(a, 1.0);
    }

    /**
     * Creates a Color instance from a {@link Vector4}. <code>x</code>, <code>y</code>, <code>z</code>,
     * and <code>w</code> map to <code>r</code>, <code>g</code>, <code>b</code>, and <code>a</code>, respectively.
     *
     * @param {Vector4} v4 The source cartesian.
     * @param {Color} [result] The object onto which to store the result.
     * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
     */
    static fromVector4 = function (v4: Vector4, result: Color) {
        if (!defined(result)) {
            return new Color(v4.x, v4.y, v4.z, v4.w);
        }

        result.r = v4.x;
        result.g = v4.y;
        result.b = v4.z;
        result.a = v4.w;

        return result;
    };
}