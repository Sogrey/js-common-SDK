import { BaseObject } from "../BaseObject";
export declare class CNumber extends BaseObject {
    static randomNum: (min: number, max: number) => number;
    static format: (n: number) => string;
    static cutNumber: (number: number, no?: number) => number;
    static isEven: (num: number) => boolean;
    static average: (args: Array<number>) => number;
    static celsiusToFahrenheit: (celsius: number) => number;
    static fahrenheitToCelsius: (fahrenheit: number) => number;
}
//# sourceMappingURL=CNumber.d.ts.map