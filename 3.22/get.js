var http = require("http");

var urlPath='http://127.0.0.1:8080/biz?' +
    'param={"param":{"x":1,"y":3, "z": null},"expression":"if(x>0){y=1;z=2}else{y=2, z=5}"}';

http.get(urlPath, function(response) {
    response.setEncoding('utf-8');
    console.log("状态码 %d \nheaders:\n %s \n当前的请求方式为【GET】请求",response.statusCode,
        JSON.stringify(response.headers));

    var receiveData = "";
    response.on('data', function (chunk) {
        receiveData += chunk;
    }).on('end', function () {
        //打印
        console.log("\n获得的数据为：" + receiveData);
    });

}).on('error', function(e) {
    console.log(e.message);
});