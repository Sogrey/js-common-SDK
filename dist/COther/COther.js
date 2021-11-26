export class COther {
}
COther.copyToBoard = function (value) {
    const element = document.createElement('textarea');
    document.body.appendChild(element);
    element.value = value;
    element.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        document.body.removeChild(element);
        return true;
    }
    document.body.removeChild(element);
    return false;
};
COther.type = function (para) {
    return Object.prototype.toString.call(para);
};
//# sourceMappingURL=COther.js.map