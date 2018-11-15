const http = require('http');
const cluster = require('cluster');
const cpuLen = require('os').cpus().length;

const worders = [];

if (cluster.isMaster) {
    for (let i = 0; i < cpuLen; i++) {
        worders.push(cluster.fork());
    }
    cluster.on('listening', (worker, address) => {
        console.log('worker', address);
    });

    //主进程监听子进程发送的消息
    cluster.on('message', (worker, message, handle) => {
        console.log('message', message);
    });

    cluster.on('online', (worker) => {
        console.log('online', 'Yay, the worker responded after it was forked');
    });

    cluster.on('fork', () => {
        console.log('fork');
    })

    worders.forEach((worker) => {
        //主进程向子进程中发送消息
        worker.send(worker.id);
        
        worker.on('disconnect', () => {
            console.log(`The id ${worker.id} of Worker has disconnected`);
        });
        worker.on('exit', () => {
            console.log(`The id ${worker.id} of Worker has exited`);
        });
    });
} else {
    http.createServer((request, response) => {
        response.write('cluster is on ' + process.pid);
        response.end();
    }).listen(3000, '0.0.0.0');
    console.log('cluster is on ' + process.pid);

    setTimeout(() => {
        cluster.worker.disconnect();
    }, 5000);

    //监听主进程中发送的消息
    process.on('message', (msg) => {
        console.log('main', msg);
    });

    process.on('disconnect', () => {
        console.log(`id: ${cluster.worker.id} process disconnect`);
    });
    process.on('exit', () => {
        console.log(`id: ${cluster.worker.id} process exit`);
    });
    //子进程向主进程发送消息
    process.send('worker ' + process.pid);
}