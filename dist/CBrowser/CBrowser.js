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
//# sourceMappingURL=CBrowser.js.map