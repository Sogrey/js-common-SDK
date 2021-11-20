/**
 * Quaternion
 * 
 * This is the doc comment for Quaternion
 *
 * @module Quaternion
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Vector3 } from "./Vector3";
import { Matrix3 } from "./Matrix3";

export class Quaternion {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 0;
    /**
    * A set of 4-dimensional coordinates used to represent rotation in 3-dimensional space.
    * @alias Quaternion
    * @constructor
    *
    * @param {Number} [x=0.0] The X component.
    * @param {Number} [y=0.0] The Y component.
    * @param {Number} [z=0.0] The Z component.
    * @param {Number} [w=0.0] The W component.
    *
    */
    constructor(
        x?: number,
        y?: number,
        z?: number,
        w?: number
    ) {
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
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    static packedLength: number = 4;

    /**
     * Stores the provided instance into the provided array.
     *
     * @param {Quaternion} value The value to pack.
     * @param {Number[]} array The array to pack into.
     * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
     *
     * @returns {Number[]} The array that was packed into
     */
    static toArray = function (value: Quaternion, array: Array<number>, startingIndex: number): number[] {
        startingIndex = defaultValue(startingIndex, 0);

        array[startingIndex++] = value.x;
        array[startingIndex++] = value.y;
        array[startingIndex++] = value.z;
        array[startingIndex] = value.w;

        return array;
    };

    /**
     * Retrieves an instance from a packed array.
     *
     * @param {Number[]} array The packed array.
     * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
     * @param {Quaternion} [result] The object into which to store the result.
     * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
     */
    static fromArray = function (array: Array<number>, startingIndex: number, result: Quaternion): Quaternion {
        startingIndex = defaultValue(startingIndex, 0);

        if (!defined(result)) {
            result = new Quaternion();
        }
        result.x = array[startingIndex];
        result.y = array[startingIndex + 1];
        result.z = array[startingIndex + 2];
        result.w = array[startingIndex + 3];
        return result;
    };
    /**
   * Computes the conjugate of the provided quaternion.
   *
   * @param {Quaternion} quaternion The quaternion to conjugate.
   * @param {Quaternion} result The object onto which to store the result.
   * @returns {Quaternion} The modified result parameter.
   */
    static conjugate = function (quaternion: Quaternion, result: Quaternion): Quaternion {
        result.x = -quaternion.x;
        result.y = -quaternion.y;
        result.z = -quaternion.z;
        result.w = quaternion.w;
        return result;
    };

    /**
     * Computes magnitude squared for the provided quaternion.
     *
     * @param {Quaternion} quaternion The quaternion to conjugate.
     * @returns {Number} The magnitude squared.
     */
    static magnitudeSquared = function (quaternion: Quaternion): number {
        return (
            quaternion.x * quaternion.x +
            quaternion.y * quaternion.y +
            quaternion.z * quaternion.z +
            quaternion.w * quaternion.w
        );
    };

    /**
     * Computes magnitude for the provided quaternion.
     *
     * @param {Quaternion} quaternion The quaternion to conjugate.
     * @returns {Number} The magnitude.
     */
    static magnitude = function (quaternion: Quaternion): number {
        return Math.sqrt(Quaternion.magnitudeSquared(quaternion));
    };

    /**
     * Computes the normalized form of the provided quaternion.
     *
     * @param {Quaternion} quaternion The quaternion to normalize.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static normalize = function (quaternion: Quaternion, result: Quaternion): Quaternion {
        var inverseMagnitude = 1.0 / Quaternion.magnitude(quaternion);
        var x = quaternion.x * inverseMagnitude;
        var y = quaternion.y * inverseMagnitude;
        var z = quaternion.z * inverseMagnitude;
        var w = quaternion.w * inverseMagnitude;

        result.x = x;
        result.y = y;
        result.z = z;
        result.w = w;
        return result;
    };

    /**
     * Computes the inverse of the provided quaternion.
     *
     * @param {Quaternion} quaternion The quaternion to normalize.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static inverse = function (quaternion: Quaternion, result: Quaternion): Quaternion {
        var magnitudeSquared = Quaternion.magnitudeSquared(quaternion);
        result = Quaternion.conjugate(quaternion, result);
        return Quaternion.multiplyByScalar(result, 1.0 / magnitudeSquared, result);
    };

    /**
     * Computes the componentwise sum of two quaternions.
     *
     * @param {Quaternion} left The first quaternion.
     * @param {Quaternion} right The second quaternion.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static add = function (left: Quaternion, right: Quaternion, result: Quaternion): Quaternion {
        result.x = left.x + right.x;
        result.y = left.y + right.y;
        result.z = left.z + right.z;
        result.w = left.w + right.w;
        return result;
    };

    /**
     * Computes the componentwise difference of two quaternions.
     *
     * @param {Quaternion} left The first quaternion.
     * @param {Quaternion} right The second quaternion.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static subtract = function (left: Quaternion, right: Quaternion, result: Quaternion): Quaternion {
        result.x = left.x - right.x;
        result.y = left.y - right.y;
        result.z = left.z - right.z;
        result.w = left.w - right.w;
        return result;
    };

    /**
     * Negates the provided quaternion.
     *
     * @param {Quaternion} quaternion The quaternion to be negated.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static negate = function (quaternion: Quaternion, result: Quaternion): Quaternion {
        result.x = -quaternion.x;
        result.y = -quaternion.y;
        result.z = -quaternion.z;
        result.w = -quaternion.w;
        return result;
    };

    /**
     * Computes the dot (scalar) product of two quaternions.
     *
     * @param {Quaternion} left The first quaternion.
     * @param {Quaternion} right The second quaternion.
     * @returns {Number} The dot product.
     */
    static dot = function (left: Quaternion, right: Quaternion): number {
        return (
            left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w
        );
    };

    /**
     * Computes the product of two quaternions.
     *
     * @param {Quaternion} left The first quaternion.
     * @param {Quaternion} right The second quaternion.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static multiply = function (left: Quaternion, right: Quaternion, result: Quaternion): Quaternion {
        var leftX = left.x;
        var leftY = left.y;
        var leftZ = left.z;
        var leftW = left.w;

        var rightX = right.x;
        var rightY = right.y;
        var rightZ = right.z;
        var rightW = right.w;

        var x = leftW * rightX + leftX * rightW + leftY * rightZ - leftZ * rightY;
        var y = leftW * rightY - leftX * rightZ + leftY * rightW + leftZ * rightX;
        var z = leftW * rightZ + leftX * rightY - leftY * rightX + leftZ * rightW;
        var w = leftW * rightW - leftX * rightX - leftY * rightY - leftZ * rightZ;

        result.x = x;
        result.y = y;
        result.z = z;
        result.w = w;
        return result;
    };

    /**
     * Multiplies the provided quaternion componentwise by the provided scalar.
     *
     * @param {Quaternion} quaternion The quaternion to be scaled.
     * @param {Number} scalar The scalar to multiply with.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static multiplyByScalar = function (quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion {
        result.x = quaternion.x * scalar;
        result.y = quaternion.y * scalar;
        result.z = quaternion.z * scalar;
        result.w = quaternion.w * scalar;
        return result;
    };

    /**
     * Divides the provided quaternion componentwise by the provided scalar.
     *
     * @param {Quaternion} quaternion The quaternion to be divided.
     * @param {Number} scalar The scalar to divide by.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static divideByScalar = function (quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion {
        result.x = quaternion.x / scalar;
        result.y = quaternion.y / scalar;
        result.z = quaternion.z / scalar;
        result.w = quaternion.w / scalar;
        return result;
    };

    /**
     * Computes the linear interpolation or extrapolation at t using the provided quaternions.
     *
     * @param {Quaternion} start The value corresponding to t at 0.0.
     * @param {Quaternion} end The value corresponding to t at 1.0.
     * @param {Number} t The point along t at which to interpolate.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static lerp = function (start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion {
        var lerpScratch = new Quaternion();

        lerpScratch = Quaternion.multiplyByScalar(end, t, lerpScratch);
        result = Quaternion.multiplyByScalar(start, 1.0 - t, result);
        return Quaternion.add(lerpScratch, result, result);
    };

    /**
     * Computes the spherical linear interpolation or extrapolation at t using the provided quaternions.
     *
     * @param {Quaternion} start The value corresponding to t at 0.0.
     * @param {Quaternion} end The value corresponding to t at 1.0.
     * @param {Number} t The point along t at which to interpolate.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     *
     * @see <a href="#fastSlerp">Quaternion.fastSlerp</a>
     */
    static slerp = function (start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion {
        var slerpEndNegated = new Quaternion();
        var slerpScaledP = new Quaternion();
        var slerpScaledR = new Quaternion();

        var dot = Quaternion.dot(start, end);

        // The angle between start must be acute. Since q and -q represent
        // the same rotation, negate q to get the acute angle.
        var r = end;
        if (dot < 0.0) {
            dot = -dot;
            r = slerpEndNegated = Quaternion.negate(end, slerpEndNegated);
        }

        // dot > 0, as the dot product approaches 1, the angle between the
        // quaternions vanishes. use linear interpolation.
        if (1.0 - dot < 0.000001) {
            return Quaternion.lerp(start, r, t, result);
        }

        var theta = Math.acos(dot);
        slerpScaledP = Quaternion.multiplyByScalar(
            start,
            Math.sin((1 - t) * theta),
            slerpScaledP
        );
        slerpScaledR = Quaternion.multiplyByScalar(
            r,
            Math.sin(t * theta),
            slerpScaledR
        );
        result = Quaternion.add(slerpScaledP, slerpScaledR, result);
        return Quaternion.multiplyByScalar(result, 1.0 / Math.sin(theta), result);
    };

    /**
     * The logarithmic quaternion function.
     *
     * @param {Quaternion} quaternion The unit quaternion.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     */
    static log = function (quaternion: Quaternion, result: Vector3): Vector3 {
        var theta = CMath.acosClamped(quaternion.w);
        var thetaOverSinTheta = 0.0;

        if (theta !== 0.0) {
            thetaOverSinTheta = theta / Math.sin(theta);
        }

        var v3 = new Vector3();
        Vector3.fromQuaternion(quaternion, v3);

        return Vector3.multiplyByScalar(v3, thetaOverSinTheta, result)!;
    };

    /**
     * The exponential quaternion function.
     *
     * @param {Vector3} vector The vector.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    static exp = function (vector: Vector3, result: Quaternion): Quaternion {
        var theta = Vector3.magnitude(vector);
        var sinThetaOverTheta = 0.0;

        if (theta !== 0.0) {
            sinThetaOverTheta = Math.sin(theta) / theta;
        }

        result.x = vector.x * sinThetaOverTheta;
        result.y = vector.y * sinThetaOverTheta;
        result.z = vector.z * sinThetaOverTheta;
        result.w = Math.cos(theta);

        return result;
    };


    /**
     * Computes an inner quadrangle point.
     * <p>This will compute quaternions that ensure a squad curve is C<sup>1</sup>.</p>
     *
     * @param {Quaternion} q0 The first quaternion.
     * @param {Quaternion} q1 The second quaternion.
     * @param {Quaternion} q2 The third quaternion.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     *
     * @see <a href="#squad">Quaternion.squad</a>
     */
    static computeInnerQuadrangle = function (q0: Quaternion, q1: Quaternion, q2: Quaternion, result: Quaternion) {
        var squadScratchCartesian0 = new Vector3();
        var squadScratchCartesian1 = new Vector3();
        var squadScratchQuaternion0 = new Quaternion();
        var squadScratchQuaternion1 = new Quaternion();

        var qInv = Quaternion.conjugate(q1, squadScratchQuaternion0);
        Quaternion.multiply(qInv, q2, squadScratchQuaternion1);
        var cart0 = Quaternion.log(squadScratchQuaternion1, squadScratchCartesian0);

        Quaternion.multiply(qInv, q0, squadScratchQuaternion1);
        var cart1 = Quaternion.log(squadScratchQuaternion1, squadScratchCartesian1);

        Vector3.add(cart0, cart1, cart0);
        Vector3.multiplyByScalar(cart0, 0.25, cart0);
        Vector3.negate(cart0, cart0);
        Quaternion.exp(cart0, squadScratchQuaternion0);

        return Quaternion.multiply(q1, squadScratchQuaternion0, result);
    };
    /**
     * Computes the spherical quadrangle interpolation between quaternions.
     *
     * @param {Quaternion} q0 The first quaternion.
     * @param {Quaternion} q1 The second quaternion.
     * @param {Quaternion} s0 The first inner quadrangle.
     * @param {Quaternion} s1 The second inner quadrangle.
     * @param {Number} t The time in [0,1] used to interpolate.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     *
     *
     * @example
     * <pre><code>
     * // 1. compute the squad interpolation between two quaternions on a curve
     * var s0 = Quaternion.computeInnerQuadrangle(quaternions[i - 1], quaternions[i], quaternions[i + 1], new Quaternion());
     * var s1 = Quaternion.computeInnerQuadrangle(quaternions[i], quaternions[i + 1], quaternions[i + 2], new Quaternion());
     * var q = Quaternion.squad(quaternions[i], quaternions[i + 1], s0, s1, t, new Quaternion());
     *
     * // 2. compute the squad interpolation as above but where the first quaternion is a end point.
     * var s1 = Quaternion.computeInnerQuadrangle(quaternions[0], quaternions[1], quaternions[2], new Quaternion());
     * var q = Quaternion.squad(quaternions[0], quaternions[1], quaternions[0], s1, t, new Quaternion());
     *</code></pre>
     * @see <a href="#computeInnerQuadrangle">Quaternion.computeInnerQuadrangle</a>
     */
    static squad = function (q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result: Quaternion): Quaternion {
        var squadScratchQuaternion0 = new Quaternion();
        var squadScratchQuaternion1 = new Quaternion();
        var slerp0 = Quaternion.slerp(q0, q1, t, squadScratchQuaternion0);
        var slerp1 = Quaternion.slerp(s0, s1, t, squadScratchQuaternion1);
        return Quaternion.slerp(slerp0, slerp1, 2.0 * t * (1.0 - t), result);
    };
    /**
     * Duplicates a Quaternion instance.
     *
     * @param {Quaternion} quaternion The quaternion to duplicate.
     * @param {Quaternion} [result] The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided. (Returns undefined if quaternion is undefined)
     */
    static clone = function (quaternion: Quaternion, result: Quaternion): Quaternion | undefined {
        if (!defined(quaternion)) {
            return undefined;
        }

        if (!defined(result)) {
            return new Quaternion(
                quaternion.x,
                quaternion.y,
                quaternion.z,
                quaternion.w
            );
        }

        result.x = quaternion.x;
        result.y = quaternion.y;
        result.z = quaternion.z;
        result.w = quaternion.w;
        return result;
    };

    static fromQuaternion = this.clone;
    /**
     * Compares the provided quaternions componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Quaternion} [left] The first quaternion.
     * @param {Quaternion} [right] The second quaternion.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals = function (left: Quaternion, right: Quaternion): boolean {
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
     * Computes a quaternion representing a rotation around an axis.
     *
     * @param {Vector3} axis The axis of rotation.
     * @param {Number} angle The angle in radians to rotate around the axis.
     * @param {Quaternion} [result] The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
     */
    static fromAxisAngle = function (axis: Vector3, angle: number, result: Quaternion): Quaternion {
        var fromAxisAngleScratch = new Vector3();

        var halfAngle = angle / 2.0;
        var s = Math.sin(halfAngle);
        fromAxisAngleScratch = Vector3.normalize(axis, fromAxisAngleScratch);

        var x = fromAxisAngleScratch.x * s;
        var y = fromAxisAngleScratch.y * s;
        var z = fromAxisAngleScratch.z * s;
        var w = Math.cos(halfAngle);
        if (!defined(result)) {
            return new Quaternion(x, y, z, w);
        }
        result.x = x;
        result.y = y;
        result.z = z;
        result.w = w;
        return result;
    };

    /**
     * Computes a Quaternion from the provided Matrix3 instance.
     *
     * @param {Matrix3} matrix The rotation matrix.
     * @param {Quaternion} [result] The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
     *
     * @see <a href="#fromQuaternion">Matrix3.fromQuaternion</a>
     */
    static fromRotationMatrix = function (matrix: Matrix3, result: Quaternion): Quaternion {
        var fromRotationMatrixNext = [1, 2, 0];
        var fromRotationMatrixQuat = new Array(3);

        var root;
        var x;
        var y;
        var z;
        var w;

        var m00 = matrix.elements[0];//COLUMN0ROW0
        var m11 = matrix.elements[4];//COLUMN1ROW1
        var m22 = matrix.elements[8];//COLUMN2ROW2
        var trace = m00 + m11 + m22;

        if (trace > 0.0) {
            // |w| > 1/2, may as well choose w > 1/2
            root = Math.sqrt(trace + 1.0); // 2w
            w = 0.5 * root;
            root = 0.5 / root; // 1/(4w)

            x = (matrix.elements[5]/*COLUMN1ROW2*/ - matrix.elements[7]/*COLUMN2ROW1*/) * root;
            y = (matrix.elements[6]/*COLUMN2ROW0*/ - matrix.elements[2]/*COLUMN0ROW2*/) * root;
            z = (matrix.elements[1]/*COLUMN0ROW1*/ - matrix.elements[3]/*COLUMN1ROW0*/) * root;
        } else {
            // |w| <= 1/2
            var next = fromRotationMatrixNext;

            var i = 0;
            if (m11 > m00) {
                i = 1;
            }
            if (m22 > m00 && m22 > m11) {
                i = 2;
            }
            var j = next[i];
            var k = next[j];

            root = Math.sqrt(
                matrix.elements[Matrix3.getElementIndex(i, i)] -
                matrix.elements[Matrix3.getElementIndex(j, j)] -
                matrix.elements[Matrix3.getElementIndex(k, k)] +
                1.0
            );

            var quat = fromRotationMatrixQuat;
            quat[i] = 0.5 * root;
            root = 0.5 / root;
            w =
                (matrix.elements[Matrix3.getElementIndex(k, j)] -
                    matrix.elements[Matrix3.getElementIndex(j, k)]) *
                root;
            quat[j] =
                (matrix.elements[Matrix3.getElementIndex(j, i)] +
                    matrix.elements[Matrix3.getElementIndex(i, j)]) *
                root;
            quat[k] =
                (matrix.elements[Matrix3.getElementIndex(k, i)] +
                    matrix.elements[Matrix3.getElementIndex(i, k)]) *
                root;

            x = -quat[0];
            y = -quat[1];
            z = -quat[2];
        }

        if (!defined(result)) {
            return new Quaternion(x, y, z, w);
        }
        result.x = x;
        result.y = y;
        result.z = z;
        result.w = w;
        return result;
    };

    /**
     * An immutable Quaternion instance initialized to (0.0, 0.0, 0.0, 0.0).
     *
     * @type {Quaternion}
     * @constant
     */
    static ZERO: Quaternion = Object.freeze(new Quaternion(0.0, 0.0, 0.0, 0.0));

    /**
     * An immutable Quaternion instance initialized to (0.0, 0.0, 0.0, 1.0).
     *
     * @type {Quaternion}
     * @constant
     */
    static IDENTITY: Quaternion = Object.freeze(new Quaternion(0.0, 0.0, 0.0, 1.0));

    /**
     * Duplicates this Quaternion instance.
     *
     * @param {Quaternion} [result] The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
     */
    clone = (result?: Quaternion): Quaternion => {
        result = defaultValue(result, new Quaternion());
        return Quaternion.clone(this, result!)!;
    };

    /**
     * Compares this and the provided quaternion componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Quaternion} [right] The right hand side quaternion.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    equals = (right: Quaternion): boolean => {
        return Quaternion.equals(this, right);
    };
    /**
     * Returns a string representing this quaternion in the format (x, y, z, w).
     *
     * @returns {String} A string representing this Quaternion.
     */
    toString = (): string => {
        return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    };
}