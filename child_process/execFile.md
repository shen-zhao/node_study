### child_process.execFile(file[, args][, options][, callback])

**arguments**

- file {string} 要运行的可执行文件的名称或路径。
- args {string[]} 字符串参数列表。

- options {Object}
    - cwd {string} 子进程的当前工作目录。
    - env {Object} 环境变量键值对。
    - encoding {string} 默认为 'utf8'。
    - timeout {number} 默认为 0。
    - maxBuffer {number} stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 See caveat at maxBuffer and Unicode.
    - killSignal {string} | {integer} 默认为 'SIGTERM'。
    - uid {number} 设置该进程的用户标识。（详见 setuid(2)
    - gid {number} 设置该进程的组标识。（详见 setgid(2)
    - windowsHide {boolean} 是否隐藏在Windows系统下默认会弹出的子进程控制台窗口。 默认为: false。
    - windowsVerbatimArguments {boolean} 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略，当指令 shell 存在的时该属性将自动被设置为true。默认为: false。

- callback {Function} 当进程终止时调用，并带上输出。
    - error {Error}
    - stdout {string} | {Buffer}
    - stderr {string} | {Buffer}
- 返回: {ChildProcess}

**注意**

`child_process.execFile()` 函数类似 `child_process.exec()`，除了不衍生一个 shell。 而是，指定的可执行的 file 被直接衍生为一个新进程，这使得它比 `child_process.exec()` 更高效。

它支持和 `child_process.exec()` 一样的选项。 由于没有衍生 shell，因此不支持像 I/O 重定向和文件查找这样的行为。

`child_process.exec()` 和 `child_process.execFile()` 之间的区别会因平台而不同。 在类 Unix 操作系统（Unix、 Linux、 macOS）上，`child_process.execFile()` 效率更高，因为它不需要衍生 shell。 但在 Windows 上，.bat 和 .cmd 文件在没有终端的情况下是不可执行的，因此不能使用 `child_process.execFile()` 启动。 可以使用设置了 shell 选项的 `child_process.spawn()`、或使用 `child_process.exec()`、或衍生 cmd.exe 并将 .bat 或 .cmd 文件作为参数传入（也就是 shell 选项和 `child_process.exec()` 所做的工作）。 如果脚本文件名包含空格，则需要加上引号。

```javascript
const { execFile } = require('child_process');

// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log(stdout);
// });
execFile('./test.sh', { //此处注意读写权限问题
    cwd: __dirname
}, (error, stdout, stderr) => {
    if (error) {
        return console.log('???', error);
    }
    console.log(stdout.toString());
});
```