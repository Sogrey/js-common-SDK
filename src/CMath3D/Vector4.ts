/**
 * Vector4
 * 
 * This is the doc comment for Vector4
 *
 * @module Vector4
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Color } from "./Color";
import { Matrix4 } from "./Matrix4";

export class Vector4 {
  x: number = 0; y: number = 0; z: number = 0; w: number = 0;
  /**
   * @alias Vector4
   * @constructor
   * @see <a href="./Vector2.html">Vector2</a>
   * @see <a href="./Vector3.html">Vector3</a>
   */
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
    this.z = defaultValue(z, 0.0);
    /**
     * The W component.
     * @type {Number}
     * @default 0.0
     */
    this.w = defaultValue(w, 0.0);
  }

  /**
   * Creates a Vector4 instance from x, y, z ans w coordinates.
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordinate.
   * @param {Number} z The z coordinate.
   * @param {Number} w The w coordinate.
   * @param {Vector4} [result] The object onto which to store the result.
   * @returns {Vector4} The modified result parameter or a new Vector4 instance if one was not provided.
   */
  static fromElements = function (x: number, y: number, z: number, w: number, result: Vector4): Vector4 {
    if (!defined(result)) {
      return new Vector4(x, y, z, w);
    }

    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };

  /**
   * Creates a Vector4 instance from a {@link Color}. <code>red</code>, <code>green</code>, <code>blue</code>,
   * and <code>alpha</code> map to <code>x</code>, <code>y</code>, <code>z</code>, and <code>w</code>, respectively.
   *
   * @param {Color} color The source color.
   * @param {Vector4} [result] The object onto which to store the result.
   * @returns {Vector4} The modified result parameter or a new Vector4 instance if one was not provided.
   */
  static fromColor = function (color: Color, result: Vector4) {
    if (!defined(result)) {
      return new Vector4(color.r, color.g, color.b, color.a);
    }

    result.x = color.r;
    result.y = color.g;
    result.z = color.b;
    result.w = color.a;
    return result;
  };

  /**
   * Duplicates a Vector4 instance.
   *
   * @param {Vector4 | Vector4} v4 The Vector to duplicate.
   * @param {Vector4} [result] The object onto which to store the result.
   * @returns {Vector4} The modified result parameter or a new Vector4 instance if one was not provided. (Returns undefined if v4 is undefined)
   */
  static clone = function (v4: Vector4 | Vector4, result: Vector4): undefined | Vector4 {
    if (!defined(v4)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Vector4(v4.x, v4.y, v4.z, v4.w);
    }

    result.x = v4.x;
    result.y = v4.y;
    result.z = v4.z;
    result.w = v4.w;
    return result;
  };

  /**
   * The number of elements used to pack the object into an array.
   * @type {Number}
   */
  static packedLength = 4;

  /**
   * Computes the provided Vector4's squared magnitude.
   *
   * @param {Vector4} v4 The Vector4 instance whose squared magnitude is to be computed.
   * @returns {Number} The squared magnitude.
   */
  static magnitudeSquared = function (v4: Vector4) {
    return v4.x * v4.x + v4.y * v4.y + v4.z * v4.z + v4.w * v4.w;
  };

  /**
   * Computes the Vector4's magnitude (length).
   *
   * @param {Vector4} v4 The Vector4 instance whose magnitude is to be computed.
   * @returns {Number} The magnitude.
   */
  static magnitude = function (v4: Vector4) {
    return Math.sqrt(Vector4.magnitudeSquared(v4));
  };

  /**
   * 设置向量的模长
   * @param length 模长
   * @param result 结果向量
   * @returns 结果向量
   */
  setLength = (length: number, result?: Vector4) => {

    if (!defined(result) || !(result! instanceof Vector4)) result = new Vector4();

    Vector4.multiplyByScalar(this.normalize()!, length, result);

    return result!;

  }
  /**
   * Computes the distance between two points.
   *
   * @param {Vector4} left The first point to compute the distance from.
   * @param {Vector4} right The second point to compute the distance to.
   * @returns {Number} The distance between two points.
   *
   * @example
   * 
   * var d = static distance(new Vector4(1.0, 0.0, 0.0, 0.0), new Vector4(2.0, 0.0, 0.0, 0.0));
   */
  static distance = function (left: Vector4, right: Vector4) {
    var distanceScratch = new Vector4();
    Vector4.subtract(left, right, distanceScratch);
    return Vector4.magnitude(distanceScratch);
  };

  /**
   * Computes the squared distance between two points.  Comparing squared distances
   * using this function is more efficient than comparing distances using {@link Vector4#distance}.
   *
   * @param {Vector4} left The first point to compute the distance from.
   * @param {Vector4} right The second point to compute the distance to.
   * @returns {Number} The distance between two points.
   *
   * @example
   * 
   * var d = static distance(new Vector4(1.0, 0.0, 0.0, 0.0), new Vector4(3.0, 0.0, 0.0, 0.0));
   */
  static distanceSquared = function (left: Vector4, right: Vector4) {
    var distanceScratch = new Vector4();
    Vector4.subtract(left, right, distanceScratch);
    return Vector4.magnitudeSquared(distanceScratch);
  };
  /**
   * Computes the componentwise sum of two Vectors.
   *
   * @param {Vector4} left The first Vector.
   * @param {Vector4} right The second Vector.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static add = function (left: Vector4, right: Vector4, result?: Vector4) {
    if (!defined(result)) result = new Vector4();
    result!.x = left.x + right.x;
    result!.y = left.y + right.y;
    result!.z = left.z + right.z;
    result!.w = left.w + right.w;
    return result!;
  };
  /**
   * Computes the componentwise sum of two Vectors.
   *
   * @param {Vector4} right The second Vector.
   * @returns {Vector4} The modified result parameter.
   */
  add = (right: Vector4) => {
    return Vector4.add(this, right, this);
  };
  /**
   * Computes the componentwise difference of two Vectors.
   *
   * @param {Vector4} left The first Vector.
   * @param {Vector4} right The second Vector.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static subtract = function (left: Vector4, right: Vector4, result: Vector4) {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.y = left.z - right.z;
    result.w = left.w - right.w;
    return result;
  };


  /**
   * Calculate the vector composed of the minimum value of each dimension of two four-dimensional vectors.
   * @param {Vector4} left The first Vector.
   * @param {Vector4} right The second Vector.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static min = function (left: Vector4, right: Vector4, result?: Vector4): Vector4 {
    if (!defined(result)) result = new Vector4();

    result!.x = Math.min(left.x, right.x);
    result!.y = Math.min(left.y, right.y);
    result!.z = Math.min(left.z, right.z);
    result!.w = Math.min(left.w, right.w);

    return result!;
  }

  /**
   * Calculate the vector composed of the minimum value of each dimension of a set of four-dimensional vectors
   * @param array The Vectors.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static minFromArray = function (array: Array<Vector4>, result?: Vector4): Vector4 {
    if (!defined(result)) result = new Vector4();

    if (array.length > 0)
      for (let index = 0; index < array.length; index++) {
        const v = array[index];

        result = Vector4.min(v, result!);
      }

    return result!;
  }
  /**
   * Calculate the vector composed of the maximum value of each dimension of two four-dimensional vectors
   * @param {Vector4} left The first Vector.
   * @param {Vector4} right The second Vector.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static max = function (left: Vector4, right: Vector4, result?: Vector4): Vector4 {
    if (!defined(result)) result = new Vector4();

    result!.x = Math.max(left.x, right.x);
    result!.y = Math.max(left.y, right.y);
    result!.z = Math.max(left.z, right.z);
    result!.w = Math.max(left.w, right.w);

    return result!;
  }

  /**
 * Calculate the vector composed of the maximum value of each dimension of a set of four-dimensional vectors
 * @param array The Vectors.
 * @param {Vector4} result The object onto which to store the result.
 * @returns {Vector4} The modified result parameter.
 */
  static maxFromArray = function (array: Array<Vector4>, result?: Vector4): Vector4 {
    if (!defined(result)) result = new Vector4();

    if (array.length > 0)
      for (let index = 0; index < array.length; index++) {
        const v = array[index];

        result = Vector4.max(v, result!);
      }

    return result!;
  }
  /**
  * 应用矩阵变换
  * @param matrix 
  * @returns 
  */
  applyMatrix4(m: Matrix4) {
    const x = this.x, y = this.y, z = this.z, w = this.w;
    const e = m.elements;

    this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
    this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

    return this;
  }

  clamp = (min: Vector4, max: Vector4) => {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    this.w = Math.max(min.w, Math.min(max.w, this.w));

    return this;
  }

  clampScalar = (minVal: number, maxVal: number) => {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));
    this.w = Math.max(minVal, Math.min(maxVal, this.w));

    return this;
  }

  clampLength = (min: number, max: number) => {
    const length = Vector4.magnitude(this);

    var v = new Vector4();
    Vector4.divideByScalar(this, length || 1, v);
    Vector4.multiplyByScalar(v, Math.max(min, Math.min(max, length)), v);
    return v;
  }

  floor = () => {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);

    return this;
  }

  ceil = () => {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);

    return this;
  }

  round = () => {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);

    return this;
  }
  /**
   * Computes the normalized form of the supplied Vector.
   *
   * @param {Vector4} v4 The Vector to be normalized.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static normalize = function (v4: Vector4, result: Vector4) {
    var magnitude = Vector4.magnitude(v4);

    result.x = v4.x / magnitude;
    result.y = v4.y / magnitude;
    result.z = v4.z / magnitude;
    result.w = v4.w / magnitude;

    return result;
  };
  /**
   * Computes the normalized form of the supplied Vector.
   *
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  normalize = (result?: Vector4) => {
    if (!defined(result)) result = new Vector4();
    var magnitude = Vector4.magnitude(this);

    result!.x = this.x / magnitude;
    result!.y = this.y / magnitude;
    result!.z = this.z / magnitude;
    result!.w = this.w / magnitude;

    return result;
  };

  /**
   * Computes the dot (scalar) product of two Vectors.
   *
   * @param {Vector4} left The first Vector.
   * @param {Vector4} right The second Vector.
   * @returns {Number} The dot product.
   */
  static dot = function (left: Vector4, right: Vector4) {
    return (
      left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w
    );
  };



  /**
   * Computes the componentwise product of two Vectors.
   *
   * @param {Vector4} left The first Vector.
   * @param {Vector4} right The second Vector.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static multiplyComponents = function (left: Vector4, right: Vector4, result: Vector4) {
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    result.w = left.w * right.w;
    return result;
  };

  /**
   * Computes the componentwise quotient of two Vectors.
   *
   * @param {Vector4} left The first Vector.
   * @param {Vector4} right The second Vector.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static divideComponents = function (left: Vector4, right: Vector4, result: Vector4) {
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    result.z = left.z / right.z;
    result.w = left.w / right.w;
    return result;
  };

  /**
   * Multiplies the provided Vector componentwise by the provided scalar.
   *
   * @param {Vector4} v4 The Vector to be scaled.
   * @param {Number} scalar The scalar to multiply with.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static multiplyByScalar = function (v4: Vector4, scalar: number, result?: Vector4) {
    if (!defined(result)) result = new Vector4();

    result!.x = v4.x * scalar;
    result!.y = v4.y * scalar;
    result!.z = v4.z * scalar;
    result!.w = v4.w * scalar;

    return result;
  };

  /**
   * Divides the provided Vector componentwise by the provided scalar.
   *
   * @param {Vector4} v4 The Vector to be divided.
   * @param {Number} scalar The scalar to divide by.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static divideByScalar = function (v4: Vector4, scalar: number, result: Vector4) {
    result.x = v4.x / scalar;
    result.y = v4.y / scalar;
    result.z = v4.z / scalar;
    result.w = v4.w / scalar;
    return result;
  };

  /**
   * Negates the provided Vector.
   *
   * @param {Vector4} v4 The Vector to be negated.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static negate = function (v4: Vector4, result: Vector4) {
    result.x = -v4.x;
    result.y = -v4.y;
    result.z = -v4.z;
    result.w = -v4.w;
    return result;
  };

  /**
   * Computes the absolute value of the provided Vector.
   *
   * @param {Vector4} v4 The Vector whose absolute value is to be computed.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static abs = function (v4: Vector4, result: Vector4) {
    result.x = Math.abs(v4.x);
    result.y = Math.abs(v4.y);
    result.z = Math.abs(v4.z);
    result.w = Math.abs(v4.w);
    return result;
  };

  /**
   * Computes the linear interpolation or extrapolation at t using the provided cartesians.
   *
   * @param {Vector4} start The value corresponding to t at 0.0.
   * @param {Vector4} end The value corresponding to t at 1.0.
   * @param {Number} t The point along t at which to interpolate.
   * @param {Vector4} result The object onto which to store the result.
   * @returns {Vector4} The modified result parameter.
   */
  static lerp = function (start: Vector4, end: Vector4, t: number, result?: Vector4) {
    if (!defined(result)) result = new Vector4();
    let lerpScratch = new Vector4();

    Vector4.multiplyByScalar(end, t, lerpScratch);
    result = Vector4.multiplyByScalar(start, 1.0 - t, result);
    return Vector4.add(lerpScratch, result!, result);
  };

  /**
   * Compares the provided Vectors componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Vector4} [left] The first Vector.
   * @param {Vector4} [right] The second Vector.
   * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals = function (left: Vector4, right: Vector4) {
    return (
      left === right ||
      (defined(left) &&
        defined(right) &&
        left.x === right.x &&
        left.y === right.y &&
        left.z === right.z &&
        left.w === right.w)
    );
  };

  /**
   * An immutable Vector4 instance initialized to (0.0, 0.0, 0.0, 0.0).
   *
   * @type {Vector4}
   * @constant
   */
  static ZERO = Object.freeze(new Vector4(0.0, 0.0, 0.0, 0.0));

  /**
   * An immutable Vector4 instance initialized to (1.0, 1.0, 1.0, 1.0).
   *
   * @type {Vector4}
   * @constant
   */
  static ONE = Object.freeze(new Vector4(1.0, 1.0, 1.0, 1.0));

  /**
   * An immutable Vector4 instance initialized to (1.0, 0.0, 0.0, 0.0).
   *
   * @type {Vector4}
   * @constant
   */
  static UNIT_X = Object.freeze(new Vector4(1.0, 0.0, 0.0, 0.0));

  /**
   * An immutable Vector4 instance initialized to (0.0, 1.0, 0.0, 0.0).
   *
   * @type {Vector4}
   * @constant
   */
  static UNIT_Y = Object.freeze(new Vector4(0.0, 1.0, 0.0, 0.0));

  /**
   * An immutable Vector4 instance initialized to (0.0, 0.0, 1.0, 0.0).
   *
   * @type {Vector4}
   * @constant
   */
  static UNIT_Z = Object.freeze(new Vector4(0.0, 0.0, 1.0, 0.0));

  /**
   * An immutable Vector4 instance initialized to (0.0, 0.0, 0.0, 1.0).
   *
   * @type {Vector4}
   * @constant
   */
  static UNIT_W = Object.freeze(new Vector4(0.0, 0.0, 0.0, 1.0));

  /**
   * Duplicates this Vector4 instance.
   *
   * @param {Vector4} [result] The object onto which to store the result.
   * @returns {Vector4} The modified result parameter or a new Vector4 instance if one was not provided.
   */
  clone = (result: Vector4) => {
    return Vector4.clone(this, result);
  };

  /**
   * Compares this Vector against the provided Vector componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Vector4} [right] The right hand side Vector.
   * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals = (right: Vector4) => {
    return Vector4.equals(this, right);
  };

  /**
   * 数组转 Vector4
   * @param array 数组
   * @param offset 指定数组截取偏移量
   * @returns 结果向量
   */
  fromArray = (array: Array<number>, offset: number = 0) => {

    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    this.w = array[offset + 3];

    return this;
  }

  /**
   * Vector4 转数组，数据压缩
   * @param offset 指定数组存储开始偏移量
   * @param result 结果数组
   * @returns 结果数组
   */
  toArray = (offset: number = 0, result?: Array<number>) => {
    if (!defined(result) || !Array.isArray(result)) result = new Array<number>();

    result[offset] = this.x;
    result[offset + 1] = this.y;
    result[offset + 2] = this.z;
    result[offset + 3] = this.w;

    return result;
  }

  /**
   * 生成随机 Vector4
   * @param result 生成的结果
   * @returns 生成的结果
   */
  static random = function (result?: Vector4) {
    if (!defined(result)) result = new Vector4();

    result!.x = Math.random();
    result!.y = Math.random();
    result!.z = Math.random();
    result!.w = Math.random();

    return result!;
  }
  length = (): number => {
    return Vector4.magnitude(this);
  }
  /**
   * Creates a string representing this Vector in the format '(x, y, z, w)'.
   *
   * @returns {String} A string representing the provided Vector in the format '(x, y, z, w)'.
   */
  toString = () => {
    return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
  };
}