import { BaseObject } from "./BaseObject";
import { CObject } from "./CObject";
import { defaultValue } from "./defaultValue";
import { defined } from "./defined";

/**
 * 数组操作
 * 
 * This is the doc comment for CArray
 *
 * @module CArray
 */
export class CArray extends BaseObject {

    /**
     * 检查value是否为有效的类数组长度
     * @param value 
     * @returns 
     */
    static isLength = (value: number) => {
        return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
    }

    /**
     * 检查value是否是类数组
     * <br/>
     * 如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于0，小于或等于Number.MAX_SAFE_INTEGER。这里字符串也被当作类数组。
     * @param value 
     * @returns 
     */
    static isArrayLike = (value: any) => {
        return value != null && CArray.isLength(value.length) && !CObject.isFunction(value);
    }

    /**
     * 数组乱序
     * @param arr 原数组
     * @returns 返回乱序后的数组
     */
    static arrScrambling = (arr: Array<any>) => {
        for (let i = 0; i < arr.length; i++) {
            const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
            [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
        }
        return arr;
    }

    /**
     * 数组扁平化
     * @param arr 原数组
     * @returns 返回扁平化后的数组
     */
    static flatten = (arr: Array<any>) => {
        let result: Array<any> = [];

        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                result = result.concat(this.flatten(arr[i]));
            } else {
                result.push(arr[i]);
            }
        }
        return result;
    }

    /**
     * 数组中获取随机数
     * @param arr 原数组
     * @returns 原数组随机获取一位元素
     */
    static sample = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)];

    /**
     * Fill an array or a portion of an array with a given value.
     *
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill the array with.
     * @param {Number} [start=0] The index to start filling at.
     * @param {Number} [end=array.length-1] The index to end stop at.
     *
     * @returns {Array} The resulting array.
     */
    static arrayFill(array: Array<any>, value: any, start?: number, end?: number): Array<any> {
        if (typeof array.fill === "function") {
            return array.fill(value, start, end);
        }

        var length = array.length >>> 0;
        var relativeStart = defaultValue(start, 0);
        // If negative, find wrap around position
        var k =
            relativeStart < 0
                ? Math.max(length + relativeStart, 0)
                : Math.min(relativeStart, length);
        var relativeEnd = defaultValue(end, length);
        // If negative, find wrap around position
        var last =
            relativeEnd < 0
                ? Math.max(length + relativeEnd, 0)
                : Math.min(relativeEnd, length);

        // Fill array accordingly
        while (k < last) {
            array[k] = value;
            k++;
        }
        return array;
    }

    /**
     * 数组去重
     * <br/>
     * 原理是利用Set中不能出现重复元素的特性
     * @param {Array<any>} arr 源数租
     * @returns 去重后的数组
     */
    static uniqueArray = function (arr: Array<any>): Array<any> {
        if (!Array.isArray(arr)) {
            throw new Error('The first parameter must be an array')
        }
        if (arr.length == 1) {
            return arr
        }
        return [...new Set(arr)]
    }

    /**
     * 数组快排 [left] + min + [right]
     * @param arr 
     * @returns 
     */
    static quickArr = function (arr: Array<number>): Array<number> {
        if (arr.length <= 1) {
            return arr;
        }
        var left = [],
            right = [];
        var pIndex = Math.floor(arr.length / 2);
        var p = arr.splice(pIndex, 1)[0];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] <= p) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        // 递归
        return CArray.quickArr(left).concat([p], CArray.quickArr(right));
    }

    /**
     * 冒泡排序
     * @param arr 
     * @returns 
     */
    static bubbleSort = function (arr: Array<number>): Array<number> {
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }

    /**
     * 判断数组是否为空
     * <br/>
     * 该方法用于判断一个数组是否为空数组，它将返回一个布尔值
     * @example
     * <pre><code>
     * isNotEmpty([1, 2, 3]);  // true
     * </code></pre>
     * @param arr 
     * @returns 
     */
    static isNotEmpty = (arr: any) => Array.isArray(arr) && arr.length > 0;

    /**
     * 合并两个数组
     * <br/>
     * 可以使用下面两个方法来合并两个数组
     * @param a 
     * @param b 
     * @returns 
     */
    static merge = (a: Array<any>, b: Array<any>): Array<any> => [...a, ...b];

    /**
     * 求两个集合的并集
     * @param a 数组a
     * @param b 数组b
     * @returns 
     */
    static union = (a: Array<any>, b: Array<any>) => {
        var newArr = a.concat(b);
        return CArray.uniqueArray(newArr);
    }

    /**
     * 求两个集合的交集
     * @param a 数组a
     * @param b 数组b
     * @returns 
     */
    static intersect = (a: Array<any>, b: Array<any>) => {
        a = CArray.uniqueArray(a);
        function checkAdult(c: any) {
            return c !== null;
        }
        return a.map((o) => {
            return b.includes(o) ? o : null;
        }).filter(checkAdult);
    }

    /**
     * 删除其中一个元素
     * @param arr 
     * @param ele 
     * @returns 
     */
    static remove = (arr: Array<any>, ele: any) => {
        var index = arr.indexOf(ele);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    /**
     * 最大值
     * @param arr 
     * @returns 
     */
    static max = (arr: Array<number>) => {
        return Math.max.apply(null, arr);
    }

    /**
     * 最小值
     * @param arr 
     * @returns 
     */
    static min = (arr: Array<number>) => {
        return Math.min.apply(null, arr);
    }

}
