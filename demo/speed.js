const nativeMap = function(arr, cb) {
    return arr.map(cb);
}

const customMap = function(arr, cb) {
    const result = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        result.push(cb(arr[i], i, arr));
    }
    return result;
}


const run = function(name, times, fn, arr, cb) {
    const start = (new Date).getTime();

    for (let i = 0; i <= times; i++) {
        fn(arr, cb);
    }

    const end = (new Date).getTime();

    console.log('Running %s %d times cost %d ms', name, times, end - start);
}


const callback = function(item) {
    return item;
}

run('nativeMap', 100000, nativeMap, [0, 1, 2, 3, 4, 5], callback);
run('customMap', 100000, customMap, [0, 1, 2, 3, 4, 5], callback);
