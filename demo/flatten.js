const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

var arr = [1, [2, [3, [4]], 5],1, [2, [3, [4]], 5],1, [2, [3, [4]], 5],1, [2, [3, [4]], 5],1, [2, [3, [4]], 5]];

//递归
var flatten1 = function(arr) {
    let res = [];

    for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i] instanceof Array) {
            res = res.concat(flatten1(arr[i]));
        } else {
            res.push(arr[i]);
        }
    }

    return res;
}


console.log(flatten1(arr));

//...扩展运算符 + 循环 + splice 改变原数组
var flatten2 = function(arr) {
    let i = 0;
    let l = arr.length;
    while(i <= l) {
        if (arr[i] instanceof Array) {
            l += arr[i].map((el) => !Array.isArray(el)).length;
            arr.splice(i, 1, ...arr[i])
        } else {
            i++;
        }
    }
    return arr;
}

console.log(flatten2(arr));

//concat + ...   无敌展开
function flatten3(arr) {
    while(arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
    }
    return arr;
}

console.log(flatten3(arr));

//reduce
function flatten4(arr) {
    return arr.reduce(function(count, ele) {
        return count.concat(ele instanceof Array ? flatten4(ele) : ele);
    }, []);
}

console.log(flatten4(arr));

function wrap(fn, arr) {
    return fn(arr);
};

suite.add('flatten1', function() {
    return wrap(flatten1, arr)
})
.add('flatten2', function() {
    return wrap(flatten2, arr)
})
.add('flatten3', function() {
    return wrap(flatten3, arr);
})
.add('flatten4', function() {
    return wrap(flatten4, arr);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run();