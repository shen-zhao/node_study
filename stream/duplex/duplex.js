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

const sd = new MyDuplex();

sd.on('data', (data) => {
    console.log('read: ', data.toString());
})

sd.on('finish', () => {
    console.log('finish: ', sd.content);
});

sd.on('end', () => {
    console.log('end');
})

sd.write('q');
sd.write('w');
sd.write('e');
sd.write('r');
sd.end();