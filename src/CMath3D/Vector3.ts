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
import { Quaternion } from "./Quaternion";
import { Matrix4 } from "./Matrix4";
import { Matrix3 } from "./Matrix3";

export class Vector3 {
  x: number = 0; y: number = 0; z: number = 0;
  /**
   * @alias Vector3
   * @constructor
   * @see <a href="./Vector2.html">Vector2</a>
   * @see <a href="./Vector4.html">Vector4</a>
   */
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
   * Creates a Vector3 instance from Quaternion.
   *
   * @param {Quaternion} quaternion.
   * @param {Vector3} [result] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter or a new Vector3 instance if one was not provided.
   */
  static fromQuaternion = function (quaternion: Quaternion, result: Vector3): Vector3 {
    if (!defined(result)) {
      return new Vector3(quaternion.x, quaternion.y, quaternion.z);
    }

    result.x = quaternion.x;
    result.y = quaternion.y;
    result.z = quaternion.z;
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
  static packedLength: number = 3;

  /**
   * Computes the provided Vector3's squared magnitude.
   *
   * @param {Vector3} v3 The Vector3 instance whose squared magnitude is to be computed.
   * @returns {Number} The squared magnitude.
   */
  static magnitudeSquared = function (v3: Vector3): number {
    return v3.x * v3.x + v3.y * v3.y + v3.z * v3.z;
  };

  /**
   * Computes the Vector3's magnitude (length).
   *
   * @param {Vector3} v3 The Vector3 instance whose magnitude is to be computed.
   * @returns {Number} The magnitude.
   */
  static magnitude = function (v3: Vector3): number {
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
  static distance = function (left: Vector3, right: Vector3): number {
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
  static distanceSquared = function (left: Vector3, right: Vector3): number {
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
  static add = function (left: Vector3, right: Vector3, result?: Vector3): Vector3 {
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
  add = (right: Vector3): Vector3 => {
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
  static subtract = function (left: Vector3, right: Vector3, result: Vector3): Vector3 {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.y = left.z - right.z;
    return result;
  };

  /**
   * Calculate the vector composed of the minimum value of each dimension of two three-dimensional vectors.
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static min = function (left: Vector3, right: Vector3, result?: Vector3): Vector3 {
    if (!defined(result)) result = new Vector3();

    result!.x = Math.min(left.x, right.x);
    result!.y = Math.min(left.y, right.y);
    result!.z = Math.min(left.z, right.z);

    return result!;
  }

  /**
   * Calculate the vector composed of the minimum value of each dimension of a set of three-dimensional vectors
   * @param array The Vectors.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static minFromArray = function (array: Array<Vector3>, result?: Vector3): Vector3 {
    if (!defined(result)) result = new Vector3();

    if (array.length > 0)
      for (let index = 0; index < array.length; index++) {
        const v = array[index];

        result = Vector3.min(v, result!);
      }

    return result!;
  }
  /**
   * Calculate the vector composed of the maximum value of each dimension of two three-dimensional vectors
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static max = function (left: Vector3, right: Vector3, result?: Vector3): Vector3 {
    if (!defined(result)) result = new Vector3();

    result!.x = Math.max(left.x, right.x);
    result!.y = Math.max(left.y, right.y);
    result!.z = Math.max(left.z, right.z);

    return result!;
  }

  /**
 * Calculate the vector composed of the maximum value of each dimension of a set of three-dimensional vectors
 * @param array The Vectors.
 * @param {Vector3} result The object onto which to store the result.
 * @returns {Vector3} The modified result parameter.
 */
  static maxFromArray = function (array: Array<Vector3>, result?: Vector3): Vector3 {
    if (!defined(result)) result = new Vector3();

    if (array.length > 0)
      for (let index = 0; index < array.length; index++) {
        const v = array[index];

        result = Vector3.max(v, result!);
      }

    return result!;
  }

  /**
   * 应用矩阵变换
   * @param matrix 
   * @returns 
   */
  applyMatrix4 = (matrix: Matrix4) => {
    const x = this.x, y = this.y, z = this.z;
    const e = matrix.elements;

    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

    return this;
  }

  applyQuaternion(q: Quaternion) {

    const x = this.x, y = this.y, z = this.z;
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

    // calculate quat * vector

    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = - qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    return this;
  }

  clamp = (min: Vector3, max: Vector3) => {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));

    return this;
  }

  clampScalar = (minVal: number, maxVal: number) => {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));

    return this;
  }

  clampLength = (min: number, max: number) => {
    const length = Vector3.magnitude(this);

    var v = new Vector3();
    Vector3.divideByScalar(this, length || 1, v);
    Vector3.multiplyByScalar(v, Math.max(min, Math.min(max, length)), v);
    return v;
  }

  floor = () => {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);

    return this;
  }

  ceil = () => {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);

    return this;
  }

