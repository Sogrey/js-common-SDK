# js-common-SDK
js基础通用函数工具SDK

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/Sogrey/js-common-SDK)


- `jsc.js` 是 CommonJS 模块。这是一种被 NodeJS 使用的模块类型，看起来像 const myModule = require('my-module')
- `jsc.module.js` 是 ECMAScript 模块，由 ES6 定义，看起来类似 import MyModule from 'my-module'
- `jsc.modern.js` modern ES2017 output (see below)
- `jsc.umd.js` 是 UMD 模块
- `jsc.d.ts` 是 TypeScript 类型描述文件


## Install
``` bash
npm i @sogrey/js-common-sdk
```
## Usage
umd:
``` html
<!-- <script src="./bundles/jsc.umd.js"></script> -->
<script src="./node_modules/@sogrey/js-common-SDK/bundles/jsc.umd.js"></script>
<script>
    let greeter = new JSC.Greeter("world");
    console.log(greeter.greet());
</script>
```
module:
``` js
<script type="module">
    import JSC from './bundles/jsc.module.js';
    let greeter = new JSC.Greeter("world");
    console.log(greeter.greet());
</script>
```
nodejs:
``` js
let JSC = require('@sogrey/js-common-sdk')

let greeter = new JSC.Greeter("world");
console.log(greeter.greet());
```
