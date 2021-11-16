/**
 * Quaternion
 * 
 * This is the doc comment for Quaternion
 *
 * @module Quaternion
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"

export class Quaternion {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 0;
    /**
    * A set of 4-dimensional coordinates used to represent rotation in 3-dimensional space.
    * @alias Quaternion
    * @constructor
    *
    * @param {Number} [x=0.0] The X component.
    * @param {Number} [y=0.0] The Y component.
    * @param {Number} [z=0.0] The Z component.
    * @param {Number} [w=0.0] The W component.
    *
    */
    constructor(
        x?: number,
        y?: number,
        z?: number,
        w?: number
    ) {
        /**
         * The X component.
         * @type {Number}
         * @default 0.0
         */
        this.x = defaultValue(x, 0.0);

        /**
         * The Y component.
         * @type {Number}
         * @default 0.0
         */
        this.y = defaultValue(y, 0.0);

        /**
         * The Z component.
         * @type {Number}
         * @default 0.0
         */
        this.z = defaultValue(z, 0.0);

        /**
         * The W component.
         * @type {Number}
         * @default 0.0
         */
        this.w = defaultValue(w, 0.0);
    }
}