# process(进程)
`process` 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。

## 常用属性与方法

### process.execPath
process.execPath 属性，返回启动Node.js进程的可执行文件所在的*绝对路径*。
例如
```shell
/Users/yp-tc-m-2687/.nvm/versions/node/v8.11.4/bin/node
```

### process.argv
`process.argv` 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。第一个元素为`process.execPath`。如果需要获取`argv[0]`的值请参见  `process.argv0`。第二个元素为当前执行的JavaScript文件路径。剩余的元素为其他*命令行参数*。
```javascript
console.log(process.argv);
```
```shell
$ node app.js 参数1 参数2 参数3
```
```shell
[ '/Users/yp-tc-m-2687/.nvm/versions/node/v8.11.4/bin/node',
  '/Users/yp-tc-m-2687/Documents/f2e/my_test/node_study/process/app.js',
  '参数1',
  '参数2',
  '参数3' ]
```

### process.argv0
保存Node.js启动时传入的argv[0]参数值的一份只读副本。
注：与`process.argv[0]`不相同
```shell
> process.argv[0]
'/Users/yp-tc-m-2687/.nvm/versions/node/v8.11.4/bin/node'
> process.argv0
'node'
```

### process.cwd()
`process cwd()` 方法返回 Node.js 进程当前工作的目录。
```shell
> process.cwd()
'/Users/yp-tc-m-2687/Documents/f2e/my_test/node_study/process'
```

### process.chdir(directory)
- directory {string}

`process.chdir()`方法变更Node.js进程的当前工作目录，如果变更目录失败会抛出异常(例如，如果指定的目录不存在)。

### process.connected
如果Node.js进程是由IPC channel方式创建的(请看[Child Process子进程][] 和 [Cluster集群][] 文档)， 只要IPC channel保持连接，`process.connected`属性就会返回`true`。 `process.disconnect()`被调用后，此属性会返回`false`。

`process.connected`如果为false，则不能通过IPC channel使用`process.send()`发送信息。

### process.channel
如果Node.js进程是由IPC channel(请看 Child Process 文档) 方式创建的，`process.channel`属性保存IPC channel的引用。 如果IPC channel不存在，此属性值为`undefined`。

### process.disconnect()
如果 Node.js 进程是从IPC频道派生出来的（具体看 Child Process 和  Cluster 的文档）, `process.disconnect()`函数会关闭到父进程的IPC频道，以允许子进程一旦没有其他链接来保持活跃就优雅地关闭。

调用`process.disconnect()`的效果和父进程调用`ChildProcess.disconnect()`的一样`ChildProcess.disconnect()`.

如果 Node.js 进程不是从IPC频道派生出来的，那调用`process.disconnect()`函数的结果是undefined. 

### process.env
`process.env`属性返回一个包含用户环境信息的对象.
```shell
> process.env
{ TMPDIR: '/var/folders/f9/0tldvxqd6dg8d6vzqfxjpyh00000gn/T/',
  __CF_USER_TEXT_ENCODING: '0x1F5:0x19:0x34',
  SHELL: '/bin/zsh',
  HOME: '/Users/yp-tc-m-2687',
  Apple_PubSub_Socket_Render: '/private/tmp/com.apple.launchd.ZFsTSqmaK5/Render',
  SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.w0SgH16tsE/Listeners',
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/yp-tc-m-2687/.nvm/versions/node/v8.11.4/bin',
  LOGNAME: 'zhao.shen',
  XPC_SERVICE_NAME: '0',
  USER: 'zhao.shen',
  XPC_FLAGS: '0x0',
  LC_CTYPE: 'zh_CN.UTF-8',
  LESS: '-R',
  LSCOLORS: 'Gxfxcxdxbxegedabagacad',
  NVM_BIN: '/Users/yp-tc-m-2687/.nvm/versions/node/v8.11.4/bin',
  NVM_CD_FLAGS: '-q',
  NVM_DIR: '/Users/yp-tc-m-2687/.nvm',
  OLDPWD: '/Users/yp-tc-m-2687/Documents/f2e/my_test/node_study',
  PAGER: 'less',
  PWD: '/Users/yp-tc-m-2687/Documents/f2e/my_test/node_study/process',
  SHLVL: '1',
  ZSH: '/Users/yp-tc-m-2687/.oh-my-zsh',
  TERM_PROGRAM: 'vscode',
  TERM_PROGRAM_VERSION: '1.29.1',
  LANG: 'zh_CN.UTF-8',
  TERM: 'xterm-256color',
  _: '/Users/yp-tc-m-2687/.nvm/versions/node/v8.11.4/bin/node' }
```
可以存储于环境有关的全局变量

在Windows系统下，环境变量是不区分大小写的

