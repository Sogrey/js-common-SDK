import { BaseObject } from "./BaseObject";
export class CBrowser extends BaseObject {
}
CBrowser.inBrowser = typeof window !== 'undefined';
CBrowser.UA = CBrowser.inBrowser && window.navigator.userAgent.toLowerCase();
CBrowser.isIE = CBrowser.UA && /msie|trident/.test(CBrowser.UA);
CBrowser.isIE9 = CBrowser.UA && CBrowser.UA.indexOf('msie 9.0') > 0;
CBrowser.isEdge = CBrowser.UA && CBrowser.UA.indexOf('edge/') > 0;
CBrowser.isAndroid = (CBrowser.UA && CBrowser.UA.indexOf('android') > 0);
CBrowser.isIOS = (CBrowser.UA && /iphone|ipad|ipod|ios/.test(CBrowser.UA));
CBrowser.isChrome = CBrowser.UA && /chrome\/\d+/.test(CBrowser.UA) && !CBrowser.isEdge;
CBrowser.getExplorerInfo = () => {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? {
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? {
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    };
};
CBrowser.isPCBroswer = () => {
    let e = navigator.userAgent.toLowerCase(), t = "ipad" == e.match(/ipad/i).toString(), i = "iphone" == e.match(/iphone/i).toString(), r = "midp" == e.match(/midp/i).toString(), n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i).toString(), a = "ucweb" == e.match(/ucweb/i).toString(), o = "android" == e.match(/android/i).toString(), s = "windows ce" == e.match(/windows ce/i).toString(), l = "windows mobile" == e.match(/windows mobile/i).toString();
    return !(t || i || r || n || a || o || s || l);
};
CBrowser.isNative = (value) => {
    return typeof value === 'function' && /native code/.test(value.toString());
};
CBrowser.redirect = (url) => location.href = url;
CBrowser.showPrintDialog = () => window.print();
CBrowser.copyToClipboard = (text) => navigator.clipboard.writeText(text);
CBrowser.getSelectedText = () => window.getSelection().toString();
CBrowser.scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    if (height > 0) {
        window.requestAnimationFrame(CBrowser.scrollToTop);
        window.scrollTo(0, height - height / 8);
    }
};
CBrowser.scrollToBottom = () => {
    window.scrollTo(0, document.documentElement.clientHeight);
};
CBrowser.scrolledToBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
CBrowser.smoothScroll = (element) => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
};
CBrowser.getScrollOffset = function () {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    }
    else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        };
    }
};
CBrowser.getClientHeight = () => {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
};
CBrowser.getPageViewWidth = () => {
    return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
};
CBrowser.getViewportOffset = function () {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        };
    }
    else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            };
        }
        else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            };
        }
    }
};
CBrowser.traverse = function (element, callback) {
    callback(element);
    var list = element.children;
    for (var i = 0; i < list.length; i++) {
        CBrowser.traverse(list[i], callback);
    }
};
CBrowser.parents = function (ele, n = 1) {
    while (ele && n) {
        ele = ele.parentElement ? ele.parentElement : ele.parentNode;
        n--;
    }
    return ele;
};
CBrowser.myChildren = function (e) {
    var children = e.childNodes, arr = [], len = children.length;
    for (var i = 0; i < len; i++) {
        if (children[i].nodeType === 1) {
            arr.push(children[i]);
        }
    }
    return arr;
};
CBrowser.hasChildren = function (e) {
    var children = e.childNodes, len = children.length;
    for (var i = 0; i < len; i++) {
        if (children[i].nodeType === 1) {
            return true;
        }
    }
    return false;
};
CBrowser.getElementsByClassName = function (className) {
    var allDomArray = document.getElementsByTagName('*');
    var lastDomArray = [];
    function trimSpace(_strClass) {
        var reg = /\s+/g;
        return _strClass.replace(reg, ' ').trim();
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
};
CBrowser.hasClass = (el, className) => {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
};
CBrowser.addClass = (el, className) => {
    if (CBrowser.hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
};
CBrowser.removeClass = (el, className) => {
    if (!CBrowser.hasClass(el, className)) {
        return;
    }
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    el.className = el.className.replace(reg, ' ');
};
CBrowser.elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
//# sourceMappingURL=CBrowser.js.map