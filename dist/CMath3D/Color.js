import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
export class Color {
    constructor(r, g, b, a) {
        this.r = 1;
        this.g = 1;
        this.b = 1;
        this.a = 1;
        this.r = defaultValue(r, 1.0);
        this.g = defaultValue(g, 1.0);
        this.b = defaultValue(b, 1.0);
        this.a = defaultValue(a, 1.0);
    }
}
Color.fromVector4 = function (v4, result) {
    if (!defined(result)) {
        return new Color(v4.x, v4.y, v4.z, v4.w);
    }
    result.r = v4.x;
    result.g = v4.y;
    result.b = v4.z;
    result.a = v4.w;
    return result;
};
//# sourceMappingURL=Color.js.map