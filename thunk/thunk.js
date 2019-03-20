const fs = require('fs');

function thunkify(fn) {

    return function() {
        var ctx = this;
        var args = [].slice.call(arguments);
        var called;

        return function(callback) {
            args.push(function() {
                if(called) return;

                called = true;
                callback.apply(null, arguments)
            });

            try {
                fn.apply(ctx, args)
            } catch(err) {
                callback(err);
            }
        }
    }
}

var readFile = thunkify(fs.readFile);

function run(gen) {
    gen = gen();

    function next(err, data) {
        var iterator = gen.next(data);
        console.log(data);
        if (iterator.done) return;
        iterator.value(next);
    }

    next();
}

function* read() {
    yield readFile('./test.txt', 'utf-8');
    yield readFile('./test.txt', 'utf-8');
    let result = yield readFile('./test.txt', 'utf-8');
    console.log('文件读取完成！', result);
}

run(read)