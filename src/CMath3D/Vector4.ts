/**
 * Vector4
 * 
 * This is the doc comment for Vector4
 *
 * @module Vector4
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

export class Vector4 {
    x: number = 0; y: number = 0; z: number = 0; w: number = 0;
    constructor(x?: number, y?: number, z?: number, w?: number) {
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
        this.z = defaultValue(z, 0.0);   /**
         * The W component.
         * @type {Number}
         * @default 0.0
         */
        this.w = defaultValue(w, 0.0);
    }
}