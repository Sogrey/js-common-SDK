/**
 * Box3
 * 
 * This is the doc comment for Box3
 * 
 * 表示三维空间中的一个轴对齐包围盒
 *  
 * @module Box3
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { Vector3 } from "./Vector3"
import { DeveloperError } from "../DeveloperError";
import { Matrix4 } from "./Matrix4";

export class Box3 {
    /**表示该盒子的下边界(x, y, z)。默认值为( +Infinity, +Infinity, +Infinity )。 */
    min: Vector3 = new Vector3(+Infinity, +Infinity, +Infinity);
    /**表示该盒子的上边界(x, y, z)。默认值为( -Infinity, -Infinity, -Infinity )。 */
    max: Vector3 = new Vector3(-Infinity, -Infinity, -Infinity);
    /**
     *
     * @param {Number} [min=new Vector3(+Infinity, +Infinity, +Infinity)]  表示该盒子的下边界(x, y)。默认值为( + Infinity, + Infinity )。
     * @param {Number} [max=new Vector3(-Infinity, -Infinity, -Infinity)] 表示该盒子的上边界(x, y)。默认值为( - Infinity, - Infinity )。
     * 
     * 
     * @see <a href="./Box2.html">Box2</a>
     */
    constructor(min?: Vector3, max?: Vector3) {

        this.min = defaultValue(min, this.min);
        this.max = defaultValue(max, this.max);

    }

    isBox3 = true;

    /**
     * 设置三维空间包围盒下边界和上边界
     * @param {Vector3} min 表示该盒子的下边界(x, y, z)
     * @param {Vector3} max 表示该盒子的上边界(x, y, z)
     * @returns 
     */
    set(min: Vector3, max: Vector3) {
        min.clone(this.min);
        max.clone(this.max);

        return this;
    }

    /**
     * 
     * @param {Array<number>} array 
     * @param {Box3} result 
     * @returns 
     */
    static fromArray = function (array: Array<number>, result?: Box3) {

        if (array.length == 0 || array.length % 3 != 0)
            throw new DeveloperError("array's length must be a multiple of 3.");

        let minX = + Infinity;
        let minY = + Infinity;
        let minZ = + Infinity;

        let maxX = - Infinity;
        let maxY = - Infinity;
        let maxZ = - Infinity;

        for (let i = 0, l = array.length; i < l; i += 3) {

            const x = array[i];
            const y = array[i + 1];
            const z = array[i + 2];

            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (z < minZ) minZ = z;

            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            if (z > maxZ) maxZ = z;

        }

        if (!defined(result)) result = new Box3(
            new Vector3(minX, minY, minZ),
            new Vector3(maxX, maxY, maxZ),
        );
        else {
            result!.min.x = minX;
            result!.min.y = minY;
            result!.min.z = minZ;

            result!.max.x = maxX;
            result!.max.y = maxY;
            result!.max.z = maxZ;
        }

        return result;
    }

    /**
     * 根据提供的一组点，求出其最小包围盒
     * @param {Array<Vector3>} points 提供的点集合
     * @param {Box3} result 结果最小包围盒
     * @returns {Box3} 结果最小包围盒
     */
    static fromPoints = function (points: Array<Vector3>, result?: Box3) {

        if (!defined(result)) result = new Box3();

        for (let i = 0, il = points.length; i < il; i++) {
            result!.expandByPoint(points[i]);
        }

        return result;
    }

    /**
     * 扩展盒子（box）以包含提供的点（point）
     * @param {Vector3} point 提供需要被包含在内的点
     * @returns 返回扩展后的盒子（Box3）
     */
    expandByPoint = (point: Vector3) => {

        this.min = Vector3.min(this.min, point);
        this.max = Vector3.min(this.max, point);

        return this;
    }

    /**
     * 根据提供盒子中心点及盒子尺寸，求包围盒Box3
     * @param {Vector3} center 盒子中心点
     * @param {Vector3} size 盒子尺寸
     * @param {Box3} result 结果包围盒Box3
     * @returns 结果包围盒Box3
     */
    static fromCenterAndSize = function (center: Vector3, size: Vector3, result?: Box3) {
        if (!defined(result)) result = new Box3();

        const halfSize = new Vector3();
        Vector3.multiplyByScalar(size, 0.5, halfSize);

        Vector3.subtract(center, halfSize, result!.min);
        Vector3.add(center, halfSize, result!.max);

        return result;
    }

    /**
     * Box3数据克隆
     * @param value 克隆源数据
     * @param result 克隆结果数据
     * @returns 克隆结果数据
     */
    static clone = function (value: Box3, result?: Box3): Box3 {
        if (!defined(result)) result = new Box3();

        Vector3.clone(value.min, result!.min);
        Vector3.clone(value.max, result!.max);

        return result!;
    }

    /**
     * 将当前盒子数据（Box3）克隆
     * @param result 克隆结果数据
     * @returns 克隆结果数据
     */
    clone = (result?: Box3): Box3 => {
        if (!defined(result)) result = new Box3();

        Box3.clone(this, result!);

        return result!;
    }

    /**
     * 置空
     * @returns 
     */
    makeEmpty = () => {
        this.min.x = this.min.y = this.min.z = + Infinity;
        this.max.x = this.max.y = this.max.z = - Infinity;

        return this;
    }

    /**
     * 是否为空或无效
     * @returns 
     */
    isEmpty = () => {
        // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

        return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
    }

    /**
     * 获取盒子中心点坐标
     * @param target 目标结果盒子中心点坐标
     * @returns 目标结果盒子中心点坐标
     */
    getCenter = (target?: Vector3) => {
        if (!defined(target)) target = Vector3.ZERO.clone();

        if (this.isEmpty()) {
            Vector3.ZERO.clone(target);
        } else {
            Vector3.add(this.min, this.max, target);
            Vector3.multiplyByScalar(target!, 0.5, target);
        }
        return target;
    }

    /**
     * 获取盒子尺寸
     * @param target 盒子尺寸
     * @returns 盒子尺寸
     */
    getSize = (target?: Vector3) => {
        if (!defined(target)) target = Vector3.ZERO.clone();

        if (this.isEmpty()) {
            Vector3.ZERO.clone(target);
        } else {
            Vector3.subtract(this.max, this.min, target!);
        }
        return target;
    }

    /**
     * 扩展盒子尺寸
     * @param vector 要增加的尺寸
     * @returns 修改盒子尺寸后的Box3
     */
    expandByVector = (vector: Vector3) => {

        Vector3.subtract(this.min, vector, this.min);
        Vector3.add(this.max, vector, this.max);

        return this;
    }

    /**
     * 按比例缩放盒子,各个维度缩放比一样
     * @param scalar 比例
     * @returns 
     */
    multiplyByScalar = (scalar: number) => {

        var center = this.getCenter();
        var size = this.getSize();

        Vector3.multiplyByScalar(size!, scalar, size);

        Box3.fromCenterAndSize(center!, size!, this)

        return this;
    }

    /**
     * 按比例缩放盒子,各个维度不同缩放比
     * @param vector 比例
     * @returns 
     */
    multiplyComponents = (vector: Vector3) => {

        var center = this.getCenter();
        var size = this.getSize();

        Vector3.multiplyComponents(size!, vector, size!);

        Box3.fromCenterAndSize(center!, size!, this)

        return this;
    }

    /**
     * 判断指定点是否包含在盒子内
     * @param point 指定点
     * @returns 
     */
    containsPoint = (point: Vector3) => {
        return point.x < this.min.x || point.x > this.max.x ||
            point.y < this.min.y || point.y > this.max.y ||
            point.z < this.min.z || point.z > this.max.z ? false : true;
    }

    /**
     * 判断指定盒子是否包含在盒子内
     * @param point 指定盒子
     * @returns 
     */
    containsBox = (box: Box3) => {
        return this.min.x <= box.min.x && box.max.x <= this.max.x &&
            this.min.y <= box.min.y && box.max.y <= this.max.y &&
            this.min.z <= box.min.z && box.max.z <= this.max.z;
    }

    /**
     * 判断与指定盒子是否相交
     * @param box 指定盒子
     * @returns 
     */
    intersectsBox = (box: Box3) => {
        // using 6 splitting planes to rule out intersections.
        return box.max.x < this.min.x || box.min.x > this.max.x ||
            box.max.y < this.min.y || box.min.y > this.max.y ||
            box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
    }

    /**
     * 计算盒子到点级的距离
     * @param point 
     * @returns 
     */
    distanceToPoint = (point: Vector3) => {

        var _vector = new Vector3();
        Vector3.clone(point, _vector);

        const clampedPoint = _vector.clamp(this.min, this.max);

        var clampVector = new Vector3();
        Vector3.subtract(clampedPoint, point, clampVector);

        return Vector3.magnitude(clampVector);
    }

    intersect = (box: Box3) => {

        Vector3.max(this.min, box.min, this.min);
        Vector3.min(this.max, box.max, this.max);

        // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
        if (this.isEmpty()) this.makeEmpty();

        return this;
    }

    union = (box: Box3) => {

        Vector3.min(this.min, box.min, this.min);
        Vector3.max(this.max, box.max, this.max);

        return this;
    }

    /**
     * 应用矩阵变换
     * @param matrix 
     * @returns 
     */
    applyMatrix4 = (matrix: Matrix4) => {
        // transform of empty box is an empty box.
        if (this.isEmpty()) return this;

        const _points = [
            /*@__PURE__*/ new Vector3(),
            /*@__PURE__*/ new Vector3(),
            /*@__PURE__*/ new Vector3(),
            /*@__PURE__*/ new Vector3(),
            /*@__PURE__*/ new Vector3(),
            /*@__PURE__*/ new Vector3(),
            /*@__PURE__*/ new Vector3(),
            /*@__PURE__*/ new Vector3()
        ];

        // NOTE: I am using a binary pattern to specify all 2^3 combinations below
        _points[0].fromArray([this.min.x, this.min.y, this.min.z]).applyMatrix4(matrix); // 000
        _points[1].fromArray([this.min.x, this.min.y, this.max.z]).applyMatrix4(matrix); // 001
        _points[2].fromArray([this.min.x, this.max.y, this.min.z]).applyMatrix4(matrix); // 010
        _points[3].fromArray([this.min.x, this.max.y, this.max.z]).applyMatrix4(matrix); // 011
        _points[4].fromArray([this.max.x, this.min.y, this.min.z]).applyMatrix4(matrix); // 100
        _points[5].fromArray([this.max.x, this.min.y, this.max.z]).applyMatrix4(matrix); // 101
        _points[6].fromArray([this.max.x, this.max.y, this.min.z]).applyMatrix4(matrix); // 110
        _points[7].fromArray([this.max.x, this.max.y, this.max.z]).applyMatrix4(matrix); // 111

        return Box3.fromPoints(_points);
    }

    /**
     * 应用平移变换
     * @param offset 
     * @returns 
     */
    translate = (offset: Vector3) => {
        this.min.add(offset);
        this.max.add(offset);

        return this;
    }

    /**
     * 判断与指定盒子是否相等
     * @param box 
     * @returns 
     */
    equals = (box: Box3) => {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }

}