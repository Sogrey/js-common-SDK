/**
 * 时间操作
 * 
 * This is the doc comment for CDataTime
 *
 * @module CDataTime
 */
export class CDataTime {

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
}