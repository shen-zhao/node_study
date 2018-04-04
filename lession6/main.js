//递归


//性能最差，很多重复性计算
function fibonacci(n) {
    if(typeof n !== 'number') {
        throw new Error('n should be a Number');
    }
    if (n < 0) {
        throw new Error('n should >= 0');
    }
    if (n > 10) {
        throw new Error('n should <= 10');
    }
    if(n === 0 || n === 1) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

//优化递归

//一、缓存一个值

// var fibonacci = (function() {
//     var cache = {};
//     return function(n) {
//         if(cache[n] !== undefined) {
//             return cache[n];
//         }
//         return cache[n] = (n === 0 || n === 1) ? n : fibonacci(n-1) + fibonacci(n-2);
//     }
// })()

//二、缓存两个值

// var fibonacci = (function () {
//     var memory = {}
//     return function (n) {
//         if (n == 0 || n == 1) {
//             return n
//         }
//         if (memory[n - 2] === undefined) {
//             memory[n - 2] = fibonacci(n - 2)
//         }
//         if (memory[n - 1] === undefined) {
//             memory[n - 1] = fibonacci(n - 1)
//         }
//         return memory[n] = memory[n - 1] + memory[n - 2]
//     }
// })()


//尾递归(中间变量)
// function fibonacci(n, n1, n2) {
//     if (n <= 1) {
//         return n2
//     }
//     return fibonacci(n - 1, n2, n1 + n2)
// }


//迭代

// function fibonacci(n) {
//     var i, a = 0, b = 1, c = 0;
//     if(n === 0 || n === 1) {
//         return n;
//     }
//     for (i = 2; i <= n; i++) {
//         c = a + b;
//         a = b;
//         b = c;
//     }
//     return c;
// }



if (require.main === module) {
    // 如果是直接执行 main.js，则进入此处
    // 如果 main.js 被其他文件 require，则此处不会执行。
    var n = Number(process.argv[2]);
    // var n1 = Number(process.argv[3]);
    // var n2 = Number(process.argv[4]);
    console.log('fibonacci(' + n + ') is', fibonacci(n));
}

module.exports = {
    fibonacci
}