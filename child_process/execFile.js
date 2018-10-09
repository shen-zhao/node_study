const execFile = require('child_process').execFile;

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
