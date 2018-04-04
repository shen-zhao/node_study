const EventEmitter = require('events');
const path = require('path');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

var url = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');

console.log(__dirname, url)

myEmitter.on('events', (a, b) => {
    console.log(a, b, this)
});

// myEmitter.emit('events', 'param1', 'param2');