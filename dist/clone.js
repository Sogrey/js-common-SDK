import { defaultValue } from "./defaultValue.js";
export function clone(object, deep) {
    if (object === null || typeof object !== "object") {
        return object;
    }
    deep = defaultValue(deep, false);
    var result = new object.constructor();
    for (var propertyName in object) {
        if (object.hasOwnProperty(propertyName)) {
            var value = object[propertyName];
            if (deep) {
                value = clone(value, deep);
            }
            result[propertyName] = value;
        }
    }
    return result;
}
//# sourceMappingURL=clone.js.map