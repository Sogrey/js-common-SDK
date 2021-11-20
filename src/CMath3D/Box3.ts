/**
 * Box3
 * 
 * This is the doc comment for Box3
 * 
 * 表示三维空间中的一个轴对齐包围盒
 *  
 * @module Box3
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { Vector3 } from "./Vector3"

export class Box3 {
    /**表示该盒子的下边界(x, y, z)。默认值为( +Infinity, +Infinity, +Infinity )。 */
    min: Vector3 = new Vector3(+Infinity, +Infinity, +Infinity);
    /**表示该盒子的上边界(x, y, z)。默认值为( -Infinity, -Infinity, -Infinity )。 */
    max: Vector3 = new Vector3(-Infinity, -Infinity, -Infinity);
    /**
     *
     * @param {Number} [min=new Vector3(+Infinity, +Infinity, +Infinity)]  表示该盒子的下边界(x, y)。默认值为( + Infinity, + Infinity )。
     * @param {Number} [max=new Vector3(-Infinity, -Infinity, -Infinity)] 表示该盒子的上边界(x, y)。默认值为( - Infinity, - Infinity )。
     * 
     * 
     * @see Box3
     */
    constructor(min?: Vector3, max?: Vector3) {

        this.min = defaultValue(min, this.min);
        this.max = defaultValue(max, this.max);

    }
}