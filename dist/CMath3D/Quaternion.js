import { defaultValue } from "../defaultValue";
export class Quaternion {
    constructor(x, y, z, w) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.x = defaultValue(x, 0.0);
        this.y = defaultValue(y, 0.0);
        this.z = defaultValue(z, 0.0);
        this.w = defaultValue(w, 0.0);
    }
}
//# sourceMappingURL=Quaternion.js.map