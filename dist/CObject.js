import { BaseObject } from "./BaseObject";
import { CArray } from "./CArray";
export class CObject extends BaseObject {
    constructor() {
        super(...arguments);
        this.isStatic = CObject.isStatic;
        this.isPrimitive = CObject.isPrimitive;
        this.isObject = CObject.isObject;
        this.isObjectLike = CObject.isObjectLike;
        this.getRawType = CObject.getRawType;
        this.isPlainObject = CObject.isPlainObject;
    }
}
CObject.isStatic = (value) => {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null);
};
CObject.isPrimitive = (value) => {
    return CObject.isStatic(value) || typeof value === 'symbol';
};
CObject.isObject = (value) => {
    let type = typeof value;
    return value != null && (type == 'object' || type == 'function');
};
CObject.isObjectLike = (value) => {
    return value != null && typeof value == 'object';
};
CObject.getRawType = (value) => {
    return Object.prototype.toString.call(value).slice(8, -1);
};
CObject.isPlainObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
CObject.isObjectEqual = (a, b) => {
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
};
CObject.extend = function (to, _form) {
    for (let key in _form) {
        to[key] = _form[key];
    }
    return to;
};
CObject.getPropByPath = (obj, path, strict) => {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    let keyArr = path.split('.');
    let i = 0;
    for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict)
            break;
        let key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        }
        else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!');
            }
            break;
        }
    }
    return {
        obj: tempObj,
        key: keyArr[i],
        value: tempObj ? tempObj[keyArr[i]] : null
    };
};
CObject.keys = (object) => {
    if (object === null || object === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    let result = [];
    if (CArray.isArrayLike(object) || CObject.isPlainObject(object)) {
        for (let key in object) {
            object.hasOwnProperty(key) && (result.push(key));
        }
    }
    return result;
};
CObject.values = (object) => {
    if (object === null || object === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    let result = [];
    if (CArray.isArrayLike(object) || CObject.isPlainObject(object)) {
        for (let key in object) {
            object.hasOwnProperty(key) && (result.push(object[key]));
        }
    }
    return result;
};
CObject.includes = (array, value, start = 0) => {
    let length = array.length;
    if (isNaN(start)) {
        start = 0;
    }
    else if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    let index = array.indexOf(value);
    return index >= start;
};
CObject.isFunction = function (arg) {
    return typeof arg === 'function' || Object.prototype.toString.call(arg) === '[object Function]';
};
//# sourceMappingURL=CObject.js.map