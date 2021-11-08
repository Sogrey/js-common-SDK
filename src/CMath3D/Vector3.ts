/**
 * Vector3
 * 
 * This is the doc comment for Vector3
 *
 * @module Vector3
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

export class Vector3 {
    x: number = 0; y: number = 0; z: number = 0;
    constructor(x?: number, y?: number, z?: number) {
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
    }
}