### child_process.spawn(command[, args][, options])

**argument**

- command {string} 运行的命令，参数使用空格分隔。

- options {Object}
    - cwd {string} 子进程的当前工作目录。
    - env {Object} 环境变量键值对。
    - encoding {string} 默认为 'utf8'。
    - shell {string} 执行命令的 shell。在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为 process.env.ComSpec。详见Shell的要求与Windows默认的Shell。
    - timeout {number} 默认为 0。
    - maxBuffer {number} stdout 或 stderr 允许的最大字节数。默认为 200*1024。如果超过限制，则子进程会被终止。详见 maxBuffer与Unicode。
    - killSignal {string> | <integer} 默认为 'SIGTERM'。
    - uid {number} 设置进程的用户标识，详见 setuid(2)。
    - gid {number} 设置进程的组标识，详见 setgid(2)。
    - windowsHide {boolean} 隐藏子进程的控制台窗口，常用于 Windows 系统。默认为 false。

- callback {Function} 进程终止时调用。
        error {Error}
        stdout {string> | <Buffer}
        stderr {string> | <Buffer}
- 返回: {ChildProcess}

```javascript
const { exec } = require('child_process');

exec('node spawn.js', (error, stdout, stderr) => {
    //异步
    console.log(stdout.toString());
});

console.log('结束');
```
