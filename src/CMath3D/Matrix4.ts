/**
 * Matrix4
 * 
 * This is the doc comment for Matrix4
 *
 * @module Matrix4
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Quaternion } from "./Quaternion";
import { Matrix2 } from "./Matrix2";
import { Matrix3 } from "./Matrix3";
import { Vector3 } from "./Vector3";
import { DeveloperError } from "../DeveloperError";
import { TranslationRotationScale } from "./TranslationRotationScale";
import { Vector4 } from "./Vector4";


export class Matrix4 {
    /**
     * default:
     * <pre><code>
     * [0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0]
     * </code></pre>
     */
    elements: number[] = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];


    /**
     * A 4x4 matrix, indexable as a column-major order array.
     * Constructor parameters are in row-major order for code readability.
     * @alias Matrix4
     * @constructor
     * @implements {ArrayLike<number>}
     *
     * @param {Number} [column0Row0=0.0] The value for column 0, row 0.
     * @param {Number} [column1Row0=0.0] The value for column 1, row 0.
     * @param {Number} [column2Row0=0.0] The value for column 2, row 0.
     * @param {Number} [column3Row0=0.0] The value for column 3, row 0.
     * @param {Number} [column0Row1=0.0] The value for column 0, row 1.
     * @param {Number} [column1Row1=0.0] The value for column 1, row 1.
     * @param {Number} [column2Row1=0.0] The value for column 2, row 1.
     * @param {Number} [column3Row1=0.0] The value for column 3, row 1.
     * @param {Number} [column0Row2=0.0] The value for column 0, row 2.
     * @param {Number} [column1Row2=0.0] The value for column 1, row 2.
     * @param {Number} [column2Row2=0.0] The value for column 2, row 2.
     * @param {Number} [column3Row2=0.0] The value for column 3, row 2.
     * @param {Number} [column0Row3=0.0] The value for column 0, row 3.
     * @param {Number} [column1Row3=0.0] The value for column 1, row 3.
     * @param {Number} [column2Row3=0.0] The value for column 2, row 3.
     * @param {Number} [column3Row3=0.0] The value for column 3, row 3.
     *
     * @see <a href="./Matrix2.html">Matrix2</a>
     * @see <a href="./Matrix3.html">Matrix3</a>
     */
    constructor(
        column0Row0?: number,
        column1Row0?: number,
        column2Row0?: number,
        column3Row0?: number,
        column0Row1?: number,
        column1Row1?: number,
        column2Row1?: number,
        column3Row1?: number,
        column0Row2?: number,
        column1Row2?: number,
        column2Row2?: number,
        column3Row2?: number,
        column0Row3?: number,
        column1Row3?: number,
        column2Row3?: number,
        column3Row3?: number
    ) {
        this.elements[0] = defaultValue(column0Row0, 0.0);
        this.elements[1] = defaultValue(column0Row1, 0.0);
        this.elements[2] = defaultValue(column0Row2, 0.0);
        this.elements[3] = defaultValue(column0Row3, 0.0);
        this.elements[4] = defaultValue(column1Row0, 0.0);
        this.elements[5] = defaultValue(column1Row1, 0.0);
        this.elements[6] = defaultValue(column1Row2, 0.0);
        this.elements[7] = defaultValue(column1Row3, 0.0);
        this.elements[8] = defaultValue(column2Row0, 0.0);
        this.elements[9] = defaultValue(column2Row1, 0.0);
        this.elements[10] = defaultValue(column2Row2, 0.0);
        this.elements[11] = defaultValue(column2Row3, 0.0);
        this.elements[12] = defaultValue(column3Row0, 0.0);
        this.elements[13] = defaultValue(column3Row1, 0.0);
        this.elements[14] = defaultValue(column3Row2, 0.0);
        this.elements[15] = defaultValue(column3Row3, 0.0);
    }

    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    static packedLength: number = 16;


    /**
     * Stores the provided instance into the provided array.
     *
     * @param {Matrix4} value The value to pack.
     * @param {Number[]} array The array to pack into.
     * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
     *
     * @returns {Number[]} The array that was packed into
     */
    static toArray = function (value: Matrix4, array: Array<number>, startingIndex: number): number[] {
        startingIndex = defaultValue(startingIndex, 0);

        array[startingIndex++] = value.elements[0];
        array[startingIndex++] = value.elements[1];
        array[startingIndex++] = value.elements[2];
        array[startingIndex++] = value.elements[3];
        array[startingIndex++] = value.elements[4];
        array[startingIndex++] = value.elements[5];
        array[startingIndex++] = value.elements[6];
        array[startingIndex++] = value.elements[7];
        array[startingIndex++] = value.elements[8];
        array[startingIndex++] = value.elements[9];
        array[startingIndex++] = value.elements[10];
        array[startingIndex++] = value.elements[11];
        array[startingIndex++] = value.elements[12];
        array[startingIndex++] = value.elements[13];
        array[startingIndex++] = value.elements[14];
        array[startingIndex] = value.elements[15];

        return array;
    };

    /**
     * Retrieves an instance from a packed array.
     *
     * @param {Number[]} array The packed array.
     * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
     * @param {Matrix4} [result] The object into which to store the result.
     * @returns {Matrix4} The modified result parameter or a new Matrix4 instance if one was not provided.
     */
    static fromArray = function (array: Array<number>, startingIndex: number, result: Matrix4): Matrix4 {
        startingIndex = defaultValue(startingIndex, 0);

        if (!defined(result)) {
            result = new Matrix4();
        }

        result.elements[0] = array[startingIndex++];
        result.elements[1] = array[startingIndex++];
        result.elements[2] = array[startingIndex++];
        result.elements[3] = array[startingIndex++];
        result.elements[4] = array[startingIndex++];
        result.elements[5] = array[startingIndex++];
        result.elements[6] = array[startingIndex++];
        result.elements[7] = array[startingIndex++];
        result.elements[8] = array[startingIndex++];
        result.elements[9] = array[startingIndex++];
        result.elements[10] = array[startingIndex++];
        result.elements[11] = array[startingIndex++];
        result.elements[12] = array[startingIndex++];
        result.elements[13] = array[startingIndex++];
        result.elements[14] = array[startingIndex++];
        result.elements[15] = array[startingIndex];
        return result;
    };

    /**
     * Duplicates a Matrix4 instance.
     *
     * @param {Matrix4} matrix The matrix to duplicate.
     * @param {Matrix4} [result] The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter or a new Matrix4 instance if one was not provided. (Returns undefined if matrix is undefined)
     */
    static clone = function (matrix: Matrix4, result: Matrix4): Matrix4 | undefined {
        if (!defined(matrix)) {
            return undefined;
        }
        if (!defined(result)) {
            return new Matrix4(
                matrix.elements[0],
                matrix.elements[4],
                matrix.elements[8],
                matrix.elements[12],
                matrix.elements[1],
                matrix.elements[5],
                matrix.elements[9],
                matrix.elements[13],
                matrix.elements[2],
                matrix.elements[6],
                matrix.elements[10],
                matrix.elements[14],
                matrix.elements[3],
                matrix.elements[7],
                matrix.elements[11],
                matrix.elements[15]
            );
        }
        result.elements[0] = matrix.elements[0];
        result.elements[1] = matrix.elements[1];
        result.elements[2] = matrix.elements[2];
        result.elements[3] = matrix.elements[3];
        result.elements[4] = matrix.elements[4];
        result.elements[5] = matrix.elements[5];
        result.elements[6] = matrix.elements[6];
        result.elements[7] = matrix.elements[7];
        result.elements[8] = matrix.elements[8];
        result.elements[9] = matrix.elements[9];
        result.elements[10] = matrix.elements[10];
        result.elements[11] = matrix.elements[11];
        result.elements[12] = matrix.elements[12];
        result.elements[13] = matrix.elements[13];
        result.elements[14] = matrix.elements[14];
        result.elements[15] = matrix.elements[15];
        return result;
    };

    /**
     * Computes a Matrix4 instance from a Matrix3 representing the rotation
     * and a Vector3 representing the translation.
     *
     * @param {Matrix3} rotation The upper left portion of the matrix representing the rotation.
     * @param {Vector3} [translation=Vector3.ZERO] The upper right portion of the matrix representing the translation.
     * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromRotationTranslation = function (rotation: Matrix3, translation: Vector3, result: Matrix4): Matrix4 {
        translation = defaultValue(translation, Vector3.ZERO);

        if (!defined(result)) {
            return new Matrix4(
                rotation.elements[0],
                rotation.elements[3],
                rotation.elements[6],
                translation.x,
                rotation.elements[1],
                rotation.elements[4],
                rotation.elements[7],
                translation.y,
                rotation.elements[2],
                rotation.elements[5],
                rotation.elements[8],
                translation.z,
                0.0,
                0.0,
                0.0,
                1.0
            );
        }

        result.elements[0] = rotation.elements[0];
        result.elements[1] = rotation.elements[1];
        result.elements[2] = rotation.elements[2];
        result.elements[3] = 0.0;
        result.elements[4] = rotation.elements[3];
        result.elements[5] = rotation.elements[4];
        result.elements[6] = rotation.elements[5];
        result.elements[7] = 0.0;
        result.elements[8] = rotation.elements[6];
        result.elements[9] = rotation.elements[7];
        result.elements[10] = rotation.elements[8];
        result.elements[11] = 0.0;
        result.elements[12] = translation.x;
        result.elements[13] = translation.y;
        result.elements[14] = translation.z;
        result.elements[15] = 1.0;
        return result;
    };

    /**
     * Computes a Matrix4 instance from a translation, rotation, and scale (TRS)
     * representation with the rotation represented as a quaternion.
     *
     * @param {Vector3} translation The translation transformation.
     * @param {Quaternion} rotation The rotation transformation.
     * @param {Vector3} scale The non-uniform scale transformation.
     * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * var result = Matrix4.fromTranslationQuaternionRotationScale(
     *   new Vector3(1.0, 2.0, 3.0), // translation
     *   Quaternion.IDENTITY,           // rotation
     *   new Vector3(7.0, 8.0, 9.0), // scale
     *   result);
     * </code></pre>
     */
    static fromTranslationQuaternionRotationScale = function (
        translation: Vector3,
        rotation: Quaternion,
        scale: Vector3,
        result: Matrix4
    ): Matrix4 {
        if (!defined(result)) {
            result = new Matrix4();
        }

        var scaleX = scale.x;
        var scaleY = scale.y;
        var scaleZ = scale.z;

        var x2 = rotation.x * rotation.x;
        var xy = rotation.x * rotation.y;
        var xz = rotation.x * rotation.z;
        var xw = rotation.x * rotation.w;
        var y2 = rotation.y * rotation.y;
        var yz = rotation.y * rotation.z;
        var yw = rotation.y * rotation.w;
        var z2 = rotation.z * rotation.z;
        var zw = rotation.z * rotation.w;
        var w2 = rotation.w * rotation.w;

        var m00 = x2 - y2 - z2 + w2;
        var m01 = 2.0 * (xy - zw);
        var m02 = 2.0 * (xz + yw);

        var m10 = 2.0 * (xy + zw);
        var m11 = -x2 + y2 - z2 + w2;
        var m12 = 2.0 * (yz - xw);

        var m20 = 2.0 * (xz - yw);
        var m21 = 2.0 * (yz + xw);
        var m22 = -x2 - y2 + z2 + w2;

        result.elements[0] = m00 * scaleX;
        result.elements[1] = m10 * scaleX;
        result.elements[2] = m20 * scaleX;
        result.elements[3] = 0.0;
        result.elements[4] = m01 * scaleY;
        result.elements[5] = m11 * scaleY;
        result.elements[6] = m21 * scaleY;
        result.elements[7] = 0.0;
        result.elements[8] = m02 * scaleZ;
        result.elements[9] = m12 * scaleZ;
        result.elements[10] = m22 * scaleZ;
        result.elements[11] = 0.0;
        result.elements[12] = translation.x;
        result.elements[13] = translation.y;
        result.elements[14] = translation.z;
        result.elements[15] = 1.0;

        return result;
    };

    /**
     * Creates a Matrix4 instance from a {@link TranslationRotationScale} instance.
     *
     * @param {TranslationRotationScale} translationRotationScale The instance.
     * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromTranslationRotationScale = function (
        translationRotationScale: TranslationRotationScale,
        result: Matrix4
    ): Matrix4 {
        return Matrix4.fromTranslationQuaternionRotationScale(
            translationRotationScale.translation,
            translationRotationScale.rotation,
            translationRotationScale.scale,
            result
        );
    };

    /**
     * Creates a Matrix4 instance from a Vector3 representing the translation.
     *
     * @param {Vector3} translation The upper right portion of the matrix representing the translation.
     * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     *
     * @seestatic multiplyByTranslation
     */
    static fromTranslation = function (translation: Vector3, result: Matrix4): Matrix4 {
        return Matrix4.fromRotationTranslation(Matrix3.IDENTITY, translation, result);
    };

    /**
     * Computes a Matrix4 instance representing a non-uniform scale.
     *
     * @param {Vector3} scale The x, y, and z scale factors.
     * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * // Creates
     * //   [7.0, 0.0, 0.0, 0.0]
     * //   [0.0, 8.0, 0.0, 0.0]
     * //   [0.0, 0.0, 9.0, 0.0]
     * //   [0.0, 0.0, 0.0, 1.0]
     * var m = Matrix4.fromScale(new Vector3(7.0, 8.0, 9.0));
     * </code></pre>
     */
    static fromScale = function (scale: Vector3, result: Matrix4): Matrix4 {
        if (!defined(result)) {
            return new Matrix4(
                scale.x,
                0.0,
                0.0,
                0.0,
                0.0,
                scale.y,
                0.0,
                0.0,
                0.0,
                0.0,
                scale.z,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0
            );
        }

        result.elements[0] = scale.x;
        result.elements[1] = 0.0;
        result.elements[2] = 0.0;
        result.elements[3] = 0.0;
        result.elements[4] = 0.0;
        result.elements[5] = scale.y;
        result.elements[6] = 0.0;
        result.elements[7] = 0.0;
        result.elements[8] = 0.0;
        result.elements[9] = 0.0;
        result.elements[10] = scale.z;
        result.elements[11] = 0.0;
        result.elements[12] = 0.0;
        result.elements[13] = 0.0;
        result.elements[14] = 0.0;
        result.elements[15] = 1.0;
        return result;
    };

    /**
     * Computes a Matrix4 instance representing a uniform scale.
     *
     * @param {Number} scale The uniform scale factor.
     * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * // Creates
     * //   [2.0, 0.0, 0.0, 0.0]
     * //   [0.0, 2.0, 0.0, 0.0]
     * //   [0.0, 0.0, 2.0, 0.0]
     * //   [0.0, 0.0, 0.0, 1.0]
     * var m = Matrix4.fromUniformScale(2.0);
     * </code></pre>
     */
    static fromUniformScale = function (scale: number, result: Matrix4): Matrix4 {
        if (!defined(result)) {
            return new Matrix4(
                scale,
                0.0,
                0.0,
                0.0,
                0.0,
                scale,
                0.0,
                0.0,
                0.0,
                0.0,
                scale,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0
            );
        }

        result.elements[0] = scale;
        result.elements[1] = 0.0;
        result.elements[2] = 0.0;
        result.elements[3] = 0.0;
        result.elements[4] = 0.0;
        result.elements[5] = scale;
        result.elements[6] = 0.0;
        result.elements[7] = 0.0;
        result.elements[8] = 0.0;
        result.elements[9] = 0.0;
        result.elements[10] = scale;
        result.elements[11] = 0.0;
        result.elements[12] = 0.0;
        result.elements[13] = 0.0;
        result.elements[14] = 0.0;
        result.elements[15] = 1.0;
        return result;
    };

    /**
     * Computes the array index of the element at the provided row and column.
     *
     * @param {Number} row The zero-based index of the row.
     * @param {Number} column The zero-based index of the column.
     * @returns {Number} The index of the element at the provided row and column.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} row must be 0, 1, 2, or 3.
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} column must be 0, 1, 2, or 3.
     *
     * @example
     * <pre><code>
     * var myMatrix = new Matrix4();
     * var column1Row0Index = Matrix4.getElementIndex(1, 0);
     * var column1Row0 = myMatrix[column1Row0Index];
     * myMatrix[column1Row0Index] = 10.0;
     * </code></pre>
     */
    static getElementIndex = function (column: number, row: number): number {
        if (column < 0 || column > 3) throw new DeveloperError("column must be 0, 1, 2 or 3.");
        if (row < 0 || row > 3) throw new DeveloperError("row must be 0, 1, 2 or 3.");
        return column * 4 + row;
    };

    /**
     * Retrieves a copy of the matrix column at the provided index as a Vector4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to retrieve.
     * @param {Vector4} result The object onto which to store the result.
     * @returns {Vector4} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, 2, or 3.
     *
     * @example
     * <pre><code>
     * //returns a Vector4 instance with values from the specified column
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * //Example 1: Creates an instance of Vector
     * var a = Matrix4.getColumn(m, 2, new Vector4());
     *</code></pre>
     * @example
     * <pre><code>
     * //Example 2: Sets values for Vector instance
     * var a = new Vector4();
     * Matrix4.getColumn(m, 2, a);
     *
     * // a.x = 12.0; a.y = 16.0; a.z = 20.0; a.w = 24.0;
     * </code></pre>
     */
    static getColumn = function (matrix: Matrix4, index: number, result: Vector4): Vector4 {
        if (index < 0 || index > 3) throw new DeveloperError("index must be 0, 1, 2 or 3.");

        var startIndex = index * 4;
        var x = matrix.elements[startIndex];
        var y = matrix.elements[startIndex + 1];
        var z = matrix.elements[startIndex + 2];
        var w = matrix.elements[startIndex + 3];

        result.x = x;
        result.y = y;
        result.z = z;
        result.w = w;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Vector4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to set.
     * @param {Vector4} vector The Vector whose values will be assigned to the specified column.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, 2, or 3.
     *
     * @example
     * <pre><code>
     * //creates a new Matrix4 instance with new column values from the Vector4 instance
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * var a = Matrix4.setColumn(m, 2, new Vector4(99.0, 98.0, 97.0, 96.0), new Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 11.0, 99.0, 13.0]
     * //     [14.0, 15.0, 98.0, 17.0]
     * //     [18.0, 19.0, 97.0, 21.0]
     * //     [22.0, 23.0, 96.0, 25.0]
     * </code></pre>
     */
    static setColumn = function (matrix: Matrix4, index: number, vector: Vector4, result: Matrix4): Matrix4 {
        if (index < 0 || index > 3) throw new DeveloperError("index must be 0, 1, 2 or 3.");

        result = Matrix4.clone(matrix, result)!;
        var startIndex = index * 4;
        result.elements[startIndex] = vector.x;
        result.elements[startIndex + 1] = vector.y;
        result.elements[startIndex + 2] = vector.z;
        result.elements[startIndex + 3] = vector.w;
        return result;
    };

    /**
     * Computes a new matrix that replaces the translation in the rightmost column of the provided
     * matrix with the provided translation. This assumes the matrix is an affine transformation.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Vector3} translation The translation that replaces the translation of the provided matrix.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     */
    static setTranslation = function (matrix: Matrix4, translation: Vector3, result: Matrix4): Matrix4 {
        result.elements[0] = matrix.elements[0];
        result.elements[1] = matrix.elements[1];
        result.elements[2] = matrix.elements[2];
        result.elements[3] = matrix.elements[3];

        result.elements[4] = matrix.elements[4];
        result.elements[5] = matrix.elements[5];
        result.elements[6] = matrix.elements[6];
        result.elements[7] = matrix.elements[7];

        result.elements[8] = matrix.elements[8];
        result.elements[9] = matrix.elements[9];
        result.elements[10] = matrix.elements[10];
        result.elements[11] = matrix.elements[11];

        result.elements[12] = translation.x;
        result.elements[13] = translation.y;
        result.elements[14] = translation.z;
        result.elements[15] = matrix.elements[15];

        return result;
    };


    /**
     * Computes a new matrix that replaces the scale with the provided scale.
     * This assumes the matrix is an affine transformation.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Vector3} scale The scale that replaces the scale of the provided matrix.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     */
    static setScale = function (matrix: Matrix4, scale: Vector3, result: Matrix4): Matrix4 {
        var scaleScratch = new Vector3();

        var existingScale = Matrix4.getScale(matrix, scaleScratch);
        var newScale = Vector3.divideComponents(
            scale,
            existingScale,
            scaleScratch
        );
        return Matrix4.multiplyByScale(matrix, newScale, result);
    };

    /**
     * Retrieves a copy of the matrix row at the provided index as a Vector4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to retrieve.
     * @param {Vector4} result The object onto which to store the result.
     * @returns {Vector4} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, 2, or 3.
     *
     * @example
     * <pre><code>
     * //returns a Vector4 instance with values from the specified column
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * //Example 1: Returns an instance of Vector
     * var a = Matrix4.getRow(m, 2, new Vector4());
     *</code></pre>
     * @example
     * <pre><code>
     * //Example 2: Sets values for a Vector instance
     * var a = new Vector4();
     * Matrix4.getRow(m, 2, a);
     *
     * // a.x = 18.0; a.y = 19.0; a.z = 20.0; a.w = 21.0;
     * </code></pre>
     */
    static getRow = function (matrix: Matrix4, index: number, result: Vector4): Vector4 {
        if (index < 0 || index > 3) throw new DeveloperError("index must be 0, 1, 2 or 3.");

        var x = matrix.elements[index];
        var y = matrix.elements[index + 4];
        var z = matrix.elements[index + 8];
        var w = matrix.elements[index + 12];

        result.x = x;
        result.y = y;
        result.z = z;
        result.w = w;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Vector4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to set.
     * @param {Vector4} vector The Vector whose values will be assigned to the specified row.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, 2, or 3.
     *
     * @example
     * <pre><code>
     * //create a new Matrix4 instance with new row values from the Vector4 instance
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * var a = Matrix4.setRow(m, 2, new Vector4(99.0, 98.0, 97.0, 96.0), new Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [99.0, 98.0, 97.0, 96.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     * </code></pre>
     */
    static setRow = function (matrix: Matrix4, index: number, vector: Vector4, result: Matrix4): Matrix4 {
        if (index < 0 || index > 3) throw new DeveloperError("index must be 0, 1, 2 or 3.");

        result = Matrix4.clone(matrix, result)!;
        result.elements[index] = vector.x;
        result.elements[index + 4] = vector.y;
        result.elements[index + 8] = vector.z;
        result.elements[index + 12] = vector.w;
        return result;
    };

    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     *
     * @param {Matrix4} matrix The matrix.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter
     */
    static getScale = function (matrix: Matrix4, result: Vector3): Vector3 {
        var scratchColumn = new Vector3();

        result.x = Vector3.magnitude(
            Vector3.fromElements(matrix.elements[0], matrix.elements[1], matrix.elements[2], scratchColumn)
        );
        result.y = Vector3.magnitude(
            Vector3.fromElements(matrix.elements[4], matrix.elements[5], matrix.elements[6], scratchColumn)
        );
        result.z = Vector3.magnitude(
            Vector3.fromElements(matrix.elements[8], matrix.elements[9], matrix.elements[10], scratchColumn)
        );
        return result;
    };

    /**
     * Computes the product of two matrices.
     *
     * @param {Matrix4} left The first matrix.
     * @param {Matrix4} right The second matrix.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     */
    static multiply = function (left: Matrix4, right: Matrix4, result: Matrix4): Matrix4 {
        var left0 = left.elements[0];
        var left1 = left.elements[1];
        var left2 = left.elements[2];
        var left3 = left.elements[3];
        var left4 = left.elements[4];
        var left5 = left.elements[5];
        var left6 = left.elements[6];
        var left7 = left.elements[7];
        var left8 = left.elements[8];
        var left9 = left.elements[9];
        var left10 = left.elements[10];
        var left11 = left.elements[11];
        var left12 = left.elements[12];
        var left13 = left.elements[13];
        var left14 = left.elements[14];
        var left15 = left.elements[15];

        var right0 = right.elements[0];
        var right1 = right.elements[1];
        var right2 = right.elements[2];
        var right3 = right.elements[3];
        var right4 = right.elements[4];
        var right5 = right.elements[5];
        var right6 = right.elements[6];
        var right7 = right.elements[7];
        var right8 = right.elements[8];
        var right9 = right.elements[9];
        var right10 = right.elements[10];
        var right11 = right.elements[11];
        var right12 = right.elements[12];
        var right13 = right.elements[13];
        var right14 = right.elements[14];
        var right15 = right.elements[15];

        var column0Row0 =
            left0 * right0 + left4 * right1 + left8 * right2 + left12 * right3;
        var column0Row1 =
            left1 * right0 + left5 * right1 + left9 * right2 + left13 * right3;
        var column0Row2 =
            left2 * right0 + left6 * right1 + left10 * right2 + left14 * right3;
        var column0Row3 =
            left3 * right0 + left7 * right1 + left11 * right2 + left15 * right3;

        var column1Row0 =
            left0 * right4 + left4 * right5 + left8 * right6 + left12 * right7;
        var column1Row1 =
            left1 * right4 + left5 * right5 + left9 * right6 + left13 * right7;
        var column1Row2 =
            left2 * right4 + left6 * right5 + left10 * right6 + left14 * right7;
        var column1Row3 =
            left3 * right4 + left7 * right5 + left11 * right6 + left15 * right7;

        var column2Row0 =
            left0 * right8 + left4 * right9 + left8 * right10 + left12 * right11;
        var column2Row1 =
            left1 * right8 + left5 * right9 + left9 * right10 + left13 * right11;
        var column2Row2 =
            left2 * right8 + left6 * right9 + left10 * right10 + left14 * right11;
        var column2Row3 =
            left3 * right8 + left7 * right9 + left11 * right10 + left15 * right11;

        var column3Row0 =
            left0 * right12 + left4 * right13 + left8 * right14 + left12 * right15;
        var column3Row1 =
            left1 * right12 + left5 * right13 + left9 * right14 + left13 * right15;
        var column3Row2 =
            left2 * right12 + left6 * right13 + left10 * right14 + left14 * right15;
        var column3Row3 =
            left3 * right12 + left7 * right13 + left11 * right14 + left15 * right15;

        result.elements[0] = column0Row0;
        result.elements[1] = column0Row1;
        result.elements[2] = column0Row2;
        result.elements[3] = column0Row3;
        result.elements[4] = column1Row0;
        result.elements[5] = column1Row1;
        result.elements[6] = column1Row2;
        result.elements[7] = column1Row3;
        result.elements[8] = column2Row0;
        result.elements[9] = column2Row1;
        result.elements[10] = column2Row2;
        result.elements[11] = column2Row3;
        result.elements[12] = column3Row0;
        result.elements[13] = column3Row1;
        result.elements[14] = column3Row2;
        result.elements[15] = column3Row3;
        return result;
    };

    /**
     * Computes the sum of two matrices.
     *
     * @param {Matrix4} left The first matrix.
     * @param {Matrix4} right The second matrix.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     */
    static add = function (left: Matrix4, right: Matrix4, result: Matrix4): Matrix4 {
        result.elements[0] = left.elements[0] + right.elements[0];
        result.elements[1] = left.elements[1] + right.elements[1];
        result.elements[2] = left.elements[2] + right.elements[2];
        result.elements[3] = left.elements[3] + right.elements[3];
        result.elements[4] = left.elements[4] + right.elements[4];
        result.elements[5] = left.elements[5] + right.elements[5];
        result.elements[6] = left.elements[6] + right.elements[6];
        result.elements[7] = left.elements[7] + right.elements[7];
        result.elements[8] = left.elements[8] + right.elements[8];
        result.elements[9] = left.elements[9] + right.elements[9];
        result.elements[10] = left.elements[10] + right.elements[10];
        result.elements[11] = left.elements[11] + right.elements[11];
        result.elements[12] = left.elements[12] + right.elements[12];
        result.elements[13] = left.elements[13] + right.elements[13];
        result.elements[14] = left.elements[14] + right.elements[14];
        result.elements[15] = left.elements[15] + right.elements[15];
        return result;
    };

    /**
     * Computes the difference of two matrices.
     *
     * @param {Matrix4} left The first matrix.
     * @param {Matrix4} right The second matrix.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     */
    static subtract = function (left: Matrix4, right: Matrix4, result: Matrix4): Matrix4 {
        result.elements[0] = left.elements[0] - right.elements[0];
        result.elements[1] = left.elements[1] - right.elements[1];
        result.elements[2] = left.elements[2] - right.elements[2];
        result.elements[3] = left.elements[3] - right.elements[3];
        result.elements[4] = left.elements[4] - right.elements[4];
        result.elements[5] = left.elements[5] - right.elements[5];
        result.elements[6] = left.elements[6] - right.elements[6];
        result.elements[7] = left.elements[7] - right.elements[7];
        result.elements[8] = left.elements[8] - right.elements[8];
        result.elements[9] = left.elements[9] - right.elements[9];
        result.elements[10] = left.elements[10] - right.elements[10];
        result.elements[11] = left.elements[11] - right.elements[11];
        result.elements[12] = left.elements[12] - right.elements[12];
        result.elements[13] = left.elements[13] - right.elements[13];
        result.elements[14] = left.elements[14] - right.elements[14];
        result.elements[15] = left.elements[15] - right.elements[15];
        return result;
    };

    /**
     * Computes the product of two matrices assuming the matrices are affine transformation matrices,
     * where the upper left 3x3 elements are any matrix, and
     * the upper three elements in the fourth column are the translation.
     * The bottom row is assumed to be [0, 0, 0, 1].
     * The matrix is not verified to be in the proper form.
     * This method is faster than computing the product for general 4x4
     * matrices using {@linkstatic multiply}.
     *
     * @param {Matrix4} left The first matrix.
     * @param {Matrix4} right The second matrix.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @example
     * <pre><code>
     * var m1 = new Matrix4(1.0, 6.0, 7.0, 0.0, 2.0, 5.0, 8.0, 0.0, 3.0, 4.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0);
     * var m2 = Transforms.eastNorthUpToFixedFrame(new Vector3(1.0, 1.0, 1.0));
     * var m3 = Matrix4.multiplyTransformation(m1, m2, new Matrix4());
     * </code></pre>
     */
    static multiplyTransformation = function (left: Matrix4, right: Matrix4, result: Matrix4): Matrix4 {
        var left0 = left.elements[0];
        var left1 = left.elements[1];
        var left2 = left.elements[2];
        var left4 = left.elements[4];
        var left5 = left.elements[5];
        var left6 = left.elements[6];
        var left8 = left.elements[8];
        var left9 = left.elements[9];
        var left10 = left.elements[10];
        var left12 = left.elements[12];
        var left13 = left.elements[13];
        var left14 = left.elements[14];

        var right0 = right.elements[0];
        var right1 = right.elements[1];
        var right2 = right.elements[2];
        var right4 = right.elements[4];
        var right5 = right.elements[5];
        var right6 = right.elements[6];
        var right8 = right.elements[8];
        var right9 = right.elements[9];
        var right10 = right.elements[10];
        var right12 = right.elements[12];
        var right13 = right.elements[13];
        var right14 = right.elements[14];

        var column0Row0 = left0 * right0 + left4 * right1 + left8 * right2;
        var column0Row1 = left1 * right0 + left5 * right1 + left9 * right2;
        var column0Row2 = left2 * right0 + left6 * right1 + left10 * right2;

        var column1Row0 = left0 * right4 + left4 * right5 + left8 * right6;
        var column1Row1 = left1 * right4 + left5 * right5 + left9 * right6;
        var column1Row2 = left2 * right4 + left6 * right5 + left10 * right6;

        var column2Row0 = left0 * right8 + left4 * right9 + left8 * right10;
        var column2Row1 = left1 * right8 + left5 * right9 + left9 * right10;
        var column2Row2 = left2 * right8 + left6 * right9 + left10 * right10;

        var column3Row0 =
            left0 * right12 + left4 * right13 + left8 * right14 + left12;
        var column3Row1 =
            left1 * right12 + left5 * right13 + left9 * right14 + left13;
        var column3Row2 =
            left2 * right12 + left6 * right13 + left10 * right14 + left14;

        result.elements[0] = column0Row0;
        result.elements[1] = column0Row1;
        result.elements[2] = column0Row2;
        result.elements[3] = 0.0;
        result.elements[4] = column1Row0;
        result.elements[5] = column1Row1;
        result.elements[6] = column1Row2;
        result.elements[7] = 0.0;
        result.elements[8] = column2Row0;
        result.elements[9] = column2Row1;
        result.elements[10] = column2Row2;
        result.elements[11] = 0.0;
        result.elements[12] = column3Row0;
        result.elements[13] = column3Row1;
        result.elements[14] = column3Row2;
        result.elements[15] = 1.0;
        return result;
    };

    /**
     * Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by a 3x3 rotation matrix.  This is an optimization
     * for <code>Matrix4.multiply(m,static fromRotationTranslation(rotation), m);</code> with less allocations and arithmetic operations.
     *
     * @param {Matrix4} matrix The matrix on the left-hand side.
     * @param {Matrix3} rotation The 3x3 rotation matrix on the right-hand side.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @example
     * <pre><code>
     * // Instead of Matrix4.multiply(m, Matrix4.fromRotationTranslation(rotation), m);
     * Matrix4.multiplyByMatrix3(m, rotation, m);
     * </code></pre>
     */
    static multiplyByMatrix3 = function (matrix: Matrix4, rotation: Matrix3, result: Matrix4): Matrix4 {
        var left0 = matrix.elements[0];
        var left1 = matrix.elements[1];
        var left2 = matrix.elements[2];
        var left4 = matrix.elements[4];
        var left5 = matrix.elements[5];
        var left6 = matrix.elements[6];
        var left8 = matrix.elements[8];
        var left9 = matrix.elements[9];
        var left10 = matrix.elements[10];

        var right0 = rotation.elements[0];
        var right1 = rotation.elements[1];
        var right2 = rotation.elements[2];
        var right4 = rotation.elements[3];
        var right5 = rotation.elements[4];
        var right6 = rotation.elements[5];
        var right8 = rotation.elements[6];
        var right9 = rotation.elements[7];
        var right10 = rotation.elements[8];

        var column0Row0 = left0 * right0 + left4 * right1 + left8 * right2;
        var column0Row1 = left1 * right0 + left5 * right1 + left9 * right2;
        var column0Row2 = left2 * right0 + left6 * right1 + left10 * right2;

        var column1Row0 = left0 * right4 + left4 * right5 + left8 * right6;
        var column1Row1 = left1 * right4 + left5 * right5 + left9 * right6;
        var column1Row2 = left2 * right4 + left6 * right5 + left10 * right6;

        var column2Row0 = left0 * right8 + left4 * right9 + left8 * right10;
        var column2Row1 = left1 * right8 + left5 * right9 + left9 * right10;
        var column2Row2 = left2 * right8 + left6 * right9 + left10 * right10;

        result.elements[0] = column0Row0;
        result.elements[1] = column0Row1;
        result.elements[2] = column0Row2;
        result.elements[3] = 0.0;
        result.elements[4] = column1Row0;
        result.elements[5] = column1Row1;
        result.elements[6] = column1Row2;
        result.elements[7] = 0.0;
        result.elements[8] = column2Row0;
        result.elements[9] = column2Row1;
        result.elements[10] = column2Row2;
        result.elements[11] = 0.0;
        result.elements[12] = matrix.elements[12];
        result.elements[13] = matrix.elements[13];
        result.elements[14] = matrix.elements[14];
        result.elements[15] = matrix.elements[15];
        return result;
    };

    /**
     * Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by an implicit translation matrix defined by a {@link Vector3}.  This is an optimization
     * for <code>Matrix4.multiply(m,static fromTranslation(position), m);</code> with less allocations and arithmetic operations.
     *
     * @param {Matrix4} matrix The matrix on the left-hand side.
     * @param {Vector3} translation The translation on the right-hand side.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @example
     * <pre><code>
     * // Instead of Matrix4.multiply(m, Matrix4.fromTranslation(position), m);
     * Matrix4.multiplyByTranslation(m, position, m);
     * </code></pre>
     */
    static multiplyByTranslation = function (matrix: Matrix4, translation: Vector3, result: Matrix4): Matrix4 {
        var x = translation.x;
        var y = translation.y;
        var z = translation.z;

        var tx = x * matrix.elements[0] + y * matrix.elements[4] + z * matrix.elements[8] + matrix.elements[12];
        var ty = x * matrix.elements[1] + y * matrix.elements[5] + z * matrix.elements[9] + matrix.elements[13];
        var tz = x * matrix.elements[2] + y * matrix.elements[6] + z * matrix.elements[10] + matrix.elements[14];

        result.elements[0] = matrix.elements[0];
        result.elements[1] = matrix.elements[1];
        result.elements[2] = matrix.elements[2];
        result.elements[3] = matrix.elements[3];
        result.elements[4] = matrix.elements[4];
        result.elements[5] = matrix.elements[5];
        result.elements[6] = matrix.elements[6];
        result.elements[7] = matrix.elements[7];
        result.elements[8] = matrix.elements[8];
        result.elements[9] = matrix.elements[9];
        result.elements[10] = matrix.elements[10];
        result.elements[11] = matrix.elements[11];
        result.elements[12] = tx;
        result.elements[13] = ty;
        result.elements[14] = tz;
        result.elements[15] = matrix.elements[15];
        return result;
    };

    /**
     * Multiplies an affine transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by an implicit uniform scale matrix.  This is an optimization
     * for <code>Matrix4.multiply(m,static fromUniformScale(scale), m);</code>, where
     * <code>m</code> must be an affine matrix.
     * This function performs fewer allocations and arithmetic operations.
     *
     * @param {Matrix4} matrix The affine matrix on the left-hand side.
     * @param {Number} scale The uniform scale on the right-hand side.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     *
     * @example
     * <pre><code>
     * // Instead of Matrix4.multiply(m, Matrix4.fromUniformScale(scale), m);
     * Matrix4.multiplyByUniformScale(m, scale, m);
     *</code></pre>
     * @seestatic fromUniformScale
     * @seestatic multiplyByScale
     */
    static multiplyByUniformScale = function (matrix: Matrix4, scale: number, result: Matrix4): Matrix4 {
        var uniformScaleScratch = new Vector3();

        uniformScaleScratch.x = scale;
        uniformScaleScratch.y = scale;
        uniformScaleScratch.z = scale;
        return Matrix4.multiplyByScale(matrix, uniformScaleScratch, result);
    };

    /**
     * Multiplies an affine transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by an implicit non-uniform scale matrix. This is an optimization
     * for <code>Matrix4.multiply(m,static fromUniformScale(scale), m);</code>, where
     * <code>m</code> must be an affine matrix.
     * This function performs fewer allocations and arithmetic operations.
     *
     * @param {Matrix4} matrix The affine matrix on the left-hand side.
     * @param {Vector3} scale The non-uniform scale on the right-hand side.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     *
     * @example
     * <pre><code>
     * // Instead of Matrix4.multiply(m, Matrix4.fromScale(scale), m);
     * Matrix4.multiplyByScale(m, scale, m);
     * </code></pre>
     * @seestatic fromScale
     * @seestatic multiplyByUniformScale
     */
    static multiplyByScale = function (matrix: Matrix4, scale: Vector3, result: Matrix4): Matrix4 {
        var scaleX = scale.x;
        var scaleY = scale.y;
        var scaleZ = scale.z;

        // Faster than Vector3.equals
        if (scaleX === 1.0 && scaleY === 1.0 && scaleZ === 1.0) {
            return Matrix4.clone(matrix, result)!;
        }

        result.elements[0] = scaleX * matrix.elements[0];
        result.elements[1] = scaleX * matrix.elements[1];
        result.elements[2] = scaleX * matrix.elements[2];
        result.elements[3] = 0.0;
        result.elements[4] = scaleY * matrix.elements[4];
        result.elements[5] = scaleY * matrix.elements[5];
        result.elements[6] = scaleY * matrix.elements[6];
        result.elements[7] = 0.0;
        result.elements[8] = scaleZ * matrix.elements[8];
        result.elements[9] = scaleZ * matrix.elements[9];
        result.elements[10] = scaleZ * matrix.elements[10];
        result.elements[11] = 0.0;
        result.elements[12] = matrix.elements[12];
        result.elements[13] = matrix.elements[13];
        result.elements[14] = matrix.elements[14];
        result.elements[15] = 1.0;
        return result;
    };

    /**
     * Computes the product of a matrix and a column vector.
     *
     * @param {Matrix4} matrix The matrix.
     * @param {Vector4} vector The vector.
     * @param {Vector4} result The object onto which to store the result.
     * @returns {Vector4} The modified result parameter.
     */
    static multiplyByVector = function (matrix: Matrix4, vector: Vector4, result: Vector4): Vector4 {
        var vX = vector.x;
        var vY = vector.y;
        var vZ = vector.z;
        var vW = vector.w;

        var x = matrix.elements[0] * vX + matrix.elements[4] * vY + matrix.elements[8] * vZ + matrix.elements[12] * vW;
        var y = matrix.elements[1] * vX + matrix.elements[5] * vY + matrix.elements[9] * vZ + matrix.elements[13] * vW;
        var z = matrix.elements[2] * vX + matrix.elements[6] * vY + matrix.elements[10] * vZ + matrix.elements[14] * vW;
        var w = matrix.elements[3] * vX + matrix.elements[7] * vY + matrix.elements[11] * vZ + matrix.elements[15] * vW;

        result.x = x;
        result.y = y;
        result.z = z;
        result.w = w;
        return result;
    };

    /**
     * Computes the product of a matrix and a {@link Vector3}.  This is equivalent to calling {@linkstatic multiplyByVector}
     * with a {@link Vector4} with a <code>w</code> component of zero.
     *
     * @param {Matrix4} matrix The matrix.
     * @param {Vector3} vector The point.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     *
     * @example
     * <pre><code>
     * var p = new Vector3(1.0, 2.0, 3.0);
     * var result = Matrix4.multiplyByPointAsVector(matrix, p, new Vector3());
     * // A shortcut for
     * //   Vector3 p = ...
     * //   Matrix4.multiplyByVector(matrix, new Vector4(p.x, p.y, p.z, 0.0), result);
     * </code></pre>
     */
    static multiplyByPointAsVector = function (matrix: Matrix4, vector: Vector3, result: Vector3): Vector3 {
        var vX = vector.x;
        var vY = vector.y;
        var vZ = vector.z;

        var x = matrix.elements[0] * vX + matrix.elements[4] * vY + matrix.elements[8] * vZ;
        var y = matrix.elements[1] * vX + matrix.elements[5] * vY + matrix.elements[9] * vZ;
        var z = matrix.elements[2] * vX + matrix.elements[6] * vY + matrix.elements[10] * vZ;

        result.x = x;
        result.y = y;
        result.z = z;
        return result;
    };

    /**
     * Computes the product of a matrix and a {@link Vector3}. This is equivalent to calling {@linkstatic multiplyByVector}
     * with a {@link Vector4} with a <code>w</code> component of 1, but returns a {@link Vector3} instead of a {@link Vector4}.
     *
     * @param {Matrix4} matrix The matrix.
     * @param {Vector3} vector The point.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     *
     * @example
     * <pre><code>
     * var p = new Vector3(1.0, 2.0, 3.0);
     * var result = Matrix4.multiplyByPoint(matrix, p, new Vector3());
     * </code></pre>
     */
    static multiplyByPoint = function (matrix: Matrix4, vector: Vector3, result: Vector3): Vector3 {
        var vX = vector.x;
        var vY = vector.y;
        var vZ = vector.z;

        var x = matrix.elements[0] * vX + matrix.elements[4] * vY + matrix.elements[8] * vZ + matrix.elements[12];
        var y = matrix.elements[1] * vX + matrix.elements[5] * vY + matrix.elements[9] * vZ + matrix.elements[13];
        var z = matrix.elements[2] * vX + matrix.elements[6] * vY + matrix.elements[10] * vZ + matrix.elements[14];

        result.x = x;
        result.y = y;
        result.z = z;
        return result;
    };

    /**
     * Computes the product of a matrix and a scalar.
     *
     * @param {Matrix4} matrix The matrix.
     * @param {Number} scalar The number to multiply by.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @example
     * <pre><code>
     * //create a Matrix4 instance which is a scaled version of the supplied Matrix4
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * var a = Matrix4.multiplyByScalar(m, -2, new Matrix4());
     *
     * // m remains the same
     * // a = [-20.0, -22.0, -24.0, -26.0]
     * //     [-28.0, -30.0, -32.0, -34.0]
     * //     [-36.0, -38.0, -40.0, -42.0]
     * //     [-44.0, -46.0, -48.0, -50.0]
     * </code></pre>
     */
    static multiplyByScalar = function (matrix: Matrix4, scalar: number, result: Matrix4): Matrix4 {
        result.elements[0] = matrix.elements[0] * scalar;
        result.elements[1] = matrix.elements[1] * scalar;
        result.elements[2] = matrix.elements[2] * scalar;
        result.elements[3] = matrix.elements[3] * scalar;
        result.elements[4] = matrix.elements[4] * scalar;
        result.elements[5] = matrix.elements[5] * scalar;
        result.elements[6] = matrix.elements[6] * scalar;
        result.elements[7] = matrix.elements[7] * scalar;
        result.elements[8] = matrix.elements[8] * scalar;
        result.elements[9] = matrix.elements[9] * scalar;
        result.elements[10] = matrix.elements[10] * scalar;
        result.elements[11] = matrix.elements[11] * scalar;
        result.elements[12] = matrix.elements[12] * scalar;
        result.elements[13] = matrix.elements[13] * scalar;
        result.elements[14] = matrix.elements[14] * scalar;
        result.elements[15] = matrix.elements[15] * scalar;
        return result;
    };

    /**
     * Computes a negated copy of the provided matrix.
     *
     * @param {Matrix4} matrix The matrix to negate.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @example
     * <pre><code>
     * //create a new Matrix4 instance which is a negation of a Matrix4
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * var a = Matrix4.negate(m, new Matrix4());
     *
     * // m remains the same
     * // a = [-10.0, -11.0, -12.0, -13.0]
     * //     [-14.0, -15.0, -16.0, -17.0]
     * //     [-18.0, -19.0, -20.0, -21.0]
     * //     [-22.0, -23.0, -24.0, -25.0]
     * </code></pre>
     */
    static negate = function (matrix: Matrix4, result: Matrix4): Matrix4 {
        result.elements[0] = -matrix.elements[0];
        result.elements[1] = -matrix.elements[1];
        result.elements[2] = -matrix.elements[2];
        result.elements[3] = -matrix.elements[3];
        result.elements[4] = -matrix.elements[4];
        result.elements[5] = -matrix.elements[5];
        result.elements[6] = -matrix.elements[6];
        result.elements[7] = -matrix.elements[7];
        result.elements[8] = -matrix.elements[8];
        result.elements[9] = -matrix.elements[9];
        result.elements[10] = -matrix.elements[10];
        result.elements[11] = -matrix.elements[11];
        result.elements[12] = -matrix.elements[12];
        result.elements[13] = -matrix.elements[13];
        result.elements[14] = -matrix.elements[14];
        result.elements[15] = -matrix.elements[15];
        return result;
    };

    /**
     * Computes the transpose of the provided matrix.
     *
     * @param {Matrix4} matrix The matrix to transpose.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @example
     * <pre><code>
     * //returns transpose of a Matrix4
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * var a = Matrix4.transpose(m, new Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     * </code></pre>
     */
    static transpose = function (matrix: Matrix4, result: Matrix4): Matrix4 {
        var matrix1 = matrix.elements[1];
        var matrix2 = matrix.elements[2];
        var matrix3 = matrix.elements[3];
        var matrix6 = matrix.elements[6];
        var matrix7 = matrix.elements[7];
        var matrix11 = matrix.elements[11];

        result.elements[0] = matrix.elements[0];
        result.elements[1] = matrix.elements[4];
        result.elements[2] = matrix.elements[8];
        result.elements[3] = matrix.elements[12];
        result.elements[4] = matrix1;
        result.elements[5] = matrix.elements[5];
        result.elements[6] = matrix.elements[9];
        result.elements[7] = matrix.elements[13];
        result.elements[8] = matrix2;
        result.elements[9] = matrix6;
        result.elements[10] = matrix.elements[10];
        result.elements[11] = matrix.elements[14];
        result.elements[12] = matrix3;
        result.elements[13] = matrix7;
        result.elements[14] = matrix11;
        result.elements[15] = matrix.elements[15];
        return result;
    };

    /**
     * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
     *
     * @param {Matrix4} matrix The matrix with signed elements.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     */
    static abs = function (matrix: Matrix4, result: Matrix4): Matrix4 {

        result.elements[0] = Math.abs(matrix.elements[0]);
        result.elements[1] = Math.abs(matrix.elements[1]);
        result.elements[2] = Math.abs(matrix.elements[2]);
        result.elements[3] = Math.abs(matrix.elements[3]);
        result.elements[4] = Math.abs(matrix.elements[4]);
        result.elements[5] = Math.abs(matrix.elements[5]);
        result.elements[6] = Math.abs(matrix.elements[6]);
        result.elements[7] = Math.abs(matrix.elements[7]);
        result.elements[8] = Math.abs(matrix.elements[8]);
        result.elements[9] = Math.abs(matrix.elements[9]);
        result.elements[10] = Math.abs(matrix.elements[10]);
        result.elements[11] = Math.abs(matrix.elements[11]);
        result.elements[12] = Math.abs(matrix.elements[12]);
        result.elements[13] = Math.abs(matrix.elements[13]);
        result.elements[14] = Math.abs(matrix.elements[14]);
        result.elements[15] = Math.abs(matrix.elements[15]);

        return result;
    };

    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Matrix4} [left] The first matrix.
     * @param {Matrix4} [right] The second matrix.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     *
     * @example
     * <pre><code>
     * //compares two Matrix4 instances
     *
     * // a = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * // b = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * if(Matrix4.equals(a,b)) {
     *      console.log("Both matrices are equal");
     * } else {
     *      console.log("They are not equal");
     * }
     *
     * //Prints "Both matrices are equal" on the console
     * </code></pre>
     */
    static equals = function (left: Matrix4, right: Matrix4): boolean {
        // Given that most matrices will be transformation matrices, the elements
        // are tested in order such that the test is likely to fail as early
        // as possible.  I _think_ this is just as friendly to the L1 cache
        // as testing in index order.  It is certainty faster in practice.
        return (
            left === right ||
            (defined(left) &&
                defined(right) &&
                // Translation
                left.elements[12] === right.elements[12] &&
                left.elements[13] === right.elements[13] &&
                left.elements[14] === right.elements[14] &&
                // Rotation/scale
                left.elements[0] === right.elements[0] &&
                left.elements[1] === right.elements[1] &&
                left.elements[2] === right.elements[2] &&
                left.elements[4] === right.elements[4] &&
                left.elements[5] === right.elements[5] &&
                left.elements[6] === right.elements[6] &&
                left.elements[8] === right.elements[8] &&
                left.elements[9] === right.elements[9] &&
                left.elements[10] === right.elements[10] &&
                // Bottom row
                left.elements[3] === right.elements[3] &&
                left.elements[7] === right.elements[7] &&
                left.elements[11] === right.elements[11] &&
                left.elements[15] === right.elements[15])
        );
    };

    /**
     * Gets the translation portion of the provided matrix, assuming the matrix is an affine transformation matrix.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     */
    static getTranslation = function (matrix: Matrix4, result: Vector3): Vector3 {
        result.x = matrix.elements[12];
        result.y = matrix.elements[13];
        result.z = matrix.elements[14];
        return result;
    };

    /**
     * Gets the upper left 3x3 matrix of the provided matrix.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     *
     * @example
     * <pre><code>
     * // returns a Matrix3 instance from a Matrix4 instance
     *
     * // m = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * var b = new Matrix3();
     * Matrix4.getMatrix3(m,b);
     *
     * // b = [10.0, 14.0, 18.0]
     * //     [11.0, 15.0, 19.0]
     * //     [12.0, 16.0, 20.0]
     * </code></pre>
     */
    static getMatrix3 = function (matrix: Matrix4, result: Matrix3): Matrix3 {
        result.elements[0] = matrix.elements[0];
        result.elements[1] = matrix.elements[1];
        result.elements[2] = matrix.elements[2];
        result.elements[3] = matrix.elements[4];
        result.elements[4] = matrix.elements[5];
        result.elements[5] = matrix.elements[6];
        result.elements[6] = matrix.elements[8];
        result.elements[7] = matrix.elements[9];
        result.elements[8] = matrix.elements[10];
        return result;
    };

    /**
     * An immutable Matrix4 instance initialized to the identity matrix.
     *
     * @type {Matrix4}
     * @constant
     */
    static IDENTITY: Matrix4 = Object.freeze(
        new Matrix4(
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
        )
    );

    /**
     * An immutable Matrix4 instance initialized to the zero matrix.
     *
     * @type {Matrix4}
     * @constant
     */
    static ZERO: Matrix4 = Object.freeze(
        new Matrix4(
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        )
    );

    /**
     * Gets the number of items in the collection.
     * @memberofstatic prototype
     *
     * @type {Number}
     */
    length: number = Matrix3.packedLength;

    /**
     * Duplicates the provided Matrix4 instance.
     *
     * @param {Matrix4} [result] The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter or a new Matrix4 instance if one was not provided.
     */
    clone = (result: Matrix4): Matrix4 => {
        return Matrix4.clone(this, result)!;
    };

    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Matrix4} [right] The right hand side matrix.
     * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals = (right: Matrix4): boolean => {
        return Matrix4.equals(this, right);
    };

    /**
     */
    static equalsArray = function (matrix: Matrix4, array: Array<number>, offset: number) {
        return (
            matrix.elements[0] === array[offset] &&
            matrix.elements[1] === array[offset + 1] &&
            matrix.elements[2] === array[offset + 2] &&
            matrix.elements[3] === array[offset + 3] &&
            matrix.elements[4] === array[offset + 4] &&
            matrix.elements[5] === array[offset + 5] &&
            matrix.elements[6] === array[offset + 6] &&
            matrix.elements[7] === array[offset + 7] &&
            matrix.elements[8] === array[offset + 8] &&
            matrix.elements[9] === array[offset + 9] &&
            matrix.elements[10] === array[offset + 10] &&
            matrix.elements[11] === array[offset + 11] &&
            matrix.elements[12] === array[offset + 12] &&
            matrix.elements[13] === array[offset + 13] &&
            matrix.elements[14] === array[offset + 14] &&
            matrix.elements[15] === array[offset + 15]
        );
    };

    /**
     * Computes a string representing this Matrix with each row being
     * on a separate line and in the format '(column0, column1, column2, column3)'.
     *
     * @returns {String} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2, column3)'.
     */
    toString = (): string => {
        return (
            "(" +
            this.elements[0] +
            ", " +
            this.elements[4] +
            ", " +
            this.elements[8] +
            ", " +
            this.elements[12] +
            ")\n" +
            "(" +
            this.elements[1] +
            ", " +
            this.elements[5] +
            ", " +
            this.elements[9] +
            ", " +
            this.elements[13] +
            ")\n" +
            "(" +
            this.elements[2] +
            ", " +
            this.elements[6] +
            ", " +
            this.elements[10] +
            ", " +
            this.elements[14] +
            ")\n" +
            "(" +
            this.elements[3] +
            ", " +
            this.elements[7] +
            ", " +
            this.elements[11] +
            ", " +
            this.elements[15] +
            ")"
        );
    };
}