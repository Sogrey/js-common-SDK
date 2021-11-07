/**
 * 设备判断
 * 
 * This is the doc comment for CDevice
 *
 * @module CDevice
 */
export class CDevice {

    /**
     * 判断是移动还是pc设备
     * @returns 
     */
    static isMobile = () => {
        if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
            return 'mobile';
        }
        return 'desktop';
    }

    /**
     * 判断是苹果还是android移动设备
     * @returns 
     */
    static isAppleMobileDevice = () => {
        let reg = /iphone|ipod|ipad|Macintosh/i;
        return reg.test(navigator.userAgent.toLowerCase());
    }

    /**
     * 判断是否是android移动设备
     * @returns 
     */
    static isAndroidMobileDevice = () => {
        return /android/i.test(navigator.userAgent.toLowerCase());
    }

    /**
     * 判断死windows还是Mac系统
     * @returns 
     */
    static osType = () => {
        const agent = navigator.userAgent.toLowerCase();
        const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
        if (isWindows) {
            return "windows";
        }
        if (isMac) {
            return "mac";
        }
    }
}