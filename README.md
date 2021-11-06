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
<!-- <script src="./bundles/tsdk.umd.js"></script> -->
<script src="./node_modules/@sogrey/typescript-sdk-template/bundles/tsdk.umd.js"></script>
<script>
    let greeter = new TSDK.Greeter("world");
    console.log(greeter.greet());
</script>
```
module:
``` js
<script type="module">
    import TSDK from './bundles/tsdk.module.js';
    let greeter = new TSDK.Greeter("world");
    console.log(greeter.greet());
</script>
```
nodejs:
``` js
let TSDK = require('@sogrey/typescript-sdk-template')

let greeter = new TSDK.Greeter("world");
console.log(greeter.greet());
```
