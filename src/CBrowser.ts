import { BaseObject } from "./BaseObject";

/**
 * 浏览器操作
 * 
 * This is the doc comment for CBrowser
 *
 * @module CBrowser
 */
export class CBrowser extends BaseObject {

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
            window.requestAnimationFrame(this.scrollToTop);
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