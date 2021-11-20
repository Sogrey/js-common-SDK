import { defaultValue } from "../defaultValue";
import { defined } from "../defined";

/**
 * 数组操作
 * 
 * This is the doc comment for CArray
 *
 * @module CArray
 */
export class CArray {

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
}