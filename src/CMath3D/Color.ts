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
    'ALICEBLUE': 0XF0F8FF, 'ANTIQUEWHITE': 0XFAEBD7, 'AQUA': 0X00FFFF, 'AQUAMARINE': 0X7FFFD4, 'AZURE': 0XF0FFFF,
    'BEIGE': 0XF5F5DC, 'BISQUE': 0XFFE4C4, 'BLACK': 0X000000, 'BLANCHEDALMOND': 0XFFEBCD, 'BLUE': 0X0000FF, 'BLUEVIOLET': 0X8A2BE2,
    'BROWN': 0XA52A2A, 'BURLYWOOD': 0XDEB887, 'CADETBLUE': 0X5F9EA0, 'CHARTREUSE': 0X7FFF00, 'CHOCOLATE': 0XD2691E, 'CORAL': 0XFF7F50,
    'CORNFLOWERBLUE': 0X6495ED, 'CORNSILK': 0XFFF8DC, 'CRIMSON': 0XDC143C, 'CYAN': 0X00FFFF, 'DARKBLUE': 0X00008B, 'DARKCYAN': 0X008B8B,
    'DARKGOLDENROD': 0XB8860B, 'DARKGRAY': 0XA9A9A9, 'DARKGREEN': 0X006400, 'DARKGREY': 0XA9A9A9, 'DARKKHAKI': 0XBDB76B, 'DARKMAGENTA': 0X8B008B,
    'DARKOLIVEGREEN': 0X556B2F, 'DARKORANGE': 0XFF8C00, 'DARKORCHID': 0X9932CC, 'DARKRED': 0X8B0000, 'DARKSALMON': 0XE9967A, 'DARKSEAGREEN': 0X8FBC8F,
    'DARKSLATEBLUE': 0X483D8B, 'DARKSLATEGRAY': 0X2F4F4F, 'DARKSLATEGREY': 0X2F4F4F, 'DARKTURQUOISE': 0X00CED1, 'DARKVIOLET': 0X9400D3,
    'DEEPPINK': 0XFF1493, 'DEEPSKYBLUE': 0X00BFFF, 'DIMGRAY': 0X696969, 'DIMGREY': 0X696969, 'DODGERBLUE': 0X1E90FF, 'FIREBRICK': 0XB22222,
    'FLORALWHITE': 0XFFFAF0, 'FORESTGREEN': 0X228B22, 'FUCHSIA': 0XFF00FF, 'GAINSBORO': 0XDCDCDC, 'GHOSTWHITE': 0XF8F8FF, 'GOLD': 0XFFD700,
    'GOLDENROD': 0XDAA520, 'GRAY': 0X808080, 'GREEN': 0X008000, 'GREENYELLOW': 0XADFF2F, 'GREY': 0X808080, 'HONEYDEW': 0XF0FFF0, 'HOTPINK': 0XFF69B4,
    'INDIANRED': 0XCD5C5C, 'INDIGO': 0X4B0082, 'IVORY': 0XFFFFF0, 'KHAKI': 0XF0E68C, 'LAVENDER': 0XE6E6FA, 'LAVENDERBLUSH': 0XFFF0F5, 'LAWNGREEN': 0X7CFC00,
    'LEMONCHIFFON': 0XFFFACD, 'LIGHTBLUE': 0XADD8E6, 'LIGHTCORAL': 0XF08080, 'LIGHTCYAN': 0XE0FFFF, 'LIGHTGOLDENRODYELLOW': 0XFAFAD2, 'LIGHTGRAY': 0XD3D3D3,
    'LIGHTGREEN': 0X90EE90, 'LIGHTGREY': 0XD3D3D3, 'LIGHTPINK': 0XFFB6C1, 'LIGHTSALMON': 0XFFA07A, 'LIGHTSEAGREEN': 0X20B2AA, 'LIGHTSKYBLUE': 0X87CEFA,
    'LIGHTSLATEGRAY': 0X778899, 'LIGHTSLATEGREY': 0X778899, 'LIGHTSTEELBLUE': 0XB0C4DE, 'LIGHTYELLOW': 0XFFFFE0, 'LIME': 0X00FF00, 'LIMEGREEN': 0X32CD32,
    'LINEN': 0XFAF0E6, 'MAGENTA': 0XFF00FF, 'MAROON': 0X800000, 'MEDIUMAQUAMARINE': 0X66CDAA, 'MEDIUMBLUE': 0X0000CD, 'MEDIUMORCHID': 0XBA55D3,
    'MEDIUMPURPLE': 0X9370DB, 'MEDIUMSEAGREEN': 0X3CB371, 'MEDIUMSLATEBLUE': 0X7B68EE, 'MEDIUMSPRINGGREEN': 0X00FA9A, 'MEDIUMTURQUOISE': 0X48D1CC,
    'MEDIUMVIOLETRED': 0XC71585, 'MIDNIGHTBLUE': 0X191970, 'MINTCREAM': 0XF5FFFA, 'MISTYROSE': 0XFFE4E1, 'MOCCASIN': 0XFFE4B5, 'NAVAJOWHITE': 0XFFDEAD,
    'NAVY': 0X000080, 'OLDLACE': 0XFDF5E6, 'OLIVE': 0X808000, 'OLIVEDRAB': 0X6B8E23, 'ORANGE': 0XFFA500, 'ORANGERED': 0XFF4500, 'ORCHID': 0XDA70D6,
    'PALEGOLDENROD': 0XEEE8AA, 'PALEGREEN': 0X98FB98, 'PALETURQUOISE': 0XAFEEEE, 'PALEVIOLETRED': 0XDB7093, 'PAPAYAWHIP': 0XFFEFD5, 'PEACHPUFF': 0XFFDAB9,
    'PERU': 0XCD853F, 'PINK': 0XFFC0CB, 'PLUM': 0XDDA0DD, 'POWDERBLUE': 0XB0E0E6, 'PURPLE': 0X800080, 'REBECCAPURPLE': 0X663399, 'RED': 0XFF0000, 'ROSYBROWN': 0XBC8F8F,
    'ROYALBLUE': 0X4169E1, 'SADDLEBROWN': 0X8B4513, 'SALMON': 0XFA8072, 'SANDYBROWN': 0XF4A460, 'SEAGREEN': 0X2E8B57, 'SEASHELL': 0XFFF5EE,
    'SIENNA': 0XA0522D, 'SILVER': 0XC0C0C0, 'SKYBLUE': 0X87CEEB, 'SLATEBLUE': 0X6A5ACD, 'SLATEGRAY': 0X708090, 'SLATEGREY': 0X708090, 'SNOW': 0XFFFAFA,
    'SPRINGGREEN': 0X00FF7F, 'STEELBLUE': 0X4682B4, 'TAN': 0XD2B48C, 'TEAL': 0X008080, 'THISTLE': 0XD8BFD8, 'TOMATO': 0XFF6347, 'TURQUOISE': 0X40E0D0,
    'VIOLET': 0XEE82EE, 'WHEAT': 0XF5DEB3, 'WHITE': 0XFFFFFF, 'WHITESMOKE': 0XF5F5F5, 'YELLOW': 0XFFFF00, 'YELLOWGREEN': 0X9ACD32
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
    
    static _NAMES = _colorKeywords;

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
     * <br/>
     * Color.fromDec 同 Color.fromHex
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

    static fromHex = Color.fromDec;

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

        type ColoeNamesKey = keyof typeof Color._NAMES;
        var namedColor: number = Color._NAMES[color.toLowerCase() as ColoeNamesKey];
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