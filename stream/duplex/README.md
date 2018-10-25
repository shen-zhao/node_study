## 3、Duplex(可读可写，用于读写流的全部api)

`Duplex`继承了`Readable`和`Writable`的所有特性，因此它既可写也可读。使用它的方法是上面两个流的并集。

### example
```javascript
const { Duplex } = require('stream');

class MyDuplex extends Duplex {
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

    _read() {
        for (let i = 0; i < this.content.length; i++) {
            this.push(this.content[i]);
        }
        this.push(null);
    }
}

new sd = new MyDuplex();

sd.on('data', (data) => {
    console.log('read: ', data.toString());
})

sd.on('finish', () => {
    console.log('finish: ', sd.content);
});

sd.write('q');
sd.write('w');
sd.write('e');
sd.write('r');
sd.end();

/*log
write:  q
write:  w
write:  e
write:  r
read:  q
read:  w
read:  e
read:  r
finish:  qwer
end
*/

```