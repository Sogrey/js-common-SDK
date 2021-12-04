import { BaseObject } from "./BaseObject";
import { defined } from "./defined";

/**
 * Buffer字节集
 * 
 * This is the doc comment for CBuffer
 *
 * @module CBuffer
 */
export class CBuffer extends BaseObject {
    /**
     * Uint8Array转字符串
     * @param fileData 
     * @returns 
     */
    static Uint8ArrayToString = (fileData: Uint8Array): string => {
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }

        return dataString;
    }

    /**
     * 字符串转Uint8Array
     * @param str 
     * @returns 
     */
    static stringToUint8Array = (str: string): Uint8Array => {
        var arr = [];
        for (var i = 0, j = str.length; i < j; ++i) {
            arr.push(str.charCodeAt(i));
        }

        var tmpUint8Array = new Uint8Array(arr);
        return tmpUint8Array
    }

    /**
     * string 转 byte
     * @param str 
     * @returns 
     */
    static stringToBytes = (str: string) => {
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
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }

    /**
     * byte 转 string
     * @param byte 
     * @returns 
     */
    static byteToString = (byte: string | Array<number>): string => {
        if (typeof byte === 'string') {
            return byte;
        }
        var str = '',
            _arr = byte;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }

    static toInt32 = (value: string) => {
        var bytes = CBuffer.stringToBytes(value);
        return (bytes[3] & 0xFF) << 24 | ((bytes[2] & 0xFF) << 16) | ((bytes[1] & 0xFF) << 8) | (bytes[0] & 0xFF)
    }

    static toUInt16 = (value: string) => {
        var bytes = CBuffer.stringToBytes(value);
        return ((bytes[0] & 0xFF) << 8) | (bytes[1] & 0xFF);
        //return (bytes[1] & 0xFF) << 8 | (bytes[0] & 0xFF)
    }

    static bytesToFloat = (data: number[]): number => {
        let num: number = data[0] | data[1] << 8 | data[2] << 16 | data[3] << 24;
        const s = num & 0x80000000;  //  Sign（1bit）：表示浮点数是正数还是负数。0表示正数，1表示负数
        const e: number = ((num >> 23) & 0x0FF) - 127; //  Exponent（8bits）：指数部分。类似于科学技术法中的M*10^N中的N，只不过这里是以2为底数而不是10。
        //  需要注意的是，这部分中是以2^7-1即127，也即01111111代表2^0，转换时需要根据127作偏移调整。
        const m = num & 0x007FFFFF;  //  Mantissa（23bits）：基数部分。浮点数具体数值的实际表示。

        function getDiv(cnt: number) {
            let val = 1;
            for (let i = 0; i < cnt; i++) {
                val = 2 * val;
            }
            return 0.5 / val;
        }

        //  还原float
        let ee: number = 0;
        let floatVal: number = 0;
        if (e == 0) { //  不需要移位
            let val: number = 0.5;
            for (let i = e + 1; i < 23; i++) {
                if (0x01 & (m >> (23 - i))) {
                    val += getDiv(i - e);
                } else {
                    val -= getDiv(i);
                }
            }
            floatVal = val;
        } else if (e > 0) { //  左移位

            //  计算整数部分值
            const rightCnt = 23 - e;
            ee = 1 << e | m >> rightCnt;

            //  计算后23位中小数部分值
            let val: number = 0.5;
            for (let i = e + 1; i < 23; i++) {
                if (0x01 & (m >> (23 - i))) {
                    val += getDiv(i - e);
                } else {
                    val -= getDiv(i);
                }
            }

            //  todo 暂时不加小数点后面值
            floatVal = ee;
            // floatVal = ee+val;
        } else { //  右移位
            ee = 1 >> (-1 * e);
            //  todo 负数暂时用不到 不实现
        }

        if (s == 0) {
            return floatVal;
        } else {
            return -1 * floatVal;
        }
    }


}
