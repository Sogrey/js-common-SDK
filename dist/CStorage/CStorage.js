export class CStorage {
}
CStorage.setLoalStorage = (key, value) => {
    if (!key)
        return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};
CStorage.getLoalStorage = (key) => {
    if (!key)
        return;
    return window.localStorage.getItem(key);
};
CStorage.removeLoalStorage = (key) => {
    if (!key)
        return;
    window.localStorage.removeItem(key);
};
CStorage.setSessionStorage = (key, value) => {
    if (!key)
        return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.sessionStorage.setItem(key, value);
};
CStorage.getSessionStorage = (key) => {
    if (!key)
        return;
    return window.sessionStorage.getItem(key);
};
CStorage.removeSessionStorage = (key) => {
    if (!key)
        return;
    window.sessionStorage.removeItem(key);
};
//# sourceMappingURL=CStorage.js.map