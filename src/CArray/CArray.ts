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
}