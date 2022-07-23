import { BaseObject } from "./BaseObject";
import { defined } from "./defined";

/**
 * 浏览器操作
 * 
 * This is the doc comment for CBrowser
 *
 * @module CBrowser
 */
export class CBrowser extends BaseObject {

    //运行环境是浏览器
    static inBrowser = typeof window !== 'undefined';
    //浏览器 UA 判断
    static UA = CBrowser.inBrowser && window.navigator.userAgent.toLowerCase();
    static isIE = CBrowser.UA && /msie|trident/.test(CBrowser.UA);
    static isIE9 = CBrowser.UA && CBrowser.UA.indexOf('msie 9.0') > 0;
    static isEdge = CBrowser.UA && CBrowser.UA.indexOf('edge/') > 0;
    static isAndroid = (CBrowser.UA && CBrowser.UA.indexOf('android') > 0);
    static isIOS = (CBrowser.UA && /iphone|ipad|ipod|ios/.test(CBrowser.UA));
    static isChrome = CBrowser.UA && /chrome\/\d+/.test(CBrowser.UA) && !CBrowser.isEdge;

    /**
     * 获取浏览器信息
     * @returns 
     */
    static getExplorerInfo = () => {
        let t = navigator.userAgent.toLowerCase();
        return 0 <= t.indexOf("msie") ? { //ie < 11
            type: "IE",
            version: Number(t.match(/msie ([\d]+)/)![1])
        } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
            type: "IE",
            version: 11
        } : 0 <= t.indexOf("edge") ? {
            type: "Edge",
            version: Number(t.match(/edge\/([\d]+)/)![1])
        } : 0 <= t.indexOf("firefox") ? {
            type: "Firefox",
            version: Number(t.match(/firefox\/([\d]+)/)![1])
        } : 0 <= t.indexOf("chrome") ? {
            type: "Chrome",
            version: Number(t.match(/chrome\/([\d]+)/)![1])
        } : 0 <= t.indexOf("opera") ? {
            type: "Opera",
            version: Number(t.match(/opera.([\d]+)/)![1])
        } : 0 <= t.indexOf("Safari") ? {
            type: "Safari",
            version: Number(t.match(/version\/([\d]+)/)![1])
        } : {
            type: t,
            version: -1
        }
    }

    /**
     * 检测是否为PC端浏览器模式
     * @returns 
     */
    static isPCBroswer = () => {
        let e = navigator.userAgent.toLowerCase(),
            t = "ipad" == e.match(/ipad/i)!.toString(),
            i = "iphone" == e.match(/iphone/i)!.toString(),
            r = "midp" == e.match(/midp/i)!.toString(),
            n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)!.toString(),
            a = "ucweb" == e.match(/ucweb/i)!.toString(),
            o = "android" == e.match(/android/i)!.toString(),
            s = "windows ce" == e.match(/windows ce/i)!.toString(),
            l = "windows mobile" == e.match(/windows mobile/i)!.toString();
        return !(t || i || r || n || a || o || s || l)
    }

    /**
     * 判断value是不是浏览器内置函数
     * <br/>
     * 内置函数toString后的主体代码块为[native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝（toString后掐头去尾再由Function转）
     */
    static isNative = (value: any) => {
        return typeof value === 'function' && /native code/.test(value.toString())
    }

    /**
     * 重定向到一个URL
     * <br/>
     * 该方法用于重定向到一个新的URL
     * @example
     * <pre><code>
     * CBrowser.redirect("https://www.google.com/")
     * </code></pre>
     * @param url 
     * @returns 
     */
    static redirect = (url: string) => location.href = url;

    /**
     * 打开浏览器打印框
     * <br/>
     * 该方法用于打开浏览器的打印框
     * @returns 
     */
    static showPrintDialog = () => window.print();

    /**
     * 复制内容到剪切板
     * <br/>
     * 该方法使用 navigator.clipboard.writeText 来实现将文本复制到剪贴板
     * @example
     * <pre><code>
     * CBrowser.copyToClipboard("Hello World");
     * </code></pre>
     * @param text 
     * @returns 
     */
    static copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

    /**
     * 获取选中的文本
     * <br/>
     * 该方法通过内置的 getSelection 属性获取用户选择的文本
     * @example
     * <pre><code>
     * CBrowser.getSelectedText();
     * </code></pre>
     * @returns 
     */
    static getSelectedText = () => window.getSelection()!.toString();

    /**
     *  滚动到页面顶部
     */
    static scrollToTop = () => {
        const height = document.documentElement.scrollTop || document.body.scrollTop;
        if (height > 0) {
            window.requestAnimationFrame(CBrowser.scrollToTop);
            window.scrollTo(0, height - height / 8);
        }
    }

    /**
     * 滚动到页面底部
     */
    static scrollToBottom = () => {
        window.scrollTo(0, document.documentElement.clientHeight);
    }

    /**
     * 是否滚动到页面底部
     * <br/>
     * 该方法用于判断页面是否已经底部
     * @returns 
     */
    static scrolledToBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;

    /**
     * 滚动到指定元素区域
     * @param element 
     */
    static smoothScroll = (element: string) => {
        document.querySelector(element)!.scrollIntoView({
            behavior: 'smooth'
        });
    };

    /**
     * 获得滚动条的滚动距离
     * @returns 
     */
    static getScrollOffset = function () {
        if (window.pageXOffset) {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            }
        } else {
            return {
                x: document.body.scrollLeft + document.documentElement.scrollLeft,
                y: document.body.scrollTop + document.documentElement.scrollTop
            }
        }
    }

    /**
     * 获取可视窗口高度
     * @returns 
     */
    static getClientHeight = () => {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }

    /**
     * 获取可视窗口宽度
     * @returns 
     */
    static getPageViewWidth = () => {
        return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
    }

    /**
     * 获得视口的尺寸
     * @returns 
     */
    static getViewportOffset = function () {
        if (window.innerWidth) {
            return {
                w: window.innerWidth,
                h: window.innerHeight
            }
        } else {
            // ie8及其以下
            if (document.compatMode === "BackCompat") {
                // 怪异模式
                return {
                    w: document.body.clientWidth,
                    h: document.body.clientHeight
                }
            } else {
                // 标准模式
                return {
                    w: document.documentElement.clientWidth,
                    h: document.documentElement.clientHeight
                }
            }
        }
    }

    /**
     * 遍历Dom树
     * <br/>
     * 给定页面上的DOM元素,将访问元素本身及其所有后代(不仅仅是它的直接子元素),对于每个访问的元素，函数讲元素传递给提供的回调函数
     * @param element 
     * @param callback 
     */
    static traverse = function (element: Element, callback: Function) {
        callback(element);
        var list = element.children;
        for (var i = 0; i < list.length; i++) {
            CBrowser.traverse(list[i], callback);
        }
    }


    // /**
    //  * 打开浏览器全屏
    //  */
    // static toFullScreen = () => {
    //     let element = document.body;
    //     if (element.requestFullscreen) {
    //         element.requestFullscreen()
    //     } else if (element.mozRequestFullScreen) {
    //         element.mozRequestFullScreen()
    //     } else if (element.msRequestFullscreen) {
    //         element.msRequestFullscreen()
    //     } else if (element.webkitRequestFullscreen) {
    //         element.webkitRequestFullScreen()
    //     }
    // }

    // /**
    //  *  退出浏览器全屏
    //  */
    // static exitFullscreen = () => {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen()
    //     } else if (document.msExitFullscreen) {
    //         document.msExitFullscreen()
    //     } else if (document.mozCancelFullScreen) {
    //         document.mozCancelFullScreen()
    //     } else if (document.webkitExitFullscreen) {
    //         document.webkitExitFullscreen()
    //     }
    // }

    /**
     * 找元素的第n级父元素
     * @param ele 
     * @param n 
     * @returns 
     */
    static parents = function (ele: HTMLElement, n: number = 1) {
        while (ele && n) {
            ele = ele.parentElement ? ele.parentElement : ele.parentNode as HTMLElement;
            n--;
        }
        return ele;
    }

    /**
     * 封装mychildren，解决浏览器的兼容问题
     * @param e 
     * @returns 
     */
    static myChildren = function (e: HTMLElement) {
        var children = e.childNodes,
            arr = [],
            len = children.length;
        for (var i = 0; i < len; i++) {
            if (children[i].nodeType === 1) {
                arr.push(children[i])
            }
        }
        return arr;
    }
    /**
     * 判断元素有没有子元素
     * @param e 
     * @returns 
     */
    static hasChildren = function (e: HTMLElement) {
        var children = e.childNodes,
            len = children.length;
        for (var i = 0; i < len; i++) {
            if (children[i].nodeType === 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * 兼容getElementsByClassName方法
     * @param className 
     * @returns 
     */
    static getElementsByClassName = function (className: string) {
        var allDomArray = document.getElementsByTagName('*');
        var lastDomArray = [];
        function trimSpace(_strClass: string) {
            var reg = /\s+/g;
            return _strClass.replace(reg, ' ').trim()
        }
        for (var i = 0; i < allDomArray.length; i++) {
            var classArray = trimSpace(allDomArray[i].className).split(' ');
            for (var j = 0; j < classArray.length; j++) {
                if (classArray[j] == className) {
                    lastDomArray.push(allDomArray[i]);
                    break;
                }
            }
        }
        return lastDomArray;
    }

    /**
     * el是否包含某个class
     * @param el html元素
     * @param className class name
     * @returns 
     */
    static hasClass = (el: HTMLElement, className: string) => {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        return reg.test(el.className)
    }

    /**
     * el添加某个class
     * @param el html元素
     * @param className class name
     * @returns 
     */
    static addClass = (el: HTMLElement, className: string) => {
        if (CBrowser.hasClass(el, className)) {
            return
        }
        let newClass = el.className.split(' ')
        newClass.push(className)
        el.className = newClass.join(' ')
    }
    /**
     * el去除某个class
     * @param el html元素
     * @param className class name
     * @returns 
     */
    static removeClass = (el: HTMLElement, className: string) => {
        if (!CBrowser.hasClass(el, className)) {
            return
        }
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
        el.className = el.className.replace(reg, ' ')
    }
    /**
     * el是否在视口范围内
     * @param el html元素
     * @param partiallyVisible 是否允许部分可视
     * @returns 
     */
    static elementIsVisibleInViewport = (el: HTMLElement, partiallyVisible: boolean = false) => {
        const { top, left, bottom, right } = el.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        return partiallyVisible
            ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
            : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    }
}