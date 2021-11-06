# TypeScript-SDK-Template
使用TypeScript开发SDK模板

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/Sogrey/TypeScript-SDK-Template)


- `tsdk.js` 是 CommonJS 模块。这是一种被 NodeJS 使用的模块类型，看起来像 const myModule = require('my-module')
- `tsdk.module.js` 是 ECMAScript 模块，由 ES6 定义，看起来类似 import MyModule from 'my-module'
- `tsdk.modern.js` modern ES2017 output (see below)
- `tsdk.umd.js` 是 UMD 模块
- `tsdk.d.ts` 是 TypeScript 类型描述文件

> In addition to the above formats, Microbundle also outputs a modern bundle specially designed to work in all modern browsers. This bundle preserves most modern JS features when compiling your code, but ensures the result runs in 95% of web browsers without needing to be transpiled. Specifically, it uses Babel's "bugfixes" mode (previously known as preset-modules) to target the set of browsers that support <script type="module"> - that allows syntax like async/await, tagged templates, arrow functions, destructured and rest parameters, etc. The result is generally smaller and faster to execute than the plain esm bundle.
> 
> 除了上述格式之外，Microbundle 还输出了一个`modern`专门设计用于所有现代浏览器的包。这个包在编译你的代码时保留了大多数现代 JS 特性，但确保结果在 95% 的 Web 浏览器中运行而无需转换。具体来说，它使用 Babel 的“bugfixes”模式 （以前称为preset-modules）来定位支持的浏览器集`<script type="module">`- 允许使用 `async/await`、标记模板、箭头函数、解构和休息参数等语法。结果是通常比普通esm包更小，执行速度更快。
>
> From Microbundle

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
