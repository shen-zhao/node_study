const fs = require('fs');

//异步
fs.writeFile('./writeFile.txt', '异步写入文件成功', 'utf8', (err) => {
    if(err) throw err;
    console.log('异步写入文件成功');
});

//同步
try {
    fs.writeFileSync('./writeFileSync.txt', '同步写入文件成功', 'utf-8');
    console.log('同步写入文件成功');
} catch (err) {
    throw err;
}
