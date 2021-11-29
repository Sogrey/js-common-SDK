import { BaseObject } from "./BaseObject";
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
//# sourceMappingURL=CObject.js.map