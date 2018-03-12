var superagent = require('superagent');
var cheerio = require('cheerio');
var getContent = require('./getContent');

function getUrls (res, baseUrl) {
    console.log('getUrls start!!!')
    superagent.get(baseUrl)
        .end(function(err, ures) {
            if(err) {
                return console.log(err)
            }
            var data = [];
            $ = cheerio.load(ures.text);
            $('.topic_title').each(function() {
                data.push(baseUrl + $(this).prop('href'));
            });
            console.log('getUrls end!!!')
            //处理并发请求并控制并发
            getContent(res, data);
        });
}

module.exports = getUrls;