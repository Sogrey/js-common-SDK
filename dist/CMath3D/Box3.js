import { defaultValue } from "../defaultValue";
import { Vector3 } from "./Vector3";
export class Box3 {
    constructor(min, max) {
        this.min = new Vector3(+Infinity, +Infinity, +Infinity);
        this.max = new Vector3(-Infinity, -Infinity, -Infinity);
        this.min = defaultValue(min, this.min);
        this.max = defaultValue(max, this.max);
    }
}
//# sourceMappingURL=Box3.js.map