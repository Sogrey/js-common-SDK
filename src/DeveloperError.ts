/**
 * Constructs an exception object that is thrown due to a developer error, e.g., invalid argument,
 * argument out of range, etc.  This exception should only be thrown during development;
 * it usually indicates a bug in the calling code.  This exception should never be
 * caught; instead the calling code should strive not to generate it.
 * <br /><br />
 * On the other hand, a runtime error indicates an exception that may
 * be thrown at runtime, e.g., out of memory, that the calling code should be prepared
 * to catch.
 *
 * @alias DeveloperError
 * @constructor
 * @extends Error
 *
 * @param {String} [message] The error message for this exception.
 *
 */
import { defined } from "./defined"
import { defaultValue } from "./defaultValue"

export class DeveloperError {
    message: string;
    constructor(message: string) {
        /**
         * The explanation for why this exception was thrown.
         * @type {String}
         * @readonly
         */
        this.message = message;

        throw new Error(message);
    }

}