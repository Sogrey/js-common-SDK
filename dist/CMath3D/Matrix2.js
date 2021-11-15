import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { Vector2 } from "./Vector2";
export class Matrix2 {
    constructor(column0Row0, column1Row0, column0Row1, column1Row1) {
        this.elements = [0, 0, 0, 0];
        this.clone = (result) => {
            return Matrix2.clone(this, result);
        };
        this.equals = (right) => {
            return Matrix2.equals(this, right);
        };
        this.toString = () => {
            return ("(" +
                this.elements[0] +
                ", " +
                this.elements[2] +
                ")\n" +
                "(" +
                this.elements[1] +
                ", " +
                this.elements[3] +
                ")");
        };
        this.elements[0] = defaultValue(column0Row0, 0.0);
        this.elements[1] = defaultValue(column1Row0, 0.0);
        this.elements[2] = defaultValue(column0Row1, 0.0);
        this.elements[3] = defaultValue(column1Row1, 0.0);
    }
}
Matrix2.packedLength = 4;
Matrix2.toArray = function (value, array, startingIndex) {
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value.elements[0];
    array[startingIndex++] = value.elements[1];
    array[startingIndex++] = value.elements[2];
    array[startingIndex++] = value.elements[3];
    return array;
};
Matrix2.fromArray = function (array, startingIndex, result) {
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
Matrix2.clone = function (matrix, result) {
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
Matrix2.fromScale = function (scale, result) {
    if (!defined(result)) {
        return new Matrix2(scale.x, 0.0, 0.0, scale.y);
    }
    result.elements[0] = scale.x;
    result.elements[1] = 0.0;
    result.elements[2] = 0.0;
    result.elements[3] = scale.y;
    return result;
};
Matrix2.fromUniformScale = function (scale, result) {
    if (!defined(result)) {
        return new Matrix2(scale, 0.0, 0.0, scale);
    }
    result.elements[0] = scale;
    result.elements[1] = 0.0;
    result.elements[2] = 0.0;
    result.elements[3] = scale;
    return result;
};
Matrix2.fromRotation = function (angle, result) {
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
Matrix2.getScale = function (matrix, result) {
    let scratchColumn = new Vector2();
    result.x = Vector2.magnitude(Vector2.fromElements(matrix.elements[0], matrix.elements[1], scratchColumn));
    result.y = Vector2.magnitude(Vector2.fromElements(matrix.elements[2], matrix.elements[3], scratchColumn));
    return result;
};
Matrix2.multiply = function (left, right, result) {
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
Matrix2.add = function (left, right, result) {
    result.elements[0] = left.elements[0] + right.elements[0];
    result.elements[1] = left.elements[1] + right.elements[1];
    result.elements[2] = left.elements[2] + right.elements[2];
    result.elements[3] = left.elements[3] + right.elements[3];
    return result;
};
Matrix2.subtract = function (left, right, result) {
    result.elements[0] = left.elements[0] - right.elements[0];
    result.elements[1] = left.elements[1] - right.elements[1];
    result.elements[2] = left.elements[2] - right.elements[2];
    result.elements[3] = left.elements[3] - right.elements[3];
    return result;
};
Matrix2.multiplyByVector = function (matrix, cartesian, result) {
    var x = matrix.elements[0] * cartesian.x + matrix.elements[2] * cartesian.y;
    var y = matrix.elements[1] * cartesian.x + matrix.elements[3] * cartesian.y;
    result.x = x;
    result.y = y;
    return result;
};
Matrix2.multiplyByScalar = function (matrix, scalar, result) {
    result.elements[0] = matrix.elements[0] * scalar;
    result.elements[1] = matrix.elements[1] * scalar;
    result.elements[2] = matrix.elements[2] * scalar;
    result.elements[3] = matrix.elements[3] * scalar;
    return result;
};
Matrix2.multiplyByScale = function (matrix, scale, result) {
    result.elements[0] = matrix.elements[0] * scale.x;
    result.elements[1] = matrix.elements[1] * scale.x;
    result.elements[2] = matrix.elements[2] * scale.y;
    result.elements[3] = matrix.elements[3] * scale.y;
    return result;
};
Matrix2.negate = function (matrix, result) {
    result.elements[0] = -matrix.elements[0];
    result.elements[1] = -matrix.elements[1];
    result.elements[2] = -matrix.elements[2];
    result.elements[3] = -matrix.elements[3];
    return result;
};
Matrix2.transpose = function (matrix, result) {
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
Matrix2.abs = function (matrix, result) {
    result.elements[0] = Math.abs(matrix.elements[0]);
    result.elements[1] = Math.abs(matrix.elements[1]);
    result.elements[2] = Math.abs(matrix.elements[2]);
    result.elements[3] = Math.abs(matrix.elements[3]);
    return result;
};
Matrix2.equals = function (left, right) {
    return (left === right ||
        (defined(left) &&
            defined(right) &&
            left.elements[0] === right.elements[0] &&
            left.elements[1] === right.elements[1] &&
            left.elements[2] === right.elements[2] &&
            left.elements[3] === right.elements[3]));
};
Matrix2.IDENTITY = Object.freeze(new Matrix2(1.0, 0.0, 0.0, 1.0));
Matrix2.ZERO = Object.freeze(new Matrix2(0.0, 0.0, 0.0, 0.0));
//# sourceMappingURL=Matrix2.js.map