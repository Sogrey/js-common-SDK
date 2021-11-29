import { BaseObject } from "./BaseObject";
export class CCookie extends BaseObject {
}
CCookie.setCookie = (key, value, expire) => {
    const d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};
CCookie.getCookie = (key) => {
    const cookieStr = unescape(document.cookie);
    const arr = cookieStr.split('; ');
    let cookieValue = '';
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i].split('=');
        if (temp[0] === key) {
            cookieValue = temp[1];
            break;
        }
    }
    return cookieValue;
};
CCookie.delCookie = (key) => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};
CCookie.clearAllCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));
//# sourceMappingURL=CCookie.js.map