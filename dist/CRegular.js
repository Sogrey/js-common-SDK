import { BaseObject } from "./BaseObject";
export class CRegular extends BaseObject {
}
CRegular.isRegExp = (value) => {
    return Object.prototype.toString.call(value) === '[object RegExp]';
};
CRegular.checkID = (value) => {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value);
};
CRegular.isCardID = (sId) => {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
        console.log('你输入的身份证长度或格式错误');
        return false;
    }
    class City {
    }
    var aCityMap = new Map();
    aCityMap.set(11, "北京");
    aCityMap.set(12, "天津");
    aCityMap.set(13, "河北");
    aCityMap.set(14, "山西");
    aCityMap.set(15, "内蒙古");
    aCityMap.set(21, "辽宁");
    aCityMap.set(22, "吉林");
    aCityMap.set(23, "黑龙江");
    aCityMap.set(31, "上海");
    aCityMap.set(32, "江苏");
    aCityMap.set(33, "浙江");
    aCityMap.set(34, "安徽");
    aCityMap.set(35, "福建");
    aCityMap.set(36, "江西");
    aCityMap.set(37, "山东");
    aCityMap.set(41, "河南");
    aCityMap.set(42, "湖北");
    aCityMap.set(43, "湖南");
    aCityMap.set(44, "广东");
    aCityMap.set(45, "广西");
    aCityMap.set(46, "海南");
    aCityMap.set(50, "重庆");
    aCityMap.set(51, "四川");
    aCityMap.set(52, "贵州");
    aCityMap.set(53, "云南");
    aCityMap.set(54, "西藏");
    aCityMap.set(61, "陕西");
    aCityMap.set(62, "甘肃");
    aCityMap.set(63, "青海");
    aCityMap.set(64, "宁夏");
    aCityMap.set(65, "新疆");
    aCityMap.set(71, "台湾");
    aCityMap.set(81, "香港");
    aCityMap.set(82, "澳门");
    aCityMap.set(91, "国外");
    var cityId = parseInt(sId.substr(0, 2));
    if (!aCityMap.has(cityId) || !aCityMap.get(cityId)) {
        console.log('你的身份证地区非法');
        return false;
    }
    var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"), d = new Date(sBirthday);
    if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
        console.log('身份证上的出生日期非法');
        return false;
    }
    var sum = 0, weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], codes = "10X98765432";
    for (var i = 0; i < sId.length - 1; i++) {
        sum += parseInt(sId.substr(i, 1)) * weights[i];
    }
    var last = codes[sum % 11];
    if (sId[sId.length - 1] != last) {
        console.log('你输入的身份证号非法');
        return false;
    }
    return true;
};
CRegular.haveCNChars = (value) => {
    return /[\u4e00-\u9fa5]/.test(value);
};
CRegular.isPostCode = (value) => {
    return /^[1-9][0-9]{5}$/.test(value.toString());
};
CRegular.isIPv6 = (str) => {
    return Boolean(str.match(/:/g) ? str.match(/:/g).length <= 7 : false && /::/.test(str) ? /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str) : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
};
CRegular.isEmail = (value) => {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
};
CRegular.isTel = (value) => {
    return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
};
CRegular.isEmojiCharacter = (value) => {
    value = String(value);
    for (let i = 0; i < value.length; i++) {
        const hs = value.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (value.length > 1) {
                const ls = value.charCodeAt(i + 1);
                const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        }
        else if (value.length > 1) {
            const ls = value.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        }
        else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            }
            else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            }
            else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            }
            else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            }
            else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                return true;
            }
        }
    }
    return false;
};
//# sourceMappingURL=CRegular.js.map