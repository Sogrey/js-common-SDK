import { DeveloperError } from "../DeveloperError"

/**
 * 文件操作相关
 * 
 * This is the doc comment for CFile
 *
 * @module CFile
 */
export class CFile {
    /**
     * 获取文件后缀名
     * @param filename 
     * @returns 
     */
    static getExt = function (filename: string): string {
        if (typeof filename == 'string') {
            return filename
                .split('.')
                .pop()!
                .toLowerCase()
        } else {
            throw new DeveloperError('filename must be a string type')
        }
    }
    /**
     * 下载一个链接 
     * @param link 文件链接
     * @param name  保存文件名
     * @example
     * <pre><code>
     * download('http://xxx.xxx.xxx.xxx/file/1.xlsx')
     * </code></pre>
     */
    static downloadLink = function (link: string, name: string) {
        if (!name) {
            name = link.slice(link.lastIndexOf('/') + 1)
        }
        let eleLink = document.createElement('a')
        eleLink.download = name
        eleLink.style.display = 'none'
        eleLink.href = link
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
    }

    /**
     * 浏览器下载静态文件
     * @param {String} name 文件名
     * @param {String} content 文件内容
     * @example
     * <pre><code>
     * downloadFile('1.txt','lalalallalalla');
     * downloadFile('1.json',JSON.stringify({name:'hahahha'}));
     * downloadFile('http://xxx.xxx.xxx.xxx/gk-api/download?file=1.mp4')
     * </code></pre>
     */
    static downloadFile = function (name: string, content: string | Blob) {
        if (typeof name == 'undefined') {
            throw new Error('The first parameter name is a must')
        }
        if (typeof content == 'undefined') {
            throw new Error('The second parameter content is a must')
        }
        if (!(content instanceof Blob)) {
            content = new Blob([content])
        }
        const link = URL.createObjectURL(content)
        CFile.downloadLink(link, name)
    }
}