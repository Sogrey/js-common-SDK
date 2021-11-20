/**
 * TranslationRotationScale
 * 
 * This is the doc comment for TranslationRotationScale
 *
 * @module TranslationRotationScale
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Vector3 } from "./Vector3";
import { Quaternion } from "./Quaternion";

export class TranslationRotationScale {
    translation: Vector3 = Vector3.ZERO.clone();
    rotation: Quaternion = Quaternion.IDENTITY.clone();
    scale = Vector3.ONE.clone();
    /**
    * An affine transformation defined by a translation, rotation, and scale.
    * @alias TranslationRotationScale
    * @constructor
    *
    * @param {Vector3} [translation=Vector3.ZERO] A {@link Vector3} specifying the (x, y, z) translation to apply to the node.
    * @param {Quaternion} [rotation=Quaternion.IDENTITY] A {@link Quaternion} specifying the (x, y, z, w) rotation to apply to the node.
    * @param {Vector3} [scale=new Vector3(1.0, 1.0, 1.0)] A {@link Vector3} specifying the (x, y, z) scaling to apply to the node.
    */
    constructor(
        translation?: Vector3, rotation?: Quaternion, scale?: Vector3
    ) {
        /**
         * Gets or sets the (x, y, z) translation to apply to the node.
         * @type {Vector3}
         * @default Vector3.ZERO
         */
        Vector3.clone(
            defaultValue(translation, Vector3.ZERO), this.translation
        )!;

        /**
         * Gets or sets the (x, y, z, w) rotation to apply to the node.
         * @type {Quaternion}
         * @default Quaternion.IDENTITY
         */
        Quaternion.clone(defaultValue(rotation, Quaternion.IDENTITY), this.rotation);

        /**
         * Gets or sets the (x, y, z) scaling to apply to the node.
         * @type {Vector3}
         * @default new Vector3(1.0, 1.0, 1.0)
         */
        Vector3.clone(defaultValue(scale, Vector3.ONE), this.scale);
    }


    /**
     * Compares this instance against the provided instance and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {TranslationRotationScale} [right] The right hand side TranslationRotationScale.
     * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals = (right: TranslationRotationScale): boolean => {
        return (
            this === right ||
            (defined(right) &&
                Vector3.equals(this.translation, right.translation) &&
                Quaternion.equals(this.rotation, right.rotation) &&
                Vector3.equals(this.scale, right.scale))
        );
    };
}