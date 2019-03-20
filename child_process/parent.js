const cp = require('child_process');
const path = require('path');
const sup = cp.fork(path.resolve(__dirname, './sub.js'));

sup.on('message', function() {
    console.log('这里是主进程！');
});

setTimeout(function() {
    console.log('setTimeout');
}, 0);

sup.send({hello: 'world'});