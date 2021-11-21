import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { Vector2 } from "./Vector2";
import { DeveloperError } from "../DeveloperError";
export class Box2 {
    constructor(min, max) {
        this.min = new Vector2(+Infinity, +Infinity);
        this.max = new Vector2(-Infinity, -Infinity);
        this.isBox2 = true;
        this.expandByPoint = (point) => {
            this.min = Vector2.min(this.min, point);
            this.max = Vector2.min(this.max, point);
            return this;
        };
        this.clone = (result) => {
            if (!defined(result))
                result = new Box2();
            Box2.clone(this, result);
            return result;
        };
        this.makeEmpty = () => {
            this.min.x = this.min.y = +Infinity;
            this.max.x = this.max.y = -Infinity;
            return this;
        };
        this.isEmpty = () => {
            return (this.max.x < this.min.x) || (this.max.y < this.min.y);
        };
        this.getCenter = (target) => {
            if (!defined(target))
                target = Vector2.ZERO.clone();
            if (this.isEmpty()) {
                Vector2.ZERO.clone(target);
            }
            else {
                Vector2.add(this.min, this.max, target);
                Vector2.multiplyByScalar(target, 0.5, target);
            }
            return target;
        };
        this.getSize = (target) => {
            if (!defined(target))
                target = Vector2.ZERO.clone();
            if (this.isEmpty()) {
                Vector2.ZERO.clone(target);
            }
            else {
                Vector2.subtract(this.max, this.min, target);
            }
            return target;
        };
        this.expandByVector = (vector) => {
            Vector2.subtract(this.min, vector, this.min);
            Vector2.add(this.max, vector, this.max);
            return this;
        };
        this.multiplyByScalar = (scalar) => {
            var center = this.getCenter();
            var size = this.getSize();
            Vector2.multiplyByScalar(size, scalar, size);
            Box2.fromCenterAndSize(center, size, this);
            return this;
        };
        this.multiplyComponents = (vector) => {
            var center = this.getCenter();
            var size = this.getSize();
            Vector2.multiplyComponents(size, vector, size);
            Box2.fromCenterAndSize(center, size, this);
            return this;
        };
        this.containsPoint = (point) => {
            return point.x < this.min.x || point.x > this.max.x ||
                point.y < this.min.y || point.y > this.max.y ? false : true;
        };
        this.containsBox = (box) => {
            return this.min.x <= box.min.x && box.max.x <= this.max.x &&
                this.min.y <= box.min.y && box.max.y <= this.max.y;
        };
        this.intersectsBox = (box) => {
            return box.max.x < this.min.x || box.min.x > this.max.x ||
                box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
        };
        this.distanceToPoint = (point) => {
            var _vector = new Vector2();
            Vector2.clone(point, _vector);
            const clampedPoint = _vector.clamp(this.min, this.max);
            var clampVector = new Vector2();
            Vector2.subtract(clampedPoint, point, clampVector);
            return Vector2.magnitude(clampVector);
        };
        this.intersect = (box) => {
            Vector2.max(this.min, box.min, this.min);
            Vector2.min(this.max, box.max, this.max);
            if (this.isEmpty())
                this.makeEmpty();
            return this;
        };
        this.union = (box) => {
            Vector2.min(this.min, box.min, this.min);
            Vector2.max(this.max, box.max, this.max);
            return this;
        };
        this.translate = (offset) => {
            this.min.add(offset);
            this.max.add(offset);
            return this;
        };
        this.equals = (box) => {
            return box.min.equals(this.min) && box.max.equals(this.max);
        };
        this.min = defaultValue(min, this.min);
        this.max = defaultValue(max, this.max);
    }
    set(min, max) {
        min.clone(this.min);
        max.clone(this.max);
        return this;
    }
}
Box2.fromArray = function (array, result) {
    if (array.length == 0 || array.length % 3 != 0)
        throw new DeveloperError("array's length must be a multiple of 3.");
    let minX = +Infinity;
    let minY = +Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0, l = array.length; i < l; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        if (x < minX)
            minX = x;
        if (y < minY)
            minY = y;
        if (x > maxX)
            maxX = x;
        if (y > maxY)
            maxY = y;
    }
    if (!defined(result))
        result = new Box2(new Vector2(minX, minY), new Vector2(maxX, maxY));
    else {
        result.min.x = minX;
        result.min.y = minY;
        result.max.x = maxX;
        result.max.y = maxY;
    }
    return result;
};
Box2.fromPoints = function (points, result) {
    if (!defined(result))
        result = new Box2();
    for (let i = 0, il = points.length; i < il; i++) {
        result.expandByPoint(points[i]);
    }
    return result;
};
Box2.fromCenterAndSize = function (center, size, result) {
    if (!defined(result))
        result = new Box2();
    const halfSize = new Vector2();
    Vector2.multiplyByScalar(size, 0.5, halfSize);
    Vector2.subtract(center, halfSize, result.min);
    Vector2.add(center, halfSize, result.max);
    return result;
};
Box2.clone = function (value, result) {
    if (!defined(result))
        result = new Box2();
    Vector2.clone(value.min, result.min);
    Vector2.clone(value.max, result.max);
    return result;
};
//# sourceMappingURL=Box2.js.map