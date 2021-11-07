/**
 * 字符串操作
 * 
 * This is the doc comment for CString
 *
 * @module CString
 */
export class CString {
    /**
     * 生成随机字符串
     * @param len 指定随机串长度
     * @returns 返回生成的随机字符串
     */
    static randomString = (len: number) => {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
        let strLen = chars.length;
        let randomStr = '';
        for (let i = 0; i < len; i++) {
            randomStr += chars.charAt(Math.floor(Math.random() * strLen));
        }
        return randomStr;
    };

    /**
     * 字符串首字母大写
     * @param str 要处理的字符串（首字符英文）
     * @returns 返回处理后字符串
     */
    static fistLetterUpper = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    /**
     * 手机号中间四位变成*
     * @param tel 手机号码
     * @returns 处理后隐藏中间四位的手机号码
     */
    static telFormat = (tel: (string | number)) => {
        tel = String(tel);
        return tel.substr(0, 3) + "****" + tel.substr(7);
    };

    /**
     * 驼峰命名转换成短横线命名
     * @param str 要处理的字符串
     * @returns 返回驼峰命名的字符串
     */
    static getKebabCase = (str: string) => {
        return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
    }

    /**
     * 短横线命名转换成驼峰命名
     * @param str 要处理的字符串
     * @returns 短横线命名的字符串
     */
    static getCamelCase = (str: string) => {
        return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase())
    }

    /**
     * 全角转换为半角
     * @param str 全角字符串
     * @returns 处理为半角的字符串
     */
    static toCDB = (str: string) => {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 65281 && code <= 65374) {
                result += String.fromCharCode(str.charCodeAt(i) - 65248);
            } else if (code == 12288) {
                result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
            } else {
                result += str.charAt(i);
            }
        }
        return result;
    }

    /**
     * 半角转换为全角
     * @param str 半角字符串
     * @returns 处理为全角的字符串
     */
    static toDBC = (str: string) => {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 33 && code <= 126) {
                result += String.fromCharCode(str.charCodeAt(i) + 65248);
            } else if (code == 32) {
                result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
            } else {
                result += str.charAt(i);
            }
        }
        return result;
    }
}
