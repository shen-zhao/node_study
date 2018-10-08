const { execFile } = require('child_process');

// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log(stdout);
// });

execFile('/Users/yp-tc-m-2687/Documents/f2e/my_test/node_study/child_process/test.sh', (error, stdout, stderr) => {
    if (error) {
        return console.log('???', error);
    }
    console.log(stdout.toString());
});
