const http = require('http');

http.get(`http://www.baidu.com/`, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    if (statusCode !== 200) {
        error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
    }

    res.setEncoding('utf8');

    let rawData = '';

    res.on('data', (chunk) => {
        rawData += chunk;
    });

    res.on('end', () => {
        console.log('接收到的数据：', rawData);
    });
});