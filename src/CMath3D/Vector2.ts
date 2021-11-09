/**
 * Vector2
 * 
 * This is the doc comment for Vector2
 *
 * @module Vector2
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { Vector3 } from "./Vector3"
import { Vector4 } from "./Vector4"

export class Vector2 {
    x: number = 0; y: number = 0;
    constructor(x?: number, y?: number) {
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
    }

    /**
     * Creates a Vector2 instance from x and y coordinates.
     *
     * @param {Number} x The x coordinate.
     * @param {Number} y The y coordinate.
     * @param {Vector2} [result] The object onto which to store the result.
     * @returns {Vector2} The modified result parameter or a new Vector2 instance if one was not provided.
     */
    static fromElements = function (x: number, y: number, result: Vector2): Vector2 {
        if (!defined(result)) {
            return new Vector2(x, y);
        }

        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Duplicates a Vector2 instance.
     *
     * @param {Vector2 | Vector3 | Vector4} v2 The Vector to duplicate.
     * @param {Vector2} [result] The object onto which to store the result.
     * @returns {Vector2} The modified result parameter or a new Vector2 instance if one was not provided. (Returns undefined if cartesian is undefined)
     */
    static clone = function (v2: Vector2 | Vector3 | Vector4, result: Vector2): undefined | Vector2 {
        if (!defined(v2)) {
            return undefined;
        }
        if (!defined(result)) {
            return new Vector2(v2.x, v2.y);
        }

        result.x = v2.x;
        result.y = v2.y;
        return result;
    };

    /**
     * Creates a Vector2 instance from an existing Vector3.  This simply takes the
     * x and y properties of the Vector3 and drops z.
     * @function
     *
     * @param {Vector3} v3 The Vector3 instance to create a Vector2 instance from.
     * @param {Vector2} [result] The object onto which to store the result.
     * @returns {Vector2} The modified result parameter or a new Vector2 instance if one was not provided.
     */
    static fromVector3 = Vector2.clone;

    /**
     * Creates a Vector2 instance from an existing Vector4.  This simply takes the
     * x and y properties of the Vector4 and drops z and w.
     * @function
     *
     * @param {Vector4} v4 The Vector4 instance to create a Vector2 instance from.
     * @param {Vector2} [result] The object onto which to store the result.
     * @returns {Vector2} The modified result parameter or a new Vector2 instance if one was not provided.
     */
    static fromVector4 = Vector2.clone;

    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    static packedLength = 2;
}