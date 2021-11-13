/**
 * Color
 * 
 * This is the doc comment for Color
 *
 * @module Color
 */

import { defined } from "../defined"
import { defaultValue } from "../defaultValue"

import { CMath } from "./CMath"
import { Vector3 } from "./Vector3"
import { Vector4 } from "./Vector4";

let _colorKeywords = {
    'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
    'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
    'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
    'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
    'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
    'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
    'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
};
//#rgba
var rgbaMatcher = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i;
//#rrggbbaa
var rrggbbaaMatcher = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i;
//rgb(), rgba(), or rgb%()
var rgbParenthesesMatcher = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
//hsl() or hsla()
var hslParenthesesMatcher = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;

function hue2rgb(m1: number, m2: number, h: number) {
    if (h < 0) {
        h += 1;
    }
    if (h > 1) {
        h -= 1;
    }
    if (h * 6 < 1) {
        return m1 + (m2 - m1) * 6 * h;
    }
    if (h * 2 < 1) {
        return m2;
    }
    if (h * 3 < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
}

export class Color {
    r: number = 1; g: number = 1; b: number = 1; a: number = 1;
    constructor(r?: number, g?: number, b?: number, a?: number) {
        /**
         * The RED component.
         * @type {Number}
         * @default 1.0
         */
        this.r = defaultValue(r, 1.0);

        /**
         * The GREEN component.
         * @type {Number}
         * @default 1.0
         */
        this.g = defaultValue(g, 1.0);
        /**
         * The BLUE component.
         * @type {Number}
         * @default 1.0
         */
        this.b = defaultValue(b, 1.0);
        /**
         * The ALPHA component.
         * @type {Number}
         * @default 1.0
         */
        this.a = defaultValue(a, 1.0);
    }
    static NAMES = _colorKeywords;

    isColor = true;
    /**
     * Creates a Color instance from a {@link Vector4}. <code>x</code>, <code>y</code>, <code>z</code>,
     * and <code>w</code> map to <code>r</code>, <code>g</code>, <code>b</code>, and <code>a</code>, respectively.
     *
     * @param {Vector4} v4 The source cartesian.
     * @param {Color} [result] The object onto which to store the result.
     * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
     */
    static fromVector4 = function (v4: Vector4, result: Color) {
        if (!defined(result)) {
            return new Color(v4.x, v4.y, v4.z, v4.w);
        }

        result.r = v4.x;
        result.g = v4.y;
        result.b = v4.z;
        result.a = v4.w;

        return result;
    };

    /**
     * Creates a new Color specified using red, green, blue, and alpha values
     * that are in the range of 0 to 255, converting them internally to a range of 0.0 to 1.0.
     *
     * @param {Number} [red=255] The red component.
     * @param {Number} [green=255] The green component.
     * @param {Number} [blue=255] The blue component.
     * @param {Number} [alpha=255] The alpha component.
     * @param {Color} [result] The object onto which to store the result.
     * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
     */
    static fromBytes = function (r: number, g: number, b: number, a: number, result: Color) {
        r = Color.byteToFloat(defaultValue(r, 255.0));
        g = Color.byteToFloat(defaultValue(g, 255.0));
        b = Color.byteToFloat(defaultValue(b, 255.0));
        a = Color.byteToFloat(defaultValue(a, 255.0));

        if (!defined(result)) {
            return new Color(r, g, b, a);
        }

        result.r = r;
        result.g = g;
        result.b = b;
        result.a = a;
        return result;
    };

    /**
     * Creates a new Color that has the same red, green, and blue components
     * of the specified color, but with the specified alpha value.
     *
     * @param {Color} color The base color
     * @param {Number} alpha The new alpha component.
     * @param {Color} [result] The object onto which to store the result.
     * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
     *
     */
    static fromAlpha = function (color: Color, alpha: number, result: Color) {
        if (!defined(result)) {
            return new Color(color.r, color.g, color.b, alpha);
        }

        result.r = color.r;
        result.g = color.g;
        result.b = color.b;
        result.a = alpha;
        return result;
    };

    /**
     * 十进制颜色值转 Color
     * @param {Number} colorDec 十进制颜色值，例如红色：0xFF0000
     * @param {Color} result 结果Color
     * @returns {Color} 结果Color
     */
    static fromDec = function (colorDec: number, result: Color) {
        if (!defined(result)) {
            result = new Color();
        }

        var r = Math.floor(colorDec / 0x10000);
        var g = Math.floor((colorDec % 0x10000) / 0x100);
        var b = Math.floor(colorDec % 0x100);

        result.r = r;
        result.g = g;
        result.b = b;
        result.a = 1.0;
        return result;
    };

    /**
     * Color转为十进制
     * @returns {Number} 
     */
    getHex = () => {
        return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;
    }

    /**
     * Color转为十六进制字符串
     * @returns {string} 
     */
    getHexString = () => {
        return ('000000' + this.getHex().toString(16)).slice(- 6);
    }
    /**
     * Creates a Color instance from hue, saturation, and lightness.
     *
     * @param {Number} [hue=0] The hue angle 0...1
     * @param {Number} [saturation=0] The saturation value 0...1
     * @param {Number} [lightness=0] The lightness value 0...1
     * @param {Number} [alpha=1.0] The alpha component 0...1
     * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
     * @returns {Color} The color object.
     *
     * @see {@link http://www.w3.org/TR/css3-color/#hsl-color|CSS color values}
     */
    static fromHsl = function (hue: number, saturation: number, lightness: number, alpha: number, result: Color) {
        hue = defaultValue(hue, 0.0) % 1.0;
        saturation = defaultValue(saturation, 0.0);
        lightness = defaultValue(lightness, 0.0);
        alpha = defaultValue(alpha, 1.0);

        var red = lightness;
        var green = lightness;
        var blue = lightness;

        if (saturation !== 0) {
            var m2;
            if (lightness < 0.5) {
                m2 = lightness * (1 + saturation);
            } else {
                m2 = lightness + saturation - lightness * saturation;
            }

            var m1 = 2.0 * lightness - m2;
            red = hue2rgb(m1, m2, hue + 1 / 3);
            green = hue2rgb(m1, m2, hue);
            blue = hue2rgb(m1, m2, hue - 1 / 3);
        }

        if (!defined(result)) {
            return new Color(red, green, blue, alpha);
        }

        result.r = red;
        result.g = green;
        result.b = blue;
        result.a = alpha;
        return result;
    };

    /**
     * Creates a Color instance from a CSS color value.
     *
     * @param {String} color The CSS color value in #rgb, #rgba, #rrggbb, #rrggbbaa, rgb(), rgba(), hsl(), or hsla() format.
     * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
     * @returns {Color} The color object, or undefined if the string was not a valid CSS color.
     *
     *
     * @example
     * var cesiumBlue = Color.fromCssColorString('#67ADDF');
     * var green = Color.fromCssColorString('green');
     *
     * @see {@link http://www.w3.org/TR/css3-color|CSS color values}
     */
    static fromCssColorString = function (color: string, result: Color) {
        if (!defined(result)) {
            result = new Color();
        }

        // Remove all whitespaces from the color string
        color = color.replace(/\s/g, "");

        type ColoeNamesKey = keyof typeof Color.NAMES;
        var namedColor: number = Color.NAMES[color.toLowerCase() as ColoeNamesKey];
        if (defined(namedColor)) {
            Color.fromDec(namedColor, result);
            return result;
        }

        var matches = rgbaMatcher.exec(color);
        if (matches !== null) {
            result.r = parseInt(matches[1], 16) / 15;
            result.g = parseInt(matches[2], 16) / 15.0;
            result.b = parseInt(matches[3], 16) / 15.0;
            result.a = parseInt(defaultValue(matches[4], "f"), 16) / 15.0;
            return result;
        }

        matches = rrggbbaaMatcher.exec(color);
        if (matches !== null) {
            result.r = parseInt(matches[1], 16) / 255.0;
            result.g = parseInt(matches[2], 16) / 255.0;
            result.b = parseInt(matches[3], 16) / 255.0;
            result.a = parseInt(defaultValue(matches[4], "ff"), 16) / 255.0;
            return result;
        }

        matches = rgbParenthesesMatcher.exec(color);
        if (matches !== null) {
            result.r =
                parseFloat(matches[1]) / ("%" === matches[1].substr(-1) ? 100.0 : 255.0);
            result.g =
                parseFloat(matches[2]) / ("%" === matches[2].substr(-1) ? 100.0 : 255.0);
            result.b =
                parseFloat(matches[3]) / ("%" === matches[3].substr(-1) ? 100.0 : 255.0);
            result.a = parseFloat(defaultValue(matches[4], "1.0"));
            return result;
        }

        matches = hslParenthesesMatcher.exec(color);
        if (matches !== null) {
            return Color.fromHsl(
                parseFloat(matches[1]) / 360.0,
                parseFloat(matches[2]) / 100.0,
                parseFloat(matches[3]) / 100.0,
                parseFloat(defaultValue(matches[4], "1.0")),
                result
            );
        }

        return undefined;
    };


    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    static packedLength = 4;
    /**
     * Converts a 'byte' color component in the range of 0 to 255 into
     * a 'float' color component in the range of 0 to 1.0.
     *
     * @param {Number} number The number to be converted.
     * @returns {Number} The converted number.
     */
    static byteToFloat = function (number: number) {
        return number / 255.0;
    };

    /**
     * Converts a 'float' color component in the range of 0 to 1.0 into
     * a 'byte' color component in the range of 0 to 255.
     *
     * @param {Number} number The number to be converted.
     * @returns {Number} The converted number.
     */
    static floatToByte = function (number: number) {
        return number === 1.0 ? 255.0 : (number * 256.0) | 0;
    };

    /**
     * Duplicates astatic 
     *
     * @param {Color} color The Color to duplicate.
     * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
     * @returns {Color} The modified result parameter or a new instance if result was undefined. (Returns undefined if color is undefined)
     */
    static clone = function (color: Color, result: Color) {
        if (!defined(color)) {
            return undefined;
        }
        if (!defined(result)) {
            return new Color(color.r, color.g, color.b, color.a);
        }
        result.r = color.r;
        result.g = color.g;
        result.b = color.b;
        result.a = color.a;
        return result;
    };


    /**
     * Creates a string representing this Color in the format '(red, green, blue, alpha)'.
     *
     * @returns {String} A string representing this Color in the format '(red, green, blue, alpha)'.
     */
    toString = () => {
        return (
            "(" +
            this.r +
            ", " +
            this.g +
            ", " +
            this.b +
            ", " +
            this.a +
            ")"
        );
    };

    /**
     * Creates a string containing the CSS color value for this color.
     *
     * @returns {String} The CSS equivalent of this color.
     *
     * @see {@link http://www.w3.org/TR/css3-color/#rgba-color|CSS RGB or RGBA color values}
     */
    toCssColorString = () => {
        var red = Color.floatToByte(this.r);
        var green = Color.floatToByte(this.g);
        var blue = Color.floatToByte(this.b);
        if (this.a === 1) {
            return "rgb(" + red + "," + green + "," + blue + ")";
        }
        return "rgba(" + red + "," + green + "," + blue + "," + this.a + ")";
    };

    /**
     * Creates a string containing CSS hex string color value for this color.
     *
     * @returns {String} The CSS hex string equivalent of this color.
     */
    toCssHexString = () => {
        var r = Color.floatToByte(this.r).toString(16);
        if (r.length < 2) {
            r = "0" + r;
        }
        var g = Color.floatToByte(this.g).toString(16);
        if (g.length < 2) {
            g = "0" + g;
        }
        var b = Color.floatToByte(this.b).toString(16);
        if (b.length < 2) {
            b = "0" + b;
        }
        if (this.a < 1) {
            var hexAlpha = Color.floatToByte(this.a).toString(16);
            if (hexAlpha.length < 2) {
                hexAlpha = "0" + hexAlpha;
            }
            return "#" + r + g + b + hexAlpha;
        }
        return "#" + r + g + b;
    };

    /**
     * Converts this color to an array of red, green, blue, and alpha values
     * that are in the range of 0 to 255.
     *
     * @param {Number[]} [result] The array to store the result in, if undefined a new instance will be created.
     * @returns {Number[]} The modified result parameter or a new instance if result was undefined.
     */
    toBytes = (result: Array<number>) => {
        var red = Color.floatToByte(this.r);
        var green = Color.floatToByte(this.g);
        var blue = Color.floatToByte(this.b);
        var alpha = Color.floatToByte(this.a);

        if (!defined(result)) {
            return [red, green, blue, alpha];
        }
        result[0] = red;
        result[1] = green;
        result[2] = blue;
        result[3] = alpha;
        return result;
    };
    /**
     * Creates a new Color that has the same red, green, and blue components
     * as this Color, but with the specified alpha value.
     *
     * @param {Number} alpha The new alpha component.
     * @param {Color} [result] The object onto which to store the result.
     * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
     *
     */
    withAlpha = (alpha: number, result: Color) => {
        return Color.fromAlpha(this, alpha, result);
    };

    /**
     * Computes the componentwise sum of two Colors.
     *
     * @param {Color} left The firststatic 
     * @param {Color} right The secondstatic 
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static add = function (left: Color, right: Color, result: Color) {
        result.r = left.r + right.r;
        result.g = left.g + right.g;
        result.b = left.b + right.b;
        result.a = left.a + right.a;
        return result;
    };

    /**
     * Computes the componentwise difference of two Colors.
     *
     * @param {Color} left The firststatic 
     * @param {Color} right The secondstatic 
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static subtract = function (left: Color, right: Color, result: Color) {
        result.r = left.r - right.r;
        result.g = left.g - right.g;
        result.b = left.b - right.b;
        result.a = left.a - right.a;
        return result;
    };

    /**
     * Computes the componentwise product of two Colors.
     *
     * @param {Color} left The firststatic 
     * @param {Color} right The secondstatic 
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static multiply = function (left: Color, right: Color, result: Color) {
        result.r = left.r * right.r;
        result.g = left.g * right.g;
        result.b = left.b * right.b;
        result.a = left.a * right.a;
        return result;
    };

    /**
     * Computes the componentwise quotient of two Colors.
     *
     * @param {Color} left The firststatic 
     * @param {Color} right The secondstatic 
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static divide = function (left: Color, right: Color, result: Color) {
        result.r = left.r / right.r;
        result.g = left.g / right.g;
        result.b = left.b / right.b;
        result.a = left.a / right.a;
        return result;
    };

    /**
     * Computes the componentwise modulus of two Colors.
     *
     * @param {Color} left The firststatic 
     * @param {Color} right The secondstatic 
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static mod = function (left: Color, right: Color, result: Color) {
        result.r = left.r % right.r;
        result.g = left.g % right.g;
        result.b = left.b % right.b;
        result.a = left.a % right.a;
        return result;
    };

    /**
     * Computes the linear interpolation or extrapolation at t between the provided colors.
     *
     * @param {Color} start The color corresponding to t at 0.0.
     * @param {Color} end The color corresponding to t at 1.0.
     * @param {Number} t The point along t at which to interpolate.
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static lerp = function (start: Color, end: Color, t: number, result: Color) {
        result.r = CMath.lerp(start.r, end.r, t);
        result.g = CMath.lerp(start.g, end.g, t);
        result.b = CMath.lerp(start.b, end.b, t);
        result.a = CMath.lerp(start.a, end.a, t);
        return result;
    };

    /**
     * Multiplies the provided Color componentwise by the provided scalar.
     *
     * @param {Color} color The Color to be scaled.
     * @param {Number} scalar The scalar to multiply with.
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static multiplyByScalar = function (color: Color, scalar: number, result: Color) {
        result.r = color.r * scalar;
        result.g = color.g * scalar;
        result.b = color.b * scalar;
        result.a = color.a * scalar;
        return result;
    };

    /**
     * Divides the provided Color componentwise by the provided scalar.
     *
     * @param {Color} color The Color to be divided.
     * @param {Number} scalar The scalar to divide with.
     * @param {Color} result The object onto which to store the result.
     * @returns {Color} The modified result parameter.
     */
    static divideByScalar = function (color: Color, scalar: number, result: Color) {
        result.r = color.r / scalar;
        result.g = color.g / scalar;
        result.b = color.b / scalar;
        result.a = color.a / scalar;
        return result;
    };

}