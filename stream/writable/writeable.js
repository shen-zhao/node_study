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