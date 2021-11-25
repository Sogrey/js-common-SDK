import { DeveloperError } from "../DeveloperError"

/**
 * 网络相关
 * 
 * This is the doc comment for CNetwork
 *
 * @module CNetwork
 */
export class CNetwork {
    /**
     * 原生js封装ajax
     * @param method 提交方式 GET | POST
     * @param url 访问链接地址
     * @param callback 访问结果回调
     * @param data 参数
     * @param flag 
     */
    static ajax = function (method: string, url: string, callback: Function, data: string, flag: boolean) {
        var xhr: XMLHttpRequest;
        flag = flag || true;
        method = method.toUpperCase();
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHttp');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(2)
                callback(xhr.responseText);
            }
        }

        if (method == 'GET') {
            var date = new Date(),
                timer = date.getTime();
            xhr.open('GET', url + '?' + data + '&timer' + timer, flag);
            xhr.send()
        } else if (method == 'POST') {
            xhr.open('POST', url, flag);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    }
}