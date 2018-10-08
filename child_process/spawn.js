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