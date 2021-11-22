import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { Quaternion } from "./Quaternion";
import { Matrix3 } from "./Matrix3";
import { Vector3 } from "./Vector3";
import { DeveloperError } from "../DeveloperError";
export class Matrix4 {
    constructor(column0Row0, column1Row0, column2Row0, column3Row0, column0Row1, column1Row1, column2Row1, column3Row1, column0Row2, column1Row2, column2Row2, column3Row2, column0Row3, column1Row3, column2Row3, column3Row3) {
        this.elements = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
        this.makeRotationFromEuler = (euler) => {
            return Matrix4.makeRotationFromEuler(euler, this);
        };
        this.makeRotationFromQuaternion = (q) => {
            return Matrix4.makeRotationFromQuaternion(q, this);
        };
        this.compose = (position, quaternion, scale) => {
            return Matrix4.compose(position, quaternion, scale, this);
        };
        this.determinant = () => {
            const te = this.elements;
            const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
            const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
            const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
            const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
            return (n41 * (+n14 * n23 * n32
                - n13 * n24 * n32
                - n14 * n22 * n33
                + n12 * n24 * n33
                + n13 * n22 * n34
                - n12 * n23 * n34) +
                n42 * (+n11 * n23 * n34
                    - n11 * n24 * n33
                    + n14 * n21 * n33
                    - n13 * n21 * n34
                    + n13 * n24 * n31
                    - n14 * n23 * n31) +
                n43 * (+n11 * n24 * n32
                    - n11 * n22 * n34
                    - n14 * n21 * n32
                    + n12 * n21 * n34
                    + n14 * n22 * n31
                    - n12 * n24 * n31) +
                n44 * (-n13 * n22 * n31
                    - n11 * n23 * n32
                    + n11 * n22 * n33
                    + n13 * n21 * n32
                    - n12 * n21 * n33
                    + n12 * n23 * n31));
        };
        this.length = Matrix3.packedLength;
        this.clone = (result) => {
            return Matrix4.clone(this, result);
        };
        this.equals = (right) => {
            return Matrix4.equals(this, right);
        };
        this.toString = () => {
            return ("(" +
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
                ")");
        };
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
}
Matrix4.packedLength = 16;
Matrix4.toArray = function (value, array, startingIndex) {
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
Matrix4.fromArray = function (array, startingIndex, result) {
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
Matrix4.clone = function (matrix, result) {
    if (!defined(matrix)) {
        return undefined;
    }
    if (!defined(result)) {
        return new Matrix4(matrix.elements[0], matrix.elements[4], matrix.elements[8], matrix.elements[12], matrix.elements[1], matrix.elements[5], matrix.elements[9], matrix.elements[13], matrix.elements[2], matrix.elements[6], matrix.elements[10], matrix.elements[14], matrix.elements[3], matrix.elements[7], matrix.elements[11], matrix.elements[15]);
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
Matrix4.fromRotationTranslation = function (rotation, translation, result) {
    translation = defaultValue(translation, Vector3.ZERO);
    if (!defined(result)) {
        return new Matrix4(rotation.elements[0], rotation.elements[3], rotation.elements[6], translation.x, rotation.elements[1], rotation.elements[4], rotation.elements[7], translation.y, rotation.elements[2], rotation.elements[5], rotation.elements[8], translation.z, 0.0, 0.0, 0.0, 1.0);
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
Matrix4.fromTranslationQuaternionRotationScale = function (translation, rotation, scale, result) {
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
Matrix4.fromTranslationRotationScale = function (translationRotationScale, result) {
    return Matrix4.fromTranslationQuaternionRotationScale(translationRotationScale.translation, translationRotationScale.rotation, translationRotationScale.scale, result);
};
Matrix4.fromTranslation = function (translation, result) {
    return Matrix4.fromRotationTranslation(Matrix3.IDENTITY, translation, result);
};
Matrix4.fromScale = function (scale, result) {
    if (!defined(result)) {
        return new Matrix4(scale.x, 0.0, 0.0, 0.0, 0.0, scale.y, 0.0, 0.0, 0.0, 0.0, scale.z, 0.0, 0.0, 0.0, 0.0, 1.0);
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
Matrix4.fromUniformScale = function (scale, result) {
    if (!defined(result)) {
        return new Matrix4(scale, 0.0, 0.0, 0.0, 0.0, scale, 0.0, 0.0, 0.0, 0.0, scale, 0.0, 0.0, 0.0, 0.0, 1.0);
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
Matrix4.getElementIndex = function (column, row) {
    if (column < 0 || column > 3)
        throw new DeveloperError("column must be 0, 1, 2 or 3.");
    if (row < 0 || row > 3)
        throw new DeveloperError("row must be 0, 1, 2 or 3.");
    return column * 4 + row;
};
Matrix4.getColumn = function (matrix, index, result) {
    if (index < 0 || index > 3)
        throw new DeveloperError("index must be 0, 1, 2 or 3.");
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
Matrix4.setColumn = function (matrix, index, vector, result) {
    if (index < 0 || index > 3)
        throw new DeveloperError("index must be 0, 1, 2 or 3.");
    result = Matrix4.clone(matrix, result);
    var startIndex = index * 4;
    result.elements[startIndex] = vector.x;
    result.elements[startIndex + 1] = vector.y;
    result.elements[startIndex + 2] = vector.z;
    result.elements[startIndex + 3] = vector.w;
    return result;
};
Matrix4.setTranslation = function (matrix, translation, result) {
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
Matrix4.setScale = function (matrix, scale, result) {
    var scaleScratch = new Vector3();
    var existingScale = Matrix4.getScale(matrix, scaleScratch);
    var newScale = Vector3.divideComponents(scale, existingScale, scaleScratch);
    return Matrix4.multiplyByScale(matrix, newScale, result);
};
Matrix4.getRow = function (matrix, index, result) {
    if (index < 0 || index > 3)
        throw new DeveloperError("index must be 0, 1, 2 or 3.");
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
Matrix4.setRow = function (matrix, index, vector, result) {
    if (index < 0 || index > 3)
        throw new DeveloperError("index must be 0, 1, 2 or 3.");
    result = Matrix4.clone(matrix, result);
    result.elements[index] = vector.x;
    result.elements[index + 4] = vector.y;
    result.elements[index + 8] = vector.z;
    result.elements[index + 12] = vector.w;
    return result;
};
Matrix4.getScale = function (matrix, result) {
    var scratchColumn = new Vector3();
    result.x = Vector3.magnitude(Vector3.fromElements(matrix.elements[0], matrix.elements[1], matrix.elements[2], scratchColumn));
    result.y = Vector3.magnitude(Vector3.fromElements(matrix.elements[4], matrix.elements[5], matrix.elements[6], scratchColumn));
    result.z = Vector3.magnitude(Vector3.fromElements(matrix.elements[8], matrix.elements[9], matrix.elements[10], scratchColumn));
    return result;
};
Matrix4.multiply = function (left, right, result) {
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
    var column0Row0 = left0 * right0 + left4 * right1 + left8 * right2 + left12 * right3;
    var column0Row1 = left1 * right0 + left5 * right1 + left9 * right2 + left13 * right3;
    var column0Row2 = left2 * right0 + left6 * right1 + left10 * right2 + left14 * right3;
    var column0Row3 = left3 * right0 + left7 * right1 + left11 * right2 + left15 * right3;
    var column1Row0 = left0 * right4 + left4 * right5 + left8 * right6 + left12 * right7;
    var column1Row1 = left1 * right4 + left5 * right5 + left9 * right6 + left13 * right7;
    var column1Row2 = left2 * right4 + left6 * right5 + left10 * right6 + left14 * right7;
    var column1Row3 = left3 * right4 + left7 * right5 + left11 * right6 + left15 * right7;
    var column2Row0 = left0 * right8 + left4 * right9 + left8 * right10 + left12 * right11;
    var column2Row1 = left1 * right8 + left5 * right9 + left9 * right10 + left13 * right11;
    var column2Row2 = left2 * right8 + left6 * right9 + left10 * right10 + left14 * right11;
    var column2Row3 = left3 * right8 + left7 * right9 + left11 * right10 + left15 * right11;
    var column3Row0 = left0 * right12 + left4 * right13 + left8 * right14 + left12 * right15;
    var column3Row1 = left1 * right12 + left5 * right13 + left9 * right14 + left13 * right15;
    var column3Row2 = left2 * right12 + left6 * right13 + left10 * right14 + left14 * right15;
    var column3Row3 = left3 * right12 + left7 * right13 + left11 * right14 + left15 * right15;
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
Matrix4.add = function (left, right, result) {
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
Matrix4.subtract = function (left, right, result) {
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
Matrix4.multiplyTransformation = function (left, right, result) {
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
    var column3Row0 = left0 * right12 + left4 * right13 + left8 * right14 + left12;
    var column3Row1 = left1 * right12 + left5 * right13 + left9 * right14 + left13;
    var column3Row2 = left2 * right12 + left6 * right13 + left10 * right14 + left14;
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
Matrix4.multiplyByMatrix3 = function (matrix, rotation, result) {
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
Matrix4.multiplyByTranslation = function (matrix, translation, result) {
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
Matrix4.multiplyByUniformScale = function (matrix, scale, result) {
    var uniformScaleScratch = new Vector3();
    uniformScaleScratch.x = scale;
    uniformScaleScratch.y = scale;
    uniformScaleScratch.z = scale;
    return Matrix4.multiplyByScale(matrix, uniformScaleScratch, result);
};
Matrix4.multiplyByScale = function (matrix, scale, result) {
    var scaleX = scale.x;
    var scaleY = scale.y;
    var scaleZ = scale.z;
    if (scaleX === 1.0 && scaleY === 1.0 && scaleZ === 1.0) {
        return Matrix4.clone(matrix, result);
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
Matrix4.multiplyByVector = function (matrix, vector, result) {
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
Matrix4.multiplyByPointAsVector = function (matrix, vector, result) {
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
Matrix4.multiplyByPoint = function (matrix, vector, result) {
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
Matrix4.multiplyByScalar = function (matrix, scalar, result) {
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
Matrix4.makeRotationFromEuler = function (euler, result) {
    if (!defined(result))
        result = new Matrix4();
    const te = result.elements;
    const x = euler.x, y = euler.y, z = euler.z;
    const a = Math.cos(x), b = Math.sin(x);
    const c = Math.cos(y), d = Math.sin(y);
    const e = Math.cos(z), f = Math.sin(z);
    if (euler.order === 'XYZ') {
        const ae = a * e, af = a * f, be = b * e, bf = b * f;
        te[0] = c * e;
        te[4] = -c * f;
        te[8] = d;
        te[1] = af + be * d;
        te[5] = ae - bf * d;
        te[9] = -b * c;
        te[2] = bf - ae * d;
        te[6] = be + af * d;
        te[10] = a * c;
    }
    else if (euler.order === 'YXZ') {
        const ce = c * e, cf = c * f, de = d * e, df = d * f;
        te[0] = ce + df * b;
        te[4] = de * b - cf;
        te[8] = a * d;
        te[1] = a * f;
        te[5] = a * e;
        te[9] = -b;
        te[2] = cf * b - de;
        te[6] = df + ce * b;
        te[10] = a * c;
    }
    else if (euler.order === 'ZXY') {
        const ce = c * e, cf = c * f, de = d * e, df = d * f;
        te[0] = ce - df * b;
        te[4] = -a * f;
        te[8] = de + cf * b;
        te[1] = cf + de * b;
        te[5] = a * e;
        te[9] = df - ce * b;
        te[2] = -a * d;
        te[6] = b;
        te[10] = a * c;
    }
    else if (euler.order === 'ZYX') {
        const ae = a * e, af = a * f, be = b * e, bf = b * f;
        te[0] = c * e;
        te[4] = be * d - af;
        te[8] = ae * d + bf;
        te[1] = c * f;
        te[5] = bf * d + ae;
        te[9] = af * d - be;
        te[2] = -d;
        te[6] = b * c;
        te[10] = a * c;
    }
    else if (euler.order === 'YZX') {
        const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
        te[0] = c * e;
        te[4] = bd - ac * f;
        te[8] = bc * f + ad;
        te[1] = f;
        te[5] = a * e;
        te[9] = -b * e;
        te[2] = -d * e;
        te[6] = ad * f + bc;
        te[10] = ac - bd * f;
    }
    else if (euler.order === 'XZY') {
        const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
        te[0] = c * e;
        te[4] = -f;
        te[8] = d * e;
        te[1] = ac * f + bd;
        te[5] = a * e;
        te[9] = ad * f - bc;
        te[2] = bc * f - ad;
        te[6] = b * e;
        te[10] = bd * f + ac;
    }
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return result;
};
Matrix4.makeRotationFromQuaternion = function (q, result) {
    return Matrix4.compose(Vector3.ONE, q, Vector3.ZERO, result);
};
Matrix4.compose = (position, quaternion, scale, result) => {
    if (!defined(result))
        result = new Matrix4();
    const te = result.elements;
    const x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    const sx = scale.x, sy = scale.y, sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return result;
};
Matrix4.decompose = (value, position, quaternion, scale) => {
    const te = value.elements;
    var _v1 = new Vector3();
    let sx = _v1.fromArray([te[0], te[1], te[2]]).length();
    const sy = _v1.fromArray([te[4], te[5], te[6]]).length();
    const sz = _v1.fromArray([te[8], te[9], te[10]]).length();
    const det = value.determinant();
    if (det < 0)
        sx = -sx;
    position.x = te[12];
    position.y = te[13];
    position.z = te[14];
    var _m1 = new Matrix4();
    Matrix4.clone(value, _m1);
    const invSX = 1 / sx;
    const invSY = 1 / sy;
    const invSZ = 1 / sz;
    _m1.elements[0] *= invSX;
    _m1.elements[1] *= invSX;
    _m1.elements[2] *= invSX;
    _m1.elements[4] *= invSY;
    _m1.elements[5] *= invSY;
    _m1.elements[6] *= invSY;
    _m1.elements[8] *= invSZ;
    _m1.elements[9] *= invSZ;
    _m1.elements[10] *= invSZ;
    var _m3 = new Matrix3();
    Matrix4.getMatrix3(_m1, _m3);
    Quaternion.fromRotationMatrix(_m3, quaternion);
    scale.x = sx;
    scale.y = sy;
    scale.z = sz;
    return value;
};
Matrix4.negate = function (matrix, result) {
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
Matrix4.transpose = function (matrix, result) {
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
Matrix4.abs = function (matrix, result) {
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
Matrix4.equals = function (left, right) {
    return (left === right ||
        (defined(left) &&
            defined(right) &&
            left.elements[12] === right.elements[12] &&
            left.elements[13] === right.elements[13] &&
            left.elements[14] === right.elements[14] &&
            left.elements[0] === right.elements[0] &&
            left.elements[1] === right.elements[1] &&
            left.elements[2] === right.elements[2] &&
            left.elements[4] === right.elements[4] &&
            left.elements[5] === right.elements[5] &&
            left.elements[6] === right.elements[6] &&
            left.elements[8] === right.elements[8] &&
            left.elements[9] === right.elements[9] &&
            left.elements[10] === right.elements[10] &&
            left.elements[3] === right.elements[3] &&
            left.elements[7] === right.elements[7] &&
            left.elements[11] === right.elements[11] &&
            left.elements[15] === right.elements[15]));
};
Matrix4.getTranslation = function (matrix, result) {
    result.x = matrix.elements[12];
    result.y = matrix.elements[13];
    result.z = matrix.elements[14];
    return result;
};
Matrix4.getMatrix3 = function (matrix, result) {
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
Matrix4.IDENTITY = Object.freeze(new Matrix4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0));
Matrix4.ZERO = Object.freeze(new Matrix4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0));
Matrix4.equalsArray = function (matrix, array, offset) {
    return (matrix.elements[0] === array[offset] &&
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
        matrix.elements[15] === array[offset + 15]);
};
//# sourceMappingURL=Matrix4.js.map