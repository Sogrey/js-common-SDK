import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
export class Vector3 {
    constructor(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.setLength = (length, result) => {
            if (!defined(result) || !(result instanceof Vector3))
                result = new Vector3();
            Vector3.multiplyByScalar(this.normalize(), length, result);
            return result;
        };
        this.add = (right) => {
            return Vector3.add(this, right, this);
        };
        this.normalize = (result) => {
            if (!defined(result))
                result = new Vector3();
            var magnitude = Vector3.magnitude(this);
            result.x = this.x / magnitude;
            result.y = this.y / magnitude;
            result.z = this.z / magnitude;
            return result;
        };
        this.clone = (result) => {
            result = defaultValue(result, new Vector3);
            return Vector3.clone(this, result);
        };
        this.equals = (right) => {
            return Vector3.equals(this, right);
        };
        this.fromArray = (array, offset = 0) => {
            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];
            return this;
        };
        this.toArray = (offset = 0, result) => {
            if (!defined(result) || !Array.isArray(result))
                result = new Array();
            result[offset] = this.x;
            result[offset + 1] = this.y;
            result[offset + 2] = this.z;
            return result;
        };
        this.toString = () => {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")";
        };
        this.x = defaultValue(x, 0.0);
        this.y = defaultValue(y, 0.0);
        this.z = defaultValue(z, 0.0);
    }
}
Vector3.fromElements = function (x, y, z, result) {
    if (!defined(result)) {
        return new Vector3(x, y, z);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
};
Vector3.fromQuaternion = function (quaternion, result) {
    if (!defined(result)) {
        return new Vector3(quaternion.x, quaternion.y, quaternion.z);
    }
    result.x = quaternion.x;
    result.y = quaternion.y;
    result.z = quaternion.z;
    return result;
};
Vector3.clone = function (v3, result) {
    if (!defined(v3)) {
        return undefined;
    }
    if (!defined(result)) {
        return new Vector3(v3.x, v3.y, v3.z);
    }
    result.x = v3.x;
    result.y = v3.y;
    result.z = v3.z;
    return result;
};
Vector3.fromVector4 = Vector3.clone;
Vector3.packedLength = 3;
Vector3.magnitudeSquared = function (v3) {
    return v3.x * v3.x + v3.y * v3.y + v3.z * v3.z;
};
Vector3.magnitude = function (v3) {
    return Math.sqrt(Vector3.magnitudeSquared(v3));
};
Vector3.distance = function (left, right) {
    var distanceScratch = new Vector3();
    Vector3.subtract(left, right, distanceScratch);
    return Vector3.magnitude(distanceScratch);
};
Vector3.distanceSquared = function (left, right) {
    var distanceScratch = new Vector3();
    Vector3.subtract(left, right, distanceScratch);
    return Vector3.magnitudeSquared(distanceScratch);
};
Vector3.add = function (left, right, result) {
    if (!defined(result))
        result = new Vector3();
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    return result;
};
Vector3.subtract = function (left, right, result) {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.y = left.z - right.z;
    return result;
};
Vector3.normalize = function (v3, result) {
    var magnitude = Vector3.magnitude(v3);
    result.x = v3.x / magnitude;
    result.y = v3.y / magnitude;
    result.z = v3.z / magnitude;
    return result;
};
Vector3.dot = function (left, right) {
    return left.x * right.x + left.y * right.y + left.z * right.z;
};
Vector3.cross = function (left, right, result) {
    var leftX = left.x;
    var leftY = left.y;
    var leftZ = left.z;
    var rightX = right.x;
    var rightY = right.y;
    var rightZ = right.z;
    var x = leftY * rightZ - leftZ * rightY;
    var y = leftZ * rightX - leftX * rightZ;
    var z = leftX * rightY - leftY * rightX;
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
};
Vector3.midpoint = function (left, right, result) {
    result.x = (left.x + right.x) * 0.5;
    result.y = (left.y + right.y) * 0.5;
    result.z = (left.z + right.z) * 0.5;
    return result;
};
Vector3.multiplyComponents = function (left, right, result) {
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    return result;
};
Vector3.divideComponents = function (left, right, result) {
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    result.z = left.z / right.z;
    return result;
};
Vector3.multiplyByScalar = function (v3, scalar, result) {
    if (!defined(result))
        result = new Vector3();
    result.x = v3.x * scalar;
    result.y = v3.y * scalar;
    result.z = v3.z * scalar;
    return result;
};
Vector3.divideByScalar = function (v3, scalar, result) {
    result.x = v3.x / scalar;
    result.y = v3.y / scalar;
    result.z = v3.z / scalar;
    return result;
};
Vector3.negate = function (v3, result) {
    result.x = -v3.x;
    result.y = -v3.y;
    result.z = -v3.z;
    return result;
};
Vector3.abs = function (v3, result) {
    result.x = Math.abs(v3.x);
    result.y = Math.abs(v3.y);
    result.z = Math.abs(v3.z);
    return result;
};
Vector3.lerp = function (start, end, t, result) {
    if (!defined(result))
        result = new Vector3();
    let lerpScratch = new Vector3();
    Vector3.multiplyByScalar(end, t, lerpScratch);
    result = Vector3.multiplyByScalar(start, 1.0 - t, result);
    return Vector3.add(lerpScratch, result, result);
};
Vector3.angleBetween = function (left, right) {
    let angleBetweenScratch = new Vector3();
    let angleBetweenScratch2 = new Vector3();
    Vector3.normalize(left, angleBetweenScratch);
    Vector3.normalize(right, angleBetweenScratch2);
    var cosine = Vector3.dot(angleBetweenScratch, angleBetweenScratch2);
    var sine = Vector3.magnitude(Vector3.cross(angleBetweenScratch, angleBetweenScratch2, angleBetweenScratch));
    return Math.atan2(sine, cosine);
};
Vector3.equals = function (left, right) {
    return (left === right ||
        (defined(left) &&
            defined(right) &&
            left.x === right.x &&
            left.y === right.y &&
            left.z === right.z));
};
Vector3.ZERO = Object.freeze(new Vector3(0.0, 0.0, 0.0));
Vector3.ONE = Object.freeze(new Vector3(1.0, 1.0, 1.0));
Vector3.UNIT_X = Object.freeze(new Vector3(1.0, 0.0, 0.0));
Vector3.UNIT_Y = Object.freeze(new Vector3(0.0, 1.0, 0.0));
Vector3.UNIT_Z = Object.freeze(new Vector3(0.0, 0.0, 1.0));
Vector3.random = function (result) {
    if (!defined(result))
        result = new Vector3();
    result.x = Math.random();
    result.y = Math.random();
    result.z = Math.random();
    return result;
};
//# sourceMappingURL=Vector3.js.map