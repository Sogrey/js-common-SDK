/**
 * Matrix2
 * 
 * This is the doc comment for Matrix2
 *
 * @module Matrix2
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Vector2 } from "./Vector2"

export class Matrix2 {
    /**
     * default:
     * <pre><code>
     * [0.0, 0.0,
     *  0.0, 0.0]
     * </code></pre>
     */
    elements: number[] = [0, 0, 0, 0];
    constructor(column0Row0?: number, column1Row0?: number, column0Row1?: number, column1Row1?: number) {

        this.elements[0] = defaultValue(column0Row0, 0.0);
        this.elements[1] = defaultValue(column1Row0, 0.0);
        this.elements[2] = defaultValue(column0Row1, 0.0);
        this.elements[3] = defaultValue(column1Row1, 0.0);

    }

    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    static packedLength: number = 4;


    /**
     * Stores the provided instance into the provided array.
     *
     * @param {Matrix2} value The value to pack.
     * @param {Number[]} array The array to pack into.
     * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
     *
     * @returns {Number[]} The array that was packed into
     */
    static toArray = function (value: Matrix2, array: Array<number>, startingIndex: number): number[] {
        startingIndex = defaultValue(startingIndex, 0);

        array[startingIndex++] = value.elements[0];
        array[startingIndex++] = value.elements[1];
        array[startingIndex++] = value.elements[2];
        array[startingIndex++] = value.elements[3];

        return array;
    };

    /**
     * Retrieves an instance from a packed array.
     *
     * @param {Number[]} array The packed array.
     * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
     * @param {Matrix2} [result] The object into which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    static fromArray = function (array: Array<number>, startingIndex: number, result: Matrix2): Matrix2 {
        startingIndex = defaultValue(startingIndex, 0);

        if (!defined(result)) {
            result = new Matrix2();
        }

        result.elements[0] = array[startingIndex++];
        result.elements[1] = array[startingIndex++];
        result.elements[2] = array[startingIndex++];
        result.elements[3] = array[startingIndex++];
        return result;
    };


    /**
     * Duplicates a Matrix2 instance.
     *
     * @param {Matrix2} matrix The matrix to duplicate.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided. (Returns undefined if matrix is undefined)
     */
    static clone = function (matrix: Matrix2, result: Matrix2): Matrix2|undefined {
        if (!defined(matrix)) {
            return undefined;
        }
        if (!defined(result)) {
            return new Matrix2(matrix.elements[0], matrix.elements[2], matrix.elements[1], matrix.elements[3]);
        }
        result.elements[0] = matrix.elements[0];
        result.elements[1] = matrix.elements[1];
        result.elements[2] = matrix.elements[2];
        result.elements[3] = matrix.elements[3];
        return result;
    };


    /**
     * Computes a Matrix2 instance representing a non-uniform scale.
     *
     * @param {Vector2} scale The x and y scale factors.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
     *
     * @example
     * 
     * <pre><code>
     * // Creates
     * //   [7.0, 0.0]
     * //   [0.0, 8.0]
     * var m = Matrix2.fromScale(new Vector2(7.0, 8.0));
     * </code></pre>
     */
    static fromScale = function (scale: Vector2, result: Matrix2): Matrix2 {
        if (!defined(result)) {
            return new Matrix2(scale.x, 0.0, 0.0, scale.y);
        }

        result.elements[0] = scale.x;
        result.elements[1] = 0.0;
        result.elements[2] = 0.0;
        result.elements[3] = scale.y;
        return result;
    };

    /**
     * Computes a Matrix2 instance representing a uniform scale.
     *
     * @param {Number} scale The uniform scale factor.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
     *
     * @example
     * 
     * <pre><code>
     * // Creates
     * //   [2.0, 0.0]
     * //   [0.0, 2.0]
     * var m = Matrix2.fromUniformScale(2.0);
     * </code></pre>
     */
    static fromUniformScale = function (scale: number, result: Matrix2): Matrix2 {
        if (!defined(result)) {
            return new Matrix2(scale, 0.0, 0.0, scale);
        }

        result.elements[0] = scale;
        result.elements[1] = 0.0;
        result.elements[2] = 0.0;
        result.elements[3] = scale;
        return result;
    };

    /**
     * Creates a rotation matrix.
     *
     * @param {Number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
     *
     * @example
     * 
     * <pre><code>
     * // Rotate a point 45 degrees counterclockwise.
     * var p = new Vector2(5, 6);
     * var m = Matrix2.fromRotation(Math.toRadians(45.0));
     * var rotated = Matrix2.multiplyByVector(m, p, new Vector2());
     * </code></pre>
     */
    static fromRotation = function (angle: number, result: Matrix2): Matrix2 {
        var cosAngle = Math.cos(angle);
        var sinAngle = Math.sin(angle);

        if (!defined(result)) {
            return new Matrix2(cosAngle, -sinAngle, sinAngle, cosAngle);
        }
        result.elements[0] = cosAngle;
        result.elements[1] = sinAngle;
        result.elements[2] = -sinAngle;
        result.elements[3] = cosAngle;
        return result;
    };

    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     *
     * @param {Matrix2} matrix The matrix.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static getScale = function (matrix: Matrix2, result: Vector2): Vector2 {
        let scratchColumn = new Vector2();
        result.x = Vector2.magnitude(
            Vector2.fromElements(matrix.elements[0], matrix.elements[1], scratchColumn)
        );
        result.y = Vector2.magnitude(
            Vector2.fromElements(matrix.elements[2], matrix.elements[3], scratchColumn)
        );
        return result;
    };

    /**
     * Computes the product of two matrices.
     *
     * @param {Matrix2} left The first matrix.
     * @param {Matrix2} right The second matrix.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     */
    static multiply = function (left: Matrix2, right: Matrix2, result: Matrix2): Matrix2 {
        var column0Row0 = left.elements[0] * right.elements[0] + left.elements[2] * right.elements[1];
        var column1Row0 = left.elements[0] * right.elements[2] + left.elements[2] * right.elements[3];
        var column0Row1 = left.elements[1] * right.elements[0] + left.elements[3] * right.elements[1];
        var column1Row1 = left.elements[1] * right.elements[2] + left.elements[3] * right.elements[3];

        result.elements[0] = column0Row0;
        result.elements[1] = column0Row1;
        result.elements[2] = column1Row0;
        result.elements[3] = column1Row1;
        return result;
    };

    /**
     * Computes the sum of two matrices.
     *
     * @param {Matrix2} left The first matrix.
     * @param {Matrix2} right The second matrix.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     */
    static add = function (left: Matrix2, right: Matrix2, result: Matrix2): Matrix2 {
        result.elements[0] = left.elements[0] + right.elements[0];
        result.elements[1] = left.elements[1] + right.elements[1];
        result.elements[2] = left.elements[2] + right.elements[2];
        result.elements[3] = left.elements[3] + right.elements[3];
        return result;
    };

    /**
     * Computes the difference of two matrices.
     *
     * @param {Matrix2} left The first matrix.
     * @param {Matrix2} right The second matrix.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     */
    static subtract = function (left: Matrix2, right: Matrix2, result: Matrix2): Matrix2 {
        result.elements[0] = left.elements[0] - right.elements[0];
        result.elements[1] = left.elements[1] - right.elements[1];
        result.elements[2] = left.elements[2] - right.elements[2];
        result.elements[3] = left.elements[3] - right.elements[3];
        return result;
    };

    /**
     * Computes the product of a matrix and a column vector.
     *
     * @param {Matrix2} matrix The matrix.
     * @param {Vector2} cartesian The column.
     * @param {Vector2} result The object onto which to store the result.
     * @returns {Vector2} The modified result parameter.
     */
    static multiplyByVector = function (matrix: Matrix2, cartesian: Vector2, result: Vector2): Vector2 {
        var x = matrix.elements[0] * cartesian.x + matrix.elements[2] * cartesian.y;
        var y = matrix.elements[1] * cartesian.x + matrix.elements[3] * cartesian.y;

        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Computes the product of a matrix and a scalar.
     *
     * @param {Matrix2} matrix The matrix.
     * @param {Number} scalar The number to multiply by.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     */
    static multiplyByScalar = function (matrix: Matrix2, scalar: number, result: Matrix2): Matrix2 {
        result.elements[0] = matrix.elements[0] * scalar;
        result.elements[1] = matrix.elements[1] * scalar;
        result.elements[2] = matrix.elements[2] * scalar;
        result.elements[3] = matrix.elements[3] * scalar;
        return result;
    };

    /**
     * Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.
     *
     * @param {Matrix2} matrix The matrix on the left-hand side.
     * @param {Vector2} scale The non-uniform scale on the right-hand side.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     *
     *
     * @example
     * 
     * <pre><code>
     * // Instead of Matrix2.multiply(m, Matrix2.fromScale(scale), m);
     * Matrix2.multiplyByScale(m, scale, m);
     * </code></pre>
     *
     * @see Matrix2.fromScale
     * @see Matrix2.multiplyByUniformScale
     */
    static multiplyByScale = function (matrix: Matrix2, scale: Vector2, result: Matrix2): Matrix2 {
        result.elements[0] = matrix.elements[0] * scale.x;
        result.elements[1] = matrix.elements[1] * scale.x;
        result.elements[2] = matrix.elements[2] * scale.y;
        result.elements[3] = matrix.elements[3] * scale.y;
        return result;
    };

    /**
     * Creates a negated copy of the provided matrix.
     *
     * @param {Matrix2} matrix The matrix to negate.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     */
    static negate = function (matrix: Matrix2, result: Matrix2): Matrix2 {
        result.elements[0] = -matrix.elements[0];
        result.elements[1] = -matrix.elements[1];
        result.elements[2] = -matrix.elements[2];
        result.elements[3] = -matrix.elements[3];
        return result;
    };

    /**
     * Computes the transpose of the provided matrix.
     *
     * @param {Matrix2} matrix The matrix to transpose.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     */
    static transpose = function (matrix: Matrix2, result: Matrix2): Matrix2 {
        var column0Row0 = matrix.elements[0];
        var column0Row1 = matrix.elements[2];
        var column1Row0 = matrix.elements[1];
        var column1Row1 = matrix.elements[3];

        result.elements[0] = column0Row0;
        result.elements[1] = column0Row1;
        result.elements[2] = column1Row0;
        result.elements[3] = column1Row1;
        return result;
    };

    /**
     * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
     *
     * @param {Matrix2} matrix The matrix with signed elements.
     * @param {Matrix2} result The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter.
     */
    static abs = function (matrix: Matrix2, result: Matrix2): Matrix2 {
        result.elements[0] = Math.abs(matrix.elements[0]);
        result.elements[1] = Math.abs(matrix.elements[1]);
        result.elements[2] = Math.abs(matrix.elements[2]);
        result.elements[3] = Math.abs(matrix.elements[3]);

        return result;
    };

    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Matrix2} [left] The first matrix.
     * @param {Matrix2} [right] The second matrix.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals = function (left: Matrix2, right: Matrix2): boolean {
        return (
            left === right ||
            (defined(left) &&
                defined(right) &&
                left.elements[0] === right.elements[0] &&
                left.elements[1] === right.elements[1] &&
                left.elements[2] === right.elements[2] &&
                left.elements[3] === right.elements[3])
        );
    };

    /**
     * An immutable Matrix2 instance initialized to the identity matrix.
     * 
     * <pre><code>
     * [1.0, 0.0,
     *  0.0, 1.0]
     * </code></pre>
     *
     * @type {Matrix2}
     * @constant
     */
    static IDENTITY: Matrix2 = Object.freeze(new Matrix2(1.0, 0.0, 0.0, 1.0));

    /**
     * An immutable Matrix2 instance initialized to the zero matrix.
     *
     * <pre><code>
     * [0.0, 0.0,
     *  0.0, 0.0]
     * </code></pre>
     * 
     * @type {Matrix2}
     * @constant
     */
    static ZERO: Matrix2 = Object.freeze(new Matrix2(0.0, 0.0, 0.0, 0.0));

    /**
     * Duplicates the provided Matrix2 instance.
     *
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    clone = (result: Matrix2) => {
        return Matrix2.clone(this, result);
    };

    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Matrix2} [right] The right hand side matrix.
     * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals = (right: Matrix2) => {
        return Matrix2.equals(this, right);
    };

    /**
     * Creates a string representing this Matrix with each row being
     * on a separate line and in the format '(column0, column1)'.
     *
     * @returns {String} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1)'.
     */
    toString = () => {
        return (
            "(" +
            this.elements[0] +
            ", " +
            this.elements[2] +
            ")\n" +
            "(" +
            this.elements[1] +
            ", " +
            this.elements[3] +
            ")"
        );
    };
}