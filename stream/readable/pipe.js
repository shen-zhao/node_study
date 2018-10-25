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
