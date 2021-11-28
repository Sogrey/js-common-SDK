import { BaseObject } from "../BaseObject";
import { defined } from "../defined";
export class CUrl extends BaseObject {
}
CUrl.parseUrlSearch = function (url) {
    if (!defined(url) && defined(location) && defined(location.search))
        url = location.search;
    return url.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
        const [key, val] = v.split("=");
        t[key] = decodeURIComponent(val);
        return t;
    }, {});
};
CUrl.getQueryVariable = (variable, url) => {
    var query = "";
    if (url && url.includes('?')) {
        query = url.split("?")[1];
    }
    else {
        query = url || window.location.search.substring(1);
    }
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return undefined;
};
CUrl.getUrlState = (url) => {
    let xmlhttp = new ActiveXObject("microsoft.xmlhttp");
    xmlhttp.Open("GET", url, false);
    try {
        xmlhttp.Send();
    }
    catch (e) {
    }
    finally {
        let result = xmlhttp.responseText;
        if (result) {
            if (xmlhttp.Status == 200) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
CUrl.params2Url = (obj) => {
    let params = [];
    for (let key in obj) {
        params.push(`${key}=${obj.get(key)}`);
    }
    return encodeURIComponent(params.join('&'));
};
CUrl.replaceParamVal = (paramName, replaceWith, url) => {
    const oUrl = url || location.href.toString();
    const re = eval('/(' + paramName + '=)([^&]*)/gi');
    location.href = oUrl.replace(re, paramName + '=' + replaceWith);
    return location.href;
};
//# sourceMappingURL=CUrl.js.map