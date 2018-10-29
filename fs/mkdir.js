const fs = require('fs');

//异步
fs.mkdir('mkdir', (err) => {
    if (err) throw err;

    console.log('异步创建目录成功');
});


//10.12.0版本支持options recursive参数，支持递归创建目录
/*
fs.mkdir('tmp/a/apple', { recursive: true }, (err) => {
    if (err) throw err;
});
*/

//同步
try {
    fs.mkdirSync('mkdirSync');
    console.log('同步创建目录成功');
} catch (err) {
    throw err;
}
