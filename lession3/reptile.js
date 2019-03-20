var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

var result = []
//构建本地服务localhost:3000;
app.get('/', function(req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    Promise.all([
        new Promise((resolve) => {
            superagent.get('http://sc.chinaz.com/tag_tupian/PuBuLiu.html')
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
                // console.log(sres.text);
                $('#container .box img').each(function() {
                    item.push(this.attribs.src2);
                });
                result = result.concat(item);

                resolve();
            });
        }),
        new Promise((resolve) => {
            superagent.get('http://sc.chinaz.com/tag_tupian/PuBuLiu.html')
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
                // console.log(sres.text);
                $('#container .box img').each(function() {
                    item.push(this.attribs.src2);
                });

                result = result.concat(item);
                
                resolve();
            });
        })
    ]).then((res1, res2) => {
        var resultJson = JSON.stringify(result, null, 4);
        res.send('<span style="white-space: pre-wrap;">'+resultJson+'</span>');
    })
    
}).listen(3000, function(req, res) {
    console.log('server on port of 3000')
})