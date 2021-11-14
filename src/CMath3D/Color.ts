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
    static fromCssColorString = function (color: string, result?: Color) {
        if (!defined(result)) {
            result = new Color();
        }

        // Remove all whitespaces from the color string
        color = color.replace(/\s/g, "");

        type ColoeNamesKey = keyof typeof Color.NAMES;
        var namedColor: number = Color.NAMES[color.toLowerCase() as ColoeNamesKey];
        if (defined(namedColor)) {
            Color.fromDec(namedColor, result!);
            return result;
        }

        var matches = rgbaMatcher.exec(color);
        if (matches !== null) {
            result!.r = parseInt(matches[1], 16) / 15;
            result!.g = parseInt(matches[2], 16) / 15.0;
            result!.b = parseInt(matches[3], 16) / 15.0;
            result!.a = parseInt(defaultValue(matches[4], "f"), 16) / 15.0;
            return result;
        }

        matches = rrggbbaaMatcher.exec(color);
        if (matches !== null) {
            result!.r = parseInt(matches[1], 16) / 255.0;
            result!.g = parseInt(matches[2], 16) / 255.0;
            result!.b = parseInt(matches[3], 16) / 255.0;
            result!.a = parseInt(defaultValue(matches[4], "ff"), 16) / 255.0;
            return result;
        }

        matches = rgbParenthesesMatcher.exec(color);
        if (matches !== null) {
            result!.r =
                parseFloat(matches[1]) / ("%" === matches[1].substr(-1) ? 100.0 : 255.0);
            result!.g =
                parseFloat(matches[2]) / ("%" === matches[2].substr(-1) ? 100.0 : 255.0);
            result!.b =
                parseFloat(matches[3]) / ("%" === matches[3].substr(-1) ? 100.0 : 255.0);
            result!.a = parseFloat(defaultValue(matches[4], "1.0"));
            return result;
        }

        matches = hslParenthesesMatcher.exec(color);
        if (matches !== null) {
            return Color.fromHsl(
                parseFloat(matches[1]) / 360.0,
                parseFloat(matches[2]) / 100.0,
                parseFloat(matches[3]) / 100.0,
                parseFloat(defaultValue(matches[4], "1.0")),
                result!
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

    /**
     * 判断当前对象与参数c是否相等，判断 r,g,b和a 须完全相等
     * @param c 要对比的参数
     * @returns 对比结果
     */
    equals = (c: Color) => {

        return (c.r === this.r) && (c.g === this.g) && (c.b === this.b) && (c.a === this.a);

    }




    /**
     * An immutable Color instance initialized to CSS color #F0F8FF
     * <span class="colorSwath" style="background: #F0F8FF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static ALICEBLUE = Object.freeze(Color.fromCssColorString("#F0F8FF"));

    /**
     * An immutable Color instance initialized to CSS color #FAEBD7
     * <span class="colorSwath" style="background: #FAEBD7;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static ANTIQUEWHITE = Object.freeze(Color.fromCssColorString("#FAEBD7"));

    /**
     * An immutable Color instance initialized to CSS color #00FFFF
     * <span class="colorSwath" style="background: #00FFFF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static AQUA = Object.freeze(Color.fromCssColorString("#00FFFF"));

    /**
     * An immutable Color instance initialized to CSS color #7FFFD4
     * <span class="colorSwath" style="background: #7FFFD4;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static AQUAMARINE = Object.freeze(Color.fromCssColorString("#7FFFD4"));

    /**
     * An immutable Color instance initialized to CSS color #F0FFFF
     * <span class="colorSwath" style="background: #F0FFFF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static AZURE = Object.freeze(Color.fromCssColorString("#F0FFFF"));

    /**
     * An immutable Color instance initialized to CSS color #F5F5DC
     * <span class="colorSwath" style="background: #F5F5DC;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BEIGE = Object.freeze(Color.fromCssColorString("#F5F5DC"));

    /**
     * An immutable Color instance initialized to CSS color #FFE4C4
     * <span class="colorSwath" style="background: #FFE4C4;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BISQUE = Object.freeze(Color.fromCssColorString("#FFE4C4"));

    /**
     * An immutable Color instance initialized to CSS color #000000
     * <span class="colorSwath" style="background: #000000;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BLACK = Object.freeze(Color.fromCssColorString("#000000"));

    /**
     * An immutable Color instance initialized to CSS color #FFEBCD
     * <span class="colorSwath" style="background: #FFEBCD;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BLANCHEDALMOND = Object.freeze(Color.fromCssColorString("#FFEBCD"));

    /**
     * An immutable Color instance initialized to CSS color #0000FF
     * <span class="colorSwath" style="background: #0000FF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BLUE = Object.freeze(Color.fromCssColorString("#0000FF"));

    /**
     * An immutable Color instance initialized to CSS color #8A2BE2
     * <span class="colorSwath" style="background: #8A2BE2;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BLUEVIOLET = Object.freeze(Color.fromCssColorString("#8A2BE2"));

    /**
     * An immutable Color instance initialized to CSS color #A52A2A
     * <span class="colorSwath" style="background: #A52A2A;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BROWN = Object.freeze(Color.fromCssColorString("#A52A2A"));

    /**
     * An immutable Color instance initialized to CSS color #DEB887
     * <span class="colorSwath" style="background: #DEB887;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static BURLYWOOD = Object.freeze(Color.fromCssColorString("#DEB887"));

    /**
     * An immutable Color instance initialized to CSS color #5F9EA0
     * <span class="colorSwath" style="background: #5F9EA0;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CADETBLUE = Object.freeze(Color.fromCssColorString("#5F9EA0"));
    /**
     * An immutable Color instance initialized to CSS color #7FFF00
     * <span class="colorSwath" style="background: #7FFF00;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CHARTREUSE = Object.freeze(Color.fromCssColorString("#7FFF00"));

    /**
     * An immutable Color instance initialized to CSS color #D2691E
     * <span class="colorSwath" style="background: #D2691E;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CHOCOLATE = Object.freeze(Color.fromCssColorString("#D2691E"));

    /**
     * An immutable Color instance initialized to CSS color #FF7F50
     * <span class="colorSwath" style="background: #FF7F50;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CORAL = Object.freeze(Color.fromCssColorString("#FF7F50"));

    /**
     * An immutable Color instance initialized to CSS color #6495ED
     * <span class="colorSwath" style="background: #6495ED;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CORNFLOWERBLUE = Object.freeze(Color.fromCssColorString("#6495ED"));

    /**
     * An immutable Color instance initialized to CSS color #FFF8DC
     * <span class="colorSwath" style="background: #FFF8DC;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CORNSILK = Object.freeze(Color.fromCssColorString("#FFF8DC"));

    /**
     * An immutable Color instance initialized to CSS color #DC143C
     * <span class="colorSwath" style="background: #DC143C;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CRIMSON = Object.freeze(Color.fromCssColorString("#DC143C"));

    /**
     * An immutable Color instance initialized to CSS color #00FFFF
     * <span class="colorSwath" style="background: #00FFFF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static CYAN = Object.freeze(Color.fromCssColorString("#00FFFF"));

    /**
     * An immutable Color instance initialized to CSS color #00008B
     * <span class="colorSwath" style="background: #00008B;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKBLUE = Object.freeze(Color.fromCssColorString("#00008B"));

    /**
     * An immutable Color instance initialized to CSS color #008B8B
     * <span class="colorSwath" style="background: #008B8B;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKCYAN = Object.freeze(Color.fromCssColorString("#008B8B"));

    /**
     * An immutable Color instance initialized to CSS color #B8860B
     * <span class="colorSwath" style="background: #B8860B;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKGOLDENROD = Object.freeze(Color.fromCssColorString("#B8860B"));

    /**
     * An immutable Color instance initialized to CSS color #A9A9A9
     * <span class="colorSwath" style="background: #A9A9A9;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKGRAY = Object.freeze(Color.fromCssColorString("#A9A9A9"));

    /**
     * An immutable Color instance initialized to CSS color #006400
     * <span class="colorSwath" style="background: #006400;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKGREEN = Object.freeze(Color.fromCssColorString("#006400"));

    /**
     * An immutable Color instance initialized to CSS color #A9A9A9
     * <span class="colorSwath" style="background: #A9A9A9;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKGREY = Color.DARKGRAY;

    /**
     * An immutable Color instance initialized to CSS color #BDB76B
     * <span class="colorSwath" style="background: #BDB76B;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKKHAKI = Object.freeze(Color.fromCssColorString("#BDB76B"));

    /**
     * An immutable Color instance initialized to CSS color #8B008B
     * <span class="colorSwath" style="background: #8B008B;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKMAGENTA = Object.freeze(Color.fromCssColorString("#8B008B"));

    /**
     * An immutable Color instance initialized to CSS color #556B2F
     * <span class="colorSwath" style="background: #556B2F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKOLIVEGREEN = Object.freeze(Color.fromCssColorString("#556B2F"));

    /**
     * An immutable Color instance initialized to CSS color #FF8C00
     * <span class="colorSwath" style="background: #FF8C00;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKORANGE = Object.freeze(Color.fromCssColorString("#FF8C00"));

    /**
     * An immutable Color instance initialized to CSS color #9932CC
     * <span class="colorSwath" style="background: #9932CC;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKORCHID = Object.freeze(Color.fromCssColorString("#9932CC"));

    /**
     * An immutable Color instance initialized to CSS color #8B0000
     * <span class="colorSwath" style="background: #8B0000;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKRED = Object.freeze(Color.fromCssColorString("#8B0000"));

    /**
     * An immutable Color instance initialized to CSS color #E9967A
     * <span class="colorSwath" style="background: #E9967A;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKSALMON = Object.freeze(Color.fromCssColorString("#E9967A"));

    /**
     * An immutable Color instance initialized to CSS color #8FBC8F
     * <span class="colorSwath" style="background: #8FBC8F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKSEAGREEN = Object.freeze(Color.fromCssColorString("#8FBC8F"));

    /**
     * An immutable Color instance initialized to CSS color #483D8B
     * <span class="colorSwath" style="background: #483D8B;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKSLATEBLUE = Object.freeze(Color.fromCssColorString("#483D8B"));

    /**
     * An immutable Color instance initialized to CSS color #2F4F4F
     * <span class="colorSwath" style="background: #2F4F4F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKSLATEGRAY = Object.freeze(Color.fromCssColorString("#2F4F4F"));

    /**
     * An immutable Color instance initialized to CSS color #2F4F4F
     * <span class="colorSwath" style="background: #2F4F4F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKSLATEGREY = Color.DARKSLATEGRAY;

    /**
     * An immutable Color instance initialized to CSS color #00CED1
     * <span class="colorSwath" style="background: #00CED1;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKTURQUOISE = Object.freeze(Color.fromCssColorString("#00CED1"));

    /**
     * An immutable Color instance initialized to CSS color #9400D3
     * <span class="colorSwath" style="background: #9400D3;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DARKVIOLET = Object.freeze(Color.fromCssColorString("#9400D3"));

    /**
     * An immutable Color instance initialized to CSS color #FF1493
     * <span class="colorSwath" style="background: #FF1493;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DEEPPINK = Object.freeze(Color.fromCssColorString("#FF1493"));

    /**
     * An immutable Color instance initialized to CSS color #00BFFF
     * <span class="colorSwath" style="background: #00BFFF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DEEPSKYBLUE = Object.freeze(Color.fromCssColorString("#00BFFF"));

    /**
     * An immutable Color instance initialized to CSS color #696969
     * <span class="colorSwath" style="background: #696969;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DIMGRAY = Object.freeze(Color.fromCssColorString("#696969"));

    /**
     * An immutable Color instance initialized to CSS color #696969
     * <span class="colorSwath" style="background: #696969;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DIMGREY = Color.DIMGRAY;

    /**
     * An immutable Color instance initialized to CSS color #1E90FF
     * <span class="colorSwath" style="background: #1E90FF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static DODGERBLUE = Object.freeze(Color.fromCssColorString("#1E90FF"));

    /**
     * An immutable Color instance initialized to CSS color #B22222
     * <span class="colorSwath" style="background: #B22222;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static FIREBRICK = Object.freeze(Color.fromCssColorString("#B22222"));

    /**
     * An immutable Color instance initialized to CSS color #FFFAF0
     * <span class="colorSwath" style="background: #FFFAF0;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static FLORALWHITE = Object.freeze(Color.fromCssColorString("#FFFAF0"));

    /**
     * An immutable Color instance initialized to CSS color #228B22
     * <span class="colorSwath" style="background: #228B22;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static FORESTGREEN = Object.freeze(Color.fromCssColorString("#228B22"));

    /**
     * An immutable Color instance initialized to CSS color #FF00FF
     * <span class="colorSwath" style="background: #FF00FF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static FUCHSIA = Object.freeze(Color.fromCssColorString("#FF00FF"));

    /**
     * An immutable Color instance initialized to CSS color #DCDCDC
     * <span class="colorSwath" style="background: #DCDCDC;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GAINSBORO = Object.freeze(Color.fromCssColorString("#DCDCDC"));

    /**
     * An immutable Color instance initialized to CSS color #F8F8FF
     * <span class="colorSwath" style="background: #F8F8FF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GHOSTWHITE = Object.freeze(Color.fromCssColorString("#F8F8FF"));

    /**
     * An immutable Color instance initialized to CSS color #FFD700
     * <span class="colorSwath" style="background: #FFD700;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GOLD = Object.freeze(Color.fromCssColorString("#FFD700"));

    /**
     * An immutable Color instance initialized to CSS color #DAA520
     * <span class="colorSwath" style="background: #DAA520;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GOLDENROD = Object.freeze(Color.fromCssColorString("#DAA520"));

    /**
     * An immutable Color instance initialized to CSS color #808080
     * <span class="colorSwath" style="background: #808080;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GRAY = Object.freeze(Color.fromCssColorString("#808080"));

    /**
     * An immutable Color instance initialized to CSS color #008000
     * <span class="colorSwath" style="background: #008000;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GREEN = Object.freeze(Color.fromCssColorString("#008000"));

    /**
     * An immutable Color instance initialized to CSS color #ADFF2F
     * <span class="colorSwath" style="background: #ADFF2F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GREENYELLOW = Object.freeze(Color.fromCssColorString("#ADFF2F"));

    /**
     * An immutable Color instance initialized to CSS color #808080
     * <span class="colorSwath" style="background: #808080;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static GREY = Color.GRAY;

    /**
     * An immutable Color instance initialized to CSS color #F0FFF0
     * <span class="colorSwath" style="background: #F0FFF0;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static HONEYDEW = Object.freeze(Color.fromCssColorString("#F0FFF0"));

    /**
     * An immutable Color instance initialized to CSS color #FF69B4
     * <span class="colorSwath" style="background: #FF69B4;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static HOTPINK = Object.freeze(Color.fromCssColorString("#FF69B4"));

    /**
     * An immutable Color instance initialized to CSS color #CD5C5C
     * <span class="colorSwath" style="background: #CD5C5C;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static INDIANRED = Object.freeze(Color.fromCssColorString("#CD5C5C"));

    /**
     * An immutable Color instance initialized to CSS color #4B0082
     * <span class="colorSwath" style="background: #4B0082;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static INDIGO = Object.freeze(Color.fromCssColorString("#4B0082"));

    /**
     * An immutable Color instance initialized to CSS color #FFFFF0
     * <span class="colorSwath" style="background: #FFFFF0;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static IVORY = Object.freeze(Color.fromCssColorString("#FFFFF0"));

    /**
     * An immutable Color instance initialized to CSS color #F0E68C
     * <span class="colorSwath" style="background: #F0E68C;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static KHAKI = Object.freeze(Color.fromCssColorString("#F0E68C"));

    /**
     * An immutable Color instance initialized to CSS color #E6E6FA
     * <span class="colorSwath" style="background: #E6E6FA;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LAVENDER = Object.freeze(Color.fromCssColorString("#E6E6FA"));

    /**
     * An immutable Color instance initialized to CSS color #FFF0F5
     * <span class="colorSwath" style="background: #FFF0F5;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LAVENDAR_BLUSH = Object.freeze(Color.fromCssColorString("#FFF0F5"));

    /**
     * An immutable Color instance initialized to CSS color #7CFC00
     * <span class="colorSwath" style="background: #7CFC00;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LAWNGREEN = Object.freeze(Color.fromCssColorString("#7CFC00"));

    /**
     * An immutable Color instance initialized to CSS color #FFFACD
     * <span class="colorSwath" style="background: #FFFACD;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LEMONCHIFFON = Object.freeze(Color.fromCssColorString("#FFFACD"));

    /**
     * An immutable Color instance initialized to CSS color #ADD8E6
     * <span class="colorSwath" style="background: #ADD8E6;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTBLUE = Object.freeze(Color.fromCssColorString("#ADD8E6"));

    /**
     * An immutable Color instance initialized to CSS color #F08080
     * <span class="colorSwath" style="background: #F08080;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTCORAL = Object.freeze(Color.fromCssColorString("#F08080"));

    /**
     * An immutable Color instance initialized to CSS color #E0FFFF
     * <span class="colorSwath" style="background: #E0FFFF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTCYAN = Object.freeze(Color.fromCssColorString("#E0FFFF"));

    /**
     * An immutable Color instance initialized to CSS color #FAFAD2
     * <span class="colorSwath" style="background: #FAFAD2;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTGOLDENRODYELLOW = Object.freeze(Color.fromCssColorString("#FAFAD2"));

    /**
     * An immutable Color instance initialized to CSS color #D3D3D3
     * <span class="colorSwath" style="background: #D3D3D3;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTGRAY = Object.freeze(Color.fromCssColorString("#D3D3D3"));

    /**
     * An immutable Color instance initialized to CSS color #90EE90
     * <span class="colorSwath" style="background: #90EE90;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTGREEN = Object.freeze(Color.fromCssColorString("#90EE90"));

    /**
     * An immutable Color instance initialized to CSS color #D3D3D3
     * <span class="colorSwath" style="background: #D3D3D3;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTGREY = Color.LIGHTGRAY;

    /**
     * An immutable Color instance initialized to CSS color #FFB6C1
     * <span class="colorSwath" style="background: #FFB6C1;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTPINK = Object.freeze(Color.fromCssColorString("#FFB6C1"));

    /**
     * An immutable Color instance initialized to CSS color #20B2AA
     * <span class="colorSwath" style="background: #20B2AA;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTSEAGREEN = Object.freeze(Color.fromCssColorString("#20B2AA"));

    /**
     * An immutable Color instance initialized to CSS color #87CEFA
     * <span class="colorSwath" style="background: #87CEFA;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTSKYBLUE = Object.freeze(Color.fromCssColorString("#87CEFA"));

    /**
     * An immutable Color instance initialized to CSS color #778899
     * <span class="colorSwath" style="background: #778899;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTSLATEGRAY = Object.freeze(Color.fromCssColorString("#778899"));

    /**
     * An immutable Color instance initialized to CSS color #778899
     * <span class="colorSwath" style="background: #778899;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTSLATEGREY = Color.LIGHTSLATEGRAY;

    /**
     * An immutable Color instance initialized to CSS color #B0C4DE
     * <span class="colorSwath" style="background: #B0C4DE;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTSTEELBLUE = Object.freeze(Color.fromCssColorString("#B0C4DE"));

    /**
     * An immutable Color instance initialized to CSS color #FFFFE0
     * <span class="colorSwath" style="background: #FFFFE0;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIGHTYELLOW = Object.freeze(Color.fromCssColorString("#FFFFE0"));

    /**
     * An immutable Color instance initialized to CSS color #00FF00
     * <span class="colorSwath" style="background: #00FF00;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIME = Object.freeze(Color.fromCssColorString("#00FF00"));

    /**
     * An immutable Color instance initialized to CSS color #32CD32
     * <span class="colorSwath" style="background: #32CD32;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LIMEGREEN = Object.freeze(Color.fromCssColorString("#32CD32"));

    /**
     * An immutable Color instance initialized to CSS color #FAF0E6
     * <span class="colorSwath" style="background: #FAF0E6;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static LINEN = Object.freeze(Color.fromCssColorString("#FAF0E6"));

    /**
     * An immutable Color instance initialized to CSS color #FF00FF
     * <span class="colorSwath" style="background: #FF00FF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MAGENTA = Object.freeze(Color.fromCssColorString("#FF00FF"));

    /**
     * An immutable Color instance initialized to CSS color #800000
     * <span class="colorSwath" style="background: #800000;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MAROON = Object.freeze(Color.fromCssColorString("#800000"));

    /**
     * An immutable Color instance initialized to CSS color #66CDAA
     * <span class="colorSwath" style="background: #66CDAA;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMAQUAMARINE = Object.freeze(Color.fromCssColorString("#66CDAA"));

    /**
     * An immutable Color instance initialized to CSS color #0000CD
     * <span class="colorSwath" style="background: #0000CD;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMBLUE = Object.freeze(Color.fromCssColorString("#0000CD"));

    /**
     * An immutable Color instance initialized to CSS color #BA55D3
     * <span class="colorSwath" style="background: #BA55D3;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMORCHID = Object.freeze(Color.fromCssColorString("#BA55D3"));

    /**
     * An immutable Color instance initialized to CSS color #9370DB
     * <span class="colorSwath" style="background: #9370DB;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMPURPLE = Object.freeze(Color.fromCssColorString("#9370DB"));

    /**
     * An immutable Color instance initialized to CSS color #3CB371
     * <span class="colorSwath" style="background: #3CB371;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMSEAGREEN = Object.freeze(Color.fromCssColorString("#3CB371"));

    /**
     * An immutable Color instance initialized to CSS color #7B68EE
     * <span class="colorSwath" style="background: #7B68EE;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMSLATEBLUE = Object.freeze(Color.fromCssColorString("#7B68EE"));

    /**
     * An immutable Color instance initialized to CSS color #00FA9A
     * <span class="colorSwath" style="background: #00FA9A;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMSPRINGGREEN = Object.freeze(Color.fromCssColorString("#00FA9A"));

    /**
     * An immutable Color instance initialized to CSS color #48D1CC
     * <span class="colorSwath" style="background: #48D1CC;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMTURQUOISE = Object.freeze(Color.fromCssColorString("#48D1CC"));

    /**
     * An immutable Color instance initialized to CSS color #C71585
     * <span class="colorSwath" style="background: #C71585;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MEDIUMVIOLETRED = Object.freeze(Color.fromCssColorString("#C71585"));

    /**
     * An immutable Color instance initialized to CSS color #191970
     * <span class="colorSwath" style="background: #191970;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MIDNIGHTBLUE = Object.freeze(Color.fromCssColorString("#191970"));

    /**
     * An immutable Color instance initialized to CSS color #F5FFFA
     * <span class="colorSwath" style="background: #F5FFFA;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MINTCREAM = Object.freeze(Color.fromCssColorString("#F5FFFA"));

    /**
     * An immutable Color instance initialized to CSS color #FFE4E1
     * <span class="colorSwath" style="background: #FFE4E1;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MISTYROSE = Object.freeze(Color.fromCssColorString("#FFE4E1"));

    /**
     * An immutable Color instance initialized to CSS color #FFE4B5
     * <span class="colorSwath" style="background: #FFE4B5;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static MOCCASIN = Object.freeze(Color.fromCssColorString("#FFE4B5"));

    /**
     * An immutable Color instance initialized to CSS color #FFDEAD
     * <span class="colorSwath" style="background: #FFDEAD;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static NAVAJOWHITE = Object.freeze(Color.fromCssColorString("#FFDEAD"));

    /**
     * An immutable Color instance initialized to CSS color #000080
     * <span class="colorSwath" style="background: #000080;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static NAVY = Object.freeze(Color.fromCssColorString("#000080"));

    /**
     * An immutable Color instance initialized to CSS color #FDF5E6
     * <span class="colorSwath" style="background: #FDF5E6;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static OLDLACE = Object.freeze(Color.fromCssColorString("#FDF5E6"));

    /**
     * An immutable Color instance initialized to CSS color #808000
     * <span class="colorSwath" style="background: #808000;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static OLIVE = Object.freeze(Color.fromCssColorString("#808000"));

    /**
     * An immutable Color instance initialized to CSS color #6B8E23
     * <span class="colorSwath" style="background: #6B8E23;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static OLIVEDRAB = Object.freeze(Color.fromCssColorString("#6B8E23"));

    /**
     * An immutable Color instance initialized to CSS color #FFA500
     * <span class="colorSwath" style="background: #FFA500;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static ORANGE = Object.freeze(Color.fromCssColorString("#FFA500"));

    /**
     * An immutable Color instance initialized to CSS color #FF4500
     * <span class="colorSwath" style="background: #FF4500;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static ORANGERED = Object.freeze(Color.fromCssColorString("#FF4500"));

    /**
     * An immutable Color instance initialized to CSS color #DA70D6
     * <span class="colorSwath" style="background: #DA70D6;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static ORCHID = Object.freeze(Color.fromCssColorString("#DA70D6"));

    /**
     * An immutable Color instance initialized to CSS color #EEE8AA
     * <span class="colorSwath" style="background: #EEE8AA;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PALEGOLDENROD = Object.freeze(Color.fromCssColorString("#EEE8AA"));

    /**
     * An immutable Color instance initialized to CSS color #98FB98
     * <span class="colorSwath" style="background: #98FB98;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PALEGREEN = Object.freeze(Color.fromCssColorString("#98FB98"));

    /**
     * An immutable Color instance initialized to CSS color #AFEEEE
     * <span class="colorSwath" style="background: #AFEEEE;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PALETURQUOISE = Object.freeze(Color.fromCssColorString("#AFEEEE"));

    /**
     * An immutable Color instance initialized to CSS color #DB7093
     * <span class="colorSwath" style="background: #DB7093;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PALEVIOLETRED = Object.freeze(Color.fromCssColorString("#DB7093"));

    /**
     * An immutable Color instance initialized to CSS color #FFEFD5
     * <span class="colorSwath" style="background: #FFEFD5;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PAPAYAWHIP = Object.freeze(Color.fromCssColorString("#FFEFD5"));

    /**
     * An immutable Color instance initialized to CSS color #FFDAB9
     * <span class="colorSwath" style="background: #FFDAB9;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PEACHPUFF = Object.freeze(Color.fromCssColorString("#FFDAB9"));

    /**
     * An immutable Color instance initialized to CSS color #CD853F
     * <span class="colorSwath" style="background: #CD853F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PERU = Object.freeze(Color.fromCssColorString("#CD853F"));

    /**
     * An immutable Color instance initialized to CSS color #FFC0CB
     * <span class="colorSwath" style="background: #FFC0CB;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PINK = Object.freeze(Color.fromCssColorString("#FFC0CB"));

    /**
     * An immutable Color instance initialized to CSS color #DDA0DD
     * <span class="colorSwath" style="background: #DDA0DD;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PLUM = Object.freeze(Color.fromCssColorString("#DDA0DD"));

    /**
     * An immutable Color instance initialized to CSS color #B0E0E6
     * <span class="colorSwath" style="background: #B0E0E6;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static POWDERBLUE = Object.freeze(Color.fromCssColorString("#B0E0E6"));

    /**
     * An immutable Color instance initialized to CSS color #800080
     * <span class="colorSwath" style="background: #800080;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static PURPLE = Object.freeze(Color.fromCssColorString("#800080"));

    /**
     * An immutable Color instance initialized to CSS color #FF0000
     * <span class="colorSwath" style="background: #FF0000;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static RED = Object.freeze(Color.fromCssColorString("#FF0000"));

    /**
     * An immutable Color instance initialized to CSS color #BC8F8F
     * <span class="colorSwath" style="background: #BC8F8F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static ROSYBROWN = Object.freeze(Color.fromCssColorString("#BC8F8F"));

    /**
     * An immutable Color instance initialized to CSS color #4169E1
     * <span class="colorSwath" style="background: #4169E1;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static ROYALBLUE = Object.freeze(Color.fromCssColorString("#4169E1"));

    /**
     * An immutable Color instance initialized to CSS color #8B4513
     * <span class="colorSwath" style="background: #8B4513;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SADDLEBROWN = Object.freeze(Color.fromCssColorString("#8B4513"));

    /**
     * An immutable Color instance initialized to CSS color #FA8072
     * <span class="colorSwath" style="background: #FA8072;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SALMON = Object.freeze(Color.fromCssColorString("#FA8072"));

    /**
     * An immutable Color instance initialized to CSS color #F4A460
     * <span class="colorSwath" style="background: #F4A460;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SANDYBROWN = Object.freeze(Color.fromCssColorString("#F4A460"));

    /**
     * An immutable Color instance initialized to CSS color #2E8B57
     * <span class="colorSwath" style="background: #2E8B57;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SEAGREEN = Object.freeze(Color.fromCssColorString("#2E8B57"));

    /**
     * An immutable Color instance initialized to CSS color #FFF5EE
     * <span class="colorSwath" style="background: #FFF5EE;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SEASHELL = Object.freeze(Color.fromCssColorString("#FFF5EE"));

    /**
     * An immutable Color instance initialized to CSS color #A0522D
     * <span class="colorSwath" style="background: #A0522D;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SIENNA = Object.freeze(Color.fromCssColorString("#A0522D"));

    /**
     * An immutable Color instance initialized to CSS color #C0C0C0
     * <span class="colorSwath" style="background: #C0C0C0;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SILVER = Object.freeze(Color.fromCssColorString("#C0C0C0"));

    /**
     * An immutable Color instance initialized to CSS color #87CEEB
     * <span class="colorSwath" style="background: #87CEEB;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SKYBLUE = Object.freeze(Color.fromCssColorString("#87CEEB"));

    /**
     * An immutable Color instance initialized to CSS color #6A5ACD
     * <span class="colorSwath" style="background: #6A5ACD;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SLATEBLUE = Object.freeze(Color.fromCssColorString("#6A5ACD"));

    /**
     * An immutable Color instance initialized to CSS color #708090
     * <span class="colorSwath" style="background: #708090;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SLATEGRAY = Object.freeze(Color.fromCssColorString("#708090"));

    /**
     * An immutable Color instance initialized to CSS color #708090
     * <span class="colorSwath" style="background: #708090;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SLATEGREY = Color.SLATEGRAY;

    /**
     * An immutable Color instance initialized to CSS color #FFFAFA
     * <span class="colorSwath" style="background: #FFFAFA;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SNOW = Object.freeze(Color.fromCssColorString("#FFFAFA"));

    /**
     * An immutable Color instance initialized to CSS color #00FF7F
     * <span class="colorSwath" style="background: #00FF7F;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static SPRINGGREEN = Object.freeze(Color.fromCssColorString("#00FF7F"));

    /**
     * An immutable Color instance initialized to CSS color #4682B4
     * <span class="colorSwath" style="background: #4682B4;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static STEELBLUE = Object.freeze(Color.fromCssColorString("#4682B4"));

    /**
     * An immutable Color instance initialized to CSS color #D2B48C
     * <span class="colorSwath" style="background: #D2B48C;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static TAN = Object.freeze(Color.fromCssColorString("#D2B48C"));

    /**
     * An immutable Color instance initialized to CSS color #008080
     * <span class="colorSwath" style="background: #008080;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static TEAL = Object.freeze(Color.fromCssColorString("#008080"));

    /**
     * An immutable Color instance initialized to CSS color #D8BFD8
     * <span class="colorSwath" style="background: #D8BFD8;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static THISTLE = Object.freeze(Color.fromCssColorString("#D8BFD8"));

    /**
     * An immutable Color instance initialized to CSS color #FF6347
     * <span class="colorSwath" style="background: #FF6347;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static TOMATO = Object.freeze(Color.fromCssColorString("#FF6347"));

    /**
     * An immutable Color instance initialized to CSS color #40E0D0
     * <span class="colorSwath" style="background: #40E0D0;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static TURQUOISE = Object.freeze(Color.fromCssColorString("#40E0D0"));

    /**
     * An immutable Color instance initialized to CSS color #EE82EE
     * <span class="colorSwath" style="background: #EE82EE;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static VIOLET = Object.freeze(Color.fromCssColorString("#EE82EE"));

    /**
     * An immutable Color instance initialized to CSS color #F5DEB3
     * <span class="colorSwath" style="background: #F5DEB3;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static WHEAT = Object.freeze(Color.fromCssColorString("#F5DEB3"));

    /**
     * An immutable Color instance initialized to CSS color #FFFFFF
     * <span class="colorSwath" style="background: #FFFFFF;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static WHITE = Object.freeze(Color.fromCssColorString("#FFFFFF"));

    /**
     * An immutable Color instance initialized to CSS color #F5F5F5
     * <span class="colorSwath" style="background: #F5F5F5;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static WHITESMOKE = Object.freeze(Color.fromCssColorString("#F5F5F5"));

    /**
     * An immutable Color instance initialized to CSS color #FFFF00
     * <span class="colorSwath" style="background: #FFFF00;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static YELLOW = Object.freeze(Color.fromCssColorString("#FFFF00"));

    /**
     * An immutable Color instance initialized to CSS color #9ACD32
     * <span class="colorSwath" style="background: #9ACD32;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static YELLOWGREEN = Object.freeze(Color.fromCssColorString("#9ACD32"));

    /**
     * An immutable Color instance initialized to CSS transparent.
     * <span class="colorSwath" style="background: transparent;display: block;width: 100%;height: 15px;"></span>
     *
     * @constant
     * @type {Color}
     */
    static TRANSPARENT = Object.freeze(new Color(0, 0, 0, 0));

}