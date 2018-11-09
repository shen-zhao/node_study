const net = require('net');

const PORT = '3000';
const HOST = '127.0.0.1';

const Server = net.createServer((socket) => {
    console.log('服务端：收到来自客户端的请求');

    socket.on('data', (data) => {
        console.log('服务端：收到客户端数据，内容为{'+ data +'}');

        // 给客户端返回数据
        socket.write('你好，我是服务端');
        socket.end('end');
    });

    socket.on('close', function(){
        console.log('服务端：客户端连接断开');
    });
});

Server.listen({
    port: PORT,
    host: HOST
}, () => {
    console.log('服务端：开始监听来自客户端的请求');
    console.log( 'adress: ', Server.address() );
});