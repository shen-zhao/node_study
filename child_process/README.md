# child_process

## 概述
NodeJs是一个单进程的语言，不能像Java那样可以创建多线程来并发执行。当然在大部分情况下，NodeJs是不需要并发执行的，因为它是事件驱动性永不阻塞。但单进程也有个问题就是不能充分利用CPU的多核机制，根据前人的经验，可以通过创建多个进程来充分利用CPU多核，并且Node通过了`child_process`模块来创建完成多进程的操作。

## child_process.fork(modulePath[, args][, options])
- modulePath {string} 要在子进程中运行的模块。
- args {Array} 字符串参数列表。

- options {Object}
    - cwd {string} 子进程的当前工作目录。
    - env {Object} 环境变量键值对。
    - execPath {string} 用来创建子进程的执行路径。
    - execArgv {Array} 要传给执行路径的字符串参数列表。默认为 process.execArgv。
    - silent {boolean} 如果为 true，则子进程中的 stdin、 stdout 和 stderr 会被导流到父进程中，否则它们会继承自父进程，详见- child_process.spawn() 的 stdio 中的 'pipe' 和 'inherit' 选项。 默认: false。
    - stdio {Array> | <string} 详见 child_process.spawn() 的 stdio。 当提供了该选项，则它会覆盖 silent。 如果使用了数组变量，则该数组必须包含一个值为 'ipc' 的子项，否则会抛出错误。 例如 [0, 1, 2, 'ipc']。
    - windowsVerbatimArguments {boolean} 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略。默认值: false。
    - uid {number} 设置该进程的用户标识。（详见 setuid(2)
    - gid {number} 设置该进程的组标识。（详见 setgid(2)
- 返回: {ChildProcess}

`child_process.fork()` 方法是 `child_process.spawn()` 的一个特殊情况，专门用于衍生新的 Node.js 进程。 跟 `child_process.spawn()` 一样返回一个 `ChildProcess` 对象。 返回的 `ChildProcess` 会有一个额外的内置的通信通道，它允许消息在父进程和子进程之间来回传递。 详见 `subprocess.send()`。

衍生的 Node.js 子进程与两者之间建立的 `IPC` 通信信道的异常是`独立`于父进程的。 每个进程都有自己的内存，使用自己的 V8 实例。 由于需要额外的资源分配，**因此不推荐衍生大量的 Node.js 进程**。

默认情况下，`child_process.fork()` 会使用父进程中的 `process.execPath` 衍生新的 Node.js 实例。 `options` 对象中的 `execPath` 属性可以替换要使用的执行路径。


## 事件

### 'close'事件
- code {number} 如果子进程退出自身，则该值是退出码。
- signal {string} 子进程被终止时的信号。
当子进程的 `stdio` 流被关闭时会触发 `'close'` 事件。 这与 `'exit'` 事件不同，因为多个进程可能共享同一 `stdio` 流。

### 'exit' 事件
- code {number} 如果子进程退出自身，则该值是退出码。
- signal {string} 子进程被终止时的信号。
子进程结束后会触发 `'exit'` 事件。 如果进程退出了，则 `code` 是进程的最终退出码，否则为 `null`。 如果进程是收到的信号而终止的，则 `signal` 是信号的字符串名称，否则为 `null`。 这两个总有一个是非空的。

**注意，当 `'exit'` 事件被触发时，子进程的 `stdio` 流可能依然是打开的。**

###'message' 事件
- message {Object} 一个已解析的 JSON 对象或原始值。
- sendHandle {Handle}(句柄) 一个 net.Socket 或 net.Server 对象 或 undefined。
当一个子进程使用 `process.send()` 发送消息时会触发 'message' 事件。

main.js
```javascript
var cp = require('child_process');
//只有使用fork才可以使用message事件和send()方法
var n = cp.fork('./child.js');

n.on('message',function(m){
   console.log(m, 1);
})
n.send({"message":"hello"});
```
child.js
```javascript
var cp = require('child_process');

process.on('message',function(m){
  console.log(m, 2);
})
process.send({"message":"hello I am child"})
```
```shell
{ message: 'hello' } 2
{ message: 'hello I am child' } 1
```

### 'disconnect' 事件
在父进程中调用 `subprocess.disconnect()` 或在子进程中调用 `process.disconnect()` 后会触发 `'disconnect'` 事件。 断开后就不能再发送或接收信息，且 `subprocess.connected` 属性会被设为 `false`。


