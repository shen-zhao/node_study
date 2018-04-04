var server = require('./server');
var getUrls = require('./getUrls');

console.log(process.argv)

server.start(getUrls);