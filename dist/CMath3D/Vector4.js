import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
export class Vector4 {
    constructor(x, y, z, w) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.setLength = (length, result) => {
            if (!defined(result) || !(result instanceof Vector4))
                result = new Vector4();
            Vector4.multiplyByScalar(this.normalize(), length, result);
            return result;
        };
        this.add = (right) => {
            return Vector4.add(this, right, this);
        };
        this.normalize = (result) => {
            if (!defined(result))
                result = new Vector4();
            var magnitude = Vector4.magnitude(this);
            result.x = this.x / magnitude;
            result.y = this.y / magnitude;
            result.z = this.z / magnitude;
            result.w = this.w / magnitude;
            return result;
        };
        this.clone = (result) => {
            return Vector4.clone(this, result);
        };
        this.equals = (right) => {
            return Vector4.equals(this, right);
        };
        this.fromArray = (array, offset = 0) => {
            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];
            this.w = array[offset + 3];
            return this;
        };
        this.toArray = (offset = 0, result) => {
            if (!defined(result) || !Array.isArray(result))
                result = new Array();
            result[offset] = this.x;
            result[offset + 1] = this.y;
            result[offset + 2] = this.z;
            result[offset + 3] = this.w;
            return result;
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
Vector4.fromElements = function (x, y, z, w, result) {
    if (!defined(result)) {
        return new Vector4(x, y, z, w);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
};
Vector4.fromColor = function (color, result) {
    if (!defined(result)) {
        return new Vector4(color.r, color.g, color.b, color.a);
    }
    result.x = color.r;
    result.y = color.g;
    result.z = color.b;
    result.w = color.a;
    return result;
};
Vector4.clone = function (v4, result) {
    if (!defined(v4)) {
        return undefined;
    }
    if (!defined(result)) {
        return new Vector4(v4.x, v4.y, v4.z, v4.w);
    }
    result.x = v4.x;
    result.y = v4.y;
    result.z = v4.z;
    result.w = v4.w;
    return result;
};
Vector4.packedLength = 4;
Vector4.magnitudeSquared = function (v4) {
    return v4.x * v4.x + v4.y * v4.y + v4.z * v4.z + v4.w * v4.w;
};
Vector4.magnitude = function (v4) {
    return Math.sqrt(Vector4.magnitudeSquared(v4));
};
Vector4.distance = function (left, right) {
    var distanceScratch = new Vector4();
    Vector4.subtract(left, right, distanceScratch);
    return Vector4.magnitude(distanceScratch);
};
Vector4.distanceSquared = function (left, right) {
    var distanceScratch = new Vector4();
    Vector4.subtract(left, right, distanceScratch);
    return Vector4.magnitudeSquared(distanceScratch);
};
Vector4.add = function (left, right, result) {
    if (!defined(result))
        result = new Vector4();
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    result.w = left.w + right.w;
    return result;
};
Vector4.subtract = function (left, right, result) {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.y = left.z - right.z;
    result.w = left.w - right.w;
    return result;
};
Vector4.normalize = function (v4, result) {
    var magnitude = Vector4.magnitude(v4);
    result.x = v4.x / magnitude;
    result.y = v4.y / magnitude;
    result.z = v4.z / magnitude;
    result.w = v4.w / magnitude;
    return result;
};
Vector4.dot = function (left, right) {
    return (left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w);
};
Vector4.multiplyComponents = function (left, right, result) {
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    result.w = left.w * right.w;
    return result;
};
Vector4.divideComponents = function (left, right, result) {
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    result.z = left.z / right.z;
    result.w = left.w / right.w;
    return result;
};
Vector4.multiplyByScalar = function (v4, scalar, result) {
    if (!defined(result))
        result = new Vector4();
    result.x = v4.x * scalar;
    result.y = v4.y * scalar;
    result.z = v4.z * scalar;
    result.w = v4.w * scalar;
    return result;
};
Vector4.divideByScalar = function (v4, scalar, result) {
    result.x = v4.x / scalar;
    result.y = v4.y / scalar;
    result.z = v4.z / scalar;
    result.w = v4.w / scalar;
    return result;
};
Vector4.negate = function (v4, result) {
    result.x = -v4.x;
    result.y = -v4.y;
    result.z = -v4.z;
    result.w = -v4.w;
    return result;
};
Vector4.abs = function (v4, result) {
    result.x = Math.abs(v4.x);
    result.y = Math.abs(v4.y);
    result.z = Math.abs(v4.z);
    result.w = Math.abs(v4.w);
    return result;
};
Vector4.lerp = function (start, end, t, result) {
    if (!defined(result))
        result = new Vector4();
    let lerpScratch = new Vector4();
    Vector4.multiplyByScalar(end, t, lerpScratch);
    result = Vector4.multiplyByScalar(start, 1.0 - t, result);
    return Vector4.add(lerpScratch, result, result);
};
Vector4.equals = function (left, right) {
    return (left === right ||
        (defined(left) &&
            defined(right) &&
            left.x === right.x &&
            left.y === right.y &&
            left.z === right.z &&
            left.w === right.w));
};
Vector4.ZERO = Object.freeze(new Vector4(0.0, 0.0, 0.0, 0.0));
Vector4.ONE = Object.freeze(new Vector4(1.0, 1.0, 1.0, 1.0));
Vector4.UNIT_X = Object.freeze(new Vector4(1.0, 0.0, 0.0, 0.0));
Vector4.UNIT_Y = Object.freeze(new Vector4(0.0, 1.0, 0.0, 0.0));
Vector4.UNIT_Z = Object.freeze(new Vector4(0.0, 0.0, 1.0, 0.0));
Vector4.UNIT_W = Object.freeze(new Vector4(0.0, 0.0, 0.0, 1.0));
Vector4.random = function (result) {
    if (!defined(result))
        result = new Vector4();
    result.x = Math.random();
    result.y = Math.random();
    result.z = Math.random();
    result.w = Math.random();
    return result;
};
//# sourceMappingURL=Vector4.js.map