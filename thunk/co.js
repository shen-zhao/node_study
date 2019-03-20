const fs = require('fs');

function co(gen) {
    var iter = gen();

    return new Promise(function(resolve, reject) {
        function next(err, data) {
            var res = iter.next(data);
            if (res.done) {
                return resolve(res.value);
            };

            res.value.then(function(data) {
                next(null, data);
            }).catch(function(err) {
                next(err, null);
            })
        }

        next();
    });
}


function* test() {
    var data1 = yield new Promise((resolve) => {
        fs.readFile('./test.txt', 'utf-8', (err, data) => {
            resolve(data);
        });
    })
    console.log('data1', data1);
    var data2 = yield new Promise((resolve) => {
        fs.readFile('./test.txt', 'utf-8', (err, data) => {
            resolve(data);
        });
    })
    console.log('data2', data2);
    var data3 = yield new Promise((resolve) => {
        fs.readFile('./test.txt', 'utf-8', (err, data) => {
            resolve(data);
        });
    })
    console.log('data3', data3);

    return '返回值';
}

co(test).then(function(data) {
    console.log('完事了！', data);
});
