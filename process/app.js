console.log('任务');

process.on('beforeExit', function() {
    console.log('任务完成');
    process.nextTick(function() {
        console.log('nextTick');
    });
});

process.on('exit', function(code) {
    console.log(`即将退出，退出码：${code}`);
})