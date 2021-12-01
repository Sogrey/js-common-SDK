import { BaseObject } from "./BaseObject";
export declare class CBrowser extends BaseObject {
    static inBrowser: boolean;
    static UA: string | false;
    static isIE: boolean | "";
    static isIE9: boolean | "";
    static isEdge: boolean | "";
    static isAndroid: boolean | "";
    static isIOS: boolean | "";
    static isChrome: boolean | "";
    static getExplorerInfo: () => {
        type: string;
        version: number;
    };
    static isPCBroswer: () => boolean;
    static isNative: (value: any) => boolean;
    static redirect: (url: string) => string;
    static showPrintDialog: () => void;
    static copyToClipboard: (text: string) => Promise<void>;
    static getSelectedText: () => string;
    static scrollToTop: () => void;
    static scrollToBottom: () => void;
    static scrolledToBottom: () => boolean;
    static smoothScroll: (element: string) => void;
    static getScrollOffset: () => {
        x: number;
        y: number;
    };
    static getClientHeight: () => number;
    static getPageViewWidth: () => number;
    static getViewportOffset: () => {
        w: number;
        h: number;
    };
    static traverse: (element: Element, callback: Function) => void;
    static parents: (ele: HTMLElement, n?: number) => HTMLElement;
    static myChildren: (e: HTMLElement) => ChildNode[];
    static hasChildren: (e: HTMLElement) => boolean;
    static getElementsByClassName: (className: string) => Element[];
    static hasClass: (el: HTMLElement, className: string) => boolean;
    static addClass: (el: HTMLElement, className: string) => void;
    static removeClass: (el: HTMLElement, className: string) => void;
    static elementIsVisibleInViewport: (el: HTMLElement, partiallyVisible?: boolean) => boolean;
}
//# sourceMappingURL=CBrowser.d.ts.map