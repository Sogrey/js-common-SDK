/**
 * This is the doc comment for CMath3D
 *
 */

import { CMath } from "./CMath"
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Vector4 } from './Vector4';
import { Color } from './Color';
import { Matrix2 } from './Matrix2';
import { Matrix3 } from './Matrix3';
import { Quaternion } from './Quaternion';

export class CMath3D {
    static CMath: typeof CMath;
    static Vector2: typeof Vector2;
    static Vector3: typeof Vector3;
    static Vector4: typeof Vector4;
    static Color: typeof Color;
    static Matrix2: typeof Matrix2;
    static Matrix3: typeof Matrix3;
    static Quaternion: typeof Quaternion;
}

CMath3D.CMath = CMath;
CMath3D.Vector2 = Vector2;
CMath3D.Vector3 = Vector3;
CMath3D.Vector4 = Vector4;
CMath3D.Color = Color;
CMath3D.Matrix2 = Matrix2;
CMath3D.Matrix3 = Matrix3;
CMath3D.Quaternion = Quaternion;

export { CMath } from "./CMath"
export { Vector2 } from './Vector2';
export { Vector3 } from './Vector3';
export { Vector4 } from './Vector4';
export { Color } from './Color';
export { Matrix2 } from './Matrix2';
export { Matrix3 } from './Matrix3';
export { Quaternion } from './Quaternion';