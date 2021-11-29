import { BaseObject } from "./BaseObject";
import { DeveloperError } from "./DeveloperError";
export class CFile extends BaseObject {
}
CFile.getExt = function (filename) {
    if (typeof filename == 'string') {
        return filename
            .split('.')
            .pop()
            .toLowerCase();
    }
    else {
        throw new DeveloperError('filename must be a string type');
    }
};
CFile.downloadLink = function (link, name) {
    if (!name) {
        name = link.slice(link.lastIndexOf('/') + 1);
    }
    let eleLink = document.createElement('a');
    eleLink.download = name;
    eleLink.style.display = 'none';
    eleLink.href = link;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
};
CFile.downloadFile = function (name, content) {
    if (typeof name == 'undefined') {
        throw new Error('The first parameter name is a must');
    }
    if (typeof content == 'undefined') {
        throw new Error('The second parameter content is a must');
    }
    if (!(content instanceof Blob)) {
        content = new Blob([content]);
    }
    const link = URL.createObjectURL(content);
    CFile.downloadLink(link, name);
};
//# sourceMappingURL=CFile.js.map