import { defaultValue } from "../defaultValue";
export class Vector3 {
    constructor(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = defaultValue(x, 0.0);
        this.y = defaultValue(y, 0.0);
        this.z = defaultValue(z, 0.0);
    }
}
//# sourceMappingURL=Vector3.js.map