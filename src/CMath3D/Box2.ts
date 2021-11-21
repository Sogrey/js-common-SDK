/**
 * Box2
 * 
 * This is the doc comment for Box2
 * 
 * 表示二维空间中的一个轴对齐包围盒
 *  
 * @module Box2
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { Vector2 } from "./Vector2"
import { DeveloperError } from "../DeveloperError";

export class Box2 {
    /**表示该盒子的下边界(x, y)。默认值为( +Infinity, +Infinity )。 */
    min: Vector2 = new Vector2(+Infinity, +Infinity);
    /**表示该盒子的上边界(x, y)。默认值为( -Infinity, -Infinity )。 */
    max: Vector2 = new Vector2(-Infinity, -Infinity);
    /**
     *
     * @param {Number} [min=new Vector2(+Infinity, +Infinity)]  表示该盒子的下边界(x, y)。默认值为( + Infinity, + Infinity )。
     * @param {Number} [max=new Vector2(-Infinity, -Infinity)] 表示该盒子的上边界(x, y)。默认值为( - Infinity, - Infinity )。
     * 
     * 
     * @see <a href="./Box2.html">Box2</a>
     */
    constructor(min?: Vector2, max?: Vector2) {

        this.min = defaultValue(min, this.min);
        this.max = defaultValue(max, this.max);

    }

    isBox2 = true;

    /**
         * 设置三维空间包围盒下边界和上边界
         * @param {Vector2} min 表示该盒子的下边界(x, y, z)
         * @param {Vector2} max 表示该盒子的上边界(x, y, z)
         * @returns 
         */
    set(min: Vector2, max: Vector2) {
        min.clone(this.min);
        max.clone(this.max);

        return this;
    }

    /**
     * 
     * @param {Array<number>} array 
     * @param {Box2} result 
     * @returns 
     */
    static fromArray = function (array: Array<number>, result?: Box2) {

        if (array.length == 0 || array.length % 3 != 0)
            throw new DeveloperError("array's length must be a multiple of 3.");

        let minX = + Infinity;
        let minY = + Infinity;

        let maxX = - Infinity;
        let maxY = - Infinity;

        for (let i = 0, l = array.length; i < l; i += 3) {

            const x = array[i];
            const y = array[i + 1];

            if (x < minX) minX = x;
            if (y < minY) minY = y;

            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;

        }

        if (!defined(result)) result = new Box2(
            new Vector2(minX, minY),
            new Vector2(maxX, maxY),
        );
        else {
            result!.min.x = minX;
            result!.min.y = minY;

            result!.max.x = maxX;
            result!.max.y = maxY;
        }

        return result;
    }

    /**
     * 根据提供的一组点，求出其最小包围盒
     * @param {Array<Vector2>} points 提供的点集合
     * @param {Box2} result 结果最小包围盒
     * @returns {Box2} 结果最小包围盒
     */
    static fromPoints = function (points: Array<Vector2>, result?: Box2) {

        if (!defined(result)) result = new Box2();

        for (let i = 0, il = points.length; i < il; i++) {
            result!.expandByPoint(points[i]);
        }

        return result!;
    }

    /**
     * 扩展盒子（box）以包含提供的点（point）
     * @param {Vector2} point 提供需要被包含在内的点
     * @returns 返回扩展后的盒子（Box3）
     */
    expandByPoint = (point: Vector2) => {

        this.min = Vector2.min(this.min, point);
        this.max = Vector2.min(this.max, point);

        return this;
    }

    /**
     * 根据提供盒子中心点及盒子尺寸，求包围盒Box3
     * @param {Vector2} center 盒子中心点
     * @param {Vector2} size 盒子尺寸
     * @param {Box2} result 结果包围盒Box3
     * @returns 结果包围盒Box3
     */
    static fromCenterAndSize = function (center: Vector2, size: Vector2, result?: Box2) {
        if (!defined(result)) result = new Box2();

        const halfSize = new Vector2();
        Vector2.multiplyByScalar(size, 0.5, halfSize);

        Vector2.subtract(center, halfSize, result!.min);
        Vector2.add(center, halfSize, result!.max);

        return result!;
    }

    /**
     * Box3数据克隆
     * @param value 克隆源数据
     * @param result 克隆结果数据
     * @returns 克隆结果数据
     */
    static clone = function (value: Box2, result?: Box2): Box2 {
        if (!defined(result)) result = new Box2();

        Vector2.clone(value.min, result!.min);
        Vector2.clone(value.max, result!.max);

        return result!;
    }

    /**
     * 将当前盒子数据（Box3）克隆
     * @param result 克隆结果数据
     * @returns 克隆结果数据
     */
    clone = (result?: Box2): Box2 => {
        if (!defined(result)) result = new Box2();

        Box2.clone(this, result!);

        return result!;
    }

    /**
     * 置空
     * @returns 
     */
    makeEmpty = () => {
        this.min.x = this.min.y = + Infinity;
        this.max.x = this.max.y = - Infinity;

        return this;
    }

    /**
     * 是否为空或无效
     * @returns 
     */
    isEmpty = () => {
        // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

        return (this.max.x < this.min.x) || (this.max.y < this.min.y);
    }

    /**
     * 获取盒子中心点坐标
     * @param target 目标结果盒子中心点坐标
     * @returns 目标结果盒子中心点坐标
     */
    getCenter = (target?: Vector2) => {
        if (!defined(target)) target = Vector2.ZERO.clone();

        if (this.isEmpty()) {
            Vector2.ZERO.clone(target);
        } else {
            Vector2.add(this.min, this.max, target);
            Vector2.multiplyByScalar(target!, 0.5, target);
        }
        return target;
    }

    /**
     * 获取盒子尺寸
     * @param target 盒子尺寸
     * @returns 盒子尺寸
     */
    getSize = (target?: Vector2) => {
        if (!defined(target)) target = Vector2.ZERO.clone();

        if (this.isEmpty()) {
            Vector2.ZERO.clone(target);
        } else {
            Vector2.subtract(this.max, this.min, target!);
        }
        return target;
    }

    /**
     * 扩展盒子尺寸
     * @param vector 要增加的尺寸
     * @returns 修改盒子尺寸后的Box3
     */
    expandByVector = (vector: Vector2) => {

        Vector2.subtract(this.min, vector, this.min);
        Vector2.add(this.max, vector, this.max);

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

        Vector2.multiplyByScalar(size!, scalar, size);

        Box2.fromCenterAndSize(center!, size!, this)

        return this;
    }

    /**
     * 按比例缩放盒子,各个维度不同缩放比
     * @param vector 比例
     * @returns 
     */
    multiplyComponents = (vector: Vector2) => {

        var center = this.getCenter();
        var size = this.getSize();

        Vector2.multiplyComponents(size!, vector, size!);

        Box2.fromCenterAndSize(center!, size!, this)

        return this;
    }

    /**
     * 判断指定点是否包含在盒子内
     * @param point 指定点
     * @returns 
     */
    containsPoint = (point: Vector2) => {
        return point.x < this.min.x || point.x > this.max.x ||
            point.y < this.min.y || point.y > this.max.y ? false : true;
    }

    /**
     * 判断指定盒子是否包含在盒子内
     * @param point 指定盒子
     * @returns 
     */
    containsBox = (box: Box2) => {
        return this.min.x <= box.min.x && box.max.x <= this.max.x &&
            this.min.y <= box.min.y && box.max.y <= this.max.y;
    }

    /**
     * 判断与指定盒子是否相交
     * @param box 指定盒子
     * @returns 
     */
    intersectsBox = (box: Box2) => {
        // using 6 splitting planes to rule out intersections.
        return box.max.x < this.min.x || box.min.x > this.max.x ||
            box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
    }

    /**
     * 计算盒子到点级的距离
     * @param point 
     * @returns 
     */
    distanceToPoint = (point: Vector2) => {

        var _vector = new Vector2();
        Vector2.clone(point, _vector);

        const clampedPoint = _vector.clamp(this.min, this.max);

        var clampVector = new Vector2();
        Vector2.subtract(clampedPoint, point, clampVector);

        return Vector2.magnitude(clampVector);
    }

    intersect = (box: Box2) => {

        Vector2.max(this.min, box.min, this.min);
        Vector2.min(this.max, box.max, this.max);

        // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
        if (this.isEmpty()) this.makeEmpty();

        return this;
    }

    union = (box: Box2) => {

        Vector2.min(this.min, box.min, this.min);
        Vector2.max(this.max, box.max, this.max);

        return this;
    }

    /**
     * 应用平移变换
     * @param offset 
     * @returns 
     */
    translate = (offset: Vector2) => {
        this.min.add(offset);
        this.max.add(offset);

        return this;
    }

    /**
     * 判断与指定盒子是否相等
     * @param box 
     * @returns 
     */
    equals = (box: Box2) => {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }

}