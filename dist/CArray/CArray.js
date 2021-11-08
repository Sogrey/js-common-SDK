var _a;
export class CArray {
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