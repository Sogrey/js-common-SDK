/**
 * 浏览器操作
 * 
 * This is the doc comment for CBrowser
 *
 * @module CBrowser
 */
export class CBrowser {

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
     * 滚动到指定元素区域
     * @param element 
     */
    static smoothScroll = (element: string) => {
        document.querySelector(element)!.scrollIntoView({
            behavior: 'smooth'
        });
    };

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

}