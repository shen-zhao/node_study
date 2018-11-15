const http = require('http');
const cluster = require('cluster');
const cpusLen = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < cpusLen; i++) {
        cluster.fork();
    }

    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    const server = http.createServer(function(request, response) {
        response.end(`response from worker ${process.pid}`);
    });
    
    server.listen('3000', '172.19.163.143');
    console.log(`Worker ${process.pid} started`);
}