  round = () => {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);

    return this;
  }
  /**
   * Computes the normalized form of the supplied Vector.
   *
   * @param {Vector3} v3 The Vector to be normalized.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static normalize = function (v3: Vector3, result: Vector3): Vector3 {
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
  normalize = (result?: Vector3): Vector3 => {
    if (!defined(result)) result = new Vector3();
    var magnitude = Vector3.magnitude(this);

    result!.x = this.x / magnitude;
    result!.y = this.y / magnitude;
    result!.z = this.z / magnitude;

    return result!;
  };

  /**
   * Computes the dot (scalar) product of two Cartesians.
   *
   * @param {Vector3} left The first Vector.
   * @param {Vector3} right The second Vector.
   * @returns {Number} The dot product.
   */
  static dot = function (left: Vector3, right: Vector3): number {
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
  static cross = function (left: Vector3, right: Vector3, result: Vector3): Vector3 {
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
  static midpoint = function (left: Vector3, right: Vector3, result: Vector3): Vector3 {
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
  static multiplyComponents = function (left: Vector3, right: Vector3, result: Vector3): Vector3 {
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
  static divideComponents = function (left: Vector3, right: Vector3, result: Vector3): Vector3 {
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
  static multiplyByScalar = function (v3: Vector3, scalar: number, result?: Vector3): Vector3 {
    if (!defined(result)) result = new Vector3();
    result!.x = v3.x * scalar;
    result!.y = v3.y * scalar;
    result!.z = v3.z * scalar;
    return result!;
  };

  /**
   * Divides the provided Vector componentwise by the provided scalar.
   *
   * @param {Vector3} v3 The Vector to be divided.
   * @param {Number} scalar The scalar to divide by.
   * @param {Vector3} result The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  static divideByScalar = function (v3: Vector3, scalar: number, result: Vector3): Vector3 {
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
  static negate = function (v3: Vector3, result: Vector3): Vector3 {
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
  static abs = function (v3: Vector3, result: Vector3): Vector3 {
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
  static lerp = function (start: Vector3, end: Vector3, t: number, result?: Vector3): Vector3 {
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
  static angleBetween = function (left: Vector3, right: Vector3): number {
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
  static equals = function (left: Vector3, right: Vector3): boolean {
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
  static ZERO: Vector3 = Object.freeze(new Vector3(0.0, 0.0, 0.0));

  /**
   * An immutable Vector3 instance initialized to (1.0, 1.0, 1.0).
   *
   * @type {Vector3}
   * @constant
   */
  static ONE: Vector3 = Object.freeze(new Vector3(1.0, 1.0, 1.0));

  /**
   * An immutable Vector3 instance initialized to (1.0, 0.0, 0.0).
   *
   * @type {Vector3}
   * @constant
   */
  static UNIT_X: Vector3 = Object.freeze(new Vector3(1.0, 0.0, 0.0));

  /**
   * An immutable Vector3 instance initialized to (0.0, 1.0, 0.0).
   *
   * @type {Vector3}
   * @constant
   */
  static UNIT_Y: Vector3 = Object.freeze(new Vector3(0.0, 1.0, 0.0));

  /**
   * An immutable Vector3 instance initialized to (0.0, 0.0, 1.0).
   *
   * @type {Vector3}
   * @constant
   */
  static UNIT_Z: Vector3 = Object.freeze(new Vector3(0.0, 0.0, 1.0));

  /**
   * Duplicates this Vector3 instance.
   *
   * @param {Vector3} [result] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter or a new Vector3 instance if one was not provided.
   */
  clone = (result?: Vector3): Vector3 => {
    result = defaultValue(result, new Vector3);
    return Vector3.clone(this, result!)!;
  };

  /**
   * Compares this Vector against the provided Vector componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Vector3} [right] The right hand side Vector.
   * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals = (right: Vector3): boolean => {
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
  length = (): number => {
    return Vector3.magnitude(this);
  }
  /**
   * Creates a string representing this Vector in the format '(x, y, z)'.
   *
   * @returns {String} A string representing the provided Vector in the format '(x, y, z)'.
   */
  toString = (): string => {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
  };
}