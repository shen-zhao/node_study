var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

//构建本地服务localhost:3000;
app.get('/', function(req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/')
        .end(function(err, sres) {
            // 常规的错误处理
            if(err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var item = [];
            $('#topic_list .cell').each(function() {
                var $this = $(this);
                item.push({
                    title: $this.find('.topic_title').prop('title'),
                    href: $this.find('.topic_title').prop('href'),
                    author: $this.find('.user_avatar').prop('href').substring(6)
                });
            });
            var itemJson = JSON.stringify(item, null, 4);
            res.send('<span style="white-space: pre-wrap;">'+itemJson+'</span>');
        });
}).listen(3000, function(req, res) {
    console.log('server on port of 3000')
})