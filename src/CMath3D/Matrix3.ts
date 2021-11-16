/**
 * Matrix3
 * 
 * This is the doc comment for Matrix3
 *
 * @module Matrix3
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Quaternion } from "./Quaternion";
import { Matrix2 } from "./Matrix2";


export class Matrix3 {
    /**
     * default:
     * <pre><code>
     * [0.0, 0.0,
     *  0.0, 0.0]
     * </code></pre>
     */
    elements: number[] = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];
    /**
     * A 3x3 matrix, indexable as a column-major order array.
     * Constructor parameters are in row-major order for code readability.
     * @alias Matrix3
     * @constructor
     * @implements {ArrayLike<number>}
     *
     * @param {Number} [column0Row0=0.0] The value for column 0, row 0.
     * @param {Number} [column1Row0=0.0] The value for column 1, row 0.
     * @param {Number} [column2Row0=0.0] The value for column 2, row 0.
     * @param {Number} [column0Row1=0.0] The value for column 0, row 1.
     * @param {Number} [column1Row1=0.0] The value for column 1, row 1.
     * @param {Number} [column2Row1=0.0] The value for column 2, row 1.
     * @param {Number} [column0Row2=0.0] The value for column 0, row 2.
     * @param {Number} [column1Row2=0.0] The value for column 1, row 2.
     * @param {Number} [column2Row2=0.0] The value for column 2, row 2.
     *
     * @see Matrix2
     * @see Matrix4
     */
    constructor(
        column0Row0?: number,
        column1Row0?: number,
        column2Row0?: number,
        column0Row1?: number,
        column1Row1?: number,
        column2Row1?: number,
        column0Row2?: number,
        column1Row2?: number,
        column2Row2?: number
    ) {
        this.elements[0] = defaultValue(column0Row0, 0.0);
        this.elements[1] = defaultValue(column0Row1, 0.0);
        this.elements[2] = defaultValue(column0Row2, 0.0);
        this.elements[3] = defaultValue(column1Row0, 0.0);
        this.elements[4] = defaultValue(column1Row1, 0.0);
        this.elements[5] = defaultValue(column1Row2, 0.0);
        this.elements[6] = defaultValue(column2Row0, 0.0);
        this.elements[7] = defaultValue(column2Row1, 0.0);
        this.elements[8] = defaultValue(column2Row2, 0.0);
    }

    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    static packedLength: number = 9;


    /**
     * Stores the provided instance into the provided array.
     *
     * @param {Matrix3} value The value to pack.
     * @param {Number[]} array The array to pack into.
     * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
     *
     * @returns {Number[]} The array that was packed into
     */
    static toArray = function (value: Matrix3, array: Array<number>, startingIndex: number): number[] {
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

        return array;
    };

    /**
     * Retrieves an instance from a packed array.
     *
     * @param {Number[]} array The packed array.
     * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
     * @param {Matrix3} [result] The object into which to store the result.
     * @returns {Matrix3} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    static fromArray = function (array: Array<number>, startingIndex: number, result: Matrix3): Matrix3 {
        startingIndex = defaultValue(startingIndex, 0);

        if (!defined(result)) {
            result = new Matrix3();
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
        return result;
    };

    /**
     * Duplicates a Matrix3 instance.
     *
     * @param {Matrix3} matrix The matrix to duplicate.
     * @param {Matrix3} [result] The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter or a new Matrix3 instance if one was not provided. (Returns undefined if matrix is undefined)
     */
    static clone = function (matrix: Matrix3, result: Matrix3): Matrix3 | undefined {
        if (!defined(matrix)) {
            return undefined;
        }
        if (!defined(result)) {
            return new Matrix3(
                matrix.elements[0],
                matrix.elements[3],
                matrix.elements[6],
                matrix.elements[1],
                matrix.elements[4],
                matrix.elements[7],
                matrix.elements[2],
                matrix.elements[5],
                matrix.elements[8]
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
        return result;
    };

    /**
     * Computes a 3x3 rotation matrix from the provided quaternion.
     *
     * @param {Quaternion} quaternion the quaternion to use.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The 3x3 rotation matrix from this quaternion.
     */
    static fromQuaternion = function (quaternion: Quaternion, result: Matrix3) {
        var x2 = quaternion.x * quaternion.x;
        var xy = quaternion.x * quaternion.y;
        var xz = quaternion.x * quaternion.z;
        var xw = quaternion.x * quaternion.w;
        var y2 = quaternion.y * quaternion.y;
        var yz = quaternion.y * quaternion.z;
        var yw = quaternion.y * quaternion.w;
        var z2 = quaternion.z * quaternion.z;
        var zw = quaternion.z * quaternion.w;
        var w2 = quaternion.w * quaternion.w;

        var m00 = x2 - y2 - z2 + w2;
        var m01 = 2.0 * (xy - zw);
        var m02 = 2.0 * (xz + yw);

        var m10 = 2.0 * (xy + zw);
        var m11 = -x2 + y2 - z2 + w2;
        var m12 = 2.0 * (yz - xw);

        var m20 = 2.0 * (xz - yw);
        var m21 = 2.0 * (yz + xw);
        var m22 = -x2 - y2 + z2 + w2;

        if (!defined(result)) {
            return new Matrix3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
        }
        result.elements[0] = m00;
        result.elements[1] = m10;
        result.elements[2] = m20;
        result.elements[3] = m01;
        result.elements[4] = m11;
        result.elements[5] = m21;
        result.elements[6] = m02;
        result.elements[7] = m12;
        result.elements[8] = m22;
        return result;
    };

}