import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { CMath } from "./CMath";
export class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.setLength = (length, result) => {
            if (!defined(result) || !(result instanceof Vector2))
                result = new Vector2();
            Vector2.multiplyByScalar(this.normalize(), length, result);
            return result;
        };
        this.add = (right) => {
            return Vector2.add(this, right, this);
        };
        this.applyMatrix3 = (m) => {
            const x = this.x, y = this.y;
            const e = m.elements;
            this.x = e[0] * x + e[3] * y + e[6];
            this.y = e[1] * x + e[4] * y + e[7];
            return this;
        };
        this.clamp = (min, max) => {
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            return this;
        };
        this.clampScalar = (minVal, maxVal) => {
            this.x = Math.max(minVal, Math.min(maxVal, this.x));
            this.y = Math.max(minVal, Math.min(maxVal, this.y));
            return this;
        };
        this.clampLength = (min, max) => {
            const length = Vector2.magnitude(this);
            var v = new Vector2();
            Vector2.divideByScalar(this, length || 1, v);
            Vector2.multiplyByScalar(v, Math.max(min, Math.min(max, length)), v);
            return v;
        };
        this.floor = () => {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
        };
        this.ceil = () => {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
        };
        this.round = () => {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this;
        };
        this.normalize = (result) => {
            if (!defined(result))
                result = new Vector2();
            var magnitude = Vector2.magnitude(this);
            result.x = this.x / magnitude;
            result.y = this.y / magnitude;
            return result;
        };
        this.clone = (result) => {
            if (!defined(result))
                result = new Vector2();
            return Vector2.clone(this, result);
        };
        this.equals = (right) => {
            return Vector2.equals(this, right);
        };
        this.fromArray = (array, offset = 0) => {
            this.x = array[offset];
            this.y = array[offset + 1];
            return this;
        };
        this.toArray = (offset = 0, result) => {
            if (!defined(result) || !Array.isArray(result))
                result = new Array();
            result[offset] = this.x;
            result[offset + 1] = this.y;
            return result;
        };
        this.toString = () => {
            return "(" + this.x + ", " + this.y + ")";
        };
        this.x = defaultValue(x, 0.0);
        this.y = defaultValue(y, 0.0);
    }
}
Vector2.fromElements = function (x, y, result) {
    if (!defined(result)) {
        return new Vector2(x, y);
    }
    result.x = x;
    result.y = y;
    return result;
};
Vector2.clone = function (v2, result) {
    if (!defined(v2)) {
        return undefined;
    }
    if (!defined(result)) {
        return new Vector2(v2.x, v2.y);
    }
    result.x = v2.x;
    result.y = v2.y;
    return result;
};
Vector2.fromVector2 = Vector2.clone;
Vector2.fromVector4 = Vector2.clone;
Vector2.packedLength = 2;
Vector2.magnitudeSquared = function (v2) {
    return v2.x * v2.x + v2.y * v2.y;
};
Vector2.magnitude = function (v2) {
    return Math.sqrt(Vector2.magnitudeSquared(v2));
};
Vector2.distance = function (left, right) {
    var distanceScratch = new Vector2();
    Vector2.subtract(left, right, distanceScratch);
    return Vector2.magnitude(distanceScratch);
};
Vector2.distanceSquared = function (left, right) {
    var distanceScratch = new Vector2();
    Vector2.subtract(left, right, distanceScratch);
    return Vector2.magnitudeSquared(distanceScratch);
};
Vector2.add = function (left, right, result) {
    if (!defined(result))
        result = new Vector2();
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    return result;
};
Vector2.subtract = function (left, right, result) {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    return result;
};
Vector2.min = function (left, right, result) {
    if (!defined(result))
        result = new Vector2();
    result.x = Math.min(left.x, right.x);
    result.y = Math.min(left.y, right.y);
    return result;
};
Vector2.minFromArray = function (array, result) {
    if (!defined(result))
        result = new Vector2();
    if (array.length > 0)
        for (let index = 0; index < array.length; index++) {
            const v = array[index];
            result = Vector2.min(v, result);
        }
    return result;
};
Vector2.max = function (left, right, result) {
    if (!defined(result))
        result = new Vector2();
    result.x = Math.max(left.x, right.x);
    result.y = Math.max(left.y, right.y);
    return result;
};
Vector2.maxFromArray = function (array, result) {
    if (!defined(result))
        result = new Vector2();
    if (array.length > 0)
        for (let index = 0; index < array.length; index++) {
            const v = array[index];
            result = Vector2.max(v, result);
        }
    return result;
};
Vector2.normalize = function (v2, result) {
    var magnitude = Vector2.magnitude(v2);
    result.x = v2.x / magnitude;
    result.y = v2.y / magnitude;
    return result;
};
Vector2.dot = function (left, right) {
    return left.x * right.x + left.y * right.y;
};
Vector2.cross = function (left, right) {
    return left.x * right.y - left.y * right.x;
};
Vector2.midpoint = function (left, right, result) {
    result.x = (left.x + right.x) * 0.5;
    result.y = (left.y + right.y) * 0.5;
    return result;
};
Vector2.multiplyComponents = function (left, right, result) {
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    return result;
};
Vector2.divideComponents = function (left, right, result) {
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    return result;
};
Vector2.multiplyByScalar = function (v2, scalar, result) {
    if (!defined(result))
        result = new Vector2();
    result.x = v2.x * scalar;
    result.y = v2.y * scalar;
    return result;
};
Vector2.divideByScalar = function (v2, scalar, result) {
    result.x = v2.x / scalar;
    result.y = v2.y / scalar;
    return result;
};
Vector2.negate = function (v2, result) {
    result.x = -v2.x;
    result.y = -v2.y;
    return result;
};
Vector2.abs = function (v2, result) {
    result.x = Math.abs(v2.x);
    result.y = Math.abs(v2.y);
    return result;
};
Vector2.lerp = function (start, end, t, result) {
    if (!defined(result))
        result = new Vector2();
    let lerpScratch = new Vector2();
    Vector2.multiplyByScalar(end, t, lerpScratch);
    result = Vector2.multiplyByScalar(start, 1.0 - t, result);
    return Vector2.add(lerpScratch, result, result);
};
Vector2.angleBetween = function (left, right) {
    let angleBetweenScratch = new Vector2();
    let angleBetweenScratch2 = new Vector2();
    Vector2.normalize(left, angleBetweenScratch);
    Vector2.normalize(right, angleBetweenScratch2);
    return CMath.acosClamped(Vector2.dot(angleBetweenScratch, angleBetweenScratch2));
};
Vector2.equals = function (left, right) {
    return (left === right ||
        (defined(left) &&
            defined(right) &&
            left.x === right.x &&
            left.y === right.y));
};
Vector2.ZERO = Object.freeze(new Vector2(0.0, 0.0));
Vector2.ONE = Object.freeze(new Vector2(1.0, 1.0));
Vector2.UNIT_X = Object.freeze(new Vector2(1.0, 0.0));
Vector2.UNIT_Y = Object.freeze(new Vector2(0.0, 1.0));
Vector2.random = function (result) {
    if (!defined(result))
        result = new Vector2();
    result.x = Math.random();
    result.y = Math.random();
    return result;
};
//# sourceMappingURL=Vector2.js.map