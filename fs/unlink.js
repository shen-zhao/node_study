const fs = require('fs');

fs.writeFileSync('删除文件测试.txt', '测试文本','utf8');

setTimeout(() => {
    //异步
    fs.unlink('删除文件测试.txt', function(err){
        if(err) throw err;
        console.log('文件删除成功');
    });

    //同步
    // try {
    //     fs.unlinkSync('删除文件测试.txt');
    //     console.log('文件删除成功');
    // } catch (err) {
    //     throw err;
    // }
}, 3000);