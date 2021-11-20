/**
 * @function
 *
 * @param {*} value The object.
 * @returns {Boolean} Returns true if the object is defined, returns false otherwise.
 *
 * @example
 * <pre><code>
 * if (defined(positions)) {
 *      doSomething();
 * } else {
 *      doSomethingElse();
 * }
 * </code></pre>
 */
export function defined(value?: any) {
    return value !== undefined && value !== null;
}