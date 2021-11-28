import { BaseObject } from "../BaseObject"
import { DeveloperError } from "../DeveloperError"

/**
 * 其他工具函数
 * 
 * This is the doc comment for COther
 *
 * @module COther
 */
export class COther extends BaseObject {
    /**
     * 复制内容到剪贴板
     * <br/>
     * 创建一个textare元素并调用select()方法选中document.execCommand('copy')方法，拷贝当前选中内容到剪贴板。
     * 
     * @param string 复制的内容
     * @returns 复制成功返回true
     */
    static copyToBoard = function (value: string) {
        const element = document.createElement('textarea')
        document.body.appendChild(element)
        element.value = value
        element.select()
        if (document.execCommand('copy')) {
            document.execCommand('copy')
            document.body.removeChild(element)
            return true
        }
        document.body.removeChild(element)
        return false
    }

    /**
     * 输入一个值，返回其数据类型
     * @param para 
     * @returns 
     */
    static type = function (para: any) {
        return Object.prototype.toString.call(para)
    }

    /**
     * 检测对象是否为空
     * <br/>
     * 该方法用于检测一个JavaScript对象是否为空
     * @param obj 
     * @returns 
     */
    static isEmpty = (obj: any) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

}