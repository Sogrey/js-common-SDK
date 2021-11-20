import { defaultValue } from "../defaultValue";
import { Vector2 } from "./Vector2";
export class Box2 {
    constructor(min, max) {
        this.min = new Vector2(+Infinity, +Infinity);
        this.max = new Vector2(-Infinity, -Infinity);
        this.min = defaultValue(min, this.min);
        this.max = defaultValue(max, this.max);
    }
}
//# sourceMappingURL=Box2.js.map