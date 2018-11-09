const net = require('net');

const PORT = '3000';
const HOST = '127.0.0.1';

const server = net.createServer((socket) => {
    socket.write('1. connection 触发\n');
});

server.on('connection', () => {
    console.log('2. connection 触发\n');
});

server.listen(PORT, HOST);