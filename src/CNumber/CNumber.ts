/**
 * 数字操作
 * 
 * This is the doc comment for CNumber
 *
 * @module CNumber
 */
export class CNumber {
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
    static isEven = (num:number) => num % 2 === 0;

    /**
     * 获得一组数的平均值
     * @example
     * <pre><code>
     * average(1, 2, 3, 4, 5);   // 3
     * </code></pre>
     * @param args 
     * @returns 
     */
    static average = (args:Array<number>) => args.reduce((a, b) => a + b) / args.length;
}