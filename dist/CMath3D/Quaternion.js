var _a;
import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { CMath } from "./CMath";
import { Vector3 } from "./Vector3";
import { Matrix3 } from "./Matrix3";
export class Quaternion {
    constructor(x, y, z, w) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.clone = (result) => {
            result = defaultValue(result, new Quaternion());
            return Quaternion.clone(this, result);
        };
        this.equals = (right) => {
            return Quaternion.equals(this, right);
        };
        this.toString = () => {
            return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
        };
        this.x = defaultValue(x, 0.0);
        this.y = defaultValue(y, 0.0);
        this.z = defaultValue(z, 0.0);
        this.w = defaultValue(w, 0.0);
    }
}
_a = Quaternion;
Quaternion.packedLength = 4;
Quaternion.toArray = function (value, array, startingIndex) {
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value.x;
    array[startingIndex++] = value.y;
    array[startingIndex++] = value.z;
    array[startingIndex] = value.w;
    return array;
};
Quaternion.fromArray = function (array, startingIndex, result) {
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
Quaternion.conjugate = function (quaternion, result) {
    result.x = -quaternion.x;
    result.y = -quaternion.y;
    result.z = -quaternion.z;
    result.w = quaternion.w;
    return result;
};
Quaternion.magnitudeSquared = function (quaternion) {
    return (quaternion.x * quaternion.x +
        quaternion.y * quaternion.y +
        quaternion.z * quaternion.z +
        quaternion.w * quaternion.w);
};
Quaternion.magnitude = function (quaternion) {
    return Math.sqrt(Quaternion.magnitudeSquared(quaternion));
};
Quaternion.normalize = function (quaternion, result) {
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
Quaternion.inverse = function (quaternion, result) {
    var magnitudeSquared = Quaternion.magnitudeSquared(quaternion);
    result = Quaternion.conjugate(quaternion, result);
    return Quaternion.multiplyByScalar(result, 1.0 / magnitudeSquared, result);
};
Quaternion.add = function (left, right, result) {
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    result.w = left.w + right.w;
    return result;
};
Quaternion.subtract = function (left, right, result) {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.z = left.z - right.z;
    result.w = left.w - right.w;
    return result;
};
Quaternion.negate = function (quaternion, result) {
    result.x = -quaternion.x;
    result.y = -quaternion.y;
    result.z = -quaternion.z;
    result.w = -quaternion.w;
    return result;
};
Quaternion.dot = function (left, right) {
    return (left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w);
};
Quaternion.multiply = function (left, right, result) {
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
Quaternion.multiplyByScalar = function (quaternion, scalar, result) {
    result.x = quaternion.x * scalar;
    result.y = quaternion.y * scalar;
    result.z = quaternion.z * scalar;
    result.w = quaternion.w * scalar;
    return result;
};
Quaternion.divideByScalar = function (quaternion, scalar, result) {
    result.x = quaternion.x / scalar;
    result.y = quaternion.y / scalar;
    result.z = quaternion.z / scalar;
    result.w = quaternion.w / scalar;
    return result;
};
Quaternion.lerp = function (start, end, t, result) {
    var lerpScratch = new Quaternion();
    lerpScratch = Quaternion.multiplyByScalar(end, t, lerpScratch);
    result = Quaternion.multiplyByScalar(start, 1.0 - t, result);
    return Quaternion.add(lerpScratch, result, result);
};
Quaternion.slerp = function (start, end, t, result) {
    var slerpEndNegated = new Quaternion();
    var slerpScaledP = new Quaternion();
    var slerpScaledR = new Quaternion();
    var dot = Quaternion.dot(start, end);
    var r = end;
    if (dot < 0.0) {
        dot = -dot;
        r = slerpEndNegated = Quaternion.negate(end, slerpEndNegated);
    }
    if (1.0 - dot < 0.000001) {
        return Quaternion.lerp(start, r, t, result);
    }
    var theta = Math.acos(dot);
    slerpScaledP = Quaternion.multiplyByScalar(start, Math.sin((1 - t) * theta), slerpScaledP);
    slerpScaledR = Quaternion.multiplyByScalar(r, Math.sin(t * theta), slerpScaledR);
    result = Quaternion.add(slerpScaledP, slerpScaledR, result);
    return Quaternion.multiplyByScalar(result, 1.0 / Math.sin(theta), result);
};
Quaternion.log = function (quaternion, result) {
    var theta = CMath.acosClamped(quaternion.w);
    var thetaOverSinTheta = 0.0;
    if (theta !== 0.0) {
        thetaOverSinTheta = theta / Math.sin(theta);
    }
    var v3 = new Vector3();
    Vector3.fromQuaternion(quaternion, v3);
    return Vector3.multiplyByScalar(v3, thetaOverSinTheta, result);
};
Quaternion.exp = function (vector, result) {
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
Quaternion.computeInnerQuadrangle = function (q0, q1, q2, result) {
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
Quaternion.squad = function (q0, q1, s0, s1, t, result) {
    var squadScratchQuaternion0 = new Quaternion();
    var squadScratchQuaternion1 = new Quaternion();
    var slerp0 = Quaternion.slerp(q0, q1, t, squadScratchQuaternion0);
    var slerp1 = Quaternion.slerp(s0, s1, t, squadScratchQuaternion1);
    return Quaternion.slerp(slerp0, slerp1, 2.0 * t * (1.0 - t), result);
};
Quaternion.clone = function (quaternion, result) {
    if (!defined(quaternion)) {
        return undefined;
    }
    if (!defined(result)) {
        return new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
    result.x = quaternion.x;
    result.y = quaternion.y;
    result.z = quaternion.z;
    result.w = quaternion.w;
    return result;
};
Quaternion.fromQuaternion = _a.clone;
Quaternion.equals = function (left, right) {
    return (left === right ||
        (defined(left) &&
            defined(right) &&
            left.x === right.x &&
            left.y === right.y &&
            left.z === right.z &&
            left.w === right.w));
};
Quaternion.fromAxisAngle = function (axis, angle, result) {
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
Quaternion.fromRotationMatrix = function (matrix, result) {
    var fromRotationMatrixNext = [1, 2, 0];
    var fromRotationMatrixQuat = new Array(3);
    var root;
    var x;
    var y;
    var z;
    var w;
    var m00 = matrix.elements[0];
    var m11 = matrix.elements[4];
    var m22 = matrix.elements[8];
    var trace = m00 + m11 + m22;
    if (trace > 0.0) {
        root = Math.sqrt(trace + 1.0);
        w = 0.5 * root;
        root = 0.5 / root;
        x = (matrix.elements[5] - matrix.elements[7]) * root;
        y = (matrix.elements[6] - matrix.elements[2]) * root;
        z = (matrix.elements[1] - matrix.elements[3]) * root;
    }
    else {
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
        root = Math.sqrt(matrix.elements[Matrix3.getElementIndex(i, i)] -
            matrix.elements[Matrix3.getElementIndex(j, j)] -
            matrix.elements[Matrix3.getElementIndex(k, k)] +
            1.0);
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
Quaternion.ZERO = Object.freeze(new Quaternion(0.0, 0.0, 0.0, 0.0));
Quaternion.IDENTITY = Object.freeze(new Quaternion(0.0, 0.0, 0.0, 1.0));
//# sourceMappingURL=Quaternion.js.map