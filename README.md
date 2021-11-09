# TypeScript-SDK-Template-test
使用TypeScript开发SDK模板 测试分支

- `tsdk.js` 是 CommonJS 模块。这是一种被 NodeJS 使用的模块类型，看起来像 const myModule = require('my-module')
- `tsdk.module.js` 是 ECMAScript 模块，由 ES6 定义，看起来类似 import MyModule from 'my-module'
- `tsdk.umd.js` 是 UMD 模块
- `tsdk.d.ts` 是 TypeScript 类型描述文件

## Install
``` bash
npm i @sogrey/typescript-sdk-template
```
## Usage
umd:
``` html
<!-- <script src="./bundles/jsc.umd.js"></script> -->
<script src="./node_modules/@sogrey/js-common-SDK/bundles/jsc.umd.js"></script>
<script>
    console.log(JSC);
    console.log(JSC.CNumber.randomNum(1,100000));
    console.log(JSC.CNumber.format(19829680412));
</script>
```
module:
``` js
<script type="module">
    // import {CNumber} from './bundles/jsc.modern.js';
    // or
    import {CNumber} from './node_modules/@sogrey/js-common-sdk/bundles/jsc.module.js';
    console.log(CNumber.randomNum(1,10));
</script>
```
nodejs:
``` js
var JSC = require('./node_modules/@sogrey/js-common-sdk/bundles/jsc.js');
console.log(JSC.CNumber.randomNum(1, 10));
```