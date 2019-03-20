
function fibon(num) {
    if (num <= 1) {
        return num;
    }
    return fibon(num - 1) + fibon(num - 2);
}
// console.log(fibon(10))

function fibon1(num) {
    var x = 0;
    var y = 1;
    var z = x + y;

    for (var i = 1; i < num; i++) {
        x = y;
        y = z;
        z = x + y;
    }
    return y;
}
console.log(fibon1(10))

