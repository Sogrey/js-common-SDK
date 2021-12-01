import { BaseObject } from "./BaseObject";
import { CArray } from "./CArray";

/**
 * Object
 * 
 * This is the doc comment for CObject
 *
 * @module CObject
 */
export class CObject extends BaseObject {

    /**
     * 检测数据是不是除了symbol外的原始数据。
     * @param value 
     * @returns 
     */
    static isStatic = (value: any) => {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'undefined' ||
            value === null
        )
    }

    isStatic = CObject.isStatic;

    /**
     * 检测数据是不是原始数据
     * @param value 
     * @returns 
     */
    static isPrimitive = (value: any) => {
        return CObject.isStatic(value) || typeof value === 'symbol'
    }

    isPrimitive = CObject.isPrimitive;

    /**
     * 判断数据是不是引用类型的数据（例如：array, function, object, regexe, new Number(), new String())
     * @param value 
     * @returns 
     */
    static isObject = (value: any) => {
        let type = typeof value;
        return value != null && (type == 'object' || type == 'function');
    }

    isObject = CObject.isObject;

    /**
     * 检查value是否是类对象。如果一个值是类对象，那么它不应该是null，而且typeof后的结果是“object”。
     * @param value 
     * @returns 
     */
    static isObjectLike = (value: any) => {
        return value != null && typeof value == 'object';
    }

    isObjectLike = CObject.isObjectLike;

    /**
     * 获取数据类型，返回结果为Number、String、Object、Array等 
     * @example
     * <pre><code>
     * getoRawType([]) ⇒ Array
     * </code></pre>
     * @param value 
     * @returns 
     */
    static getRawType = (value: any) => {
        return Object.prototype.toString.call(value).slice(8, -1)
    }

    getRawType = CObject.getRawType;

    /**
     * 判断数据是不是Object类型的数据
     * @param obj 
     * @returns 
     */
    static isPlainObject = (obj: any) => {
        return Object.prototype.toString.call(obj) === '[object Object]'
    }

    isPlainObject = CObject.isPlainObject;

    /**
     * 判断两个对象是否键值相同
     * @param a 
     * @param b 
     * @returns 
     */
    static isObjectEqual = (a: any, b: any) => {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        if (aProps.length !== bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 将属性混合到目标对象中，会更新目标对象
     * @param to 目标对象
     * @param _form 将要添加到目标对象上的属性
     * @returns 返回属性混合后的目标对象
     */
    static extend = function (to: any, _form: any) {
        for (let key in _form) {
            to[key] = _form[key];
        }
        return to
    }

    // /**
    //  * 克隆数据，可深度克隆
    //  * <br/>
    //  * 包括原始类型，时间、正则、错误、数组、对象的克隆规则，其他的可自行补充
    //  * @param value 
    //  * @param deep 
    //  * @returns 
    //  */
    // static deepClone = (value: any, deep: boolean) => {
    //     if (CObject.isPrimitive(value)) {
    //         return value
    //     }
    //     if (CArray.isArrayLike(value)) {  //是类数组
    //         value = Array.prototype.slice.call(value)
    //         return value.map((item: any) => deep ? CObject.deepClone(item, deep) : item)
    //     } else if (CObject.isPlainObject(value)) {  //是对象
    //         let target = {}, key;
    //         for (key in value) {
    //             if (value.hasOwnProperty(key)) {
    //                 target[key] = deep ? CObject.deepClone(value[key], value[key]) : {}
    //             }
    //         }
    //     }
    //     let type = CObject.getRawType(value);
    //     switch (type) {
    //         case 'Date':
    //         case 'RegExp':
    //         case 'Error': value = new window[type](value); break;
    //     }
    //     return value
    // }

    /**
     * 根据字符串路径获取对象属性：
     * @example
     * <pre><code>
     * obj[0].count
     * </code></pre>
     * @param obj 目标对象
     * @param path 该对象属性字符串,比如： ‘object.prop’
     * @param strict 是否开启严格模式
     * @returns 
     */
    static getPropByPath = (obj: any, path: string, strict: boolean) => {
        let tempObj = obj;
        path = path.replace(/\[(\w+)\]/g, '.$1'); //将[0]转化为.0
        path = path.replace(/^\./, ''); //去除开头的.

        let keyArr = path.split('.'); //根据.切割
        let i = 0;
        for (let len = keyArr.length; i < len - 1; ++i) {
            if (!tempObj && !strict) break;
            let key = keyArr[i];
            if (key in tempObj) {
                tempObj = tempObj[key];
            } else {
                if (strict) {//开启严格模式，没找到对应key值，抛出错误
                    throw new Error('please transfer a valid prop path to form item!');
                }
                break;
            }
        }
        return {
            /**原始数据 */
            obj: tempObj,
            /**key值 */
            key: keyArr[i],
            /**key值对应的值 */
            value: tempObj ? tempObj[keyArr[i]] : null
        };
    };

    /**
     * 获取给定对象的自身可枚举属性组成的数组
     * @param object 
     * @returns 返回一个由一个给定对象的自身可枚举属性组成的数组
     */
    static keys = (object: any) => {
        if (object === null || object === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        let result = [];
        if (CArray.isArrayLike(object) || CObject.isPlainObject(object)) {
            for (let key in object) {
                object.hasOwnProperty(key) && (result.push(key))
            }
        }
        return result;
    }

    /**
     * 获取给定对象自身的所有可枚举属性值的数组
     * @param object 
     * @returns 返回一个给定对象自身的所有可枚举属性值的数组
     */
    static values = (object: any) => {
        if (object === null || object === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        let result = [];
        if (CArray.isArrayLike(object) || CObject.isPlainObject(object)) {
            for (let key in object) {
                object.hasOwnProperty(key) && (result.push(object[key]))
            }
        }
        return result;
    }

    /**
     * 用来判断一个数组是否包含一个指定的值，如果是返回true，否则返回false，可指定开始查询的位置
     * @param array 原数组
     * @param value 判断包含指定的值
     * @param start 开始查询的位置
     * @returns 如果包含返回true，否则返回false
     */
    static includes = (array: Array<any>, value: any, start: number = 0) => {
        let length = array.length;
        if (isNaN(start)) {
            start = 0
        } else if (start < 0) {
            start = -start > length ? 0 : (length + start);
        }
        let index = array.indexOf(value);
        return index >= start;
    }

    /**
     * 判断是否是一个函数
     * @param arg 
     * @returns 
     */
    static isFunction = function (arg: any) {
        return typeof arg === 'function' || Object.prototype.toString.call(arg) === '[object Function]';
    }
}