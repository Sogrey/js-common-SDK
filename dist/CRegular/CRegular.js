export class CRegular {
}
CRegular.checkID = (value) => {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value);
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