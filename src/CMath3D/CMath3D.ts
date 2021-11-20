/**
 * This is the doc comment for CMath3D
 *
 */

import { CMath } from "./CMath"
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Vector4 } from './Vector4';
import { Box2 } from './Box2';
import { Box3 } from './Box3';
import { Color } from './Color';
import { Matrix2 } from './Matrix2';
import { Matrix3 } from './Matrix3';
import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { TranslationRotationScale } from "./TranslationRotationScale";

export class CMath3D {
    static CMath: typeof CMath;
    static Vector2: typeof Vector2;
    static Vector3: typeof Vector3;
    static Vector4: typeof Vector4;
    static Box2: typeof Box2;
    static Box3: typeof Box3;
    static Color: typeof Color;
    static Matrix2: typeof Matrix2;
    static Matrix3: typeof Matrix3;
    static Matrix4: typeof Matrix4;
    static Quaternion: typeof Quaternion;
    static TranslationRotationScale: typeof TranslationRotationScale;
}

CMath3D.CMath = CMath;
CMath3D.Vector2 = Vector2;
CMath3D.Vector3 = Vector3;
CMath3D.Vector4 = Vector4;
CMath3D.Box2 = Box2;
CMath3D.Box3 = Box3;
CMath3D.Color = Color;
CMath3D.Matrix2 = Matrix2;
CMath3D.Matrix3 = Matrix3;
CMath3D.Matrix4 = Matrix4;
CMath3D.Quaternion = Quaternion;
CMath3D.TranslationRotationScale = TranslationRotationScale;

export { CMath } from "./CMath"
export { Vector2 } from './Vector2';
export { Vector3 } from './Vector3';
export { Vector4 } from './Vector4';
export { Box2 } from './Box2';
export { Box3 } from './Box3';
export { Color } from './Color';
export { Matrix2 } from './Matrix2';
export { Matrix3 } from './Matrix3';
export { Matrix4 } from './Matrix4';
export { Quaternion } from './Quaternion';
export { TranslationRotationScale } from "./TranslationRotationScale";