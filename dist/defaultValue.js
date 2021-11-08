export function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
        return a;
    }
    return b;
}
defaultValue.EMPTY_OBJECT = Object.freeze({});
//# sourceMappingURL=defaultValue.js.map