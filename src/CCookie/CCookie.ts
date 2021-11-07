/**
 * 操作cookie
 * 
 * This is the doc comment for CCookie
 *
 * @module CCookie
 */
export class CCookie {

    /**
     * 设置cookie
     * @param key 键值
     * @param value 值
     * @param expire 有效时长
     */
    static setCookie = (key: string, value: any, expire: number) => {
        const d = new Date();
        d.setDate(d.getDate() + expire);
        document.cookie = `${key}=${value};expires=${d.toUTCString()}`
    };

    /**
     * 读取cookie
     * @param key 键值
     * @returns 键值对应值
     */
    static getCookie = (key: string) => {
        const cookieStr = unescape(document.cookie);
        const arr = cookieStr.split('; ');
        let cookieValue = '';
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i].split('=');
            if (temp[0] === key) {
                cookieValue = temp[1];
                break
            }
        }
        return cookieValue
    };

    /**
     * 删除cookie
     * @param key 键值
     */
    static delCookie = (key: string) => {
        document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
    };

}