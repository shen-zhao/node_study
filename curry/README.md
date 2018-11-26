# 柯里化

## 概念
官方概念：
柯里化（Currying），又称部分求值（Partial Evaluation），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

作者说法：
所谓“柯里化”就是**使函数理解并处理部分应用**

概念总结：
柯里化分为外部函数和内部函数，外部函数处理部分应用，并且为内部函数创造了一个闭包环境，当然也能通过编写逻辑固定部分参数，剩下的逻辑交给返回的内部函数处理，内部函数根据不同的处理逻辑有三种应用场景
### 参数复用
常规的一个通项试，返回一个可执行函数(类似于偏函数用法)
```javascript
//（1）普通函数形式
function currying(fn) {
    const _args = [].slice.call(arguments, 1);
    return function() {
        fn.apply(null, _args.concat([].call(arguments)));
    }
}
//固定参数，缩小适用范围，例如不同的日志方法

// 原型添加
Function.prototype.currying = function() {
    const fn = this;
    const _arg = [].slice.call(arguments);
    return function() {
        fn.apply(null, _args.concat([].call(arguments)));
    }
}
下面的所有代码均只以普通函数形式封装
```

### 提前返回
直接上例子
```javascript
var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();
```
初始addEvent的执行其实值实现了部分的应用（只有一次的if...else if...判定），而剩余的参数应用都是其返回函数实现的，典型的柯里化。

### 延迟计算

1.参数数量大于等于形参数量的时候才真正执行回调
链式调用，只有满足fn的参数个数时fn才会调用，所有参数会储存到上下文中(要求fn必须定义形参);
```javascript
function currying(fn) {
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
//只有第六次调用才真正调用fn

// 21
// test 执行完毕
```

2.根据是否传参决定是否真正执行，当最后一次调用不传参数的时候真正执行(或其他逻辑)
```javascript
function currying(fn) {
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
```