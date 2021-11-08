import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
export class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = defaultValue(x, 0.0);
        this.y = defaultValue(y, 0.0);
    }
}
Vector2.fromElements = function (x, y, result) {
    if (!defined(result)) {
        return new Vector2(x, y);
    }
    result.x = x;
    result.y = y;
    return result;
};
Vector2.clone = function (v2, result) {
    if (!defined(v2)) {
        return undefined;
    }
    if (!defined(result)) {
        return new Vector2(v2.x, v2.y);
    }
    result.x = v2.x;
    result.y = v2.y;
    return result;
};
Vector2.fromVector3 = Vector2.clone;
Vector2.fromVector4 = Vector2.clone;
Vector2.packedLength = 2;
//# sourceMappingURL=Vector2.js.map