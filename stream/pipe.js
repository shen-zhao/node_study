const fs = require('fs');

const readable = fs.createReadStream('haha.txt');

readable.setEncoding('utf8');

const writeable = fs.createWriteStream('file.txt');

writeable.on('pipe', (src) => {
    console.log(src);
});

writeable.on('error', (err) => {
    console.log(err);
});

readable.pipe(writeable);