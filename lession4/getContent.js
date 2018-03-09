var superagent = require('superagent');
var cheerio = require('cheerio');
var EventProxy = require('eventproxy');

var ep = new EventProxy();

function getContent (res, data) {
    console.log('start getcontent!!!')
    ep.after('get_content', data.length, function(list) {
        list = list.map(function(item) {
            $ = cheerio.load(item.text);
            return {
                title: $('.topic_full_title').text(),
                href: item.href,
                content1: $('.reply_content').eq(0).text().trim()
            }
        });
        var listJson = JSON.stringify(list, null, 4);
        console.log('end getcontent!!!')
        res.send('<span style="white-space: pre-wrap;">'+listJson+'</span>');
    });

    data.forEach(function(href) {
        superagent.get(href)
            .end(function(err, gres) {
                console.log('异步获取'+href);
                if(err) {
                    console.log('err!!!!! on ' + href);
                }
                ep.emit('get_content', {
                    href: href,
                    text: gres.text
                });
            });
    });
}

module.exports = getContent;