var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');

function getContent (res, data) {
    var count = 0;
    var arr = [];
    console.log('getcontent start!!!')
    var fetchUrl = function(url) {
        var promise = new Promise(function(resolve, reject) {
            superagent.get(url)
                .end(function(err, cres) {
                    if(err) {
                        // console.log(url + err);
                    }
                    $ = cheerio.load(cres.text);
                    arr.push({
                        title: $('.topic_full_title').text(),
                        href: url,
                        content1: $('.reply_content').eq(0).text().trim()
                    });
                    resolve();
                });
        });
        return promise;
    }
    async.mapLimit(data, 5, async function (url) {
        await fetchUrl(url);
    }, function(err, result) {
        // console.log(result)
        console.log(arr)
        var resultJson = JSON.stringify(arr, null, 4);
        res.end('<head><meta charset="utf-8" /></head><body><span style="white-space: pre-wrap;">'+resultJson+'</span></body>');
    });
}

module.exports = getContent;