var JSC = require('./bundles/jsc.js');
console.log(JSC.CMath3D.Color.fromCssColorString('#67ADDF'));
console.log(JSC.CMath3D.Color.fromCssColorString('GREEN'));
console.log(JSC.CMath3D.Color.NAMES);

// let limitPromise = new JSC.LimitPromise(3);

// function sleep(sec) {
//     console.log('..............');
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('等待了' + sec + '秒');
//             resolve('');
//         }, sec * 1000);
//     });
// }

// limitPromise.call(sleep, 1);
// limitPromise.call(sleep, 2);
// limitPromise.call(sleep, 3);
// limitPromise.call(sleep, 4);
// limitPromise.call(sleep, 5);
// limitPromise.call(sleep, 6);