import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { Vector3 } from "./Vector3";
import { DeveloperError } from "../DeveloperError";
export class Matrix3 {
    constructor(column0Row0, column1Row0, column2Row0, column0Row1, column1Row1, column2Row1, column0Row2, column1Row2, column2Row2) {
        this.elements = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];
        this.length = Matrix3.packedLength;
        this.clone = (result) => {
            return Matrix3.clone(this, result);
        };
        this.equals = (right) => {
            return Matrix3.equals(this, right);
        };
        this.toString = () => {
            return ("(" +
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
                ")");
        };
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
}
Matrix3.packedLength = 9;
Matrix3.toArray = function (value, array, startingIndex) {
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
Matrix3.fromArray = function (array, startingIndex, result) {
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
Matrix3.clone = function (matrix, result) {
    if (!defined(matrix)) {
        return undefined;
    }
    if (!defined(result)) {
        return new Matrix3(matrix.elements[0], matrix.elements[3], matrix.elements[6], matrix.elements[1], matrix.elements[4], matrix.elements[7], matrix.elements[2], matrix.elements[5], matrix.elements[8]);
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
Matrix3.fromQuaternion = function (quaternion, result) {
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
Matrix3.fromScale = function (scale, result) {
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
Matrix3.fromUniformScale = function (scale, result) {
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
Matrix3.fromCrossProduct = function (vector, result) {
    if (!defined(result)) {
        return new Matrix3(0.0, -vector.z, vector.y, vector.z, 0.0, -vector.x, -vector.y, vector.x, 0.0);
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
Matrix3.fromRotationX = function (angle, result) {
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    if (!defined(result)) {
        return new Matrix3(1.0, 0.0, 0.0, 0.0, cosAngle, -sinAngle, 0.0, sinAngle, cosAngle);
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
Matrix3.fromRotationY = function (angle, result) {
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    if (!defined(result)) {
        return new Matrix3(cosAngle, 0.0, sinAngle, 0.0, 1.0, 0.0, -sinAngle, 0.0, cosAngle);
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
Matrix3.fromRotationZ = function (angle, result) {
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    if (!defined(result)) {
        return new Matrix3(cosAngle, -sinAngle, 0.0, sinAngle, cosAngle, 0.0, 0.0, 0.0, 1.0);
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
Matrix3.getElementIndex = function (column, row) {
    if (column < 0 || column > 2)
        throw new DeveloperError("column must be 0, 1, or 2.");
    if (row < 0 || row > 2)
        throw new DeveloperError("row must be 0, 1, or 2.");
    return column * 3 + row;
};
Matrix3.getColumn = function (matrix, index, result) {
    if (index < 0 || index > 2)
        throw new DeveloperError("index must be 0, 1, or 2.");
    var startIndex = index * 3;
    var x = matrix.elements[startIndex];
    var y = matrix.elements[startIndex + 1];
    var z = matrix.elements[startIndex + 2];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
};
Matrix3.setColumn = function (matrix, index, vector, result) {
    if (index < 0 || index > 2)
        throw new DeveloperError("index must be 0, 1, or 2.");
    result = Matrix3.clone(matrix, result);
    var startIndex = index * 3;
    result.elements[startIndex] = vector.x;
    result.elements[startIndex + 1] = vector.y;
    result.elements[startIndex + 2] = vector.z;
    return result;
};
Matrix3.getRow = function (matrix, index, result) {
    if (index < 0 || index > 2)
        throw new DeveloperError("index must be 0, 1, or 2.");
    var x = matrix.elements[index];
    var y = matrix.elements[index + 3];
    var z = matrix.elements[index + 6];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
};
Matrix3.setRow = function (matrix, index, vector, result) {
    if (index < 0 || index > 2)
        throw new DeveloperError("index must be 0, 1, or 2.");
    result = Matrix3.clone(matrix, result);
    result.elements[index] = vector.x;
    result.elements[index + 3] = vector.y;
    result.elements[index + 6] = vector.z;
    return result;
};
Matrix3.getScale = function (matrix, result) {
    let scratchColumn = new Vector3();
    result.x = Vector3.magnitude(Vector3.fromElements(matrix.elements[0], matrix.elements[1], matrix.elements[2], scratchColumn));
    result.y = Vector3.magnitude(Vector3.fromElements(matrix.elements[3], matrix.elements[4], matrix.elements[5], scratchColumn));
    result.z = Vector3.magnitude(Vector3.fromElements(matrix.elements[6], matrix.elements[7], matrix.elements[8], scratchColumn));
    return result;
};
Matrix3.multiply = function (left, right, result) {
    var column0Row0 = left.elements[0] * right.elements[0] + left.elements[3] * right.elements[1] + left.elements[6] * right.elements[2];
    var column0Row1 = left.elements[1] * right.elements[0] + left.elements[4] * right.elements[1] + left.elements[7] * right.elements[2];
    var column0Row2 = left.elements[2] * right.elements[0] + left.elements[5] * right.elements[1] + left.elements[8] * right.elements[2];
    var column1Row0 = left.elements[0] * right.elements[3] + left.elements[3] * right.elements[4] + left.elements[6] * right.elements[5];
    var column1Row1 = left.elements[1] * right.elements[3] + left.elements[4] * right.elements[4] + left.elements[7] * right.elements[5];
    var column1Row2 = left.elements[2] * right.elements[3] + left.elements[5] * right.elements[4] + left.elements[8] * right.elements[5];
    var column2Row0 = left.elements[0] * right.elements[6] + left.elements[3] * right.elements[7] + left.elements[6] * right.elements[8];
    var column2Row1 = left.elements[1] * right.elements[6] + left.elements[4] * right.elements[7] + left.elements[7] * right.elements[8];
    var column2Row2 = left.elements[2] * right.elements[6] + left.elements[5] * right.elements[7] + left.elements[8] * right.elements[8];
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
Matrix3.add = function (left, right, result) {
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
Matrix3.subtract = function (left, right, result) {
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
Matrix3.multiplyByVector = function (matrix, vector, result) {
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
Matrix3.multiplyByScalar = function (matrix, scalar, result) {
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
Matrix3.multiplyByScale = function (matrix, scale, result) {
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
Matrix3.negate = function (matrix, result) {
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
Matrix3.transpose = function (matrix, result) {
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
Matrix3.getRotation = function (matrix, result) {
    let scratchScale = new Vector3();
    let inverseScale = Vector3.divideComponents(new Vector3(1, 1, 1), Matrix3.getScale(matrix, scratchScale), scratchScale);
    result = Matrix3.multiplyByScale(matrix, inverseScale, result);
    return result;
};
Matrix3.abs = function (matrix, result) {
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
Matrix3.determinant = function (matrix) {
    var m11 = matrix.elements[0];
    var m21 = matrix.elements[3];
    var m31 = matrix.elements[6];
    var m12 = matrix.elements[1];
    var m22 = matrix.elements[4];
    var m32 = matrix.elements[7];
    var m13 = matrix.elements[2];
    var m23 = matrix.elements[5];
    var m33 = matrix.elements[8];
    return (m11 * (m22 * m33 - m23 * m32) +
        m12 * (m23 * m31 - m21 * m33) +
        m13 * (m21 * m32 - m22 * m31));
};
Matrix3.inverse = function (matrix, result) {
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
Matrix3.inverseTranspose = function (matrix, result) {
    var scratchTransposeMatrix = new Matrix3();
    return Matrix3.inverse(Matrix3.transpose(matrix, scratchTransposeMatrix), result);
};
Matrix3.equals = function (left, right) {
    return (left === right ||
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
            left.elements[8] === right.elements[8]));
};
Matrix3.IDENTITY = Object.freeze(new Matrix3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0));
Matrix3.ZERO = Object.freeze(new Matrix3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0));
//# sourceMappingURL=Matrix3.js.map