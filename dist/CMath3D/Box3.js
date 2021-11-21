import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { Vector3 } from "./Vector3";
import { DeveloperError } from "../DeveloperError";
export class Box3 {
    constructor(min, max) {
        this.min = new Vector3(+Infinity, +Infinity, +Infinity);
        this.max = new Vector3(-Infinity, -Infinity, -Infinity);
        this.isBox3 = true;
        this.expandByPoint = (point) => {
            this.min = Vector3.min(this.min, point);
            this.max = Vector3.min(this.max, point);
            return this;
        };
        this.clone = (result) => {
            if (!defined(result))
                result = new Box3();
            Box3.clone(this, result);
            return result;
        };
        this.makeEmpty = () => {
            this.min.x = this.min.y = this.min.z = +Infinity;
            this.max.x = this.max.y = this.max.z = -Infinity;
            return this;
        };
        this.isEmpty = () => {
            return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
        };
        this.getCenter = (target) => {
            if (!defined(target))
                target = Vector3.ZERO.clone();
            if (this.isEmpty()) {
                Vector3.ZERO.clone(target);
            }
            else {
                Vector3.add(this.min, this.max, target);
                Vector3.multiplyByScalar(target, 0.5, target);
            }
            return target;
        };
        this.getSize = (target) => {
            if (!defined(target))
                target = Vector3.ZERO.clone();
            if (this.isEmpty()) {
                Vector3.ZERO.clone(target);
            }
            else {
                Vector3.subtract(this.max, this.min, target);
            }
            return target;
        };
        this.expandByVector = (vector) => {
            Vector3.subtract(this.min, vector, this.min);
            Vector3.add(this.max, vector, this.max);
            return this;
        };
        this.multiplyByScalar = (scalar) => {
            var center = this.getCenter();
            var size = this.getSize();
            Vector3.multiplyByScalar(size, scalar, size);
            Box3.fromCenterAndSize(center, size, this);
            return this;
        };
        this.multiplyComponents = (vector) => {
            var center = this.getCenter();
            var size = this.getSize();
            Vector3.multiplyComponents(size, vector, size);
            Box3.fromCenterAndSize(center, size, this);
            return this;
        };
        this.containsPoint = (point) => {
            return point.x < this.min.x || point.x > this.max.x ||
                point.y < this.min.y || point.y > this.max.y ||
                point.z < this.min.z || point.z > this.max.z ? false : true;
        };
        this.containsBox = (box) => {
            return this.min.x <= box.min.x && box.max.x <= this.max.x &&
                this.min.y <= box.min.y && box.max.y <= this.max.y &&
                this.min.z <= box.min.z && box.max.z <= this.max.z;
        };
        this.intersectsBox = (box) => {
            return box.max.x < this.min.x || box.min.x > this.max.x ||
                box.max.y < this.min.y || box.min.y > this.max.y ||
                box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
        };
        this.distanceToPoint = (point) => {
            var _vector = new Vector3();
            Vector3.clone(point, _vector);
            const clampedPoint = _vector.clamp(this.min, this.max);
            var clampVector = new Vector3();
            Vector3.subtract(clampedPoint, point, clampVector);
            return Vector3.magnitude(clampVector);
        };
        this.intersect = (box) => {
            Vector3.max(this.min, box.min, this.min);
            Vector3.min(this.max, box.max, this.max);
            if (this.isEmpty())
                this.makeEmpty();
            return this;
        };
        this.union = (box) => {
            Vector3.min(this.min, box.min, this.min);
            Vector3.max(this.max, box.max, this.max);
            return this;
        };
        this.applyMatrix4 = (matrix) => {
            if (this.isEmpty())
                return this;
            const _points = [
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3(),
                new Vector3()
            ];
            _points[0].fromArray([this.min.x, this.min.y, this.min.z]).applyMatrix4(matrix);
            _points[1].fromArray([this.min.x, this.min.y, this.max.z]).applyMatrix4(matrix);
            _points[2].fromArray([this.min.x, this.max.y, this.min.z]).applyMatrix4(matrix);
            _points[3].fromArray([this.min.x, this.max.y, this.max.z]).applyMatrix4(matrix);
            _points[4].fromArray([this.max.x, this.min.y, this.min.z]).applyMatrix4(matrix);
            _points[5].fromArray([this.max.x, this.min.y, this.max.z]).applyMatrix4(matrix);
            _points[6].fromArray([this.max.x, this.max.y, this.min.z]).applyMatrix4(matrix);
            _points[7].fromArray([this.max.x, this.max.y, this.max.z]).applyMatrix4(matrix);
            return Box3.fromPoints(_points);
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
Box3.fromArray = function (array, result) {
    if (array.length == 0 || array.length % 3 != 0)
        throw new DeveloperError("array's length must be a multiple of 3.");
    let minX = +Infinity;
    let minY = +Infinity;
    let minZ = +Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (let i = 0, l = array.length; i < l; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        if (x < minX)
            minX = x;
        if (y < minY)
            minY = y;
        if (z < minZ)
            minZ = z;
        if (x > maxX)
            maxX = x;
        if (y > maxY)
            maxY = y;
        if (z > maxZ)
            maxZ = z;
    }
    if (!defined(result))
        result = new Box3(new Vector3(minX, minY, minZ), new Vector3(maxX, maxY, maxZ));
    else {
        result.min.x = minX;
        result.min.y = minY;
        result.min.z = minZ;
        result.max.x = maxX;
        result.max.y = maxY;
        result.max.z = maxZ;
    }
    return result;
};
Box3.fromPoints = function (points, result) {
    if (!defined(result))
        result = new Box3();
    for (let i = 0, il = points.length; i < il; i++) {
        result.expandByPoint(points[i]);
    }
    return result;
};
Box3.fromCenterAndSize = function (center, size, result) {
    if (!defined(result))
        result = new Box3();
    const halfSize = new Vector3();
    Vector3.multiplyByScalar(size, 0.5, halfSize);
    Vector3.subtract(center, halfSize, result.min);
    Vector3.add(center, halfSize, result.max);
    return result;
};
Box3.clone = function (value, result) {
    if (!defined(result))
        result = new Box3();
    Vector3.clone(value.min, result.min);
    Vector3.clone(value.max, result.max);
    return result;
};
//# sourceMappingURL=Box3.js.map