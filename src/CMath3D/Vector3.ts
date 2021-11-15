/**
 * Vector3
 * 
 * This is the doc comment for Vector3
 *
 * @module Vector3
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Vector4 } from "./Vector4"

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

  /**
   * Creates a Vector3 instance from x, y and z coordinates.
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordinate.
   * @param {Number} z The z coordinate.
   * @param {Vector3} [result] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter or a new Vector3 instance if one was not provided.
   */
  static fromElements = function (x: number, y: number, z: number, result: Vector3): Vector3 {
    if (!defined(result)) {
      return new Vector3(x, y, z);
    }

    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };

  /**
   * Duplicates a Vector3 instance.
   *
   * @param {Vector3 | Vector4} v3 The Vector to duplicate.
   * @param {Vector3} [result] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter or a new Vector3 instance if one was not provided. (Returns undefined if v3 is undefined)
   */
  static clone = function (v3: Vector3 | Vector4, result: Vector3): undefined | Vector3 {
    if (!defined(v3)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Vector3(v3.x, v3.y, v3.z);
    }

    result.x = v3.x;
    result.y = v3.y;
    result.z = v3.z;
    return result;
  };

  /**
   * Creates a Vector3 instance from an existing Vector4.  This simply takes the
   * x and y properties of the Vector4 and drops z and w.
   * @function
   *
   * @param {Vector4} v4 The Vector4 instance to create a Vector3 instance from.
   * @param {Vector3} [result] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter or a new Vector3 instance if one was not provided.
   */
  static fromVector4 = Vector3.clone;

  /**
   * The number of elements used to pack the object into an array.
   * @type {Number}
   */
  static packedLength = 3;

  /**
   * Computes the provided Vector3's squared magnitude.
   *
   * @param {Vector3} v3 The Vector3 instance whose squared magnitude is to be computed.
   * @returns {Number} The squared magnitude.
   */
  static magnitudeSquared = function (v3: Vector3) {
    return v3.x * v3.x + v3.y * v3.y + v3.z * v3.z;
  };

  /**
   * Computes the Vector3's magnitude (length).
   *
   * @param {Vector3} v3 The Vector3 instance whose magnitude is to be computed.
   * @returns {Number} The magnitude.
   */
  static magnitude = function (v3: Vector3) {
    return Math.sqrt(Vector3.magnitudeSquared(v3));
  };

  /**
   * 设置向量的模长
   * @param length 模长
   * @param result 结果向量
   * @returns 结果向量
   */
  setLength = (length: number, result?: Vector3) => {

    if (!defined(result) || !(result! instanceof Vector3)) result = new Vector3();

    Vector3.multiplyByScalar(this.normalize()!, length, result);

    return result!;

  }
  /**
   * Computes the distance between two points.
   *
   * @param {Vector3} left The first point to compute the distance from.
   * @param {Vector3} right The second point to compute the distance to.
   * @returns {Number} The distance between two points.
   *
   * @example
   * 
   * var d = static distance(new Vector3(1.0, 0.0, 0.0), new Vector3(2.0, 0.0, 0.0));
   */
  static distance = function (left: Vector3, right: Vector3) {
    var distanceScratch = new Vector3();
    Vector3.subtract(left, right, distanceScratch);
    return Vector3.magnitude(distanceScratch);
  };

  /**
   * Computes the squared distance between two points.  Comparing squared distances
   * using this function is more efficient than comparing distances using {@link Vector3#distance}.
   *
   * @param {Vector3} left The first point to compute the distance from.
   * @param {Vector3} right The second point to compute the distance to.
   * @returns {Number} The distance between two points.
   *
   * @example
   * 
   * var d = static distance(new Vector3(1.0, 0.0, 0.0), new Vector3(3.0, 0.0, 0.0));
   */
  static distanceSquared = function (left: Vector3, right: Vector3) {
    var distanceScratch = new Vector3();
    Vector3.subtract(left, right, distanceScratch);
    return Vector3.magnitudeSquared(distanceScratch);
  };
  /**
   * Computes the componentwise sum of two Cartesians.
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static add = function (left: Vector3, right: Vector3, result?: Vector3) {
    if (!defined(result)) result = new Vector3();
    result!.x = left.x + right.x;
    result!.y = left.y + right.y;
    result!.z = left.z + right.z;
    return result!;
  };
  /**
   * Computes the componentwise sum of two Cartesians.
   *
   * @param {Vector3} right The second Vector.
   * @returns {Vector3} The modified result parameter.
   */
  add = (right: Vector3) => {
    return Vector3.add(this, right, this);
  };
  /**
   * Computes the componentwise difference of two Cartesians.
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static subtract = function (left: Vector3, right: Vector3, result: Vector3) {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.y = left.z - right.z;
    return result;
  };

  /**
   * Computes the normalized form of the supplied Vector.
   *
   * @param {Vector3} v3 The Vector to be normalized.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static normalize = function (v3: Vector3, result: Vector3) {
    var magnitude = Vector3.magnitude(v3);

    result.x = v3.x / magnitude;
    result.y = v3.y / magnitude;
    result.z = v3.z / magnitude;

    return result;
  };
  /**
   * Computes the normalized form of the supplied Vector.
   *
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  normalize = (result?: Vector3) => {
    if (!defined(result)) result = new Vector3();
    var magnitude = Vector3.magnitude(this);

    result!.x = this.x / magnitude;
    result!.y = this.y / magnitude;
    result!.z = this.z / magnitude;

    return result;
  };

  /**
   * Computes the dot (scalar) product of two Cartesians.
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @returns {Number} The dot product.
   */
  static dot = function (left: Vector3, right: Vector3) {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  };

  /**
   * Computes the magnitude of the cross product that would result from implicitly setting the Z coordinate of the input vectors to 0
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The cross product.
   */
  static cross = function (left: Vector3, right: Vector3, result: Vector3) {
    var leftX = left.x;
    var leftY = left.y;
    var leftZ = left.z;
    var rightX = right.x;
    var rightY = right.y;
    var rightZ = right.z;

    var x = leftY * rightZ - leftZ * rightY;
    var y = leftZ * rightX - leftX * rightZ;
    var z = leftX * rightY - leftY * rightX;

    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };

  /**
  * Computes the midpoint between the right and left Vector.
  * @param {Vector3} left The first Vector.
  * @param {Vector3} right The second Vector.
  * @param {Vector3} result The object onto which to store the result.
  * @returns {Vector3} The midpoint.
  */
  static midpoint = function (left: Vector3, right: Vector3, result: Vector3) {
    result.x = (left.x + right.x) * 0.5;
    result.y = (left.y + right.y) * 0.5;
    result.z = (left.z + right.z) * 0.5;

    return result;
  };
  /**
   * Computes the componentwise product of two Vectors.
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static multiplyComponents = function (left: Vector3, right: Vector3, result: Vector3) {
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    return result;
  };

  /**
   * Computes the componentwise quotient of two Vectors.
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static divideComponents = function (left: Vector3, right: Vector3, result: Vector3) {
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    result.z = left.z / right.z;
    return result;
  };

  /**
   * Multiplies the provided Vector componentwise by the provided scalar.
   *
   * @param {Vector3} v3 The Vector to be scaled.
   * @param {Number} scalar The scalar to multiply with.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static multiplyByScalar = function (v3: Vector3, scalar: number, result?: Vector3) {
    if (!defined(result)) result = new Vector3();
    result!.x = v3.x * scalar;
    result!.y = v3.y * scalar;
    result!.z = v3.z * scalar;
    return result;
  };

  /**
   * Divides the provided Vector componentwise by the provided scalar.
   *
   * @param {Vector3} v3 The Vector to be divided.
   * @param {Number} scalar The scalar to divide by.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static divideByScalar = function (v3: Vector3, scalar: number, result: Vector3) {
    result.x = v3.x / scalar;
    result.y = v3.y / scalar;
    result.z = v3.z / scalar;
    return result;
  };

  /**
   * Negates the provided Vector.
   *
   * @param {Vector3} v3 The Vector to be negated.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static negate = function (v3: Vector3, result: Vector3) {
    result.x = -v3.x;
    result.y = -v3.y;
    result.z = -v3.z;
    return result;
  };

  /**
   * Computes the absolute value of the provided Vector.
   *
   * @param {Vector3} v3 The Vector whose absolute value is to be computed.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static abs = function (v3: Vector3, result: Vector3) {
    result.x = Math.abs(v3.x);
    result.y = Math.abs(v3.y);
    result.z = Math.abs(v3.z);
    return result;
  };

  /**
   * Computes the linear interpolation or extrapolation at t using the provided cartesians.
   *
   * @param {Vector3} start The value corresponding to t at 0.0.
   * @param {Vector3} end The value corresponding to t at 1.0.
   * @param {Number} t The point along t at which to interpolate.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static lerp = function (start: Vector3, end: Vector3, t: number, result?: Vector3) {
    if (!defined(result)) result = new Vector3();
    let lerpScratch = new Vector3();

    Vector3.multiplyByScalar(end, t, lerpScratch);
    result = Vector3.multiplyByScalar(start, 1.0 - t, result);
    return Vector3.add(lerpScratch, result!, result);
  };


  /**
   * Returns the angle, in radians, between the provided Cartesians.
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @returns {Number} The angle between the Cartesians.
   */
  static angleBetween = function (left: Vector3, right: Vector3) {
    let angleBetweenScratch = new Vector3();
    let angleBetweenScratch2 = new Vector3();

    Vector3.normalize(left, angleBetweenScratch);
    Vector3.normalize(right, angleBetweenScratch2);
    var cosine = Vector3.dot(angleBetweenScratch, angleBetweenScratch2);
    var sine = Vector3.magnitude(
      Vector3.cross(
        angleBetweenScratch,
        angleBetweenScratch2,
        angleBetweenScratch
      )
    );
    return Math.atan2(sine, cosine);
  };
  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Vector3} [left] The first Vector.
   * @param {Vector3} [right] The second Vector.
   * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals = function (left: Vector3, right: Vector3) {
    return (
      left === right ||
      (defined(left) &&
        defined(right) &&
        left.x === right.x &&
        left.y === right.y &&
        left.z === right.z)
    );
  };

  /**
   * An immutable Vector3 instance initialized to (0.0, 0.0, 0.0).
   *
   * @type {Vector3}
   * @constant
   */
  static ZERO = Object.freeze(new Vector3(0.0, 0.0, 0.0));

  /**
   * An immutable Vector3 instance initialized to (1.0, 1.0, 1.0).
   *
   * @type {Vector3}
   * @constant
   */
  static ONE = Object.freeze(new Vector3(1.0, 1.0, 1.0));

  /**
   * An immutable Vector3 instance initialized to (1.0, 0.0, 0.0).
   *
   * @type {Vector3}
   * @constant
   */
  static UNIT_X = Object.freeze(new Vector3(1.0, 0.0, 0.0));

  /**
   * An immutable Vector3 instance initialized to (0.0, 1.0, 0.0).
   *
   * @type {Vector3}
   * @constant
   */
  static UNIT_Y = Object.freeze(new Vector3(0.0, 1.0, 0.0));

  /**
   * An immutable Vector3 instance initialized to (0.0, 0.0, 1.0).
   *
   * @type {Vector3}
   * @constant
   */
  static UNIT_Z = Object.freeze(new Vector3(0.0, 0.0, 1.0));

  /**
   * Duplicates this Vector3 instance.
   *
   * @param {Vector3} [result] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter or a new Vector3 instance if one was not provided.
   */
  clone = (result: Vector3): Vector3 | undefined => {
    return Vector3.clone(this, result);
  };

  /**
   * Compares this Vector against the provided Vector componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Vector3} [right] The right hand side Vector.
   * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals = (right: Vector3) => {
    return Vector3.equals(this, right);
  };

  /**
   * 数组转三维向量
   * @param array 数组
   * @param offset 指定数组截取偏移量
   * @returns 结果向量
   */
  fromArray = (array: Array<number>, offset: number = 0) => {

    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];

    return this;
  }

  /**
   * 三维向量转数组，数据压缩
   * @param offset 指定数组存储开始偏移量
   * @param result 结果数组
   * @returns 结果数组
   */
  toArray = (offset: number = 0, result?: Array<number>) => {
    if (!defined(result) || !Array.isArray(result)) result = new Array<number>();

    result[offset] = this.x;
    result[offset + 1] = this.y;
    result[offset + 2] = this.z;

    return result;
  }

  /**
   * 生成随机三位矢量
   * @param result 生成的结果
   * @returns 生成的结果
   */
  static random = function (result?: Vector3) {
    if (!defined(result)) result = new Vector3();

    result!.x = Math.random();
    result!.y = Math.random();
    result!.z = Math.random();

    return result!;
  }
  /**
   * Creates a string representing this Vector in the format '(x, y, z)'.
   *
   * @returns {String} A string representing the provided Vector in the format '(x, y, z)'.
   */
  toString = () => {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
  };
}