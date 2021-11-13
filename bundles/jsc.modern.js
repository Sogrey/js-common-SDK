function defined(e){return null!=e}function defaultValue(e,t){return null!=e?e:t}defaultValue.EMPTY_OBJECT=Object.freeze({});class DeveloperError{constructor(e){throw this.message=e,new Error(e)}}class CNumber{}var _a$1,_a;CNumber.randomNum=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,CNumber.format=e=>{let t=e.toString(),r=t.length;if(r<=3)return t;{let e="",o=r%3;return o>0?t.slice(0,o)+","+t.slice(o,r).match(/\d{3}/g).join(",")+e:t.slice(0,r).match(/\d{3}/g).join(",")+e}};class CArray{}_a$1=CArray,CArray.arrScrambling=e=>{for(let t=0;t<e.length;t++){const r=Math.round(Math.random()*(e.length-1-t))+t;[e[t],e[r]]=[e[r],e[t]]}return e},CArray.flatten=e=>{let t=[];for(let r=0;r<e.length;r++)Array.isArray(e[r])?t=t.concat(_a$1.flatten(e[r])):t.push(e[r]);return t},CArray.sample=e=>e[Math.floor(Math.random()*e.length)];class CString{}CString.randomString=e=>{let t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789",r=t.length,o="";for(let n=0;n<e;n++)o+=t.charAt(Math.floor(Math.random()*r));return o},CString.fistLetterUpper=e=>e.charAt(0).toUpperCase()+e.slice(1),CString.telFormat=e=>(e=String(e)).substr(0,3)+"****"+e.substr(7),CString.getKebabCase=e=>e.replace(/[A-Z]/g,e=>"-"+e.toLowerCase()),CString.getCamelCase=e=>e.replace(/-([a-z])/g,(e,t)=>t.toUpperCase()),CString.toCDB=e=>{let t="";for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);t+=o>=65281&&o<=65374?String.fromCharCode(e.charCodeAt(r)-65248):12288==o?String.fromCharCode(e.charCodeAt(r)-12288+32):e.charAt(r)}return t},CString.toDBC=e=>{let t="";for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);t+=o>=33&&o<=126?String.fromCharCode(e.charCodeAt(r)+65248):32==o?String.fromCharCode(e.charCodeAt(r)+12288-32):e.charAt(r)}return t};class CFormat{}CFormat.digitUppercase=e=>{const t=["角","分"],r=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],o=[["元","万","亿"],["","拾","佰","仟"]];e=Math.abs(e);let n="";for(let o=0;o<t.length;o++)n+=(r[Math.floor(10*e*Math.pow(10,o))%10]+t[o]).replace(/零./,"");n=n||"整",e=Math.floor(e);for(let t=0;t<o[0].length&&e>0;t++){let a="";for(let t=0;t<o[1].length&&e>0;t++)a=r[e%10]+o[1][t]+a,e=Math.floor(e/10);n=a.replace(/(零.)*零$/,"").replace(/^$/,"零")+o[0][t]+n}return n.replace(/(零.)*零元/,"元").replace(/(零.)+/g,"零").replace(/^整$/,"零元整")},CFormat.intToChinese=e=>{const t=String(e),r=t.length-1,o=["","十","百","千","万","十","百","千","亿","十","百","千","万","十","百","千","亿"],n=["零","一","二","三","四","五","六","七","八","九"];return t.replace(/([1-9]|0+)/g,(e,t,a,i)=>{let l=0;if("0"!==t[0])return l=r-a,0==a&&1==t[0]&&"十"==o[r-a]?o[r-a]:n[t[0]]+o[r-a];{let e=r-a;return Math.floor((r-a+t.length)/4)-Math.floor(e/4)>0&&(l=e-e%4),l?o[l]+n[t[0]]:a+t.length>=r?"":n[t[0]]}})};class CStorage{}CStorage.setLoalStorage=(e,t)=>{e&&("string"!=typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))},CStorage.getLoalStorage=e=>{if(e)return window.localStorage.getItem(e)},CStorage.removeLoalStorage=e=>{e&&window.localStorage.removeItem(e)},CStorage.setSessionStorage=(e,t)=>{e&&("string"!=typeof t&&(t=JSON.stringify(t)),window.sessionStorage.setItem(e,t))},CStorage.getSessionStorage=e=>{if(e)return window.sessionStorage.getItem(e)},CStorage.removeSessionStorage=e=>{e&&window.sessionStorage.removeItem(e)};class CCookie{}CCookie.setCookie=(e,t,r)=>{const o=new Date;o.setDate(o.getDate()+r),document.cookie=`${e}=${t};expires=${o.toUTCString()}`},CCookie.getCookie=e=>{const t=unescape(document.cookie).split("; ");let r="";for(let o=0;o<t.length;o++){const n=t[o].split("=");if(n[0]===e){r=n[1];break}}return r},CCookie.delCookie=e=>{document.cookie=`${encodeURIComponent(e)}=;expires=${new Date}`};class CRegular{}CRegular.checkID=e=>/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e),CRegular.haveCNChars=e=>/[\u4e00-\u9fa5]/.test(e),CRegular.isPostCode=e=>/^[1-9][0-9]{5}$/.test(e.toString()),CRegular.isIPv6=e=>Boolean(e.match(/:/g)?e.match(/:/g).length<=7:/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(e)),CRegular.isEmail=e=>/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e),CRegular.isTel=e=>/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(e.toString()),CRegular.isEmojiCharacter=e=>{e=String(e);for(let t=0;t<e.length;t++){const r=e.charCodeAt(t);if(55296<=r&&r<=56319){if(e.length>1){const o=1024*(r-55296)+(e.charCodeAt(t+1)-56320)+65536;if(118784<=o&&o<=128895)return!0}}else if(e.length>1){if(8419==e.charCodeAt(t+1))return!0}else{if(8448<=r&&r<=10239)return!0;if(11013<=r&&r<=11015)return!0;if(10548<=r&&r<=10549)return!0;if(12951<=r&&r<=12953)return!0;if(169==r||174==r||12349==r||12336==r||11093==r||11036==r||11035==r||11088==r)return!0}}return!1};class CUrl{}CUrl.getQueryVariable=(e,t)=>{for(var r=(t&&t.includes("?")?t.split("?")[1]:t||window.location.search.substring(1)).split("&"),o=0;o<r.length;o++){var n=r[o].split("=");if(n[0]==e)return n[1]}},CUrl.getUrlState=e=>{let t=new ActiveXObject("microsoft.xmlhttp");t.Open("GET",e,!1);try{t.Send()}catch(e){}finally{return!!t.responseText&&200==t.Status}},CUrl.params2Url=e=>{let t=[];for(let r in e)t.push(`${r}=${e.get(r)}`);return encodeURIComponent(t.join("&"))},CUrl.replaceParamVal=(paramName,replaceWith,url)=>{const oUrl=url||location.href.toString(),re=eval("/("+paramName+"=)([^&]*)/gi");return location.href=oUrl.replace(re,paramName+"="+replaceWith),location.href};class CDevice{}CDevice.isMobile=()=>navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i)?"mobile":"desktop",CDevice.isAppleMobileDevice=()=>/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()),CDevice.isAndroidMobileDevice=()=>/android/i.test(navigator.userAgent.toLowerCase()),CDevice.osType=()=>{const e=navigator.userAgent.toLowerCase(),t=/macintosh|mac os x/i.test(navigator.userAgent);return e.indexOf("win64")>=0||e.indexOf("wow64")>=0||e.indexOf("win32")>=0||e.indexOf("wow32")>=0?"windows":t?"mac":void 0};class CBrowser{}_a=CBrowser,CBrowser.scrollToTop=()=>{const e=document.documentElement.scrollTop||document.body.scrollTop;e>0&&(window.requestAnimationFrame(_a.scrollToTop),window.scrollTo(0,e-e/8))},CBrowser.scrollToBottom=()=>{window.scrollTo(0,document.documentElement.clientHeight)},CBrowser.smoothScroll=e=>{document.querySelector(e).scrollIntoView({behavior:"smooth"})},CBrowser.getClientHeight=()=>{let e=0;return e=document.body.clientHeight&&document.documentElement.clientHeight?document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight:document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight,e},CBrowser.getPageViewWidth=()=>("BackCompat"==document.compatMode?document.body:document.documentElement).clientWidth;class CDataTime{}CDataTime.nowTime=()=>{const e=new Date;return+e.getFullYear()+"年"+(e.getMonth()+1)+"月"+(e.getDate()>=10?e.getDate():"0"+e.getDate())+"日 "+(e.getHours()>=10?e.getHours():"0"+e.getHours())+":"+(e.getMinutes()>=10?e.getMinutes():"0"+e.getMinutes())+":"+(e.getSeconds()>=10?e.getSeconds():"0"+e.getSeconds())},CDataTime.dateFormater=(e,t)=>{let r=t?new Date(t):new Date,o=r.getFullYear()+"",n=r.getMonth()+1,a=r.getDate(),i=r.getHours(),l=r.getMinutes(),c=r.getSeconds();return e.replace(/YYYY|yyyy/g,o).replace(/YY|yy/g,o.substr(2,2)).replace(/MM/g,(n<10?"0":"")+n).replace(/DD/g,(a<10?"0":"")+a).replace(/HH|hh/g,(i<10?"0":"")+i).replace(/mm/g,(l<10?"0":"")+l).replace(/ss/g,(c<10?"0":"")+c)};class CMath{}CMath.clamp=function(e,t,r){if(!defined(e))throw new DeveloperError("value is required");if(!defined(t))throw new DeveloperError("min is required.");if(!defined(r))throw new DeveloperError("max is required.");return e<t?t:e>r?r:e},CMath.acosClamped=function(e){if(!defined(e))throw new DeveloperError("value is required.");return Math.acos(CMath.clamp(e,-1,1))},CMath.lerp=function(e,t,r){return(1-r)*e+r*t};class Vector2{constructor(e,t){this.x=0,this.y=0,this.setLength=(e,t)=>(defined(t)&&t instanceof Vector2||(t=new Vector2),Vector2.multiplyByScalar(this.normalize(),e,t),t),this.add=e=>Vector2.add(this,e,this),this.normalize=e=>{defined(e)||(e=new Vector2);var t=Vector2.magnitude(this);return e.x=this.x/t,e.y=this.y/t,e},this.clone=e=>Vector2.clone(this,e),this.equals=e=>Vector2.equals(this,e),this.fromArray=(e,t=0)=>(this.x=e[t],this.y=e[t+1],this),this.toArray=(e=0,t)=>(defined(t)&&Array.isArray(t)||(t=new Array),t[e]=this.x,t[e+1]=this.y,t),this.toString=()=>"("+this.x+", "+this.y+")",this.x=defaultValue(e,0),this.y=defaultValue(t,0)}}Vector2.fromElements=function(e,t,r){return defined(r)?(r.x=e,r.y=t,r):new Vector2(e,t)},Vector2.clone=function(e,t){if(defined(e))return defined(t)?(t.x=e.x,t.y=e.y,t):new Vector2(e.x,e.y)},Vector2.fromVector3=Vector2.clone,Vector2.fromVector4=Vector2.clone,Vector2.packedLength=2,Vector2.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y},Vector2.magnitude=function(e){return Math.sqrt(Vector2.magnitudeSquared(e))},Vector2.distance=function(e,t){var r=new Vector2;return Vector2.subtract(e,t,r),Vector2.magnitude(r)},Vector2.distanceSquared=function(e,t){var r=new Vector2;return Vector2.subtract(e,t,r),Vector2.magnitudeSquared(r)},Vector2.add=function(e,t,r){return defined(r)||(r=new Vector2),r.x=e.x+t.x,r.y=e.y+t.y,r},Vector2.subtract=function(e,t,r){return r.x=e.x-t.x,r.y=e.y-t.y,r},Vector2.normalize=function(e,t){var r=Vector2.magnitude(e);return t.x=e.x/r,t.y=e.y/r,t},Vector2.dot=function(e,t){return e.x*t.x+e.y*t.y},Vector2.cross=function(e,t){return e.x*t.y-e.y*t.x},Vector2.multiplyByScalar=function(e,t,r){return defined(r)||(r=new Vector2),r.x=e.x*t,r.y=e.y*t,r},Vector2.divideByScalar=function(e,t,r){return r.x=e.x/t,r.y=e.y/t,r},Vector2.negate=function(e,t){return t.x=-e.x,t.y=-e.y,t},Vector2.abs=function(e,t){return t.x=Math.abs(e.x),t.y=Math.abs(e.y),t},Vector2.lerp=function(e,t,r,o){defined(o)||(o=new Vector2);let n=new Vector2;return Vector2.multiplyByScalar(t,r,n),o=Vector2.multiplyByScalar(e,1-r,o),Vector2.add(n,o,o)},Vector2.angleBetween=function(e,t){let r=new Vector2,o=new Vector2;return Vector2.normalize(e,r),Vector2.normalize(t,o),CMath.acosClamped(Vector2.dot(r,o))},Vector2.equals=function(e,t){return e===t||defined(e)&&defined(t)&&e.x===t.x&&e.y===t.y},Vector2.ZERO=Object.freeze(new Vector2(0,0)),Vector2.ONE=Object.freeze(new Vector2(1,1)),Vector2.UNIT_X=Object.freeze(new Vector2(1,0)),Vector2.UNIT_Y=Object.freeze(new Vector2(0,1)),Vector2.random=function(e){return defined(e)||(e=new Vector2),e.x=Math.random(),e.y=Math.random(),e};class Vector3{constructor(e,t,r){this.x=0,this.y=0,this.z=0,this.setLength=(e,t)=>(defined(t)&&t instanceof Vector3||(t=new Vector3),Vector3.multiplyByScalar(this.normalize(),e,t),t),this.add=e=>Vector3.add(this,e,this),this.normalize=e=>{defined(e)||(e=new Vector3);var t=Vector3.magnitude(this);return e.x=this.x/t,e.y=this.y/t,e.z=this.z/t,e},this.clone=e=>Vector3.clone(this,e),this.equals=e=>Vector3.equals(this,e),this.fromArray=(e,t=0)=>(this.x=e[t],this.y=e[t+1],this.z=e[t+2],this),this.toArray=(e=0,t)=>(defined(t)&&Array.isArray(t)||(t=new Array),t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t),this.toString=()=>"("+this.x+", "+this.y+", "+this.z+")",this.x=defaultValue(e,0),this.y=defaultValue(t,0),this.z=defaultValue(r,0)}}Vector3.fromElements=function(e,t,r,o){return defined(o)?(o.x=e,o.y=t,o.z=r,o):new Vector3(e,t,r)},Vector3.clone=function(e,t){if(defined(e))return defined(t)?(t.x=e.x,t.y=e.y,t.z=e.z,t):new Vector3(e.x,e.y,e.z)},Vector3.fromVector4=Vector3.clone,Vector3.packedLength=3,Vector3.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y+e.z*e.z},Vector3.magnitude=function(e){return Math.sqrt(Vector3.magnitudeSquared(e))},Vector3.distance=function(e,t){var r=new Vector3;return Vector3.subtract(e,t,r),Vector3.magnitude(r)},Vector3.distanceSquared=function(e,t){var r=new Vector3;return Vector3.subtract(e,t,r),Vector3.magnitudeSquared(r)},Vector3.add=function(e,t,r){return defined(r)||(r=new Vector3),r.x=e.x+t.x,r.y=e.y+t.y,r.z=e.z+t.z,r},Vector3.subtract=function(e,t,r){return r.x=e.x-t.x,r.y=e.y-t.y,r.y=e.z-t.z,r},Vector3.normalize=function(e,t){var r=Vector3.magnitude(e);return t.x=e.x/r,t.y=e.y/r,t.z=e.z/r,t},Vector3.dot=function(e,t){return e.x*t.x+e.y*t.y+e.z*t.z},Vector3.cross=function(e,t,r){var o=e.x,n=e.y,a=e.z,i=t.x,l=t.y,c=t.z,s=a*i-o*c,u=o*l-n*i;return r.x=n*c-a*l,r.y=s,r.z=u,r},Vector3.multiplyByScalar=function(e,t,r){return defined(r)||(r=new Vector3),r.x=e.x*t,r.y=e.y*t,r.z=e.z*t,r},Vector3.divideByScalar=function(e,t,r){return r.x=e.x/t,r.y=e.y/t,r.z=e.z/t,r},Vector3.negate=function(e,t){return t.x=-e.x,t.y=-e.y,t.z=-e.z,t},Vector3.abs=function(e,t){return t.x=Math.abs(e.x),t.y=Math.abs(e.y),t.z=Math.abs(e.z),t},Vector3.lerp=function(e,t,r,o){defined(o)||(o=new Vector3);let n=new Vector3;return Vector3.multiplyByScalar(t,r,n),o=Vector3.multiplyByScalar(e,1-r,o),Vector3.add(n,o,o)},Vector3.angleBetween=function(e,t){let r=new Vector3,o=new Vector3;Vector3.normalize(e,r),Vector3.normalize(t,o);var n=Vector3.dot(r,o),a=Vector3.magnitude(Vector3.cross(r,o,r));return Math.atan2(a,n)},Vector3.equals=function(e,t){return e===t||defined(e)&&defined(t)&&e.x===t.x&&e.y===t.y&&e.z===t.z},Vector3.ZERO=Object.freeze(new Vector3(0,0,0)),Vector3.ONE=Object.freeze(new Vector3(1,1,1)),Vector3.UNIT_X=Object.freeze(new Vector3(1,0,0)),Vector3.UNIT_Y=Object.freeze(new Vector3(0,1,0)),Vector3.UNIT_Z=Object.freeze(new Vector3(0,0,1)),Vector3.random=function(e){return defined(e)||(e=new Vector3),e.x=Math.random(),e.y=Math.random(),e.z=Math.random(),e};class Vector4{constructor(e,t,r,o){this.x=0,this.y=0,this.z=0,this.w=0,this.setLength=(e,t)=>(defined(t)&&t instanceof Vector4||(t=new Vector4),Vector4.multiplyByScalar(this.normalize(),e,t),t),this.add=e=>Vector4.add(this,e,this),this.normalize=e=>{defined(e)||(e=new Vector4);var t=Vector4.magnitude(this);return e.x=this.x/t,e.y=this.y/t,e.z=this.z/t,e.w=this.w/t,e},this.clone=e=>Vector4.clone(this,e),this.equals=e=>Vector4.equals(this,e),this.fromArray=(e,t=0)=>(this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this),this.toArray=(e=0,t)=>(defined(t)&&Array.isArray(t)||(t=new Array),t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t),this.toString=()=>"("+this.x+", "+this.y+", "+this.z+", "+this.w+")",this.x=defaultValue(e,0),this.y=defaultValue(t,0),this.z=defaultValue(r,0),this.w=defaultValue(o,0)}}Vector4.fromElements=function(e,t,r,o,n){return defined(n)?(n.x=e,n.y=t,n.z=r,n.w=o,n):new Vector4(e,t,r,o)},Vector4.clone=function(e,t){if(defined(e))return defined(t)?(t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t):new Vector4(e.x,e.y,e.z,e.w)},Vector4.packedLength=4,Vector4.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y+e.z*e.z+e.w*e.w},Vector4.magnitude=function(e){return Math.sqrt(Vector4.magnitudeSquared(e))},Vector4.distance=function(e,t){var r=new Vector4;return Vector4.subtract(e,t,r),Vector4.magnitude(r)},Vector4.distanceSquared=function(e,t){var r=new Vector4;return Vector4.subtract(e,t,r),Vector4.magnitudeSquared(r)},Vector4.add=function(e,t,r){return defined(r)||(r=new Vector4),r.x=e.x+t.x,r.y=e.y+t.y,r.z=e.z+t.z,r.w=e.w+t.w,r},Vector4.subtract=function(e,t,r){return r.x=e.x-t.x,r.y=e.y-t.y,r.y=e.z-t.z,r.w=e.w-t.w,r},Vector4.normalize=function(e,t){var r=Vector4.magnitude(e);return t.x=e.x/r,t.y=e.y/r,t.z=e.z/r,t.w=e.w/r,t},Vector4.dot=function(e,t){return e.x*t.x+e.y*t.y+e.z*t.z+e.w*t.w},Vector4.multiplyByScalar=function(e,t,r){return defined(r)||(r=new Vector4),r.x=e.x*t,r.y=e.y*t,r.z=e.z*t,r.w=e.w*t,r},Vector4.divideByScalar=function(e,t,r){return r.x=e.x/t,r.y=e.y/t,r.z=e.z/t,r.w=e.w/t,r},Vector4.negate=function(e,t){return t.x=-e.x,t.y=-e.y,t.z=-e.z,t.w=-e.w,t},Vector4.abs=function(e,t){return t.x=Math.abs(e.x),t.y=Math.abs(e.y),t.z=Math.abs(e.z),t.w=Math.abs(e.w),t},Vector4.lerp=function(e,t,r,o){defined(o)||(o=new Vector4);let n=new Vector4;return Vector4.multiplyByScalar(t,r,n),o=Vector4.multiplyByScalar(e,1-r,o),Vector4.add(n,o,o)},Vector4.equals=function(e,t){return e===t||defined(e)&&defined(t)&&e.x===t.x&&e.y===t.y&&e.z===t.z&&e.w===t.w},Vector4.ZERO=Object.freeze(new Vector4(0,0,0,0)),Vector4.ONE=Object.freeze(new Vector4(1,1,1,1)),Vector4.UNIT_X=Object.freeze(new Vector4(1,0,0,0)),Vector4.UNIT_Y=Object.freeze(new Vector4(0,1,0,0)),Vector4.UNIT_Z=Object.freeze(new Vector4(0,0,1,0)),Vector4.UNIT_W=Object.freeze(new Vector4(0,0,0,1)),Vector4.random=function(e){return defined(e)||(e=new Vector4),e.x=Math.random(),e.y=Math.random(),e.z=Math.random(),e.w=Math.random(),e};let _colorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};var rgbaMatcher=/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,rrggbbaaMatcher=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,rgbParenthesesMatcher=/^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,hslParenthesesMatcher=/^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;function hue2rgb(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),6*r<1?e+6*(t-e)*r:2*r<1?t:3*r<2?e+(t-e)*(2/3-r)*6:e}class Color{constructor(e,t,r,o){this.r=1,this.g=1,this.b=1,this.a=1,this.isColor=!0,this.getHex=()=>255*this.r<<16^255*this.g<<8^255*this.b<<0,this.getHexString=()=>("000000"+this.getHex().toString(16)).slice(-6),this.toString=()=>"("+this.r+", "+this.g+", "+this.b+", "+this.a+")",this.toCssColorString=()=>{var e=Color.floatToByte(this.r),t=Color.floatToByte(this.g),r=Color.floatToByte(this.b);return 1===this.a?"rgb("+e+","+t+","+r+")":"rgba("+e+","+t+","+r+","+this.a+")"},this.toCssHexString=()=>{var e=Color.floatToByte(this.r).toString(16);e.length<2&&(e="0"+e);var t=Color.floatToByte(this.g).toString(16);t.length<2&&(t="0"+t);var r=Color.floatToByte(this.b).toString(16);if(r.length<2&&(r="0"+r),this.a<1){var o=Color.floatToByte(this.a).toString(16);return o.length<2&&(o="0"+o),"#"+e+t+r+o}return"#"+e+t+r},this.toBytes=e=>{var t=Color.floatToByte(this.r),r=Color.floatToByte(this.g),o=Color.floatToByte(this.b),n=Color.floatToByte(this.a);return defined(e)?(e[0]=t,e[1]=r,e[2]=o,e[3]=n,e):[t,r,o,n]},this.withAlpha=(e,t)=>Color.fromAlpha(this,e,t),this.r=defaultValue(e,1),this.g=defaultValue(t,1),this.b=defaultValue(r,1),this.a=defaultValue(o,1)}}Color.NAMES=_colorKeywords,Color.fromVector4=function(e,t){return defined(t)?(t.r=e.x,t.g=e.y,t.b=e.z,t.a=e.w,t):new Color(e.x,e.y,e.z,e.w)},Color.fromBytes=function(e,t,r,o,n){return e=Color.byteToFloat(defaultValue(e,255)),t=Color.byteToFloat(defaultValue(t,255)),r=Color.byteToFloat(defaultValue(r,255)),o=Color.byteToFloat(defaultValue(o,255)),defined(n)?(n.r=e,n.g=t,n.b=r,n.a=o,n):new Color(e,t,r,o)},Color.fromAlpha=function(e,t,r){return defined(r)?(r.r=e.r,r.g=e.g,r.b=e.b,r.a=t,r):new Color(e.r,e.g,e.b,t)},Color.fromDec=function(e,t){defined(t)||(t=new Color);var r=Math.floor(e/65536),o=Math.floor(e%65536/256),n=Math.floor(e%256);return t.r=r,t.g=o,t.b=n,t.a=1,t},Color.fromHsl=function(e,t,r,o,n){e=defaultValue(e,0)%1,t=defaultValue(t,0),r=defaultValue(r,0),o=defaultValue(o,1);var a=r,i=r,l=r;if(0!==t){var c,s=2*r-(c=r<.5?r*(1+t):r+t-r*t);a=hue2rgb(s,c,e+1/3),i=hue2rgb(s,c,e),l=hue2rgb(s,c,e-1/3)}return defined(n)?(n.r=a,n.g=i,n.b=l,n.a=o,n):new Color(a,i,l,o)},Color.fromCssColorString=function(e,t){defined(t)||(t=new Color),e=e.replace(/\s/g,"");var r=Color.NAMES[e.toLowerCase()];if(defined(r))return Color.fromDec(r,t),t;var o=rgbaMatcher.exec(e);return null!==o?(t.r=parseInt(o[1],16)/15,t.g=parseInt(o[2],16)/15,t.b=parseInt(o[3],16)/15,t.a=parseInt(defaultValue(o[4],"f"),16)/15,t):null!==(o=rrggbbaaMatcher.exec(e))?(t.r=parseInt(o[1],16)/255,t.g=parseInt(o[2],16)/255,t.b=parseInt(o[3],16)/255,t.a=parseInt(defaultValue(o[4],"ff"),16)/255,t):null!==(o=rgbParenthesesMatcher.exec(e))?(t.r=parseFloat(o[1])/("%"===o[1].substr(-1)?100:255),t.g=parseFloat(o[2])/("%"===o[2].substr(-1)?100:255),t.b=parseFloat(o[3])/("%"===o[3].substr(-1)?100:255),t.a=parseFloat(defaultValue(o[4],"1.0")),t):null!==(o=hslParenthesesMatcher.exec(e))?Color.fromHsl(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,parseFloat(defaultValue(o[4],"1.0")),t):void 0},Color.packedLength=4,Color.byteToFloat=function(e){return e/255},Color.floatToByte=function(e){return 1===e?255:256*e|0},Color.clone=function(e,t){if(defined(e))return defined(t)?(t.r=e.r,t.g=e.g,t.b=e.b,t.a=e.a,t):new Color(e.r,e.g,e.b,e.a)},Color.add=function(e,t,r){return r.r=e.r+t.r,r.g=e.g+t.g,r.b=e.b+t.b,r.a=e.a+t.a,r},Color.subtract=function(e,t,r){return r.r=e.r-t.r,r.g=e.g-t.g,r.b=e.b-t.b,r.a=e.a-t.a,r},Color.multiply=function(e,t,r){return r.r=e.r*t.r,r.g=e.g*t.g,r.b=e.b*t.b,r.a=e.a*t.a,r},Color.divide=function(e,t,r){return r.r=e.r/t.r,r.g=e.g/t.g,r.b=e.b/t.b,r.a=e.a/t.a,r},Color.mod=function(e,t,r){return r.r=e.r%t.r,r.g=e.g%t.g,r.b=e.b%t.b,r.a=e.a%t.a,r},Color.lerp=function(e,t,r,o){return o.r=CMath.lerp(e.r,t.r,r),o.g=CMath.lerp(e.g,t.g,r),o.b=CMath.lerp(e.b,t.b,r),o.a=CMath.lerp(e.a,t.a,r),o},Color.multiplyByScalar=function(e,t,r){return r.r=e.r*t,r.g=e.g*t,r.b=e.b*t,r.a=e.a*t,r},Color.divideByScalar=function(e,t,r){return r.r=e.r/t,r.g=e.g/t,r.b=e.b/t,r.a=e.a/t,r};class CMath3D{}CMath3D.CMath=CMath,CMath3D.Vector2=Vector2,CMath3D.Vector3=Vector3,CMath3D.Vector4=Vector4,CMath3D.Color=Color;const JSC={VERSION:"0.0.1",test:()=>{console.log("Hi,It's running.")},defined,defaultValue,DeveloperError,CNumber,CArray,CString,CFormat,CStorage,CCookie,CRegular,CUrl,CDevice,CBrowser,CDataTime,CMath3D};export{CArray,CBrowser,CCookie,CDataTime,CDevice,CFormat,CMath,CMath3D,CNumber,CRegular,CStorage,CString,CUrl,Color,DeveloperError,Vector2,Vector3,Vector4,JSC as default,defaultValue,defined};
//# sourceMappingURL=jsc.modern.js.map
