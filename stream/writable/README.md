## 2、Writable(可写流)

通过继承`Writable`类可实现自定义可写流。

- 自定义`_write(data, enc, next)`方法来实现流的写过程。
    - 在`write`函数中必须调用next函数来通知流写入下一个数据。
- 调用`end`方法来结束流的写入，此时也可以传入`data`参数，表示最后一次传入可写流的数据。调用`end`会触发可写流的`'finish'`事件

### example
```javascript
const { Writable } = require('stream');

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

const sw = new StringWriter();

sw.on('finish', (data) => {
    console.log('finish: ', sw.content);
});

sw.write('q');
sw.write('w');
sw.write('e');
sw.write('r');
sw.end('t');

/*log
write: q
write: w
write: e
write: r
finish: qwer
*/

```

### 支持事件
```javascript
const events = [
    'close',
    'drain',
    'error',
    'finish',
    'pipe',
    'unpipe'
]
```