

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Quaternion } from "./Quaternion";
import { Matrix2 } from "./Matrix2";
import { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";
import { DeveloperError } from "../DeveloperError";

/**
 * Euler
 * 
 * This is the doc comment for Euler.
 * 
 * 欧拉角描述一个旋转变换，通过指定轴顺序和其各个轴向上的指定旋转角度来旋转一个物体。
 *
 * @module Euler
 */
export class Euler {
    /**用弧度表示x轴旋转量。 默认值是 0 */
    x: number = 0;
    /**用弧度表示y轴旋转量。 默认值是 0 */
    y: number = 0;
    /**用弧度表示z轴旋转量。 默认值是 0 */
    z: number = 0;
    /**order值应用于旋转顺序。默认值为 'XYZ'，这意味着对象将首先是 绕X轴旋转，然后是Y轴，最后是Z轴。其他可能性包括: 'YZX'， 'ZXY'， 'XZY'， 'YXZ'和'ZYX'。这些必须是大写字母。 */
    order: string = Euler.DefaultOrder;
    /**
     * 欧拉角描述一个旋转变换，通过指定轴顺序和其各个轴向上的指定旋转角度来旋转一个物体。
     * @param x 用弧度表示x轴旋转量。 默认值是 0
     * @param y 用弧度表示y轴旋转量。 默认值是 0
     * @param z 用弧度表示z轴旋转量。 默认值是 0
     * @param order 表示旋转顺序的字符串，默认为'XYZ'（必须是大写）
     */
    constructor(
        x?: number, y?: number, z?: number, order?: string
    ) {
        this.x = defaultValue(x, 0);
        this.y = defaultValue(y, 0);
        this.z = defaultValue(z, 0);
        this.order = defaultValue(order, "XYZ");
    }

    isEuler = true;

    /**
     * <pre><code>
     * Euler.DefaultOrder = 'XYZ';
     * </code></pre>
     */
    static DefaultOrder = 'XYZ';
    /**
     * <pre><code>
     * Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
     * </code></pre>
     */
    static RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
    /**
       * 设置欧拉角。
       * @param x 用弧度表示x轴旋转量。 默认值是 0
       * @param y 用弧度表示y轴旋转量。 默认值是 0
       * @param z 用弧度表示z轴旋转量。 默认值是 0
       * @param order 表示旋转顺序的字符串，默认为'XYZ'（必须是大写）
       * @returns 
       */
    set = (x: number, y: number, z: number, order: string) => {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;

        return this;
    }

    static clone = function (value: Euler, result?: Euler): Euler {
        if (!defined(result)) result = new Euler();

        result!.set(value.x, value.y, value.z, value.order);

        return result!;
    }

    clone = (result?: Euler): Euler => {

        return Euler.clone(this, result);

    }

    /**
     * 
     * @param m 
     * @param order 默认值：<a href="#DefaultOrder">Euler.DefaultOrder</a>
     * @param result 
     * @returns 
     */
    static fromRotationMatrix = function (m: Matrix4, order: string = Euler.DefaultOrder, result?: Euler): Euler {
        if (!defined(result)) result = new Euler();

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

        const te = m.elements;
        const m11 = te[0], m12 = te[4], m13 = te[8];
        const m21 = te[1], m22 = te[5], m23 = te[9];
        const m31 = te[2], m32 = te[6], m33 = te[10];

        switch (order) {
            case 'XYZ':
                result!.y = Math.asin(CMath.clamp(m13, - 1, 1));
                if (Math.abs(m13) < 0.9999999) {
                    result!.x = Math.atan2(- m23, m33);
                    result!.z = Math.atan2(- m12, m11);
                } else {
                    result!.x = Math.atan2(m32, m22);
                    result!.z = 0;
                }
                break;
            case 'YXZ':
                result!.x = Math.asin(- CMath.clamp(m23, - 1, 1));
                if (Math.abs(m23) < 0.9999999) {
                    result!.y = Math.atan2(m13, m33);
                    result!.z = Math.atan2(m21, m22);
                } else {
                    result!.y = Math.atan2(- m31, m11);
                    result!.z = 0;
                }
                break;
            case 'ZXY':
                result!.x = Math.asin(CMath.clamp(m32, - 1, 1));
                if (Math.abs(m32) < 0.9999999) {
                    result!.y = Math.atan2(- m31, m33);
                    result!.z = Math.atan2(- m12, m22);
                } else {
                    result!.y = 0;
                    result!.z = Math.atan2(m21, m11);
                }
                break;
            case 'ZYX':
                result!.y = Math.asin(-CMath.clamp(m31, - 1, 1));
                if (Math.abs(m31) < 0.9999999) {
                    result!.x = Math.atan2(m32, m33);
                    result!.z = Math.atan2(m21, m11);
                } else {
                    result!.x = 0;
                    result!.z = Math.atan2(- m12, m22);
                }
                break;
            case 'YZX':
                result!.z = Math.asin(CMath.clamp(m21, - 1, 1));
                if (Math.abs(m21) < 0.9999999) {
                    result!.x = Math.atan2(- m23, m22);
                    result!.y = Math.atan2(- m31, m11);
                } else {
                    result!.x = 0;
                    result!.y = Math.atan2(m13, m33);
                }
                break;
            case 'XZY':
                result!.z = Math.asin(-CMath.clamp(m12, - 1, 1));
                if (Math.abs(m12) < 0.9999999) {
                    result!.x = Math.atan2(m32, m22);
                    result!.y = Math.atan2(m13, m11);
                } else {
                    result!.x = Math.atan2(- m23, m33);
                    result!.y = 0;
                }
                break;
            default:
                throw new DeveloperError('An unknown order: ' + order);
        }

        result!.order = order;

        return result!;
    }

    /**
     * 
     * @param q 
     * @param order 默认值：<a href="#DefaultOrder">Euler.DefaultOrder</a>
     * @param result 
     * @returns 
     */
    static fromQuaternion = function (q: Quaternion, order: string = Euler.DefaultOrder, result?: Euler): Euler {

        const _matrix = new Matrix4();
        _matrix.makeRotationFromQuaternion(q);

        return Euler.fromRotationMatrix(_matrix, order, result);
    }
    /**
     * 
     * @param v 
     * @param order 默认值：<a href="#DefaultOrder">Euler.DefaultOrder</a>
     * @param result 
     * @returns 
     */
    static fromVector3 = function (v: Vector3, order: string = Euler.DefaultOrder, result?: Euler): Euler {
        if (!defined(result)) result = new Euler();

        return result!.set(v.x, v.y, v.z, order);
    }

    static equals = function (left: Euler, right: Euler): boolean {

        return (left.x === right.x) && (left.y === right.y) && (left.z === right.z) && (left.order === right.order);

    }

    equals = (euler: Euler): boolean => {
        return Euler.equals(this, euler);
    }

    static fromArray = function (array: Array<number | string>, result?: Euler): Euler {
        if (!defined(result)) result = new Euler();

        result!.x = Number(array[0]);
        result!.y = Number(array[1]);
        result!.z = Number(array[2]);
        var order = String(array[3]);

        if (defined(order) && Euler.RotationOrders.includes(order)) {
            result!.order = order;
        } else {
            throw new DeveloperError('An unknown order: ' + order);
        }

        return result!;
    }

    static toArray = function (value: Euler, array: Array<number | string> = [], offset: number = 0) {

        array[offset] = value.x;
        array[offset + 1] = value.y;
        array[offset + 2] = value.z;
        array[offset + 3] = value.order;

        return array;
    }

    toArray = (array: Array<number | string> = [], offset: number = 0) => {
        Euler.toArray(this, array, offset);
    }

    static toVector3 = function (euler: Euler, result?: Vector3) {
        if (!defined(result)) result = new Vector3();
        result!.fromArray([euler.x, euler.y, euler.z]);
        return result!;
    }

    toVector3 = (result?: Vector3) => {
        return Euler.toVector3(this, result);
    }

    toString = () => {
        return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.order + ")";
    };
}