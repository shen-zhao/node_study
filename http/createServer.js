const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer(function(request, response) {
    console.log(request.url);
    console.log(request.method);
    console.log(request.headers);
    response.writeHead(200, {'Content-Type': 'text/html'});
    const html = fs.readFileSync('./index.html');
    response.end(html);
});

server.listen('3000', '0.0.0.0');