### process.execArgv
`process.execArgv` 属性返回当Node.js进程被启动时，Node.js**特定的命令行选项**。 这些选项在`process.argv`属性返回的数组中不会出现，并且这些选项中不会包括Node.js的可执行脚本名称或者任何在脚本名称后面出现的选项。 这些选项在创建子进程时是有用的，因为他们包含了与父进程一样的执行环境信息。
例如：
```shell
$ node --harmony app.js --version
```
process.execArgv的结果:
```shell
['--harmony']
```
process.argv的结果:
```shell
['/usr/local/bin/node', 'app.js', '--version']
```

### process.exit([code])
- code {integer} 结束状态码。默认为0。

`process.exit()`方法以结束状态码`code`指示Node.js同步终止进程。 如果`code`未提供，此exit方法要么使用'success' 状态码 0，要么使用`process.exitCode`属性值，前提是此属性已被设置。 Node.js在所有`'exit'事件`监听器都被调用了以后，才会终止进程。

### process.exitCode
- {integer}

当进程正常结束，或通过`process.exit()`结束但未传递参数时，此数值标识进程结束的状态码。

给`process.exit(code)`指定一个状态码，会*覆盖*`process.exitCode`的原有值。

### process.kill(pid[, signal])
- pid {number} 进程ID
- signal {string} | {number} 将发送的信号，类型为string或number。默认为'SIGTERM'。

`process.kill()`方法将signal发送给pid标识的进程。

### process.mainModule
`process.mainModule`属性提供了一种获取`require.main`的替代方式。 区别在于，若主模块在运行时中发生改变， `require.main`可能仍然指向变化之前所依赖的模块 一般来说，假定`require.main`和`process.mainModule`引用相同的模块是安全的。

就像`require.main`一样，如果没有入口脚本，`process.mainModule`的值是undefined。

### process.memoryUsage()
- 返回: {Object}
    - rss {integer}
    - heapTotal {integer}
    - heapUsed {integer}
    - external {integer}

`process.memoryUsage()`方法返回Node.js进程的内存使用情况的对象，该对象每个属性值的单位为字节。
```shell
> process.memoryUsage()
{ rss: 21770240,
  heapTotal: 7684096,
  heapUsed: 4995640,
  external: 10272 }
```
`heapTotal` 和 `heapUsed` 代表V8的内存使用情况。
`external`代表V8管理的，绑定到Javascript的C++对象的内存使用情况。
`rss`, 驻留集大小, 是给这个进程分配了多少物理内存(占总分配内存的一部分) 这些物理内存中包含堆，栈，和代码段。

对象，字符串，闭包等存于堆内存。 变量存于栈内存。 实际的JavaScript源代码存于代码段内存。

### process.nextTick(callback[, ...args])
- callback {Function}
- ...args {any} 调用 callback时传递给它的额外参数

`process.nextTick()`方法将 `callback` 添加到**"next tick 队列"**。 一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用。

### process.pid
`process.pid`属性返回进程的PID。
```shell
> process.pid
76864
```

### process.platform
`process.platform`属性返回字符串，标识Node.js进程运行其上的操作系统平台。
- 'aix'
- 'darwin'
- 'freebsd'
- 'linux'
- 'openbsd'
- 'sunos'
- 'win32'
```shell
> process.platform
'darwin'
```

### process.send(message[, sendHandle[, options]][, callback])
- message {Object}
- sendHandle {net.Server} | {net.Socket}
- options {Object}
- callback {Function}
- Returns: {boolean}

如果Node.js进程是通过进程间通信产生的，那么，`process.send()`方法可以用来给父进程发送消息。 接收到的消息被视为父进程的ChildProcess对象上的一个`'message'`事件
如果Node.js进程不是通过进程间通信产生的， `process.send()` 会是`undefined`。

注意: 消息传递时，以格式序列化和解析，结果消息与发送时未必完全一样。

### process.stderr(标准错误)


### process.stdin(标准输入)



### process.stdout(标准输出)

终端的输入和输出：
```javascript
/*1:声明变量*/
var num1, num2;
/*2：向屏幕输出，提示信息，要求输入num1*/
process.stdout.write('请输入num1的值：');
/*3：监听用户的输入*/
process.stdin.on('data', function (chunk) {
    if (!num1) {
        num1 = Number(chunk);
        /*4：向屏幕输出，提示信息，要求输入num2*/
        process.stdout.write('请输入num2的值：');
    } else {
        num2 = Number(chunk);
        process.stdout.write('结果是：' + (num1 + num2));
    }
});
```


## process 事件
`process` 对象是 `EventEmitter` 的实例。

### **'beforeExit' 事件**

