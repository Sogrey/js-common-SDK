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
}