export declare class CBrowser {
    static scrollToTop: () => void;
    static scrollToBottom: () => void;
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