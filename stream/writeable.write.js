const fs = require('fs');

const writeable = fs.createWriteStream('file.txt');

writeable.write('writeable.write 写入数据', 'utf8', () => {
    console.log(arguments);
});