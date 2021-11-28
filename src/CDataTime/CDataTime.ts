import { BaseObject } from "../BaseObject";

/**
 * 时间操作
 * 
 * This is the doc comment for CDataTime
 *
 * @module CDataTime
 */
export class CDataTime extends BaseObject {

    /**
     * 获取当前时间
     * @returns 
     */
    static nowTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
        const hour = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
        const miu = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
        const sec = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
        return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
    }

    /**
     * 格式化时间
     * @param formater 格式,例如：'YYYY-MM-DD HH:mm:ss'
     * @param time 时间
     * @returns 
     */
    static dateFormater = (formater: string, time: number) => {
        let date = time ? new Date(time) : new Date(),
            Y = date.getFullYear() + '',
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        return formater.replace(/YYYY|yyyy/g, Y)
            .replace(/YY|yy/g, Y.substr(2, 2))
            .replace(/MM/g, (M < 10 ? '0' : '') + M)
            .replace(/DD/g, (D < 10 ? '0' : '') + D)
            .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
            .replace(/mm/g, (m < 10 ? '0' : '') + m)
            .replace(/ss/g, (s < 10 ? '0' : '') + s)
    }

    /**
     * 检查日期是否有效
     * 
     * @example
     * <pre><code>
     * isDateValid("December 17, 1995 03:24:00");  // true
     * </code></pre>
     * @param val 
     * @returns 
     */
    static isDateValid = (val: string) => !Number.isNaN(new Date(val).valueOf());

    /**
     * 计算两个日期之间的间隔天数
     * @example
     * <pre><code>
     * dayDif(new Date("2021-11-3"), new Date("2022-2-1"))  // 90
     * </code></pre>
     * @param date1 
     * @param date2 
     * @returns 
     */
    static dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

    /**
     * 查找日期位于一年中的第几天
     * @example
     * <pre><code>
     * dayOfYear(new Date());   // 330
     * </code></pre>
     * @param date 
     * @returns 
     */
    static dayOfYear = (date: Date) => Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);

    /**
     * 时间格式化
     * <br/>
     * 该方法可以用于将时间转化为hour:minutes:seconds的格式：
     * @example
     * <pre><code>
     * timeFromDate(new Date(2021, 11, 2, 12, 30, 0));  // 12:30:00
     * timeFromDate(new Date());  // 返回当前时间 09:00:00
     * </code></pre>
     * @param date 
     * @returns 
     */
    static timeFromDate = (date: Date) => date.toTimeString().slice(0, 8);



}