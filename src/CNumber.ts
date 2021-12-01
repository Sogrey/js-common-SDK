import { BaseObject } from "./BaseObject";

/**
 * 数字操作
 * 
 * This is the doc comment for CNumber
 *
 * @module CNumber
 */
export class CNumber extends BaseObject {
    /**
     * 生成指定范围随机数
     * @param min 范围最小值
     * @param max 范围最大值
     * @returns 返回随机值
     */
    static randomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    /**
     * 数字千分位分隔
     * @param n 要处理的数字
     * @returns 返回按照千分位分隔的格式化数字
     */
    static format = (n: number) => {
        let num = n.toString();
        let len = num.length;
        if (len <= 3) {
            return num;
        } else {
            let temp = '';
            let remainder = len % 3;
            if (remainder > 0) { // 不是3的整数倍
                return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g)!.join(',') + temp;
            } else { // 3的整数倍
                return num.slice(0, len).match(/\d{3}/g)!.join(',') + temp;
            }
        }
    }
    /**
     * 保留小数点以后n位
     * @param number 要处理的小数
     * @param no 要保留的小数位数,默认2位
     * @returns 返回处理后小数
     */
    static cutNumber = function (number: number, no: number = 2): number {
        if (typeof number != 'number') {
            number = Number(number)
        }
        return Number(number.toFixed(no))
    }

    /**
     * 判断一个数是奇数还是偶数
     * <br/>
     * 该方法用于判断一个数字是奇数还是偶数
     * @example
     * <pre><code>
     * isEven(996); 
     * </code></pre>
     * @param num 
     * @returns 
     */
    static isEven = (num: number) => num % 2 === 0;

    /**
     * 获得一组数的平均值
     * @example
     * <pre><code>
     * average(1, 2, 3, 4, 5);   // 3
     * </code></pre>
     * @param args 
     * @returns 
     */
    static average = (args: Array<number>) => args.reduce((a, b) => a + b) / args.length;

    /**
     * 摄氏度 转 华氏度
     * @param celsius 
     * @returns 
     */
    static celsiusToFahrenheit = (celsius: number) => celsius * 9 / 5 + 32;
    /**
     * 华氏度 转 摄氏度 
     * @param celsius 
     * @returns 
     */
    static fahrenheitToCelsius = (fahrenheit: number) => (fahrenheit - 32) * 5 / 9;

    /**
     * 将阿拉伯数字翻译成中文的大写数字
     * @param num 
     * @returns 
     */
    static numberToChinese = (num: number) => {
        var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
        var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
        var a = ("" + num).replace(/(^0*)/g, "").split("."),
            k = 0,
            re = "";
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

        if (a.length > 1) // 加上小数部分(如果有小数部分)
        {
            re += BB[6];
            for (var i = 0; i < a[1].length; i++)
                re += AA[parseInt(a[1].charAt(i))];
        }
        if (re == '一十')
            re = "十";
        if (re.match(/^一/) && re.length == 3)
            re = re.replace("一", "");
        return re;
    }

    /**
     * 将数字转换为大写金额
     * @param num 
     * @returns 
     */
    static numberToChinese2 = (num: string) => {
        //判断如果传递进来的不是字符的话转换为字符
        if (typeof num == "number") {
            num = num + '';
        };
        num = num.replace(/,/g, "") //替换tomoney()中的“,”
        num = num.replace(/ /g, "") //替换tomoney()中的空格
        num = num.replace(/￥/g, "") //替换掉可能出现的￥字符
        if (isNaN(parseInt(num))) { //验证输入的字符是否为数字
            //alert("请检查小写金额是否正确");
            return "";
        };
        //字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(num).split(".");
        var newchar = "";
        //小数点前进行转化
        for (var i = part[0].length - 1; i >= 0; i--) {
            if (part[0].length > 10) {
                return "";
                //若数量超过拾亿单位，提示
            }
            var tmpnewchar = ""
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
                    if (perchar != '0') tmpnewchar = tmpnewchar + "拾";
                    break;
                case 2:
                    if (perchar != '0') tmpnewchar = tmpnewchar + "佰";
                    break;
                case 3:
                    if (perchar != '0') tmpnewchar = tmpnewchar + "仟";
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + "万";
                    break;
                case 5:
                    if (perchar != '0') tmpnewchar = tmpnewchar + "拾";
                    break;
                case 6:
                    if (perchar != '0') tmpnewchar = tmpnewchar + "佰";
                    break;
                case 7:
                    if (perchar != '0') tmpnewchar = tmpnewchar + "仟";
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
        //小数点之后进行转化
        if (num.indexOf(".") != -1) {
            if (part[1].length > 2) {
                // alert("小数点之后只能保留两位,系统将自动截断");
                part[1] = part[1].substr(0, 2)
            }
            for (i = 0; i < part[1].length; i++) {
                tmpnewchar = ""
                perchar = part[1].charAt(i)
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
                if (i == 0) tmpnewchar = tmpnewchar + "角";
                if (i == 1) tmpnewchar = tmpnewchar + "分";
                newchar = newchar + tmpnewchar;
            }
        }
        //替换所有无用汉字
        while (newchar.search("零零") != -1)
            newchar = newchar.replace("零零", "零");
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零元", "元");
        newchar = newchar.replace("零角", "");
        newchar = newchar.replace("零分", "");
        if (newchar.charAt(newchar.length - 1) == "元") {
            newchar = newchar + "整"
        }
        return newchar;
    }

    /**
     * 检查数据是否是非数字值
     * @param v 
     * @returns 
     */
    static _isNaN = (v: any) => {
        return !(typeof v === 'string' || typeof v === 'number') || isNaN(v as number)
    }

}