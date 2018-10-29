const fs = require('fs');

let data;

try {
    data = fs.readFileSync('./readFileSync.txt', 'utf8');
    console.log('文件内容: ' + data);
} catch(e) {
    console.error('读取文件出错: ' + e.message);
}