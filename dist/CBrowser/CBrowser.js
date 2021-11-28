var _a;
import { BaseObject } from "../BaseObject";
export class CBrowser extends BaseObject {
}
_a = CBrowser;
CBrowser.redirect = (url) => location.href = url;
CBrowser.showPrintDialog = () => window.print();
CBrowser.copyToClipboard = (text) => navigator.clipboard.writeText(text);
CBrowser.getSelectedText = () => window.getSelection().toString();
CBrowser.scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    if (height > 0) {
        window.requestAnimationFrame(_a.scrollToTop);
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
//# sourceMappingURL=CBrowser.js.map