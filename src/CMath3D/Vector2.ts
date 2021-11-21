/**
 * Vector2
 * 
 * This is the doc comment for Vector2
 *
 * @module Vector2
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Vector3 } from "./Vector3"
import { Vector4 } from "./Vector4"
import { Matrix3 } from "./Matrix3"

export class Vector2 {
    x: number = 0; y: number = 0;
    /**
     * @alias Vector2
     * @constructor
     * @see <a href="./Vector2.html">Vector2</a>
     * @see <a href="./Vector4.html">Vector4</a>
     */
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
     * @param {Vector2 | Vector2 | Vector4} v2 The Vector to duplicate.
     * @param {Vector2} [result] The object onto which to store the result.
     * @returns {Vector2} The modified result parameter or a new Vector2 instance if one was not provided. (Returns undefined if v2 is undefined)
     */
    static clone = function (v2: Vector2 | Vector2 | Vector4, result: Vector2): undefined | Vector2 {
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
     * Creates a Vector2 instance from an existing Vector2.  This simply takes the
     * x and y properties of the Vector2 and drops z.
     * @function
     *
     * @param {Vector2} v3 The Vector2 instance to create a Vector2 instance from.
     * @param {Vector2} [result] The object onto which to store the result.
     * @returns {Vector2} The modified result parameter or a new Vector2 instance if one was not provided.
     */
    static fromVector2 = Vector2.clone;

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

    /**
     * Computes the provided Vector2's squared magnitude.
     *
     * @param {Vector2} v2 The Vector2 instance whose squared magnitude is to be computed.
     * @returns {Number} The squared magnitude.
     */
    static magnitudeSquared = function (v2: Vector2) {
        return v2.x * v2.x + v2.y * v2.y;
    };

    /**
     * Computes the Vector2's magnitude (length).
     *
     * @param {Vector2} v2 The Vector2 instance whose magnitude is to be computed.
     * @returns {Number} The magnitude.
     */
    static magnitude = function (v2: Vector2) {
        return Math.sqrt(Vector2.magnitudeSquared(v2));
    };

    /**
     * 设置向量的模长
     * @param length 模长
     * @param result 结果向量
     * @returns 结果向量
     */
    setLength = (length: number, result?: Vector2) => {

        if (!defined(result) || !(result! instanceof Vector2)) result = new Vector2();

        Vector2.multiplyByScalar(this.normalize()!, length, result);

        return result!;

    }
    /**
     * Computes the distance between two points.
     *
     * @param {Vector2} left The first point to compute the distance from.
     * @param {Vector2} right The second point to compute the distance to.
     * @returns {Number} The distance between two points.
     *
     * @example
     * 
     * var d = static distance(new Vector2(1.0, 0.0), new Vector2(2.0, 0.0));
     */
    static distance = function (left: Vector2, right: Vector2) {
        var distanceScratch = new Vector2();
        Vector2.subtract(left, right, distanceScratch);
        return Vector2.magnitude(distanceScratch);
    };

    /**
     * Computes the squared distance between two points.  Comparing squared distances
     * using this function is more efficient than comparing distances using {@link Vector2#distance}.
     *
     * @param {Vector2} left The first point to compute the distance from.
     * @param {Vector2} right The second point to compute the distance to.
     * @returns {Number} The distance between two points.
     *
     * @example
     * 
     * var d = static distance(new Vector2(1.0, 0.0), new Vector2(3.0, 0.0));
     */
    static distanceSquared = function (left: Vector2, right: Vector2) {
        var distanceScratch = new Vector2();
        Vector2.subtract(left, right, distanceScratch);
        return Vector2.magnitudeSquared(distanceScratch);
    };
    /**
     * Computes the componentwise sum of two Vectors.
     *
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static add = function (left: Vector2, right: Vector2, result?: Vector2) {
        if (!defined(result)) result = new Vector2();
        result!.x = left.x + right.x;
        result!.y = left.y + right.y;
        return result!;
    };
    /**
     * Computes the componentwise sum of two Vectors.
     *
     * @param {Vector2} right The second Vector.
     * @returns {Vector2} The modified result parameter.
     */
    add = (right: Vector2) => {
        return Vector2.add(this, right, this);
    };
    /**
     * Computes the componentwise difference of two Vectors.
     *
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static subtract = function (left: Vector2, right: Vector2, result: Vector2) {
        result.x = left.x - right.x;
        result.y = left.y - right.y;
        return result;
    };

    /**
   * Calculate the vector composed of the minimum value of each dimension of two two-dimensional vectors.
   * @param {Vector2} left The first Vector.
   * @param {Vector2} right The second Vector.
   * @param {Vector2} result The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
    static min = function (left: Vector2, right: Vector2, result?: Vector2): Vector2 {
        if (!defined(result)) result = new Vector2();

        result!.x = Math.min(left.x, right.x);
        result!.y = Math.min(left.y, right.y);

        return result!;
    }

    /**
     * Calculate the vector composed of the minimum value of each dimension of a set of two-dimensional vectors
     * @param array The Vectors.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static minFromArray = function (array: Array<Vector2>, result?: Vector2): Vector2 {
        if (!defined(result)) result = new Vector2();

        if (array.length > 0)
            for (let index = 0; index < array.length; index++) {
                const v = array[index];

                result = Vector2.min(v, result!);
            }

        return result!;
    }
    /**
     * Calculate the vector composed of the maximum value of each dimension of two two-dimensional vectors
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static max = function (left: Vector2, right: Vector2, result?: Vector2): Vector2 {
        if (!defined(result)) result = new Vector2();

        result!.x = Math.max(left.x, right.x);
        result!.y = Math.max(left.y, right.y);

        return result!;
    }

    /**
   * Calculate the vector composed of the maximum value of each dimension of a set of two-dimensional vectors
   * @param array The Vectors.
   * @param {Vector2} result The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
    static maxFromArray = function (array: Array<Vector2>, result?: Vector2): Vector2 {
        if (!defined(result)) result = new Vector2();

        if (array.length > 0)
            for (let index = 0; index < array.length; index++) {
                const v = array[index];

                result = Vector2.max(v, result!);
            }

        return result!;
    }

    /**
     * 应用旋转矩阵
     * @param m 
     * @returns 
     */
    applyMatrix3=( m:Matrix3 )=> {

		const x = this.x, y = this.y;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

		return this;
	}

    clamp = (min: Vector2, max: Vector2) => {
        // assumes min < max, componentwise

        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));

        return this;
    }

    clampScalar = (minVal: number, maxVal: number) => {
        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));

        return this;
    }

    clampLength = (min: number, max: number) => {
        const length = Vector2.magnitude(this);

        var v = new Vector2();
        Vector2.divideByScalar(this, length || 1, v);
        Vector2.multiplyByScalar(v, Math.max(min, Math.min(max, length)), v);
        return v;
    }

    floor = () => {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;
    }

    ceil = () => {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;
    }

    round = () => {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }
    /**
     * Computes the normalized form of the supplied Vector.
     *
     * @param {Vector2} v2 The Vector to be normalized.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static normalize = function (v2: Vector2, result: Vector2) {
        var magnitude = Vector2.magnitude(v2);

        result.x = v2.x / magnitude;
        result.y = v2.y / magnitude;

        return result;
    };
    /**
     * Computes the normalized form of the supplied Vector.
     *
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    normalize = (result?: Vector2) => {
        if (!defined(result)) result = new Vector2();
        var magnitude = Vector2.magnitude(this);

        result!.x = this.x / magnitude;
        result!.y = this.y / magnitude;

        return result;
    };

    /**
     * Computes the dot (scalar) product of two Vectors.
     *
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @returns {Number} The dot product.
     */
    static dot = function (left: Vector2, right: Vector2) {
        return left.x * right.x + left.y * right.y;
    };

    /**
     * Computes the magnitude of the cross product that would result from implicitly setting the Z coordinate of the input vectors to 0
     *
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @returns {Number} The cross product.
     */
    static cross = function (left: Vector2, right: Vector2) {
        return left.x * right.y - left.y * right.x;
    };

    /**
     * Computes the midpoint between the right and left Vector.
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The midpoint.
     */
    static midpoint = function (left: Vector2, right: Vector2, result: Vector2) {
        result.x = (left.x + right.x) * 0.5;
        result.y = (left.y + right.y) * 0.5;
        return result;
    };

    /**
     * Computes the componentwise product of two Vectors.
     *
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static multiplyComponents = function (left: Vector2, right: Vector2, result: Vector2) {
        result.x = left.x * right.x;
        result.y = left.y * right.y;
        return result;
    };

    /**
     * Computes the componentwise quotient of two Vectors.
     *
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static divideComponents = function (left: Vector2, right: Vector2, result: Vector2) {
        result.x = left.x / right.x;
        result.y = left.y / right.y;
        return result;
    };

    /**
     * Multiplies the provided Vector componentwise by the provided scalar.
     *
     * @param {Vector2} v2 The Vector to be scaled.
     * @param {Number} scalar The scalar to multiply with.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static multiplyByScalar = function (v2: Vector2, scalar: number, result?: Vector2) {
        if (!defined(result)) result = new Vector2();
        result!.x = v2.x * scalar;
        result!.y = v2.y * scalar;
        return result;
    };

    /**
     * Divides the provided Vector componentwise by the provided scalar.
     *
     * @param {Vector2} v2 The Vector to be divided.
     * @param {Number} scalar The scalar to divide by.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static divideByScalar = function (v2: Vector2, scalar: number, result: Vector2) {
        result.x = v2.x / scalar;
        result.y = v2.y / scalar;
        return result;
    };

    /**
     * Negates the provided Vector.
     *
     * @param {Vector2} v2 The Vector to be negated.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static negate = function (v2: Vector2, result: Vector2) {
        result.x = -v2.x;
        result.y = -v2.y;
        return result;
    };

    /**
     * Computes the absolute value of the provided Vector.
     *
     * @param {Vector2} v2 The Vector whose absolute value is to be computed.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static abs = function (v2: Vector2, result: Vector2) {
        result.x = Math.abs(v2.x);
        result.y = Math.abs(v2.y);
        return result;
    };

    /**
     * Computes the linear interpolation or extrapolation at t using the provided cartesians.
     *
     * @param {Vector2} start The value corresponding to t at 0.0.
     * @param {Vector2} end The value corresponding to t at 1.0.
     * @param {Number} t The point along t at which to interpolate.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static lerp = function (start: Vector2, end: Vector2, t: number, result?: Vector2) {
        if (!defined(result)) result = new Vector2();
        let lerpScratch = new Vector2();

        Vector2.multiplyByScalar(end, t, lerpScratch);
        result = Vector2.multiplyByScalar(start, 1.0 - t, result);
        return Vector2.add(lerpScratch, result!, result);
    };


    /**
     * Returns the angle, in radians, between the provided Vectors.
     *
     * @param {Vector2} left The first Vector.
     * @param {Vector2} right The second Vector.
     * @returns {Number} The angle between the Vectors.
     */
    static angleBetween = function (left: Vector2, right: Vector2) {
        let angleBetweenScratch = new Vector2();
        let angleBetweenScratch2 = new Vector2();

        Vector2.normalize(left, angleBetweenScratch);
        Vector2.normalize(right, angleBetweenScratch2);
        return CMath.acosClamped(
            Vector2.dot(angleBetweenScratch, angleBetweenScratch2)
        );
    };
    /**
     * Compares the provided Vectors componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Vector2} [left] The first Vector.
     * @param {Vector2} [right] The second Vector.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals = function (left: Vector2, right: Vector2) {
        return (
            left === right ||
            (defined(left) &&
                defined(right) &&
                left.x === right.x &&
                left.y === right.y)
        );
    };

    /**
     * An immutable Vector2 instance initialized to (0.0, 0.0).
     *
     * @type {Vector2}
     * @constant
     */
    static ZERO = Object.freeze(new Vector2(0.0, 0.0));

    /**
     * An immutable Vector2 instance initialized to (1.0, 1.0).
     *
     * @type {Vector2}
     * @constant
     */
    static ONE = Object.freeze(new Vector2(1.0, 1.0));

    /**
     * An immutable Vector2 instance initialized to (1.0, 0.0).
     *
     * @type {Vector2}
     * @constant
     */
    static UNIT_X = Object.freeze(new Vector2(1.0, 0.0));

    /**
     * An immutable Vector2 instance initialized to (0.0, 1.0).
     *
     * @type {Vector2}
     * @constant
     */
    static UNIT_Y = Object.freeze(new Vector2(0.0, 1.0));

    /**
     * Duplicates this Vector2 instance.
     *
     * @param {Vector2} [result] The object onto which to store the result.
     * @returns {Vector2} The modified result parameter or a new Vector2 instance if one was not provided.
     */
    clone = (result?: Vector2): Vector2 | undefined => {
        if(!defined(result)) result = new Vector2();
        return Vector2.clone(this, result!);
    };

    /**
     * Compares this Vector against the provided Vector componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Vector2} [right] The right hand side Vector.
     * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals = (right: Vector2) => {
        return Vector2.equals(this, right);
    };

    /**
     * 数组转二维向量
     * @param array 数组
     * @param offset 指定数组截取偏移量
     * @returns 结果向量
     */
    fromArray = (array: Array<number>, offset: number = 0) => {

        this.x = array[offset];
        this.y = array[offset + 1];

        return this;
    }

    /**
     * 二维向量转数组，数据压缩
     * @param offset 指定数组存储开始偏移量
     * @param result 结果数组
     * @returns 结果数组
     */
    toArray = (offset: number = 0, result?: Array<number>) => {
        if (!defined(result) || !Array.isArray(result)) result = new Array<number>();

        result[offset] = this.x;
        result[offset + 1] = this.y;

        return result;
    }

    /**
     * 生成随机二位矢量
     * @param result 生成的结果
     * @returns 生成的结果
     */
    static random = function (result?: Vector2) {
        if (!defined(result)) result = new Vector2();

        result!.x = Math.random();
        result!.y = Math.random();

        return result!;
    }
    /**
     * Creates a string representing this Vector in the format '(x, y)'.
     *
     * @returns {String} A string representing the provided Vector in the format '(x, y)'.
     */
    toString = () => {
        return "(" + this.x + ", " + this.y + ")";
    };
}