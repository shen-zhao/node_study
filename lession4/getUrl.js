var superagent = require('superagent');
var cheerio = require('cheerio');
var gitContent = require('./getContent');

function getUrl (res, baseUrl) {
    console.log('start geturl!!!')
    superagent.get(baseUrl)
        .end(function(err, ures) {
            if(err) {
                console.log('geturl wrong!!!')
                return;
            }
            var data = [];
            $ = cheerio.load(ures.text);
            $('.topic_title').each(function() {
                data.push(baseUrl + $(this).prop('href'));
            });
            console.log('end geturl!!!')
            //处理并发请求
            gitContent(res, data);
        });
}

module.exports = getUrl;