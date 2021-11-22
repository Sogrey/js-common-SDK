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
import { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";
import { DeveloperError } from "../DeveloperError";


export class Matrix3 {
    /**
     * default:
     * <pre><code>
     * [ 0, 0, 0,
         0, 0, 0,
         0, 0, 0]
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
     * @see <a href="./Matrix2.html">Matrix2</a>
     * @see <a href="./Matrix4.html">Matrix4</a>
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
        array[startingIndex] = value.elements[8];

        return array;
    };

    /**
     * Retrieves an instance from a packed array.
     *
     * @param {Number[]} array The packed array.
     * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
     * @param {Matrix3} [result] The object into which to store the result.
     * @returns {Matrix3} The modified result parameter or a new Matrix3 instance if one was not provided.
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
    static fromQuaternion = function (quaternion: Quaternion, result: Matrix3): Matrix3 {
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

    /**
     * Computes a Matrix3 instance representing a non-uniform scale.
     *
     * @param {Vector3} scale The x, y, and z scale factors.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * // Creates
     * //   [7.0, 0.0, 0.0]
     * //   [0.0, 8.0, 0.0]
     * //   [0.0, 0.0, 9.0]
     * var m = Matrix3.fromScale(new Vector3(7.0, 8.0, 9.0));
     * </code></pre>
     */
    static fromScale = function (scale: Vector3, result: Matrix3): Matrix3 {
        if (!defined(result)) {
            return new Matrix3(scale.x, 0.0, 0.0, 0.0, scale.y, 0.0, 0.0, 0.0, scale.z);
        }

        result.elements[0] = scale.x;
        result.elements[1] = 0.0;
        result.elements[2] = 0.0;
        result.elements[3] = 0.0;
        result.elements[4] = scale.y;
        result.elements[5] = 0.0;
        result.elements[6] = 0.0;
        result.elements[7] = 0.0;
        result.elements[8] = scale.z;
        return result;
    };

    /**
     * Computes a Matrix3 instance representing a uniform scale.
     *
     * @param {Number} scale The uniform scale factor.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * // Creates
     * //   [2.0, 0.0, 0.0]
     * //   [0.0, 2.0, 0.0]
     * //   [0.0, 0.0, 2.0]
     * var m = Matrix3.fromUniformScale(2.0);
     * </code></pre>
     */
    static fromUniformScale = function (scale: number, result: Matrix3): Matrix3 {
        if (!defined(result)) {
            return new Matrix3(scale, 0.0, 0.0, 0.0, scale, 0.0, 0.0, 0.0, scale);
        }

        result.elements[0] = scale;
        result.elements[1] = 0.0;
        result.elements[2] = 0.0;
        result.elements[3] = 0.0;
        result.elements[4] = scale;
        result.elements[5] = 0.0;
        result.elements[6] = 0.0;
        result.elements[7] = 0.0;
        result.elements[8] = scale;
        return result;
    };

    /**
     * Computes a Matrix3 instance representing the cross product equivalent matrix of a Vector3 vector.
     *
     * @param {Vector3} vector the vector on the left hand side of the cross product operation.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
     *
     * @example
     * // Creates
     * //   [0.0, -9.0,  8.0]
     * //   [9.0,  0.0, -7.0]
     * //   [-8.0, 7.0,  0.0]
     * var m = Matrix3.fromCrossProduct(new Vector3(7.0, 8.0, 9.0));
     */
    static fromCrossProduct = function (vector: Vector3, result: Matrix3): Matrix3 {
        if (!defined(result)) {
            return new Matrix3(
                0.0,
                -vector.z,
                vector.y,
                vector.z,
                0.0,
                -vector.x,
                -vector.y,
                vector.x,
                0.0
            );
        }

        result.elements[0] = 0.0;
        result.elements[1] = vector.z;
        result.elements[2] = -vector.y;
        result.elements[3] = -vector.z;
        result.elements[4] = 0.0;
        result.elements[5] = vector.x;
        result.elements[6] = vector.y;
        result.elements[7] = -vector.x;
        result.elements[8] = 0.0;
        return result;
    };

    /**
     * Creates a rotation matrix around the x-axis.
     *
     * @param {Number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * // Rotate a point 45 degrees counterclockwise around the x-axis.
     * var p = new Vector3(5, 6, 7);
     * var m = Matrix3.fromRotationX(Math.toRadians(45.0));
     * var rotated = Matrix3.multiplyByVector(m, p, new Vector3());
     * </code></pre>
     */
    static fromRotationX = function (angle: number, result: Matrix3): Matrix3 {
        var cosAngle = Math.cos(angle);
        var sinAngle = Math.sin(angle);

        if (!defined(result)) {
            return new Matrix3(
                1.0,
                0.0,
                0.0,
                0.0,
                cosAngle,
                -sinAngle,
                0.0,
                sinAngle,
                cosAngle
            );
        }

        result.elements[0] = 1.0;
        result.elements[1] = 0.0;
        result.elements[2] = 0.0;
        result.elements[3] = 0.0;
        result.elements[4] = cosAngle;
        result.elements[5] = sinAngle;
        result.elements[6] = 0.0;
        result.elements[7] = -sinAngle;
        result.elements[8] = cosAngle;

        return result;
    };

    /**
     * Creates a rotation matrix around the y-axis.
     *
     * @param {Number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * // Rotate a point 45 degrees counterclockwise around the y-axis.
     * var p = new Vector3(5, 6, 7);
     * var m = Matrix3.fromRotationY(Math.toRadians(45.0));
     * var rotated = Matrix3.multiplyByVector(m, p, new Vector3());
     * </code></pre>
     */
    static fromRotationY = function (angle: number, result: Matrix3): Matrix3 {
        var cosAngle = Math.cos(angle);
        var sinAngle = Math.sin(angle);

        if (!defined(result)) {
            return new Matrix3(
                cosAngle,
                0.0,
                sinAngle,
                0.0,
                1.0,
                0.0,
                -sinAngle,
                0.0,
                cosAngle
            );
        }

        result.elements[0] = cosAngle;
        result.elements[1] = 0.0;
        result.elements[2] = -sinAngle;
        result.elements[3] = 0.0;
        result.elements[4] = 1.0;
        result.elements[5] = 0.0;
        result.elements[6] = sinAngle;
        result.elements[7] = 0.0;
        result.elements[8] = cosAngle;

        return result;
    };

    /**
     * Creates a rotation matrix around the z-axis.
     *
     * @param {Number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
     *
     * @example
     * <pre><code>
     * // Rotate a point 45 degrees counterclockwise around the z-axis.
     * var p = new Vector3(5, 6, 7);
     * var m = Matrix3.fromRotationZ(Math.toRadians(45.0));
     * var rotated = Matrix3.multiplyByVector(m, p, new Vector3());
     * </code></pre>
     */
    static fromRotationZ = function (angle: number, result: Matrix3): Matrix3 {
        var cosAngle = Math.cos(angle);
        var sinAngle = Math.sin(angle);

        if (!defined(result)) {
            return new Matrix3(
                cosAngle,
                -sinAngle,
                0.0,
                sinAngle,
                cosAngle,
                0.0,
                0.0,
                0.0,
                1.0
            );
        }

        result.elements[0] = cosAngle;
        result.elements[1] = sinAngle;
        result.elements[2] = 0.0;
        result.elements[3] = -sinAngle;
        result.elements[4] = cosAngle;
        result.elements[5] = 0.0;
        result.elements[6] = 0.0;
        result.elements[7] = 0.0;
        result.elements[8] = 1.0;

        return result;
    };


    /**
   * 绕任意轴旋转
   * @param {*} axisNormal 空间内任意向量
   * @param {*} angle 旋转角度（弧度）
   * @param {*} rotation 旋转结果矩阵
   * @returns 
   */
    static fromRotationAroundAxis = function (axisNormal: Vector3, angle: number, rotation?: Matrix3): Matrix3 {
        if (!defined(rotation)) rotation = new Matrix3();

        // http://www.cppblog.com/lovedday/archive/2008/01/12/41031.html
        // 绕任意 n 轴旋转
        //          ┍     ┑   ┍                                                                     ┑
        //          |  p' |   |   nx*nx(1-cosθ)+cosθ   nx*ny(1-cosθ)+nz*sinθ  nx*nz(1-cosθ)-ny*sinθ |
        // R(n,θ) = |  q' | = | nx*ny(1-cosθ)-nz*sinθ    ny*ny(1-cosθ)+cosθ   ny*nz(1-cosθ)+nx*sinθ |
        //          |  r' |   | nx*nz(1-cosθ)+ny*sinθ  ny*nz(1-cosθ)-nx*sinθ    nz*nz(1-cosθ)+cosθ  |
        //          ┕     ┙   ┕                                                                     ┙

        rotation!.elements[0] = axisNormal.x * axisNormal.x * (1 - Math.cos(angle)) + Math.cos(angle);
        rotation!.elements[1] = axisNormal.x * axisNormal.y * (1 - Math.cos(angle)) + axisNormal.z * Math.sin(angle);
        rotation!.elements[2] = axisNormal.x * axisNormal.z * (1 - Math.cos(angle)) - axisNormal.y * Math.sin(angle);

        rotation!.elements[3] = axisNormal.x * axisNormal.y * (1 - Math.cos(angle)) - axisNormal.z * Math.sin(angle);
        rotation!.elements[4] = axisNormal.y * axisNormal.y * (1 - Math.cos(angle)) + Math.cos(angle);
        rotation!.elements[5] = axisNormal.y * axisNormal.z * (1 - Math.cos(angle)) + axisNormal.x * Math.sin(angle);

        rotation!.elements[6] = axisNormal.x * axisNormal.z * (1 - Math.cos(angle)) + axisNormal.y * Math.sin(angle);
        rotation!.elements[7] = axisNormal.y * axisNormal.z * (1 - Math.cos(angle)) - axisNormal.x * Math.sin(angle);
        rotation!.elements[8] = axisNormal.z * axisNormal.z * (1 - Math.cos(angle)) + Math.cos(angle);

        return rotation!;
    }

    /**
     * Computes the array index of the element at the provided row and column.
     *
     * @param {Number} row The zero-based index of the row.
     * @param {Number} column The zero-based index of the column.
     * @returns {Number} The index of the element at the provided row and column.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} row must be 0, 1, or 2.
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} column must be 0, 1, or 2.
     *
     * @example
     * <pre><code>
     * var myMatrix = new Matrix3();
     * var column1Row0Index = Matrix3.getElementIndex(1, 0);
     * var column1Row0 = myMatrix[column1Row0Index]
     * myMatrix[column1Row0Index] = 10.0;
     * </code></pre>
     */
    static getElementIndex = function (column: number, row: number): number {
        if (column < 0 || column > 2) throw new DeveloperError("column must be 0, 1, or 2.");
        if (row < 0 || row > 2) throw new DeveloperError("row must be 0, 1, or 2.");

        return column * 3 + row;
    };

    /**
     * Retrieves a copy of the matrix column at the provided index as a Vector3 instance.
     *
     * @param {Matrix3} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to retrieve.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, or 2.
     */
    static getColumn = function (matrix: Matrix3, index: number, result: Vector3): Vector3 {
        if (index < 0 || index > 2) throw new DeveloperError("index must be 0, 1, or 2.");

        var startIndex = index * 3;
        var x = matrix.elements[startIndex];
        var y = matrix.elements[startIndex + 1];
        var z = matrix.elements[startIndex + 2];

        result.x = x;
        result.y = y;
        result.z = z;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Vector3 instance.
     *
     * @param {Matrix3} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to set.
     * @param {Vector3} vector The Vector whose values will be assigned to the specified column.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, or 2.
     */
    static setColumn = function (matrix: Matrix3, index: number, vector: Vector3, result: Matrix3): Matrix3 {
        if (index < 0 || index > 2) throw new DeveloperError("index must be 0, 1, or 2.");

        result = Matrix3.clone(matrix, result)!;
        var startIndex = index * 3;
        result.elements[startIndex] = vector.x;
        result.elements[startIndex + 1] = vector.y;
        result.elements[startIndex + 2] = vector.z;
        return result;
    };

    /**
     * Retrieves a copy of the matrix row at the provided index as a Vector3 instance.
     *
     * @param {Matrix3} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to retrieve.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, or 2.
     */
    static getRow = function (matrix: Matrix3, index: number, result: Vector3): Vector3 {
        if (index < 0 || index > 2) throw new DeveloperError("index must be 0, 1, or 2.");

        var x = matrix.elements[index];
        var y = matrix.elements[index + 3];
        var z = matrix.elements[index + 6];

        result.x = x;
        result.y = y;
        result.z = z;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Vector3 instance.
     *
     * @param {Matrix3} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to set.
     * @param {Vector3} vector The Vector whose values will be assigned to the specified row.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} index must be 0, 1, or 2.
     */
    static setRow = function (matrix: Matrix3, index: number, vector: Vector3, result: Matrix3): Matrix3 {
        if (index < 0 || index > 2) throw new DeveloperError("index must be 0, 1, or 2.");

        result = Matrix3.clone(matrix, result)!;
        result.elements[index] = vector.x;
        result.elements[index + 3] = vector.y;
        result.elements[index + 6] = vector.z;
        return result;
    };

    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     *
     * @param {Matrix3} matrix The matrix.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     */
    static getScale = function (matrix: Matrix3, result: Vector3): Vector3 {
        let scratchColumn = new Vector3();
        result.x = Vector3.magnitude(
            Vector3.fromElements(matrix.elements[0], matrix.elements[1], matrix.elements[2], scratchColumn)
        );
        result.y = Vector3.magnitude(
            Vector3.fromElements(matrix.elements[3], matrix.elements[4], matrix.elements[5], scratchColumn)
        );
        result.z = Vector3.magnitude(
            Vector3.fromElements(matrix.elements[6], matrix.elements[7], matrix.elements[8], scratchColumn)
        );
        return result;
    };

    /**
     * Computes the product of two matrices.
     *
     * @param {Matrix3} left The first matrix.
     * @param {Matrix3} right The second matrix.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static multiply = function (left: Matrix3, right: Matrix3, result: Matrix3): Matrix3 {
        var column0Row0 =
            left.elements[0] * right.elements[0] + left.elements[3] * right.elements[1] + left.elements[6] * right.elements[2];
        var column0Row1 =
            left.elements[1] * right.elements[0] + left.elements[4] * right.elements[1] + left.elements[7] * right.elements[2];
        var column0Row2 =
            left.elements[2] * right.elements[0] + left.elements[5] * right.elements[1] + left.elements[8] * right.elements[2];

        var column1Row0 =
            left.elements[0] * right.elements[3] + left.elements[3] * right.elements[4] + left.elements[6] * right.elements[5];
        var column1Row1 =
            left.elements[1] * right.elements[3] + left.elements[4] * right.elements[4] + left.elements[7] * right.elements[5];
        var column1Row2 =
            left.elements[2] * right.elements[3] + left.elements[5] * right.elements[4] + left.elements[8] * right.elements[5];

        var column2Row0 =
            left.elements[0] * right.elements[6] + left.elements[3] * right.elements[7] + left.elements[6] * right.elements[8];
        var column2Row1 =
            left.elements[1] * right.elements[6] + left.elements[4] * right.elements[7] + left.elements[7] * right.elements[8];
        var column2Row2 =
            left.elements[2] * right.elements[6] + left.elements[5] * right.elements[7] + left.elements[8] * right.elements[8];

        result.elements[0] = column0Row0;
        result.elements[1] = column0Row1;
        result.elements[2] = column0Row2;
        result.elements[3] = column1Row0;
        result.elements[4] = column1Row1;
        result.elements[5] = column1Row2;
        result.elements[6] = column2Row0;
        result.elements[7] = column2Row1;
        result.elements[8] = column2Row2;
        return result;
    };

    /**
     * Computes the sum of two matrices.
     *
     * @param {Matrix3} left The first matrix.
     * @param {Matrix3} right The second matrix.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static add = function (left: Matrix3, right: Matrix3, result: Matrix3): Matrix3 {
        result.elements[0] = left.elements[0] + right.elements[0];
        result.elements[1] = left.elements[1] + right.elements[1];
        result.elements[2] = left.elements[2] + right.elements[2];
        result.elements[3] = left.elements[3] + right.elements[3];
        result.elements[4] = left.elements[4] + right.elements[4];
        result.elements[5] = left.elements[5] + right.elements[5];
        result.elements[6] = left.elements[6] + right.elements[6];
        result.elements[7] = left.elements[7] + right.elements[7];
        result.elements[8] = left.elements[8] + right.elements[8];
        return result;
    };

    /**
     * Computes the difference of two matrices.
     *
     * @param {Matrix3} left The first matrix.
     * @param {Matrix3} right The second matrix.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static subtract = function (left: Matrix3, right: Matrix3, result: Matrix3): Matrix3 {
        result.elements[0] = left.elements[0] - right.elements[0];
        result.elements[1] = left.elements[1] - right.elements[1];
        result.elements[2] = left.elements[2] - right.elements[2];
        result.elements[3] = left.elements[3] - right.elements[3];
        result.elements[4] = left.elements[4] - right.elements[4];
        result.elements[5] = left.elements[5] - right.elements[5];
        result.elements[6] = left.elements[6] - right.elements[6];
        result.elements[7] = left.elements[7] - right.elements[7];
        result.elements[8] = left.elements[8] - right.elements[8];
        return result;
    };

    /**
     * Computes the product of a matrix and a column vector.
     *
     * @param {Matrix3} matrix The matrix.
     * @param {Vector3} vector The column.
     * @param {Vector3} result The object onto which to store the result.
     * @returns {Vector3} The modified result parameter.
     */
    static multiplyByVector = function (matrix: Matrix3, vector: Vector3, result: Vector3): Vector3 {
        var vX = vector.x;
        var vY = vector.y;
        var vZ = vector.z;

        var x = matrix.elements[0] * vX + matrix.elements[3] * vY + matrix.elements[6] * vZ;
        var y = matrix.elements[1] * vX + matrix.elements[4] * vY + matrix.elements[7] * vZ;
        var z = matrix.elements[2] * vX + matrix.elements[5] * vY + matrix.elements[8] * vZ;

        result.x = x;
        result.y = y;
        result.z = z;
        return result;
    };

    /**
     * Computes the product of a matrix and a scalar.
     *
     * @param {Matrix3} matrix The matrix.
     * @param {Number} scalar The number to multiply by.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static multiplyByScalar = function (matrix: Matrix3, scalar: number, result: Matrix3): Matrix3 {
        result.elements[0] = matrix.elements[0] * scalar;
        result.elements[1] = matrix.elements[1] * scalar;
        result.elements[2] = matrix.elements[2] * scalar;
        result.elements[3] = matrix.elements[3] * scalar;
        result.elements[4] = matrix.elements[4] * scalar;
        result.elements[5] = matrix.elements[5] * scalar;
        result.elements[6] = matrix.elements[6] * scalar;
        result.elements[7] = matrix.elements[7] * scalar;
        result.elements[8] = matrix.elements[8] * scalar;
        return result;
    };

    /**
     * Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.
     *
     * @param {Matrix3} matrix The matrix on the left-hand side.
     * @param {Vector3} scale The non-uniform scale on the right-hand side.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     *
     *
     * @example
     * <pre><code>
     * // Instead of Matrix3.multiply(m, Matrix3.fromScale(scale), m);
     * Matrix3.multiplyByScale(m, scale, m);
     *</code></pre>
     * @see <a href="#fromScale">Matrix3.fromScale</a>
     */
    static multiplyByScale = function (matrix: Matrix3, scale: Vector3, result: Matrix3): Matrix3 {
        result.elements[0] = matrix.elements[0] * scale.x;
        result.elements[1] = matrix.elements[1] * scale.x;
        result.elements[2] = matrix.elements[2] * scale.x;
        result.elements[3] = matrix.elements[3] * scale.y;
        result.elements[4] = matrix.elements[4] * scale.y;
        result.elements[5] = matrix.elements[5] * scale.y;
        result.elements[6] = matrix.elements[6] * scale.z;
        result.elements[7] = matrix.elements[7] * scale.z;
        result.elements[8] = matrix.elements[8] * scale.z;
        return result;
    };

    /**
     * Creates a negated copy of the provided matrix.
     *
     * @param {Matrix3} matrix The matrix to negate.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static negate = function (matrix: Matrix3, result: Matrix3): Matrix3 {
        result.elements[0] = -matrix.elements[0];
        result.elements[1] = -matrix.elements[1];
        result.elements[2] = -matrix.elements[2];
        result.elements[3] = -matrix.elements[3];
        result.elements[4] = -matrix.elements[4];
        result.elements[5] = -matrix.elements[5];
        result.elements[6] = -matrix.elements[6];
        result.elements[7] = -matrix.elements[7];
        result.elements[8] = -matrix.elements[8];
        return result;
    };

    /**
     * Computes the transpose of the provided matrix.
     *
     * @param {Matrix3} matrix The matrix to transpose.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static transpose = function (matrix: Matrix3, result: Matrix3): Matrix3 {
        var column0Row0 = matrix.elements[0];
        var column0Row1 = matrix.elements[3];
        var column0Row2 = matrix.elements[6];
        var column1Row0 = matrix.elements[1];
        var column1Row1 = matrix.elements[4];
        var column1Row2 = matrix.elements[7];
        var column2Row0 = matrix.elements[2];
        var column2Row1 = matrix.elements[5];
        var column2Row2 = matrix.elements[8];

        result.elements[0] = column0Row0;
        result.elements[1] = column0Row1;
        result.elements[2] = column0Row2;
        result.elements[3] = column1Row0;
        result.elements[4] = column1Row1;
        result.elements[5] = column1Row2;
        result.elements[6] = column2Row0;
        result.elements[7] = column2Row1;
        result.elements[8] = column2Row2;
        return result;
    };


    /**
     * Extracts the rotation assuming the matrix is an affine transformation.
     *
     * @param {Matrix3} matrix The matrix.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter
     */
    static getRotation = function (matrix: Matrix3, result: Matrix3): Matrix3 {
        let scratchScale = new Vector3();
        let inverseScale = Vector3.divideComponents(
            new Vector3(1, 1, 1),
            Matrix3.getScale(matrix, scratchScale),
            scratchScale
        );
        result = Matrix3.multiplyByScale(matrix, inverseScale, result);

        return result;
    };

    /**
     * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
     *
     * @param {Matrix3} matrix The matrix with signed elements.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static abs = function (matrix: Matrix3, result: Matrix3): Matrix3 {
        result.elements[0] = Math.abs(matrix.elements[0]);
        result.elements[1] = Math.abs(matrix.elements[1]);
        result.elements[2] = Math.abs(matrix.elements[2]);
        result.elements[3] = Math.abs(matrix.elements[3]);
        result.elements[4] = Math.abs(matrix.elements[4]);
        result.elements[5] = Math.abs(matrix.elements[5]);
        result.elements[6] = Math.abs(matrix.elements[6]);
        result.elements[7] = Math.abs(matrix.elements[7]);
        result.elements[8] = Math.abs(matrix.elements[8]);

        return result;
    };

    /**
     * Computes the determinant of the provided matrix.
     *
     * @param {Matrix3} matrix The matrix to use.
     * @returns {Number} The value of the determinant of the matrix.
     */
    static determinant = function (matrix: Matrix3): number {
        var m11 = matrix.elements[0];
        var m21 = matrix.elements[3];
        var m31 = matrix.elements[6];
        var m12 = matrix.elements[1];
        var m22 = matrix.elements[4];
        var m32 = matrix.elements[7];
        var m13 = matrix.elements[2];
        var m23 = matrix.elements[5];
        var m33 = matrix.elements[8];

        return (
            m11 * (m22 * m33 - m23 * m32) +
            m12 * (m23 * m31 - m21 * m33) +
            m13 * (m21 * m32 - m22 * m31)
        );
    };

    /**
     * Computes the inverse of the provided matrix.
     *
     * @param {Matrix3} matrix The matrix to invert.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     *
     * @exception {<a href="./DeveloperError.html">DeveloperError</a>} matrix is not invertible.
     */
    static inverse = function (matrix: Matrix3, result: Matrix3): Matrix3 {
        var m11 = matrix.elements[0];
        var m21 = matrix.elements[1];
        var m31 = matrix.elements[2];
        var m12 = matrix.elements[3];
        var m22 = matrix.elements[4];
        var m32 = matrix.elements[5];
        var m13 = matrix.elements[6];
        var m23 = matrix.elements[7];
        var m33 = matrix.elements[8];

        var determinant = Matrix3.determinant(matrix);

        result.elements[0] = m22 * m33 - m23 * m32;
        result.elements[1] = m23 * m31 - m21 * m33;
        result.elements[2] = m21 * m32 - m22 * m31;
        result.elements[3] = m13 * m32 - m12 * m33;
        result.elements[4] = m11 * m33 - m13 * m31;
        result.elements[5] = m12 * m31 - m11 * m32;
        result.elements[6] = m12 * m23 - m13 * m22;
        result.elements[7] = m13 * m21 - m11 * m23;
        result.elements[8] = m11 * m22 - m12 * m21;

        var scale = 1.0 / determinant;
        return Matrix3.multiplyByScalar(result, scale, result);
    };

    /**
     * Computes the inverse transpose of a matrix.
     *
     * @param {Matrix3} matrix The matrix to transpose and invert.
     * @param {Matrix3} result The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    static inverseTranspose = function (matrix: Matrix3, result: Matrix3): Matrix3 {
        var scratchTransposeMatrix = new Matrix3();
        return Matrix3.inverse(
            Matrix3.transpose(matrix, scratchTransposeMatrix),
            result
        );
    };

    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Matrix3} [left] The first matrix.
     * @param {Matrix3} [right] The second matrix.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals = function (left: Matrix3, right: Matrix3): boolean {
        return (
            left === right ||
            (defined(left) &&
                defined(right) &&
                left.elements[0] === right.elements[0] &&
                left.elements[1] === right.elements[1] &&
                left.elements[2] === right.elements[2] &&
                left.elements[3] === right.elements[3] &&
                left.elements[4] === right.elements[4] &&
                left.elements[5] === right.elements[5] &&
                left.elements[6] === right.elements[6] &&
                left.elements[7] === right.elements[7] &&
                left.elements[8] === right.elements[8])
        );
    };

    /**
     * An immutable Matrix3 instance initialized to the identity matrix.
     *
     * @type {Matrix3}
     * @constant
     */
    static IDENTITY: Matrix3 = Object.freeze(
        new Matrix3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)
    );

    /**
     * An immutable Matrix3 instance initialized to the zero matrix.
     *
     * @type {Matrix3}
     * @constant
     */
    static ZERO: Matrix3 = Object.freeze(
        new Matrix3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    );

    /**
     * Gets the number of items in the collection.
     * @memberof Matrix3.prototype
     *
     * @type {Number}
     */
    length: number = Matrix3.packedLength;

    /**
     * Duplicates the provided Matrix3 instance.
     *
     * @param {Matrix3} [result] The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter or a new Matrix3 instance if one was not provided.
     */
    clone = (result: Matrix3): Matrix3 => {
        return Matrix3.clone(this, result)!;
    };

    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {Matrix3} [right] The right hand side matrix.
     * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals = (right: Matrix3): boolean => {
        return Matrix3.equals(this, right);
    };
    /**
     * Creates a string representing this Matrix with each row being
     * on a separate line and in the format '(column0, column1, column2)'.
     *
     * @returns {String} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2)'.
     */
    toString = (): string => {
        return (
            "(" +
            this.elements[0] +
            ", " +
            this.elements[3] +
            ", " +
            this.elements[6] +
            ")\n" +
            "(" +
            this.elements[1] +
            ", " +
            this.elements[4] +
            ", " +
            this.elements[7] +
            ")\n" +
            "(" +
            this.elements[2] +
            ", " +
            this.elements[5] +
            ", " +
            this.elements[8] +
            ")"
        );
    };
}