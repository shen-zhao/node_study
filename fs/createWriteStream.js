const fs = require('fs');
const writeStream = fs.createWriteStream('createWriteStream.txt', 'utf8');

writeStream
    .on('finish', () => {
        console.log('数据写入结束');
    })
    .on('close', () => {
        console.log('写入关闭');
    });

writeStream.write('通过流写入');
writeStream.write('数据');
writeStream.end('; end');