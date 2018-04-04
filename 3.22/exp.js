/*导入需要用到的nodejs库*/
var http = require('http');
var url = require('url');
var qs = require('querystring');
var util = require('util');
var express = require("express");
var bodyParser = require("body-parser"); 

var app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));  

/**
 * 简单配置个路由 用来检测无用的请求 仅符合路由规则的才能被接受
 * 自己可以按照需要定义
 * @type {{/: string, favicon: string, user: string, login: string, biz: string}}
 */
var route = {
    '/': "/",
    'favicon': '/favicon.ico',
    'user': '/user',
    'login': '/user/login',
    'biz': '/biz'
};

/**
 * 上述路由的简单判断规则
 * @param reqPath
 * @returns {boolean}
 */
var isValid = function (reqPath) {
    for (var key in route) {
        if (route[key] == reqPath) {
            return true;
        }
    }
    return false;
};

/**
 * 照样输出json格式的数据
 * @param query
 * @param res
 */
var writeOut = function (query, res) {
    res.write(JSON.stringify(query));
    res.end();
}

/**
 * 启用http创建一个端口为8124的服务
 * createServer内侧为回调函数：
 * ...可看作java servlet中的 onService(HttpRequest,HttpResponse)
 * ...或者（doGet、doPost）
 */
http.createServer(function (req, res) {

    if (!isValid(url.parse(req.url).pathname)) {
        res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
        res.write("{'errcode':404,'errmsg':'404 页面不见啦'}");
        res.end();
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        if (req.method.toUpperCase() == 'POST') {
            var postData = "";
            /**
             * 因为post方式的数据不太一样可能很庞大复杂，
             * 所以要添加监听来获取传递的数据
             * 也可写作 req.on("data",function(data){});
             */
            req.addListener("data", function (data) {
                postData += data;
            });
            /**
             * 这个是如果数据读取完毕就会执行的监听方法
             */
            req.addListener("end", function () {
                var query = qs.parse(postData);
                // writeOut(query, res);

                // var query = eval('(' + qs.parse(postData).param + ')');
                var expression = '';
                // for(var k in query.param){
                //     expression += 'var '+ k + '=' + query.param[k] + ';';
                // }
                // expression += query.expression;
                var r = eval(expression);
                var gg = {
                    status : 0,
                    message : 'success',
                    result : r,
                    param : query.param
                };
                res.end(util.inspect(gg));
            });
        }
        else if (req.method.toUpperCase() == 'GET') {
            /**
             * 也可使用var query=qs.parse(url.parse(req.url).query);
             * 区别就是url.parse的arguments[1]为true：
             * ...也能达到‘querystring库’的解析效果，而且不使用querystring
             */
            try {
                var query = eval('(' + url.parse(req.url, true).query.param + ')');
                var expression = query.expression.toString();

                var funStr = '';
                for(var k in query.param){
                    funStr += 'var ' + k + ' = ' + query.param[k] + ';';
                }

                var r = eval(funStr + expression);

                for(var k in query.param){
                    query.param[k] = eval(k);
                }

                var gg = {
                    status : 0,
                    message : 'success',
                    result : r,
                    param : query.param
                };
                res.end(util.inspect(gg));
            } catch(err) {
                res.end(err);
            }
        } else {
            //head put delete options etc.
        }
    }

}).listen(8080, function () {
    console.log("listen on port 8080");
});
