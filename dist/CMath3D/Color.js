import { defined } from "../defined";
import { defaultValue } from "../defaultValue";
import { CMath } from "./CMath";
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
Color.NAMES = _colorKeywords;
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
    var namedColor = Color.NAMES[color.toLowerCase()];
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