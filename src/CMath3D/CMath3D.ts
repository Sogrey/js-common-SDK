/**
 * This is the doc comment for CMath3D
 *
 */
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Vector4 } from './Vector4';

export { Vector2 } from './Vector2';
export { Vector3 } from './Vector3';
export { Vector4 } from './Vector4';

export class CMath3D {
    static Vector2: typeof Vector2;
    static Vector3: typeof Vector3;
    static Vector4: typeof Vector4;
}

CMath3D.Vector2 = Vector2;
CMath3D.Vector3 = Vector3;
CMath3D.Vector4 = Vector4;