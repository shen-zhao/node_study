var express = require('express');

var app = express();

var baseUrl = 'https://cnodejs.org';

function start(getUrls) {
    app.get('/', function(req, res, next) {
        getUrls(res, baseUrl);
    })
    .listen(8888, function(req, res) {
        console.log('server on port of 8888!')
    });
}

exports.start = start;