#!/usr/bin/env node

'use strict';
// 参照：https://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html

const JSC = require("../bundles/jsc"); // 执行shell脚本
const shell = require("shelljs"); // 执行shell脚本
const argv = require('yargs') // 读取参数
    .usage('Usage: jsc [options]')
    .option('n', {
        alias: 'name', // 别名
        demand: true, // 是否必选
        default: 'tom', // 默认值
        describe: 'your name', // 提示
        type: 'string' // 数据类型
    })
    .option('a', {
        alias: 'age', // 别名
        demand: true, // 是否必选
        default: '18', // 默认值
        describe: 'your age', // 提示
        type: 'int' // 数据类型
    })
    .example('hello -n Tom', 'hello Tom // say hello to Tom')
    .example('hello --n Sogrey --a 18', 'hello Sogrey,18')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright Sogrey')
    .argv;

console.log('argv.n : ', argv.n);
console.log('argv.a : ', argv.a);

/*
$ jsc -n Sogrey -a 18
$ jsc -n=Sogrey -a=18
argv.n :  Sogrey
argv.a :  18
*/

let greeter = new JSC.Greeter("world!");
console.log(greeter.greet());