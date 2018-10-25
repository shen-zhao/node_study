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