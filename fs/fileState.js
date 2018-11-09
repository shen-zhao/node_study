const fs = require('fs');

const getTimeDesc = function(d){
    return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
};

//异步
fs.stat('./README.md', function(err, stats){
    console.log('异步获取');
    console.log('文件大小: ' + stats.size);
    console.log('创建时间: ' + getTimeDesc(stats.birthtime));
    console.log('访问时间: ' + getTimeDesc(stats.atime));
    console.log('修改时间: ' + getTimeDesc(stats.mtime));
});

//同步
const stats = fs.statSync('./fileState.js');
console.log('同步获取');
console.log('文件大小: ' + stats.size);
console.log('创建时间: ' + getTimeDesc(stats.birthtime));
console.log('访问时间: ' + getTimeDesc(stats.atime));
console.log('修改时间: ' + getTimeDesc(stats.mtime));