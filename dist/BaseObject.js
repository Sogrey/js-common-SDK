export class BaseObject {
    constructor() {
        this.isStatic = BaseObject.isStatic;
        this.isPrimitive = BaseObject.isPrimitive;
        this.isObject = BaseObject.isObject;
        this.isObjectLike = BaseObject.isObjectLike;
        this.getRawType = BaseObject.getRawType;
        this.isPlainObject = BaseObject.isPlainObject;
    }
}
BaseObject.isStatic = (value) => {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null);
};
BaseObject.isPrimitive = (value) => {
    return BaseObject.isStatic(value) || typeof value === 'symbol';
};
BaseObject.isObject = (value) => {
    let type = typeof value;
    return value != null && (type == 'object' || type == 'function');
};
BaseObject.isObjectLike = (value) => {
    return value != null && typeof value == 'object';
};
BaseObject.getRawType = (value) => {
    return Object.prototype.toString.call(value).slice(8, -1);
};
BaseObject.isPlainObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
//# sourceMappingURL=BaseObject.js.map