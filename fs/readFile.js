const fs = require('fs');

fs.readFile('./readFile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('文件读取出错：', err.message);
    }
    console.log('读取结果：%s', data);
    console.log('---读取结束---');
});

console.log('---读取开始---');