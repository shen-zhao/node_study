var express = require('express');

var app = express();
var baseUrl = 'https://cnodejs.org';

function start (getUrl) {
    app.get('/', function(req, res) {
        getUrl(res, baseUrl)
    }).listen(3000, function(req, res) {
        console.log('server start on part of 3000!!!')
    })
}

module.exports = {
    start
}


