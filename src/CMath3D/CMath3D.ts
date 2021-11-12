/**
 * This is the doc comment for CMath3D
 *
 */

import { CMath } from "./CMath"
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Vector4 } from './Vector4';
import { Color } from './Color';

export class CMath3D {
    static CMath: typeof CMath;
    static Vector2: typeof Vector2;
    static Vector3: typeof Vector3;
    static Vector4: typeof Vector4;
    static Color: typeof Color;
}

CMath3D.CMath = CMath;
CMath3D.Vector2 = Vector2;
CMath3D.Vector3 = Vector3;
CMath3D.Vector4 = Vector4;
CMath3D.Color = Color;

export { CMath } from "./CMath"
export { Vector2 } from './Vector2';
export { Vector3 } from './Vector3';
export { Vector4 } from './Vector4';
export { Color } from './Color';