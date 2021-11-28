import { BaseObject } from "../BaseObject";
export declare class CDataTime extends BaseObject {
    static nowTime: () => string;
    static dateFormater: (formater: string, time: number) => string;
    static isDateValid: (val: string) => boolean;
    static dayDif: (date1: Date, date2: Date) => number;
    static dayOfYear: (date: Date) => number;
    static timeFromDate: (date: Date) => string;
}
//# sourceMappingURL=CDataTime.d.ts.map