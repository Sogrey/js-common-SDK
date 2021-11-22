import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { CMath } from "./CMath";
import { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";
import { DeveloperError } from "../DeveloperError";
export class Euler {
    constructor(x, y, z, order) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.order = Euler.DefaultOrder;
        this.isEuler = true;
        this.set = (x, y, z, order) => {
            this.x = x;
            this.y = y;
            this.z = z;
            this.order = order;
            return this;
        };
        this.clone = (result) => {
            return Euler.clone(this, result);
        };
        this.equals = (euler) => {
            return Euler.equals(this, euler);
        };
        this.toArray = (array = [], offset = 0) => {
            Euler.toArray(this, array, offset);
        };
        this.toVector3 = (result) => {
            return Euler.toVector3(this, result);
        };
        this.toString = () => {
            return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.order + ")";
        };
        this.x = defaultValue(x, 0);
        this.y = defaultValue(y, 0);
        this.z = defaultValue(z, 0);
        this.order = defaultValue(order, "XYZ");
    }
}
Euler.DefaultOrder = 'XYZ';
Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
Euler.clone = function (value, result) {
    if (!defined(result))
        result = new Euler();
    result.set(value.x, value.y, value.z, value.order);
    return result;
};
Euler.fromRotationMatrix = function (m, order = Euler.DefaultOrder, result) {
    if (!defined(result))
        result = new Euler();
    const te = m.elements;
    const m11 = te[0], m12 = te[4], m13 = te[8];
    const m21 = te[1], m22 = te[5], m23 = te[9];
    const m31 = te[2], m32 = te[6], m33 = te[10];
    switch (order) {
        case 'XYZ':
            result.y = Math.asin(CMath.clamp(m13, -1, 1));
            if (Math.abs(m13) < 0.9999999) {
                result.x = Math.atan2(-m23, m33);
                result.z = Math.atan2(-m12, m11);
            }
            else {
                result.x = Math.atan2(m32, m22);
                result.z = 0;
            }
            break;
        case 'YXZ':
            result.x = Math.asin(-CMath.clamp(m23, -1, 1));
            if (Math.abs(m23) < 0.9999999) {
                result.y = Math.atan2(m13, m33);
                result.z = Math.atan2(m21, m22);
            }
            else {
                result.y = Math.atan2(-m31, m11);
                result.z = 0;
            }
            break;
        case 'ZXY':
            result.x = Math.asin(CMath.clamp(m32, -1, 1));
            if (Math.abs(m32) < 0.9999999) {
                result.y = Math.atan2(-m31, m33);
                result.z = Math.atan2(-m12, m22);
            }
            else {
                result.y = 0;
                result.z = Math.atan2(m21, m11);
            }
            break;
        case 'ZYX':
            result.y = Math.asin(-CMath.clamp(m31, -1, 1));
            if (Math.abs(m31) < 0.9999999) {
                result.x = Math.atan2(m32, m33);
                result.z = Math.atan2(m21, m11);
            }
            else {
                result.x = 0;
                result.z = Math.atan2(-m12, m22);
            }
            break;
        case 'YZX':
            result.z = Math.asin(CMath.clamp(m21, -1, 1));
            if (Math.abs(m21) < 0.9999999) {
                result.x = Math.atan2(-m23, m22);
                result.y = Math.atan2(-m31, m11);
            }
            else {
                result.x = 0;
                result.y = Math.atan2(m13, m33);
            }
            break;
        case 'XZY':
            result.z = Math.asin(-CMath.clamp(m12, -1, 1));
            if (Math.abs(m12) < 0.9999999) {
                result.x = Math.atan2(m32, m22);
                result.y = Math.atan2(m13, m11);
            }
            else {
                result.x = Math.atan2(-m23, m33);
                result.y = 0;
            }
            break;
        default:
            throw new DeveloperError('An unknown order: ' + order);
    }
    result.order = order;
    return result;
};
Euler.fromQuaternion = function (q, order = Euler.DefaultOrder, result) {
    const _matrix = new Matrix4();
    _matrix.makeRotationFromQuaternion(q);
    return Euler.fromRotationMatrix(_matrix, order, result);
};
Euler.fromVector3 = function (v, order = Euler.DefaultOrder, result) {
    if (!defined(result))
        result = new Euler();
    return result.set(v.x, v.y, v.z, order);
};
Euler.equals = function (left, right) {
    return (left.x === right.x) && (left.y === right.y) && (left.z === right.z) && (left.order === right.order);
};
Euler.fromArray = function (array, result) {
    if (!defined(result))
        result = new Euler();
    result.x = Number(array[0]);
    result.y = Number(array[1]);
    result.z = Number(array[2]);
    var order = String(array[3]);
    if (defined(order) && Euler.RotationOrders.includes(order)) {
        result.order = order;
    }
    else {
        throw new DeveloperError('An unknown order: ' + order);
    }
    return result;
};
Euler.toArray = function (value, array = [], offset = 0) {
    array[offset] = value.x;
    array[offset + 1] = value.y;
    array[offset + 2] = value.z;
    array[offset + 3] = value.order;
    return array;
};
Euler.toVector3 = function (euler, result) {
    if (!defined(result))
        result = new Vector3();
    result.fromArray([euler.x, euler.y, euler.z]);
    return result;
};
//# sourceMappingURL=Euler.js.map