import { BaseObject } from "./BaseObject";

/**
 * 操作存储
 * 
 * This is the doc comment for CStorage
 *
 * @module CStorage
 */
export class CStorage extends BaseObject {

    /**
     * 存储loalStorage
     * @param key 键值
     * @param value 值
     * @returns 
     */
    static setLoalStorage = (key: string, value: any) => {
        if (!key) return;
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value);
    };

    /**
     * 获取loalStorage
     * @param key 键值
     * @returns 返回键值对应的值
     */
    static getLoalStorage = (key: string) => {
        if (!key) return;
        return window.localStorage.getItem(key);
    };

    /**
     * 删除loalStorage
     * @param key 键值
     * @returns 
     */
    static removeLoalStorage = (key: string) => {
        if (!key) return;
        window.localStorage.removeItem(key);
    };

    /**
     * 存储sessionStorage
     * @param key 键值
     * @param value 值
     * @returns 
     */
    static setSessionStorage = (key: string, value: any) => {
        if (!key) return;
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.sessionStorage.setItem(key, value)
    };

    /**
     * 获取sessionStorage
     * @param key 键值
     * @returns 返回键值对应的值
     */
    static getSessionStorage = (key: string) => {
        if (!key) return;
        return window.sessionStorage.getItem(key)
    };

    /**
     * 删除sessionStorage
     * @param key 键值
     * @returns 
     */
    static removeSessionStorage = (key: string) => {
        if (!key) return;
        window.sessionStorage.removeItem(key)
    };

}