当 Node.js 的事件循环数组已经为空，并且没有额外的工作被添加进来，事件 `'beforeExit'` 会被触发。 正常情况下，如果没有额外的工作被添加到事件循环数组，Node.js 进程会结束。 但是如果 `'beforeExit'` 事件绑定的监听器的回调函数中，含有一个可以进行异步调用的操作，那么 Node.js 进程会继续运行。
```javascript
console.log('任务');

process.on('beforeExit', function() {
    console.log('任务完成');
    process.nextTick(function() {
        console.log('nextTick');
    });
});

process.on('exit', function(code) {
    console.log(`即将退出，退出码：${code}`);
})
// 任务
// 任务完成
// nextTick
// 即将退出，退出码：0
```
如果进程由于显式的原因而将要终止，例如直接调用 `process.exit()` 或抛出未捕获的异常，`'beforeExit'` 事件*不会被触发*。

除非本意就是需要添加额外的工作（*比如通过监听器进行异步调用*）到事件循环数组，否则不应该用 `'beforeExit'` 事件替代 `'exit'` 事件

### **'disconnect' 事件**

如果 Node.js 进程是由 IPC 通道的方式创建的（详见子进程和集群文档），当 IPC 通道关闭时，会触发'disconnect'事件。
参考child_process，在子进程中process可以代替worker订阅事件

### **'exit' 事件**

两种情况下 `'exit'` 事件会被触发：
- 显式调用 process.exit() 方法，使得 Node.js 进程即将结束；
- Node.js 事件循环数组中不再有额外的工作，使得 Node.js 进程即将结束。

在上述两种情况下，没有任何方法可以阻止事件循环的结束，一旦所有与 `'exit'` 事件绑定的监听器执行完成，Node.js 的进程会终止

`'exit'` 事件监听器的回调函数，只有一个入参，这个参数的值可以是 `process.exitCode` 的属性值，或者是调用 `process.exit()` 方法时传入的 `exitCode` 值。
```javascript
process.on('exit', (code) => {
  console.log(`即将退出，退出码：${code}`);
});
process.exit(0);
```
`'exit'` 事件监听器的回调函数只允许同步操作。 `'exit'` 事件监听器被调用后，Nodje.js 进程会立即退出，事件循环排队中的工作都会被丢弃。 以下例子中，定时器中的操作不会被执行：
```javascript
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('该函数不会被执行');
  }, 0);
});
```
### **'message' 事件**
- message {Object} | {boolean} | {number} | {string} | {null} 发送的消息。
- sendHandle {net.Server} | {net.Socket}

如果 Node.js 进程是使用 IPC 通道衍生的（详见`子进程`和`集群`文档），则当子进程接收到父进程使用 `childprocess.send()` 发送的消息时触发。

消息会进行序列化和解析，收到的消息可能与发送的不完全一样。

# Exit Codes
正常情况下，如果没有异步操作正在等待，那么Node.js会以状态码0退出，其他情况下，会 用如下的状态码:

- 1 未捕获异常 - 有一个未被捕获的异常, 并且没被一个 domain 或 an 'uncaughtException' 事件处理器处理。
- 2 - 未被使用 (Bash为防内部滥用而保留)
- 3 内部JavaScript 分析错误 - Node.js的内部的JavaScript源代码 在引导进程中导致了一个语法分析错误。 这是非常少见的, 一般只会在开发Node.js本身的时候出现。
- 4 内部JavaScript执行失败 - 引导进程执行Node.js的内部的JavaScript源代码时，返回函数值失败。 这是非常少见的, 一般只会在开发Node.js本身的时候出现。
- 5 致命错误 - 在V8中有一个致命的错误. 比较典型的是以FATALERROR为前缀从stderr打印出来的消息。
- 6 非函数的内部异常处理 - 发生了一个内部异常，但是内部异常处理函数 被设置成了一个非函数，或者不能被调用。
- 7 内部异常处理运行时失败 - 有一个不能被捕获的异常。 在试图处理这个异常时，处理函数本身抛出了一个错误。 这是可能发生的, 比如, 如果一个 'uncaughtException' 或者 domain.on('error') 处理函数抛出了一个错误。
- 8 - 未被使用. 在之前版本的Node.js, 退出码8有时候表示一个未被捕获的异常。
- 9 - 不可用参数 - 也许是某个未知选项没有确定，或者没给必需要的选项填值。
- 10 内部JavaScript运行时失败 - 调用引导函数时， 引导进程执行Node.js的内部的JavaScript源代码抛出错误。 这是非常少见的, 一般只会在开发Node.js本身的时候出现。
- 12 不可用的调试参数 - --inspect 和/或 --inspect-brk 选项已设置，但选择的端口号无效或不可用。
- >128 退出信号 - 如果Node.js的接收信号致命诸如 SIGKILL 或 SIGHUP，那么它的退出代码将是 128 加上信号的码值。 这是POSIX的标准做法，因为退出码被定义为7位整数，并且信号退出设置高位，然后包含信号码值。

