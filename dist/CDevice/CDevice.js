import { BaseObject } from "../BaseObject";
export class CDevice extends BaseObject {
}
CDevice.isMobile = () => {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
        return 'mobile';
    }
    return 'desktop';
};
CDevice.isAppleMobileDevice = () => {
    let reg = /iphone|ipod|ipad|Macintosh/i;
    return reg.test(navigator.userAgent.toLowerCase());
};
CDevice.isAndroidMobileDevice = () => {
    return /android/i.test(navigator.userAgent.toLowerCase());
};
CDevice.osType = () => {
    const agent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
    if (isWindows) {
        return "windows";
    }
    if (isMac) {
        return "mac";
    }
};
//# sourceMappingURL=CDevice.js.map