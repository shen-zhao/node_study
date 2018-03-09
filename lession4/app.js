var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');

var app = express();

// 得到一个 eventproxy 的实例
var ep = new eventproxy();

var data = [];

var baseUrl = 'https://cnodejs.org';

superagent.get('https://cnodejs.org/')
    .end(function(err, sres) {
        // 常规的错误处理
        if(err) {
            return;
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(sres.text);

        $('#topic_list .cell').each(function() {
            var $this = $(this);
            data.push({
                title: $this.find('.topic_title').prop('title'),
                href: baseUrl + $this.find('.topic_title').prop('href'),
                author: $this.find('.user_avatar').prop('href').substring(6)
            });
        });
        //处理并发请求
        ep.after('get_content', data.length, function(list) {
            list = list.map(function(items) {
                var itemUrl = items[0],
                    itemHtml = items[1];
                var $ = cheerio.load(itemHtml);
                return {
                    title: $('.topic_full_title').text(),
                    url: itemUrl,
                    content1: $('.reply_content').eq(0).text().trim()
                }
            });
            console.log(list)
        });

        data.forEach(function(item) {
            var href = item.href;
            superagent.get(href)
                .end(function(err, res) {
                    ep.emit('get_content', [href, res.text])
                });
        });
    });