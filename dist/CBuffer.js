import { BaseObject } from "./BaseObject";
export class CBuffer extends BaseObject {
}
CBuffer.Uint8ArrayToString = (fileData) => {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
};
CBuffer.stringToUint8Array = (str) => {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }
    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
};
CBuffer.stringToBytes = (str) => {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }
        else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }
        else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        }
        else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
};
CBuffer.byteToString = (byte) => {
    if (typeof byte === 'string') {
        return byte;
    }
    var str = '', _arr = byte;
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        }
        else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
};
CBuffer.toInt32 = (value) => {
    var bytes = CBuffer.stringToBytes(value);
    return (bytes[3] & 0xFF) << 24 | ((bytes[2] & 0xFF) << 16) | ((bytes[1] & 0xFF) << 8) | (bytes[0] & 0xFF);
};
CBuffer.toUInt16 = (value) => {
    var bytes = CBuffer.stringToBytes(value);
    return ((bytes[0] & 0xFF) << 8) | (bytes[1] & 0xFF);
};
CBuffer.bytesToFloat = (data) => {
    let num = data[0] | data[1] << 8 | data[2] << 16 | data[3] << 24;
    const s = num & 0x80000000;
    const e = ((num >> 23) & 0x0FF) - 127;
    const m = num & 0x007FFFFF;
    function getDiv(cnt) {
        let val = 1;
        for (let i = 0; i < cnt; i++) {
            val = 2 * val;
        }
        return 0.5 / val;
    }
    let ee = 0;
    let floatVal = 0;
    if (e == 0) {
        let val = 0.5;
        for (let i = e + 1; i < 23; i++) {
            if (0x01 & (m >> (23 - i))) {
                val += getDiv(i - e);
            }
            else {
                val -= getDiv(i);
            }
        }
        floatVal = val;
    }
    else if (e > 0) {
        const rightCnt = 23 - e;
        ee = 1 << e | m >> rightCnt;
        let val = 0.5;
        for (let i = e + 1; i < 23; i++) {
            if (0x01 & (m >> (23 - i))) {
                val += getDiv(i - e);
            }
            else {
                val -= getDiv(i);
            }
        }
        floatVal = ee;
    }
    else {
        ee = 1 >> (-1 * e);
    }
    if (s == 0) {
        return floatVal;
    }
    else {
        return -1 * floatVal;
    }
};
//# sourceMappingURL=CBuffer.js.map