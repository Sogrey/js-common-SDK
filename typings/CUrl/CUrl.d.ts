import { BaseObject } from "../BaseObject";
export declare class CUrl extends BaseObject {
    static parseUrlSearch: (url?: string | undefined) => any;
    static getQueryVariable: (variable: string, url?: string | undefined) => string | undefined;
    static getUrlState: (url: string) => boolean;
    static params2Url: (obj: Map<string, any>) => string;
    static replaceParamVal: (paramName: string, replaceWith: any, url?: string | undefined) => string;
}
//# sourceMappingURL=CUrl.d.ts.map