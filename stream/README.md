

## objectMode

默认情况下流中传递的数据类型只能是 `String` 或 `Buffer`。但是在某些情况下，我们需要在流中传递复杂的对象，这时我们就需要在构造流时指定 `objectMode`，如下：

```javascript
const { Readable } = require('stream');

const r = new Readable();
const ro = new Readable({objectMode: true});

r.push('a');
// r.push(1); 会报错，不接受 String 和 Buffer 以外的数据类型
r.push('sda');
r.push(null);

ro.push('a');
ro.push(1);
ro.push({});
ro.push(true);
ro.push(null);

r.on('data', console.log);
ro.on('data', console.log);
```