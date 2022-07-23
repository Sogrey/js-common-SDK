import { BaseObject } from "./BaseObject";
import { CObject } from "./CObject";
import { defaultValue } from "./defaultValue";
export class CArray extends BaseObject {
    static arrayFill(array, value, start, end) {
        if (typeof array.fill === "function") {
            return array.fill(value, start, end);
        }
        var length = array.length >>> 0;
        var relativeStart = defaultValue(start, 0);
        var k = relativeStart < 0
            ? Math.max(length + relativeStart, 0)
            : Math.min(relativeStart, length);
        var relativeEnd = defaultValue(end, length);
        var last = relativeEnd < 0
            ? Math.max(length + relativeEnd, 0)
            : Math.min(relativeEnd, length);
        while (k < last) {
            array[k] = value;
            k++;
        }
        return array;
    }
}
CArray.isLength = (value) => {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
};
CArray.isArrayLike = (value) => {
    return value != null && CArray.isLength(value.length) && !CObject.isFunction(value);
};
CArray.arrScrambling = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
};
CArray.flatten = (arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(CArray.flatten(arr[i]));
        }
        else {
            result.push(arr[i]);
        }
    }
    return result;
};
CArray.sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
CArray.uniqueArray = function (arr) {
    if (!Array.isArray(arr)) {
        throw new Error('The first parameter must be an array');
    }
    if (arr.length == 1) {
        return arr;
    }
    return [...new Set(arr)];
};
CArray.quickArr = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var left = [], right = [];
    var pIndex = Math.floor(arr.length / 2);
    var p = arr.splice(pIndex, 1)[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= p) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    return CArray.quickArr(left).concat([p], CArray.quickArr(right));
};
CArray.bubbleSort = function (arr) {
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
};
CArray.isNotEmpty = (arr) => Array.isArray(arr) && arr.length > 0;
CArray.merge = (a, b) => [...a, ...b];
CArray.union = (a, b) => {
    var newArr = a.concat(b);
    return CArray.uniqueArray(newArr);
};
CArray.intersect = (a, b) => {
    a = CArray.uniqueArray(a);
    function checkAdult(c) {
        return c !== null;
    }
    return a.map((o) => {
        return b.includes(o) ? o : null;
    }).filter(checkAdult);
};
CArray.remove = (arr, ele) => {
    var index = arr.indexOf(ele);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};
CArray.max = (arr) => {
    return Math.max.apply(null, arr);
};
CArray.min = (arr) => {
    return Math.min.apply(null, arr);
};
//# sourceMappingURL=CArray.js.map