## 4、Transform(继承与Duplex的可读可写流)

`Transform`又是继承与`Duplex`的，`Duplex`流的可读端和可写端是完全独立的，但`Transform`流会把自己可写端写入的内容经过一些处理输出到可读端。定义一个`Transform`流要做的就是：
- 自定义`_transform(buf, enc, next)`方法来定义可读端输出结果的处理过程。
- 在`_transform`方法中调用`push`方法来处理结果输出到可读端。
- 在`_transform`方法中调用`next`进行下一个处理

### example
```javascript
const { Transform } = require('stream');

class MyTransform extends Transform {
    constructor() {
        super();
        this.content = '';
    }

    _transform(buf, enc, next) {
        if (buf) {
            console.log('write: ', buf.toString());
            const res = buf.toString().toUpperCase();

            this.push(res);
            this.content += res;
        }
        next();
    }
}

const mt = new MyTransform('qwert');

mt.on('data', (data) => {
    console.log('read:', data.toString());
});

mt.on('end', () => {
    console.log('read end.');
});

mt.on('finish', () => {
    console.log('write finish.', mt.content);
})

mt.write('q');
mt.write('w');
mt.write('e');
mt.write('r');
mt.end();
```