function currying () {
    const argsArr = [];
    return function curried() {
        var result = Array.prototype.push.apply(argsArr, Array.prototype.slice.call(arguments));

        console.log(result);
        return curried;
    }
}

var funs = currying();

funs(1)(2)(3)(4)(5)(6);

/*
柯里化：外部函数处理部分应用，剩下的由外部函数的返回函数(内部函数)处理

柯里化的三种常见的应用场景：


1.参数复用(符合偏函数的概念)
保存部分参数
*/


function currying1(fn) {
    const _args = [].slice.call(arguments, 1);
    return function _(...args) {
        if (args.length >= fn.length) {
            return fn.apply(null, _args.concat(args));
        } else {
            return function(...args2) {
                return _.apply(null, args.concat(args2));
            }
        }
    }
}

const test = currying1(function(a,b,c,d,e,f) {
    console.log(a+b+c+d+e+f);
    return 'test 执行完毕'
})

console.log(test(1)(2)(3)(4)(5)(6));


function currying2 (fn) {
    let _args = [];

    return function () {
        if (arguments.length === 0) {
            fn.apply(null, _args);
        } else {
            _args = _args.concat([].slice.call(arguments));
        }
    }
}

var fishWeight = 0;
var addWeight = currying2(function() {
    var i=0; len = arguments.length;
    for (i; i<len; i+=1) {
        fishWeight += arguments[i];
    }
});

addWeight(2.3);
addWeight(6.5);
addWeight(1.2);
addWeight(2.5);
addWeight();    //  这里才计算

console.log(fishWeight);    // 12.5