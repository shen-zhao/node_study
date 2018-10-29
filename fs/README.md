## 文件读取
### 普通读取
同步读取：
### fs.readFileSync(path[, options])
- path {string} | {Buffer} | {URL} | {integer} 文件名或文件描述符。
- options {Object} | {string}
    - encoding {string} | {null} 默认为 null。
    - flag {string} 详见支持的文件系统flag。默认为 'r'。
- 返回: {string} | {Buffer}

如果指定了 `encoding` 选项，则该函数返回一个字符串，否则返回一个 `buffer`。
```javascript
const fs = require('fs');

let data;

try {
    data = fs.readFileSync('./readFileSync.txt', 'utf8');
    console.log('文件内容: ' + data);
} catch(e) {
    console.error('读取文件出错: ' + e.message);
}

/*
node readFileSync.js
输出：
文件内容: 普通文件读取=>同步文件读取！
*/
```

异步读取
### fs.readFile(path[, options], callback)
- path {string} | {Buffer} | {URL} | {integer} 文件名或文件描述符。
- options {Object} | {string}
    - encoding {string} | {null} 默认为 null。
    - flag {string} 详见支持的文件系统flag。默认为 'r'。
- callback {Function}
    - err {Error}
    - data {string} | {Buffer}

如果未指定字符编码，则返回原始的 buffer。

```javascript
const fs = require('fs');

fs.readFile('./readFile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('文件读取出错：', err.message);
    }
    console.log('读取结果：%s', data);
    console.log('---读取结束---');
});

console.log('---读取开始---');

/*
node readFile.js
输出:
---读取开始---
读取结果：普通读取文件=>异步读取！
---读取结束---
*/
```

## 通过文件流读取
适合读取大文件
```javascript
const fs = require('fs');
const readStream = fs.createReadStream('./createReadStream.txt', 'utf8');

readStream
    .on('data', (chunk) => {
        console.log('读取数据：%s', chunk);
    })
    .on('error', (err) => {
        console.log('出错: ' + err.message);
    })
    .on('end', () => {
        console.log('没有数据了');
    })
    .on('close', () => {
        console.log('已经关闭');
    });

/*
➜  fs git:(master) ✗ node createReadStream.js
读取数据：通过文件流读取=>适合读取大文件
没有数据了
已经关闭
*/
```

## 文件写入
### 普通写入
备注：以下代码，如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
异步写入
```javascript
const fs = require('fs');

//异步
fs.writeFile('./writeFile.txt', '异步写入文件成功', 'utf8', (err) => {
    if(err) throw err;
    console.log('异步写入文件成功');
});
```

同步写入
```javascript
const fs = require('fs');

//同步
try {
    fs.writeFileSync('./writeFileSync.txt', '同步写入文件成功', 'utf-8');
    console.log('同步写入文件成功');
} catch (err) {
    throw err;
}

/*
➜  fs git:(master) ✗ node writeFile.js
同步写入文件成功
异步写入文件成功
*/
```

### 通过文件流写入
```javascript
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
```

## 文件是否存在
`fs.exists()`已经是`deprecated(废除)`状态，现在可以通过下面代码判断文件是否存在。

```javascript
const fs = require('fs');
const path = './README.md';

//异步
fs.access(path, fs.constants.F_OK, (err) => {
    if (err) throw err;

    console.log(`access ${path}: 存在`);
});

//同步
//1.accessSync
try {
    fs.accessSync(path, fs.constants.F_OK);
    console.log(`accessSync ${path}: 存在`);
} catch (err) {
    throw err;
}
//2.existsSync
try {
    const isExists = fs.existsSync(path);
    console.log(`existsSync ${path}: ${isExists ? '存在' : '不存在'}`);
} catch (err) {
    throw err;
}
```

## 创建目录

### fs.mkdir(path[, mode], callback)
```javascript
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
```

### fs.mkdirSync(path[, mode])
```javascript
const fs = require('fs');

try {
    fs.mkdirSync('mkdirSync');
    console.log('同步创建目录成功');
} catch (err) {
    throw err;
}
```
## 删除目录
```javascript
const fs = require('fs');

fs.writeFileSync('删除文件测试.txt', '测试文本','utf8');

setTimeout(() => {
    //异步
    fs.unlink('删除文件测试.txt', function(err){
        if(err) throw err;
        console.log('文件删除成功');
    });

    //同步
    // try {
    //     fs.unlinkSync('删除文件测试.txt');
    //     console.log('文件删除成功');
    // } catch (err) {
    //     throw err;
    // }
}, 3000);
```

## 遍历目录
### fs.readdirSync(path[, options])
同步版本，注意：fs.readdirSync()只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。
```javascript
const fs = require('fs');
const path = require('path');

const getFilesInDir = (dir) => {
    let results = [ path.resolve(dir) ];
    let files = fs.readdirSync(dir, 'utf8');

    files.forEach((file) => {
        file = path.resolve(dir, file);

        let stats = fs.statSync(file);

        if (stats.isFile()) {
            results.push(file);
        } else {
            results = results.concat(getFilesInDir(file));
        }
    });

    return results;
}

const files = getFilesInDir('./');

console.log(files);
```

### fs.readdir(path[, options])
异步递归没写出来
```javascript
const fs = require('fs');
const path = require('path');

fs.readdir('./', 'utf8', (err, files) => {
    if (err) throw err;
    
    console.log(files);
});
```

## 文件重命名
```javascript
const fs = require('fs');
const path = require('path');

let name1 = 'README.md';
let name2 = 'readme1.md';

let dirname1 = 'mkdir';
let dirname2 = 'MKDIR1';

let constant = '';

if (!fs.existsSync(path.resolve(__dirname, name1))) {
    constant = name1;
    name1 = name2;
    name2 = constant;
}
console.log(name1, name2);
fs.rename(name1, name2, (err) => {
    if (err) throw err;

    console.log('重命名成功')
});

if (!fs.existsSync(path.resolve(__dirname, dirname1))) {
    constant = dirname1;
    dirname1 = dirname2;
    dirname2 = constant;
}

fs.renameSync(dirname1, dirname2);

```