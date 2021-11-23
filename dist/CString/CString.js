export class CString {
}
CString.randomString = (length = 8) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    length = length || 8;
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
CString.fistLetterUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
CString.telFormat = (tel) => {
    tel = String(tel);
    return tel.substr(0, 3) + "****" + tel.substr(7);
};
CString.getKebabCase = (str) => {
    return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase());
};
CString.getCamelCase = (str) => {
    return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase());
};
CString.toCDB = (str) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if (code >= 65281 && code <= 65374) {
            result += String.fromCharCode(str.charCodeAt(i) - 65248);
        }
        else if (code == 12288) {
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        }
        else {
            result += str.charAt(i);
        }
    }
    return result;
};
CString.toDBC = (str) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if (code >= 33 && code <= 126) {
            result += String.fromCharCode(str.charCodeAt(i) + 65248);
        }
        else if (code == 32) {
            result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
        }
        else {
            result += str.charAt(i);
        }
    }
    return result;
};
//# sourceMappingURL=CString.js.map