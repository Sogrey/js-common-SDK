import { BaseObject } from "./BaseObject";
import { defined } from "./defined";

/**
 * URL操作
 * 
 * This is the doc comment for CUrl
 *
 * @module CUrl
 */
export class CUrl extends BaseObject {
    /**
     * URL参数反序列化
     * @param url 带参数url
     * @example 
     * <pre><code>
     * // 假设URL为：https://www.baidu.com?age=25&name=TYJ
     * parseUrlSearch('https://www.baidu.com?age=25&name=TYJ');
     * // { age: "25", name: "TYJ" }
     * </code></pre> 
     * @returns 
     */
    static parseUrlSearch = function (url?: string) {
        if (!defined(url) && defined(location) && defined(location.search))
            url = location.search;
        return url!.replace(/(^\?)|(&$)/g, "").split("&").reduce((t: any, v) => {
            const [key, val] = v.split("=");
            t[key] = decodeURIComponent(val);
            return t;
        }, {});
    }
    /**
     * 获取url参数
     * @param variable 参数名
     * @returns 返回参数值
     */
    static getQueryVariable = (variable: string, url?: string) => {
        var query: string = "";
        if (url && url.includes('?')) {
            query = url.split("?")[1];
        } else {
            query = url || window.location.search.substring(1);
        }
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return undefined;
    }

    /**
     * 监测url是否有效
     * @param URL 
     * @returns 
     */
    static getUrlState = (url: string) => {
        let xmlhttp = new ActiveXObject("microsoft.xmlhttp");
        xmlhttp.Open("GET", url, false);
        try {
            xmlhttp.Send();
        } catch (e) {
        } finally {
            let result = xmlhttp.responseText;
            if (result) {
                if (xmlhttp.Status == 200) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    /**
     * 键值对拼接成url参数
     * @param obj 键值对
     * @returns 
     */
    static params2Url = (obj: Map<string, any>) => {
        let params = []
        for (let key in obj) {
            params.push(`${key}=${obj.get(key)}`);
        }
        return encodeURIComponent(params.join('&'))
    }

    /**
     * 修改url中的参数
     * @param paramName 参数名
     * @param replaceWith 参数值
     * @param url [可选] url
     * @returns 
     */
    static replaceParamVal = (paramName: string, replaceWith: any, url?: string) => {
        const oUrl = url || location.href.toString();
        const re = eval('/(' + paramName + '=)([^&]*)/gi');
        location.href = oUrl.replace(re, paramName + '=' + replaceWith);
        return location.href;
    }

    /**
     * Determines if the specified uri is a blob uri.
     *
     * @function isBlobUri
     *
     * @param {String} uri The uri to test.
     * @returns {Boolean} true when the uri is a blob uri; otherwise, false.
     *
     */
    static isBlobUri = (uri: string): boolean => {
        var blobUriRegex = /^blob:/i;
        return blobUriRegex.test(uri);
    }

    /**
     * Determines if the specified uri is a data uri.
     *
     * @function isDataUri
     *
     * @param {String} uri The uri to test.
     * @returns {Boolean} true when the uri is a data uri; otherwise, false.
     *
     */
    static isDataUri = (uri: string): boolean => {
        var dataUriRegex = /^data:/i;
        return dataUriRegex.test(uri);
    }
    /**
     * Given a URL, determine whether that URL is considered cross-origin to the current page.
     *
     */
    static isCrossOriginUrl = (url: string): boolean => {

        var a = document.createElement("a");

        // copy window location into the anchor to get consistent results
        // when the port is default for the protocol (e.g. 80 for HTTP)
        a.href = window.location.href;

        // host includes both hostname and port if the port is not standard
        var host = a.host;
        var protocol = a.protocol;

        a.href = url;
        // IE only absolutizes href on get, not set
        // eslint-disable-next-line no-self-assign
        a.href = a.href;

        return protocol !== a.protocol || host !== a.host;
    }
}