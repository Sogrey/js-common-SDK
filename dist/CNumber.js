import { BaseObject } from "./BaseObject";
export class CNumber extends BaseObject {
}
CNumber.randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
CNumber.format = (n) => {
    let num = n.toString();
    let len = num.length;
    if (len <= 3) {
        return num;
    }
    else {
        let temp = '';
        let remainder = len % 3;
        if (remainder > 0) {
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
        }
        else {
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
        }
    }
};
CNumber.cutNumber = function (number, no = 2) {
    if (typeof number != 'number') {
        number = Number(number);
    }
    return Number(number.toFixed(no));
};
CNumber.isEven = (num) => num % 2 === 0;
CNumber.average = (args) => args.reduce((a, b) => a + b) / args.length;
CNumber.celsiusToFahrenheit = (celsius) => celsius * 9 / 5 + 32;
CNumber.fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;
//# sourceMappingURL=CNumber.js.map