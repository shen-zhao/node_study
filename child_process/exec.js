const { exec } = require('child_process');

exec('node spawn.js', (error, stdout, stderr) => {
    //异步
    console.log(stdout.toString());
});

console.log('结束');