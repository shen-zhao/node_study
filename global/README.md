# Global(全局变量)

全局变量在所有模块中均可使用。 以下变量虽然看起来像全局变量，但实际上不是。它们的作用域只在模块内，详见[module文档](http://nodejs.cn/api/modules.html#modules_the_module_wrapper)
- __dirname
- __filename
- exports
- module
- require()
下面列出的对象都是针对 Node.js 的。

## Buffer 类

## __dirname
该变量虽然看起来像全局变量，但实际上不是。
当前模块的文件夹名称。等同于 `__filename` 的 `path.dirname()` 的值。

## __filename
该变量虽然看起来像全局变量，但实际上不是。
当前模块的文件名称---解析后的绝对路径。

## exports
这是一个对于 `module.exports` 的更简短的引用形式。
注意，就像任何变量，如果一个新的值被赋值给 `exports`，它就不再绑定到 `module.exports`

## console
用于打印 `stdout` 和 `stderr`。

## global
全局的命名空间对象。

## module
该变量虽然看起来像全局变量

## require()
该变量虽然看起来像全局变量，但实际上不是

## URL
浏览器兼容的 `URL` 类，根据 WHATWG URL 标准实现。
注意: 根据浏览器的约定，`URL` 对象的所有属性都是在类的原型上实现为getter和setter，而不是作为对象本身的数据属性。因此，与[遗留的urlObjects][]不同，在 `URL` 对象的任何属性(例如 `delete myURL.protocol`，`delete myURL.pathname`等)上使用 `delete` 关键字没有任何效果，但仍返回 `true`。

## URLSearchParams
`URLSearchParamsAPI`接口提供对`URL` query部分的读写权限。`URLSearchParams`类也能够与以下四个构造函数中的任意一个单独使用。详见[URLSearchParams](http://nodejs.cn/api/url.html#url_class_urlsearchparams)

## process
详见[process](http://nodejs.cn/api/process.html#process_process)

## setTimeout(callback, delay[, ...args])

## setInterval(callback, delay[, ...args])

## setImmediate(callback[, ...args])
- callback <Function> 在 Node.js 事件循环的当前回合结束时要调用的函数。
- ...args <any> 当调用 callback 时要传入的可选参数。
当多次调用 `setImmediate()` 时，`callback` 函数会按照它们被创建的顺序依次执行。 每次事件循环迭代都会处理整个回调队列。 如果一个立即定时器是被一个正在执行的回调排入队列的，则该定时器直到下一次事件循环迭代才会被触发。

## clearTimeout(timeout)、clearInterval(timeout)、clearImmediate(immediate);