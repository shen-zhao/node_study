const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

const callback = function(item) {
    return item;
}

const arr = [0, 1, 2, 3, 5, 6];

suite.add('nativeMap', function() {
    return arr.map(callback);
}).add('customMap', function() {
    const ret = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        ret.push(callback(arr[i], i, arr));
    }
    return ret;
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log(this.filter('fastest'));
}).run();