/**
 * Box2
 * 
 * This is the doc comment for Box2
 * 
 * 表示二维空间中的一个轴对齐包围盒
 *  
 * @module Box2
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { Vector2 } from "./Vector2"

export class Box2 {
    /**表示该盒子的下边界(x, y)。默认值为( +Infinity, +Infinity )。 */
    min: Vector2 = new Vector2(+Infinity, +Infinity);
    /**表示该盒子的上边界(x, y)。默认值为( -Infinity, -Infinity )。 */
    max: Vector2 = new Vector2(-Infinity, -Infinity);
    /**
     *
     * @param {Number} [min=new Vector2(+Infinity, +Infinity)]  表示该盒子的下边界(x, y)。默认值为( + Infinity, + Infinity )。
     * @param {Number} [max=new Vector2(-Infinity, -Infinity)] 表示该盒子的上边界(x, y)。默认值为( - Infinity, - Infinity )。
     * 
     * 
     * @see Box3
     */
    constructor(min?: Vector2, max?: Vector2) {

        this.min = defaultValue(min, this.min);
        this.max = defaultValue(max, this.max);

    }
}