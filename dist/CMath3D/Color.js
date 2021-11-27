import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { CMath } from "./CMath";
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
var rgbaMatcher = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i;
var rrggbbaaMatcher = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i;
var rgbParenthesesMatcher = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
var hslParenthesesMatcher = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
function hue2rgb(m1, m2, h) {
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
    constructor(r, g, b, a) {
        this.r = 1;
        this.g = 1;
        this.b = 1;
        this.a = 1;
        this.isColor = true;
        this.getHex = () => {
            return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;
        };
        this.getHexString = () => {
            return ('000000' + this.getHex().toString(16)).slice(-6);
        };
        this.toString = () => {
            return ("(" +
                this.r +
                ", " +
                this.g +
                ", " +
                this.b +
                ", " +
                this.a +
                ")");
        };
        this.toCssColorString = () => {
            var red = Color.floatToByte(this.r);
            var green = Color.floatToByte(this.g);
            var blue = Color.floatToByte(this.b);
            if (this.a === 1) {
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
            return "rgba(" + red + "," + green + "," + blue + "," + this.a + ")";
        };
        this.toCssHexString = () => {
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
        this.toBytes = (result) => {
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
        this.withAlpha = (alpha, result) => {
            return Color.fromAlpha(this, alpha, result);
        };
        this.equals = (c) => {
            return (c.r === this.r) && (c.g === this.g) && (c.b === this.b) && (c.a === this.a);
        };
        this.r = defaultValue(r, 1.0);
        this.g = defaultValue(g, 1.0);
        this.b = defaultValue(b, 1.0);
        this.a = defaultValue(a, 1.0);
    }
}
Color._NAMES = _colorKeywords;
Color.fromVector4 = function (v4, result) {
    if (!defined(result)) {
        return new Color(v4.x, v4.y, v4.z, v4.w);
    }
    result.r = v4.x;
    result.g = v4.y;
    result.b = v4.z;
    result.a = v4.w;
    return result;
};
Color.fromBytes = function (r, g, b, a, result) {
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
Color.fromAlpha = function (color, alpha, result) {
    if (!defined(result)) {
        return new Color(color.r, color.g, color.b, alpha);
    }
    result.r = color.r;
    result.g = color.g;
    result.b = color.b;
    result.a = alpha;
    return result;
};
Color.fromDec = function (colorDec, result) {
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
Color.fromHex = Color.fromDec;
Color.fromHsl = function (hue, saturation, lightness, alpha, result) {
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
        }
        else {
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
Color.fromCssColorString = function (color, result) {
    if (!defined(result)) {
        result = new Color();
    }
    color = color.replace(/\s/g, "");
    var namedColor = Color._NAMES[color.toLowerCase()];
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
        return Color.fromHsl(parseFloat(matches[1]) / 360.0, parseFloat(matches[2]) / 100.0, parseFloat(matches[3]) / 100.0, parseFloat(defaultValue(matches[4], "1.0")), result);
    }
    return undefined;
};
Color.packedLength = 4;
Color.byteToFloat = function (number) {
    return number / 255.0;
};
Color.floatToByte = function (number) {
    return number === 1.0 ? 255.0 : (number * 256.0) | 0;
};
Color.clone = function (color, result) {
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
Color.add = function (left, right, result) {
    result.r = left.r + right.r;
    result.g = left.g + right.g;
    result.b = left.b + right.b;
    result.a = left.a + right.a;
    return result;
};
Color.subtract = function (left, right, result) {
    result.r = left.r - right.r;
    result.g = left.g - right.g;
    result.b = left.b - right.b;
    result.a = left.a - right.a;
    return result;
};
Color.multiply = function (left, right, result) {
    result.r = left.r * right.r;
    result.g = left.g * right.g;
    result.b = left.b * right.b;
    result.a = left.a * right.a;
    return result;
};
Color.divide = function (left, right, result) {
    result.r = left.r / right.r;
    result.g = left.g / right.g;
    result.b = left.b / right.b;
    result.a = left.a / right.a;
    return result;
};
Color.mod = function (left, right, result) {
    result.r = left.r % right.r;
    result.g = left.g % right.g;
    result.b = left.b % right.b;
    result.a = left.a % right.a;
    return result;
};
Color.lerp = function (start, end, t, result) {
    result.r = CMath.lerp(start.r, end.r, t);
    result.g = CMath.lerp(start.g, end.g, t);
    result.b = CMath.lerp(start.b, end.b, t);
    result.a = CMath.lerp(start.a, end.a, t);
    return result;
};
Color.multiplyByScalar = function (color, scalar, result) {
    result.r = color.r * scalar;
    result.g = color.g * scalar;
    result.b = color.b * scalar;
    result.a = color.a * scalar;
    return result;
};
Color.divideByScalar = function (color, scalar, result) {
    result.r = color.r / scalar;
    result.g = color.g / scalar;
    result.b = color.b / scalar;
    result.a = color.a / scalar;
    return result;
};
Color.ALICEBLUE = Object.freeze(Color.fromCssColorString("#F0F8FF"));
Color.ANTIQUEWHITE = Object.freeze(Color.fromCssColorString("#FAEBD7"));
Color.AQUA = Object.freeze(Color.fromCssColorString("#00FFFF"));
Color.AQUAMARINE = Object.freeze(Color.fromCssColorString("#7FFFD4"));
Color.AZURE = Object.freeze(Color.fromCssColorString("#F0FFFF"));
Color.BEIGE = Object.freeze(Color.fromCssColorString("#F5F5DC"));
Color.BISQUE = Object.freeze(Color.fromCssColorString("#FFE4C4"));
Color.BLACK = Object.freeze(Color.fromCssColorString("#000000"));
Color.BLANCHEDALMOND = Object.freeze(Color.fromCssColorString("#FFEBCD"));
Color.BLUE = Object.freeze(Color.fromCssColorString("#0000FF"));
Color.BLUEVIOLET = Object.freeze(Color.fromCssColorString("#8A2BE2"));
Color.BROWN = Object.freeze(Color.fromCssColorString("#A52A2A"));
Color.BURLYWOOD = Object.freeze(Color.fromCssColorString("#DEB887"));
Color.CADETBLUE = Object.freeze(Color.fromCssColorString("#5F9EA0"));
Color.CHARTREUSE = Object.freeze(Color.fromCssColorString("#7FFF00"));
Color.CHOCOLATE = Object.freeze(Color.fromCssColorString("#D2691E"));
Color.CORAL = Object.freeze(Color.fromCssColorString("#FF7F50"));
Color.CORNFLOWERBLUE = Object.freeze(Color.fromCssColorString("#6495ED"));
Color.CORNSILK = Object.freeze(Color.fromCssColorString("#FFF8DC"));
Color.CRIMSON = Object.freeze(Color.fromCssColorString("#DC143C"));
Color.CYAN = Object.freeze(Color.fromCssColorString("#00FFFF"));
Color.DARKBLUE = Object.freeze(Color.fromCssColorString("#00008B"));
Color.DARKCYAN = Object.freeze(Color.fromCssColorString("#008B8B"));
Color.DARKGOLDENROD = Object.freeze(Color.fromCssColorString("#B8860B"));
Color.DARKGRAY = Object.freeze(Color.fromCssColorString("#A9A9A9"));
Color.DARKGREEN = Object.freeze(Color.fromCssColorString("#006400"));
Color.DARKGREY = Color.DARKGRAY;
Color.DARKKHAKI = Object.freeze(Color.fromCssColorString("#BDB76B"));
Color.DARKMAGENTA = Object.freeze(Color.fromCssColorString("#8B008B"));
Color.DARKOLIVEGREEN = Object.freeze(Color.fromCssColorString("#556B2F"));
Color.DARKORANGE = Object.freeze(Color.fromCssColorString("#FF8C00"));
Color.DARKORCHID = Object.freeze(Color.fromCssColorString("#9932CC"));
Color.DARKRED = Object.freeze(Color.fromCssColorString("#8B0000"));
Color.DARKSALMON = Object.freeze(Color.fromCssColorString("#E9967A"));
Color.DARKSEAGREEN = Object.freeze(Color.fromCssColorString("#8FBC8F"));
Color.DARKSLATEBLUE = Object.freeze(Color.fromCssColorString("#483D8B"));
Color.DARKSLATEGRAY = Object.freeze(Color.fromCssColorString("#2F4F4F"));
Color.DARKSLATEGREY = Color.DARKSLATEGRAY;
Color.DARKTURQUOISE = Object.freeze(Color.fromCssColorString("#00CED1"));
Color.DARKVIOLET = Object.freeze(Color.fromCssColorString("#9400D3"));
Color.DEEPPINK = Object.freeze(Color.fromCssColorString("#FF1493"));
Color.DEEPSKYBLUE = Object.freeze(Color.fromCssColorString("#00BFFF"));
Color.DIMGRAY = Object.freeze(Color.fromCssColorString("#696969"));
Color.DIMGREY = Color.DIMGRAY;
Color.DODGERBLUE = Object.freeze(Color.fromCssColorString("#1E90FF"));
Color.FIREBRICK = Object.freeze(Color.fromCssColorString("#B22222"));
Color.FLORALWHITE = Object.freeze(Color.fromCssColorString("#FFFAF0"));
Color.FORESTGREEN = Object.freeze(Color.fromCssColorString("#228B22"));
Color.FUCHSIA = Object.freeze(Color.fromCssColorString("#FF00FF"));
Color.GAINSBORO = Object.freeze(Color.fromCssColorString("#DCDCDC"));
Color.GHOSTWHITE = Object.freeze(Color.fromCssColorString("#F8F8FF"));
Color.GOLD = Object.freeze(Color.fromCssColorString("#FFD700"));
Color.GOLDENROD = Object.freeze(Color.fromCssColorString("#DAA520"));
Color.GRAY = Object.freeze(Color.fromCssColorString("#808080"));
Color.GREEN = Object.freeze(Color.fromCssColorString("#008000"));
Color.GREENYELLOW = Object.freeze(Color.fromCssColorString("#ADFF2F"));
Color.GREY = Color.GRAY;
Color.HONEYDEW = Object.freeze(Color.fromCssColorString("#F0FFF0"));
Color.HOTPINK = Object.freeze(Color.fromCssColorString("#FF69B4"));
Color.INDIANRED = Object.freeze(Color.fromCssColorString("#CD5C5C"));
Color.INDIGO = Object.freeze(Color.fromCssColorString("#4B0082"));
Color.IVORY = Object.freeze(Color.fromCssColorString("#FFFFF0"));
Color.KHAKI = Object.freeze(Color.fromCssColorString("#F0E68C"));
Color.LAVENDER = Object.freeze(Color.fromCssColorString("#E6E6FA"));
Color.LAVENDAR_BLUSH = Object.freeze(Color.fromCssColorString("#FFF0F5"));
Color.LAWNGREEN = Object.freeze(Color.fromCssColorString("#7CFC00"));
Color.LEMONCHIFFON = Object.freeze(Color.fromCssColorString("#FFFACD"));
Color.LIGHTBLUE = Object.freeze(Color.fromCssColorString("#ADD8E6"));
Color.LIGHTCORAL = Object.freeze(Color.fromCssColorString("#F08080"));
Color.LIGHTCYAN = Object.freeze(Color.fromCssColorString("#E0FFFF"));
Color.LIGHTGOLDENRODYELLOW = Object.freeze(Color.fromCssColorString("#FAFAD2"));
Color.LIGHTGRAY = Object.freeze(Color.fromCssColorString("#D3D3D3"));
Color.LIGHTGREEN = Object.freeze(Color.fromCssColorString("#90EE90"));
Color.LIGHTGREY = Color.LIGHTGRAY;
Color.LIGHTPINK = Object.freeze(Color.fromCssColorString("#FFB6C1"));
Color.LIGHTSEAGREEN = Object.freeze(Color.fromCssColorString("#20B2AA"));
Color.LIGHTSKYBLUE = Object.freeze(Color.fromCssColorString("#87CEFA"));
Color.LIGHTSLATEGRAY = Object.freeze(Color.fromCssColorString("#778899"));
Color.LIGHTSLATEGREY = Color.LIGHTSLATEGRAY;
Color.LIGHTSTEELBLUE = Object.freeze(Color.fromCssColorString("#B0C4DE"));
Color.LIGHTYELLOW = Object.freeze(Color.fromCssColorString("#FFFFE0"));
Color.LIME = Object.freeze(Color.fromCssColorString("#00FF00"));
Color.LIMEGREEN = Object.freeze(Color.fromCssColorString("#32CD32"));
Color.LINEN = Object.freeze(Color.fromCssColorString("#FAF0E6"));
Color.MAGENTA = Object.freeze(Color.fromCssColorString("#FF00FF"));
Color.MAROON = Object.freeze(Color.fromCssColorString("#800000"));
Color.MEDIUMAQUAMARINE = Object.freeze(Color.fromCssColorString("#66CDAA"));
Color.MEDIUMBLUE = Object.freeze(Color.fromCssColorString("#0000CD"));
Color.MEDIUMORCHID = Object.freeze(Color.fromCssColorString("#BA55D3"));
Color.MEDIUMPURPLE = Object.freeze(Color.fromCssColorString("#9370DB"));
Color.MEDIUMSEAGREEN = Object.freeze(Color.fromCssColorString("#3CB371"));
Color.MEDIUMSLATEBLUE = Object.freeze(Color.fromCssColorString("#7B68EE"));
Color.MEDIUMSPRINGGREEN = Object.freeze(Color.fromCssColorString("#00FA9A"));
Color.MEDIUMTURQUOISE = Object.freeze(Color.fromCssColorString("#48D1CC"));
Color.MEDIUMVIOLETRED = Object.freeze(Color.fromCssColorString("#C71585"));
Color.MIDNIGHTBLUE = Object.freeze(Color.fromCssColorString("#191970"));
Color.MINTCREAM = Object.freeze(Color.fromCssColorString("#F5FFFA"));
Color.MISTYROSE = Object.freeze(Color.fromCssColorString("#FFE4E1"));
Color.MOCCASIN = Object.freeze(Color.fromCssColorString("#FFE4B5"));
Color.NAVAJOWHITE = Object.freeze(Color.fromCssColorString("#FFDEAD"));
Color.NAVY = Object.freeze(Color.fromCssColorString("#000080"));
Color.OLDLACE = Object.freeze(Color.fromCssColorString("#FDF5E6"));
Color.OLIVE = Object.freeze(Color.fromCssColorString("#808000"));
Color.OLIVEDRAB = Object.freeze(Color.fromCssColorString("#6B8E23"));
Color.ORANGE = Object.freeze(Color.fromCssColorString("#FFA500"));
Color.ORANGERED = Object.freeze(Color.fromCssColorString("#FF4500"));
Color.ORCHID = Object.freeze(Color.fromCssColorString("#DA70D6"));
Color.PALEGOLDENROD = Object.freeze(Color.fromCssColorString("#EEE8AA"));
Color.PALEGREEN = Object.freeze(Color.fromCssColorString("#98FB98"));
Color.PALETURQUOISE = Object.freeze(Color.fromCssColorString("#AFEEEE"));
Color.PALEVIOLETRED = Object.freeze(Color.fromCssColorString("#DB7093"));
Color.PAPAYAWHIP = Object.freeze(Color.fromCssColorString("#FFEFD5"));
Color.PEACHPUFF = Object.freeze(Color.fromCssColorString("#FFDAB9"));
Color.PERU = Object.freeze(Color.fromCssColorString("#CD853F"));
Color.PINK = Object.freeze(Color.fromCssColorString("#FFC0CB"));
Color.PLUM = Object.freeze(Color.fromCssColorString("#DDA0DD"));
Color.POWDERBLUE = Object.freeze(Color.fromCssColorString("#B0E0E6"));
Color.PURPLE = Object.freeze(Color.fromCssColorString("#800080"));
Color.RED = Object.freeze(Color.fromCssColorString("#FF0000"));
Color.ROSYBROWN = Object.freeze(Color.fromCssColorString("#BC8F8F"));
Color.ROYALBLUE = Object.freeze(Color.fromCssColorString("#4169E1"));
Color.SADDLEBROWN = Object.freeze(Color.fromCssColorString("#8B4513"));
Color.SALMON = Object.freeze(Color.fromCssColorString("#FA8072"));
Color.SANDYBROWN = Object.freeze(Color.fromCssColorString("#F4A460"));
Color.SEAGREEN = Object.freeze(Color.fromCssColorString("#2E8B57"));
Color.SEASHELL = Object.freeze(Color.fromCssColorString("#FFF5EE"));
Color.SIENNA = Object.freeze(Color.fromCssColorString("#A0522D"));
Color.SILVER = Object.freeze(Color.fromCssColorString("#C0C0C0"));
Color.SKYBLUE = Object.freeze(Color.fromCssColorString("#87CEEB"));
Color.SLATEBLUE = Object.freeze(Color.fromCssColorString("#6A5ACD"));
Color.SLATEGRAY = Object.freeze(Color.fromCssColorString("#708090"));
Color.SLATEGREY = Color.SLATEGRAY;
Color.SNOW = Object.freeze(Color.fromCssColorString("#FFFAFA"));
Color.SPRINGGREEN = Object.freeze(Color.fromCssColorString("#00FF7F"));
Color.STEELBLUE = Object.freeze(Color.fromCssColorString("#4682B4"));
Color.TAN = Object.freeze(Color.fromCssColorString("#D2B48C"));
Color.TEAL = Object.freeze(Color.fromCssColorString("#008080"));
Color.THISTLE = Object.freeze(Color.fromCssColorString("#D8BFD8"));
Color.TOMATO = Object.freeze(Color.fromCssColorString("#FF6347"));
Color.TURQUOISE = Object.freeze(Color.fromCssColorString("#40E0D0"));
Color.VIOLET = Object.freeze(Color.fromCssColorString("#EE82EE"));
Color.WHEAT = Object.freeze(Color.fromCssColorString("#F5DEB3"));
Color.WHITE = Object.freeze(Color.fromCssColorString("#FFFFFF"));
Color.WHITESMOKE = Object.freeze(Color.fromCssColorString("#F5F5F5"));
Color.YELLOW = Object.freeze(Color.fromCssColorString("#FFFF00"));
Color.YELLOWGREEN = Object.freeze(Color.fromCssColorString("#9ACD32"));
Color.TRANSPARENT = Object.freeze(new Color(0, 0, 0, 0));
//# sourceMappingURL=Color.js.map