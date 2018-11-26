# process(进程)
`process` 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。

## process 事件
`process` 对象是 `EventEmitter` 的实例。

**'beforeExit' 事件**
当 Node.js 的事件循环数组已经为空，并且没有额外的工作被添加进来，事件 `'beforeExit'` 会被触发。 正常情况下，如果没有额外的工作被添加到事件循环数组，Node.js 进程会结束。 但是如果 `'beforeExit'` 事件绑定的监听器的回调函数中，含有一个可以进行异步调用的操作，那么 Node.js 进程会继续运行。
```javascript
console.log('任务');

process.on('beforeExit', function() {
    console.log('任务完成');
    process.nextTick(function() {
        console.log('nextTick');
    });
});

process.on('exit', function() {
    console.log('退出进程');
})
// 任务
// 任务完成
// nextTick
// 即将退出，退出码：0
```
如果进程由于显式的原因而将要终止，例如直接调用 `process.exit()` 或抛出未捕获的异常，`'beforeExit'` 事件*不会被触发*。

除非本意就是需要添加额外的工作（*比如通过监听器进行异步调用*）到事件循环数组，否则不应该用 `'beforeExit'` 事件替代 `'exit'` 事件

**'disconnect' 事件**

如果 Node.js 进程是由 IPC 通道的方式创建的（详见子进程和集群文档），当 IPC 通道关闭时，会触发'disconnect'事件。
参考child_process，在子进程中process可以代替worker订阅事件

**'exit' 事件**

两种情况下 `'exit'` 事件会被触发：
- 显式调用 process.exit() 方法，使得 Node.js 进程即将结束；
- Node.js 事件循环数组中不再有额外的工作，使得 Node.js 进程即将结束。

在上述两种情况下，没有任何方法可以阻止事件循环的结束，一旦所有与 `'exit'` 事件绑定的监听器执行完成，Node.js 的进程会终止
