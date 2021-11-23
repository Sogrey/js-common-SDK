var _a;
export class CBrowser {
}
_a = CBrowser;
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
CBrowser.smoothScroll = (element) => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
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
CBrowser.parents = function (ele, n = 1) {
    while (ele && n) {
        ele = ele.parentElement ? ele.parentElement : ele.parentNode;
        n--;
    }
    return ele;
};
CBrowser.retSibling = function (e, n = 1) {
    while (e && n) {
        if (n > 0) {
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            }
            else {
                for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling)
                    ;
            }
            n--;
        }
        else {
            if (e.previousElementSibling) {
                e = e.previousElementSibling;
            }
            else {
                for (e = e.previousElementSibling; e && e.nodeType !== 1; e = e.previousElementSibling)
                    ;
            }
            n++;
        }
    }
    return e;
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
//# sourceMappingURL=CBrowser.js.map