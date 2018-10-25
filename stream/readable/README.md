## 1、Readable(可读流)


`Readable`也成为只读流，使用`Readable`类可实现自定义可读流
- 自定义`_read`方式来实现流的读取过程。
- 调用`push`方法来实际触发一次流数据读取，触发`'data'`事件。
- 使用`push(null)`来表示流读取完毕，触发`'end'`事件。

### example
```javascript
const { Readable } = require('stream');

class StringReader extends Readable {
    constructor(str) {
        super();
        this._content = str;
    }

    _read() {
        for (let i = 0; i < this._content.length; i++) {
            this.push(this._content[i]);
        }
        this.push(null);
    }
}

const sr = new StringReader('qwer');

sr.on('data', () => {
    console.log('read: ', data)
});

sr.on('end', () => {
    console.log('end');
});

/* log: 
read: q
read: w
read: e
read: r
end
*/
```

### 支持事件
```javascript
const events = [
    'close',
    'data',
    'end',
    'error',
    'readable'
]
```

### stream.pipe(destination[, options])

- destination {stream.Writeable} 数据写入目标(可写流)
- options Pipe 选项
    - end {boolean} 在 reader 结束时结束 writer。默认为 true。

`readable.pipe()` 绑定一个 [Writable][] 到 `readable` 上， 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 [Writable][]。数据流将被自动管理。这样，即使是可读流较快，目标可写流也不会超负荷（overwhelmed）。

下面例子将 readable 中的所有数据通过管道传递给名为 file.txt 的文件：

```javascript
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// readable 中的所有数据都传给了 'file.txt'
readable.pipe(writable);
```

可以在单个可读流上绑定多个可写流。（链式调用的前提是传入pipe的流必须是可读可写流）

`readable.pipe()` 方法返回 目标流(传入的可写流) 的引用，这样就可以对流进行链式地管道

```javascript
const { Readable, Writable } = require('stream');

class StringReader extends Readable {
    constructor(str) {
        super();
        this._content = str;
    }

    _read() {
        for (let i = 0; i < this._content.length; i++) {
            this.push(this._content[i]);
        }
        this.push(null);
    }
}

class StringWriter extends Writable {
    constructor() {
        super();
        this.content = '';
    }

    _write(data, enc, next) {
        if (data) {
            console.log('write: ', data.toString());
            this.content += data.toString();
        }
        next();
    }
}

const sr = new StringReader('qwer');

sr.on('data', (data) => {
    console.log('read: ', data.toString());
});

sr.on('end', () => {
    console.log('end');
});

const sw = new StringWriter();

sw.on('finish', (data) => {
    console.log('finish: ', sw.content);
});

//测试链式调用
const zlib = require('zlib');
const z = zlib.createGzip();

sr.pipe(z).pipe(sw);
```