## 子进程(subprocess)属性
- subprocess.channel {Object}: 属性是当前子进程的 IPC 通道的引用。如果当前没有 IPC 通道，则该属性为 undefined。
- subprocess.connected {Boolean}: `subprocess.disconnect()` 后会被设为 `false`; `subprocess.connected` 属性表明是否仍可以从一个子进程发送和接收消息。 当 `subprocess.connected` 为 `false` 时，则不能再发送或接收的消息。
- subprocess.killed {Boolean}: 当 `subprocess.kill()` 已成功发送信号给子进程后会被设置为 `true`。`subprocess.killed` 属性表明该子进程是否已成功接收到 `subprocess.kill()` 的信号。 该属性不代表子进程是否已被终止。
- subprocess.pid {Number}: 返回子进程的进程标识（PID）。
- subprocess.stderr {stream.Readable}: 一个代表子进程的 `stderr` 的可读流。如果子进程被衍生时 `stdio[2]` 被设为任何不是 'pipe' 的值，则这会是 `null`。`subprocess.stderr` 是 `subprocess.stdio[2]` 的一个别名。 这两个属性指向相同的值。
- subprocess.stdin {stream.Writable}: 一个代表子进程的 `stdin` 的可写流。如果子进程被衍生时 `stdio[0]` 被设为任何不是 'pipe' 的值，则这会是 `null`。`subprocess.stdin` 是 `subprocess.stdio[0]` 的一个别名。 这两个属性指向相同的值。
- subprocess.stdout {stream.Readable}: 一个代表子进程的 `stdout` 的可读流。如果子进程被衍生时 `stdio[1]` 被设为任何不是 'pipe' 的值，则这会是 `null`。`subprocess.stdout` 是 `subprocess.stdio[1]` 的一个别名。 这两个属性指向相同的值。
- subprocess.stdio {Array}: 一个到子进程的管道的稀疏数组，对应着传给 `child_process.spawn()` 的选项中值被设为 'pipe' 的 `stdio`。 注意，`subprocess.stdio[0]`、`subprocess.stdio[1]` 和 `subprocess.stdio[2]` 分别可用作 `subprocess.stdin`、 `subprocess.stdout` 和 `subprocess.stderr`。

### subprocess方法

#### subprocess.disconnect()
关闭父进程与子进程之间的 IPC 通道，一旦没有其他的连接使其保持活跃，则允许子进程正常退出。 调用该方法后，父进程和子进程上各自的 `subprocess.connected` 和 `process.connected` 属性都会被设为 `false`，且进程之间不能再传递消息。

#### subprocess.kill([signal]) (官网解释没看懂)
- signal {String}
`subprocess.kill()` 方法向子进程发送一个信号。 如果没有给定参数，则进程会发送 'SIGTERM' 信号。 查看 signal(7) 了解可用的信号列表。向子进程发送一个信号，不写参数默认结束子进程

#### subprocess.unref()
默认情况下，父进程会等待 detached 为 true的子进程，如果不想让父进程等待，可以使用 subprocess.unref() 。这样可以移出父进程的事件循环中对子进程的引用计数，从而允许父进程独立于子进程退出，除非子进程和父进程之间存在已建立的IPC通道。

#### subprocess.ref()
在调用`subprocess.unref()`之后调用`subprocess.ref()`将会恢复子进程中已删除的引用计数，迫使父进程在退出之前等待子进程退出。

#### subprocess.send(message[, sendHandle[, options]][, callback])
- message <Object> 向子进程发送的信息
- sendHandle <Handle> 它用于传入一个 TCP 服务器或 socket 对象给子进程，子进程会接收对象作为第二个参数，并传给注册在 [process.on('message')] 事件上的回调函数。socket 上接收或缓冲的任何数据不会被发送给子进程。
- options <Object>
    - keepOpen: 一个 Boolean 值，当传入 net.Socket 实例时可用。 当为 true 时，socket 在发送进程中保持打开。 默认为 false。
- callback <Function> 它在消息发送之后、子进程收到消息之前被调用。 该函数被调用时只有一个参数：成功时是 null，失败时是一个 Error 对象。
- 返回: <boolean>

当父进程和子进程之间建立了一个 IPC 通道时（例如，使用 `child_process.fork()`），`subprocess.send()` 方法可用于发送消息到子进程。 当子进程是一个 Node.js 实例时，消息可以通过 \[`process.on('message')`\] 事件接收。

如果通道已关闭，或当未发送的消息的积压超过阈值使其无法发送更多时，subprocess.send() 会返回 false。 除此以外，该方法返回 true。 callback 函数可用于实现流量控制。