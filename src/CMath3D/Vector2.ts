/**
 * Vector2
 * 
 * This is the doc comment for Vector2
 *
 * @module Vector2
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

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
    static fromElements = function (x: number, y: number, result: Vector2) {
        if (!defined(result)) {
            return new Vector2(x, y);
        }

        result.x = x;
        result.y = y;
        return result;
    };

}