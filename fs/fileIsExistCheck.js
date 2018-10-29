const fs = require('fs');

const path = './README.md';

//异步
fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
        console.log(err.code);
        return
    };

    console.log(`access ${path}: 存在`);
});

//同步
//1.accessSync
try {
    fs.accessSync(path, fs.constants.F_OK);
    console.log(`accessSync ${path}: 存在`);
} catch (err) {
    console.log(err.code);
}
//2.existsSync
try {
    const isExists = fs.existsSync(path);
    console.log(`existsSync ${path}: ${isExists ? '存在' : '不存在'}`);
} catch (err) {
    console.log(err.code);
}
