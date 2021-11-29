var _a;
import { BaseObject } from "./BaseObject";
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
_a = CArray;
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
            result = result.concat(_a.flatten(arr[i]));
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
//# sourceMappingURL=CArray.js.map