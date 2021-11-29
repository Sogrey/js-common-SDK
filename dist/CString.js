import { BaseObject } from "./BaseObject";
export class CString extends BaseObject {
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
CString.reverse = (str) => str.split('').reverse().join('');
CString.truncateString = (string, length) => string.length < length ? string : `${string.slice(0, length - 3)}...`;
CString.stripHtml = (html) => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || '';
CString.deepClone = function (target) {
    if (typeof (target) !== 'object') {
        return target;
    }
    var result;
    if (Object.prototype.toString.call(target) == '[object Array]') {
        result = [];
    }
    else {
        result = {};
    }
    for (var prop in target) {
        if (target.hasOwnProperty(prop)) {
            result[prop] = CString.deepClone(target[prop]);
        }
    }
    return result;
};
CString.firstAppear = function (string) {
    var obj = {}, len = string.length;
    for (var i = 0; i < len; i++) {
        if (obj[string[i]]) {
            obj[string[i]]++;
        }
        else {
            obj[string[i]] = 1;
        }
    }
    for (var prop in obj) {
        if (obj[prop] == 1) {
            return prop;
        }
    }
};
CString.isPalindrome = function (str) {
    if (Object.prototype.toString.call(str) !== '[object String]') {
        return false;
    }
    str = str.replace(/\W/g, '').toLowerCase();
    console.log(str);
    return (str == str.split('').reverse().join(''));
};
//# sourceMappingURL=CString.js.map