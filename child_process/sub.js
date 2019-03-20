process.on('message', function() {
    console.log('这里是子进程！');
})

process.send({hehe: 'hehe'});