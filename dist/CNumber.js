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
CNumber.numberToChinese = (num) => {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != '0' && a[0].charAt(i + 1) == '0')
            re = AA[0] + re;
        if (a[0].charAt(i) != '0')
            re = AA[parseInt(a[0].charAt(i))] + BB[k % 4] + re;
        k++;
    }
    if (a.length > 1) {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++)
            re += AA[parseInt(a[1].charAt(i))];
    }
    if (re == '一十')
        re = "十";
    if (re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
};
CNumber.numberToChinese2 = (num) => {
    if (typeof num == "number") {
        num = num + '';
    }
    ;
    num = num.replace(/,/g, "");
    num = num.replace(/ /g, "");
    num = num.replace(/￥/g, "");
    if (isNaN(parseInt(num))) {
        return "";
    }
    ;
    var part = String(num).split(".");
    var newchar = "";
    for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            return "";
        }
        var tmpnewchar = "";
        var perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != '0')
                    tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != '0')
                    tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != '0')
                    tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != '0')
                    tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != '0')
                    tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != '0')
                    tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        var newchar = tmpnewchar + newchar;
    }
    if (num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            part[1] = part[1].substr(0, 2);
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = "";
            perchar = part[1].charAt(i);
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0)
                tmpnewchar = tmpnewchar + "角";
            if (i == 1)
                tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整";
    }
    return newchar;
};
CNumber._isNaN = (v) => {
    return !(typeof v === 'string' || typeof v === 'number') || isNaN(v);
};
//# sourceMappingURL=CNumber.js.map