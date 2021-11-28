import { BaseObject } from "../BaseObject";
export declare class CBrowser extends BaseObject {
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
}
//# sourceMappingURL=CBrowser.d.ts.map