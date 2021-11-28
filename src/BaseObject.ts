/**
 * 数字操作
 * 
 * This is the doc comment for BaseObject
 *
 * @module BaseObject
 */
export class BaseObject {

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

    isStatic = BaseObject.isStatic;

    /**
     * 检测数据是不是原始数据
     * @param value 
     * @returns 
     */
    static isPrimitive = (value: any) => {
        return BaseObject.isStatic(value) || typeof value === 'symbol'
    }

    isPrimitive = BaseObject.isPrimitive;

    /**
     * 判断数据是不是引用类型的数据（例如：array, function, object, regexe, new Number(), new String())
     * @param value 
     * @returns 
     */
    static isObject = (value: any) => {
        let type = typeof value;
        return value != null && (type == 'object' || type == 'function');
    }

    isObject = BaseObject.isObject;

    /**
     * 检查value是否是类对象。如果一个值是类对象，那么它不应该是null，而且typeof后的结果是“object”。
     * @param value 
     * @returns 
     */
    static isObjectLike = (value: any) => {
        return value != null && typeof value == 'object';
    }

    isObjectLike = BaseObject.isObjectLike;

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

    getRawType = BaseObject.getRawType;

    /**
     * 判断数据是不是Object类型的数据
     * @param obj 
     * @returns 
     */
    static isPlainObject = (obj: any) => {
        return Object.prototype.toString.call(obj) === '[object Object]'
    }

    isPlainObject = BaseObject.isPlainObject;

}