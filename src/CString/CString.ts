import { BaseObject } from "../BaseObject";

/**
 * 字符串操作
 * 
 * This is the doc comment for CString
 *
 * @module CString
 */
export class CString extends BaseObject {
    /**
     * 生成随机字符串
     * <br/>
     * 用于前端生成随机的ID,毕竟现在的Vue和React都需要绑定key
     * @param length 指定随机串长度,默认8
     * @returns 返回生成的随机字符串
     */
    static randomString = (length: number = 8) => {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        length = length || 8;
        var result = ''
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)]
        return result
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

    /**
     * 翻转字符串
     * <br/>
     * 该方法用于将一个字符串进行翻转操作，返回翻转后的字符串
     * @example
     * <pre><code>
     * reverse('hello world');   // 'dlrow olleh'
     * </code></pre>
     * @param str 
     * @returns 返回翻转后的字符串
     */
    static reverse = (str: string) => str.split('').reverse().join('');
    /**
     * 截断字符串
     * <br/>
     * 该方法可以从指定长度处截断字符串,超出使用‘...’
     * @example
     * <pre><code>
     * truncateString('Hi, I should be truncated because I am too loooong!', 36)   // 'Hi, I should be truncated because...'
     * </code></pre>
     * @param string 
     * @param length 
     * @returns 
     */
    static truncateString = (string: string, length: number) => string.length < length ? string : `${string.slice(0, length - 3)}...`;
    /**
     * 去除字符串中的HTML
     * <br/>
     * 该方法用于去除字符串中的HTML元素
     * @example
     * <pre><code>
     * var html = `&lt;ul&gt;
     *     &lt;li&gt;文档本身就是一个文档对象&lt;/li&gt;
     *     &lt;li&gt;所有 HTML 元素都是元素节点&lt;/li&gt;
     *     &lt;li&gt;所有 HTML 属性都是属性节点&lt;/li&gt;
     *     &lt;li&gt;插入到 HTML 元素文本是文本节点&lt;/li&gt;
     *     &lt;li&gt;注释是注释节点&lt;/li&gt;
     * &lt;/ul&gt;`
     * 
     * stripHtml(html);
     * //'\n    文档本身就是一个文档对象\n    所有 HTML 元素都是元素节点\n\t所有 HTML 属性都是属性节点\n\t插入到 HTML 元素文本是文本节点\n\t注释是注释节点\n'
     * </code></pre>
     * @param html HTML字符串
     * @returns 
     */
    static stripHtml = (html: string) => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || '';

    /**
     * 深浅克隆是针对引用值
     * @param target 
     * @returns 
     */
    static deepClone = function (target: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
        if (typeof (target) !== 'object') {
            return target;
        }
        var result: { [x: string]: any; hasOwnProperty: (arg0: string) => any; };
        if (Object.prototype.toString.call(target) == '[object Array]') {
            // 数组
            result = []
        } else {
            // 对象
            result = {};
        }
        for (var prop in target) {
            if (target.hasOwnProperty(prop)) {
                result[prop] = CString.deepClone(target[prop])
            }
        }
        return result;
    }

    /**
     * 找出字符串中第一次只出现一次的字母
     * @param string 
     * @returns 
     */
    static firstAppear = function (string: string) {
        var obj: { [x: string]: any; hasOwnProperty: (arg0: string) => any; } = {},
            len = string.length;
        for (var i = 0; i < len; i++) {
            if (obj[string[i]]) {
                obj[string[i]]++;
            } else {
                obj[string[i]] = 1;
            }
        }
        for (var prop in obj) {
            if (obj[prop] == 1) {
                return prop;
            }
        }
    }
    /**
     * 检验字符串是否是回文
     * @param str 
     * @returns 
     */
    static isPalindrome = function (str: string) {
        if (Object.prototype.toString.call(str) !== '[object String]') {
            return false;
        }
        str = str.replace(/\W/g, '').toLowerCase();
        console.log(str)
        return (str == str.split('').reverse().join(''))
    }

}
