import { BaseObject } from "./BaseObject";
export declare class CDevice extends BaseObject {
    static isMobile: () => "mobile" | "desktop";
    static isAppleMobileDevice: () => boolean;
    static isAndroidMobileDevice: () => boolean;
    static osType: () => "windows" | "mac" | undefined;
}
//# sourceMappingURL=CDevice.d.ts.map