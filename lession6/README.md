#### 课程要求

main.js: 其中有个 fibonacci 函数。fibonacci 的介绍见：http://en.wikipedia.org/wiki/Fibonacci_number 。

此函数的定义为 int fibonacci(int n)

当 n === 0 时，返回 0；n === 1时，返回 1;
n > 1 时，返回 fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)，如 fibonacci(10) === 55;
n 不可大于10，否则抛错，因为 Node.js 的计算性能没那么强。
n 也不可小于 0，否则抛错，因为没意义。
n 不为数字时，抛错。
test/main.test.js: 对 main 函数进行测试，并使行覆盖率和分支覆盖率都达到 100%。

##### [mocha测试框架](http://mochajs.org/)

装个全局的 mocha: `$ npm install mocha -g`。

```
describe('test/main.test.js', function () {
  it('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });
});
```
在 lesson6 目录下，直接执行

`$ mocha`

输出应如下

![](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/2.png)

describe 中的字符串，用来描述你要测的主体是什么；it 当中，描述具体的 case 内容。

##### [should断言库](https://github.com/tj/should.js)

而引入的那个 should 模块，是个断言库。玩过 ruby 的同学应该知道 rspec，rspec 它把测试框架和断言库的事情一起做了，而在 Node.js 中，这两样东西的作用分别是 mocha 和 should 在协作完成。

should 在 js 的 Object “基类”上注入了一个 #should 属性，这个属性中，又有着许许多多的属性可以被访问。

比如测试一个数是不是大于3，则是 (5).should.above(3)；测试一个字符串是否有着特定前缀：'foobar'.should.startWith('foo');。should.js API 在：https://github.com/tj/should.js

should.js 如果现在还是 version 3 的话，我倒是推荐大家去看看它的 API 和 源码；现在 should 是 version 4 了，API 丑得很，但为了不掉队，我还是一直用着它。我觉得 expect 麻烦，所以不用 expect，对了，expect 也是一个断言库：https://github.com/LearnBoost/expect.js/ 。


##### [istanbul](https://github.com/gotwarlost/istanbul)

安装一个 istanbul : `$ npm i istanbul -g`

执行 `$ istanbul cover _mocha`

这会比直接使用 mocha 多一行覆盖率的输出，

![](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/3.png)

打开 `open coverage/lcov-report/index.html` 看看

![](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/4.png)

其实这覆盖率是 100% 的，24 25 两行没法测。

mocha 和 istanbul 的结合是相当无缝的，只要 mocha 跑得动，那么 istanbul 就接得进来。