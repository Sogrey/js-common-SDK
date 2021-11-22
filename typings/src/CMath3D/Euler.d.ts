import { Quaternion } from "./Quaternion";
import { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";
export declare class Euler {
    x: number;
    y: number;
    z: number;
    order: string;
    constructor(x?: number, y?: number, z?: number, order?: string);
    isEuler: boolean;
    static DefaultOrder: string;
    static RotationOrders: string[];
    set: (x: number, y: number, z: number, order: string) => this;
    static clone: (value: Euler, result?: Euler | undefined) => Euler;
    clone: (result?: Euler | undefined) => Euler;
    static fromRotationMatrix: (m: Matrix4, order?: string, result?: Euler | undefined) => Euler;
    static fromQuaternion: (q: Quaternion, order?: string, result?: Euler | undefined) => Euler;
    static fromVector3: (v: Vector3, order?: string, result?: Euler | undefined) => Euler;
    static equals: (left: Euler, right: Euler) => boolean;
    equals: (euler: Euler) => boolean;
    static fromArray: (array: Array<number | string>, result?: Euler | undefined) => Euler;
    static toArray: (value: Euler, array?: Array<number | string>, offset?: number) => (string | number)[];
    toArray: (array?: Array<number | string>, offset?: number) => void;
    static toVector3: (euler: Euler, result?: Vector3 | undefined) => Vector3;
    toVector3: (result?: Vector3 | undefined) => Vector3;
    toString: () => string;
}
//# sourceMappingURL=Euler.d.ts.map