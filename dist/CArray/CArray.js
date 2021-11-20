var _a;
import { defaultValue } from "../defaultValue";
export class CArray {
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
//# sourceMappingURL=CArray.js.map