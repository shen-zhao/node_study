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