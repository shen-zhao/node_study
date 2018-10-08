# child_process

child_process 模块提供了衍生子进程的功能, 虽然node是单线程的, 但可以是多进程的


### child_process.spawn(command[, args][, options])

**argument**

- command
- args
- options
    - cwd {string} 子进程的当前工作目录。
    - env {Object} 环境变量键值对。
    - argv0 {string} 显式地设置要发给子进程的 argv[0] 的值。 如果未指定，则设为 command。
    - stdio {Array} | {string} 子进程的 stdio 配置。 （详见 options.stdio）
    - detached {boolean} 准备将子进程独立于父进程运行。 具体行为取决于平台。（详见 options.detached）
    - uid {number} 设置该进程的用户标识。（详见 setuid(2)
    - gid {number} 设置该进程的组标识。（详见 setgid(2)
    - shell {boolean} | {string} 如果为 true，则在一个 shell 中运行 command。 在 UNIX 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 一个不同的 shell 可以被指定为字符串。 See Shell Requirements and Default Windows Shell. 默认为 false（没有 shell）。
    - windowsVerbatimArguments {boolean} 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略，当指令 shell 存在的时该属性将自动被设置为true。默认值: false。
    - windowsHide {boolean} 是否隐藏在Windows系统下默认会弹出的子进程控制台窗口。 默认为: false

```javascript
const { spawn } = require('child_process');

const ls = spawn('pwd');

ls.stdout.on('data', (data) => {
    console.log(data.toString());  /* /Users/yp-tc-m-2687/Documents/f2e/my_test/node_study/child_process */
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    //0位成功，非0为失败
    console.log(`子进程退出码：${code}`); // 子进程退出码：0
});
```