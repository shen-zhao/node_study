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

sr.on('data', (data) => {
    console.log('read: ', data.toString());
});

sr.on('end', () => {
    console.log('end');
});