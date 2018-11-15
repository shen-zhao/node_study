# npm —— NodeJS模块管理器

## Installation

`npm`不需要单独安装。在安装Node的时候，会连带一起安装`npm`。但是，Node附带的`npm`可能不是最新版本，最好用下面的命令，更新到最新版本
```shell
$ npm install npm@latest -g
```
上面的命令中，`@latest`表示最新版本，`-g`表示全局安装。所以，命令的主干是`npm install npm`，也就是使用`npm`安装自己。之所以可以这样，是因为`npm`本身与Node的其他模块没有区别。

运行下面的命令，查看各种信息。
```shell
# 查看 npm 命令列表
$ npm help

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 的版本
$ npm -v

# 查看 npm 的配置
$ npm config list -l
```

## npm init
`npm init`用来初始化生成一个新的`package.json`文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。
如果使用了`-f`（代表force）、`-y`（代表yes），则跳过提问阶段，直接生成一个新的`package.json`文件。
```shell
$ npm init -y
```

## npm set
`npm set`用来设置环境变量(全局设置)。
```shell
$ npm set init-author-name 'Your name'
$ npm set init-author-email 'Your email'
$ npm set init-author-url 'http://yourdomain.com'
$ npm set init-license 'MIT'
```
上面命令等于为`npm init`设置了默认值，以后执行`npm init`的时候，`package.json`的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的 `~/.npmrc`文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行`npm config`。
```shell
$ npm set save-exact true
```
上面命令设置加入模块时，`package.json`将记录模块的确切版本，而不是一个可选的版本范围。

## npm config
```shell
$ npm config set prefix $dir
```
上面的命令将指定的`$dir`目录，设为模块的全局安装目录。如果当前有这个目录的写权限，那么运行`npm install`的时候，就不再需要`sudo`命令授权了。
```shell
$ npm config set save-prefix ~
```
上面的命令使得npm install --save和npm install --save-dev安装新模块时，允许的版本范围从克拉符号（^）改成波浪号（~），即从允许小版本升级，变成只允许补丁包的升级。
```shell
$ npm config set init.author.name $name
$ npm config set init.author.email $email
```
上面命令指定使用`npm init`时，生成的package.json文件的字段默认值。

## npm info
`npm info`命令可以查看每个模块的具体信息, 返回一个javascript对象。
```shell
{ name: 'http',
  description: '',
  'dist-tags': { latest: '0.0.0' },
  maintainers: [ 'mkspcd <mkspcd@gmail.com>' ],
  time:
   { modified: '2017-03-27T12:04:09.000Z',
     created: '2014-01-22T17:02:04.994Z',
     '0.0.0': '2014-01-22T17:02:04.994Z' },
  users:
   { kein: true,
     writech: true,
     piotr23: true,
     paragi: true,
     rocket0191: true,
     chiaychang: true,
     dailepro: true,
     eyson: true,
     rubiadias: true,
     yunixing: true },
  author: '',
  versions: [ '0.0.0' ],
  license: 'BSD-2-Clause',
  version: '0.0.0',
  main: 'index.js',
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
  dist:
   { shasum: '86e6326d29c5d039de9fac584a45689f929f4f72',
     size: 253,
     noattachment: false,
     tarball: 'http://registry.npm.taobao.org/http/download/http-0.0.0.tgz' },
  directories: {},
  publish_time: 1390410124994 }
```
`npm info http versions`查看具体属性
```shell
[ '0.0.0' ]
```

## npm list
`npm list`命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。
加上global参数，会列出全局安装的模块。
`npm list`命令也可以列出单个模块。
```shell
$ npm list express
```

## 模块全局安装权限
默认情况下，Npm全局模块都安装在系统目录（比如`/usr/local/lib/`），普通用户没有写入权限，需要用到`sudo`命令。这不是很方便，我们可以在没有root权限的情况下，安装全局模块。
1.在主目录`~`下创建`.npm-global`目录
```shell
$ mkdir ~/.npm-global
```
2.配置`npm`的新目录路径
```shell
$ npm config set prefix '~/.npm-global'
```
3.打开或创建一个.profile文件并且写入一下一行内容
```vim
export PATH=~/.npm-global/bin:$PATH
```
4.更新系统环境变量
```shell
$ source ~/.profile
```

## npm update，npm uninstall
`npm update`命令可以更新本地安装的模块。
```shell
# 升级当前项目的指定模块
$ npm update [package name]

# 升级全局安装的模块
$ npm update -global [package name]
```
它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。
使用-S或--save参数，可以在安装的时候更新package.json里面模块的版本号。

注意，从npm v2.6.1 开始，npm update只更新顶层模块，而不更新依赖的依赖，以前版本是递归更新的。如果想取到老版本的效果，要使用下面的命令。
```shell
$ npm --depth 9999 update
```
npm uninstall命令，卸载已安装的模块。
```shell
$ npm uninstall [package name]

# 卸载全局模块
$ npm uninstall [package name] -global
```

## npm run(npm run-script)
`npm`可以执行`package.json`里`script`字段里指定的脚本

`npm run`命令会自动在环境变量`$PATH`添加`node_modules/.bin`目录，所以`scripts`字段里面调用命令时不用加上路径，这就避免了全局安装NPM模块。

`npm run`如果不加任何参数，直接运行，会列出`package.json`里面所有可以执行的脚本命令。
```shell
Lifecycle scripts included in rule-platform:
  start
    npm run dev

available via `npm run-script`:
  dev
    webpack-dev-server --inline --progress --config build/webpack.dev.conf.js
  eslint
    eslint --ext .js,.vue src
  filenamelint
    node node_modules/validate_filename/index.js -e '^[a-zA-Z0-9\-_./]+$|^src/App.vue$' -m '约定文件名由字母、数字、_ 、- 组成' `git diff --staged --name-only --diff-filter=ACMRTU -- ./src/**`
  precommit
    npm run eslint && npm run filenamelint
  build
    node build/build.js
  eslintfix
    eslint --fix './src/**/*.vue'
```

`npm run test`和`npm run start`可以省略`run`
```shell
npm test
npm start
```

`npm run`会创建一个`Shell`，执行指定的命令，并临时将`node_modules/.bin`加入`PATH`变量，这意味着本地模块可以直接运行。
比如：安装`Eslints`模块
```shell
$ npm i eslint --save-dev
```
运行上面的命令以后，会产生两个结果。首先，`ESLint`被安装到当前目录的`node_modules`子目录；其次，`node_modules/.bin`目录会生成一个符号链接`node_modules/.bin/eslint`，指向`ESLint`模块的可执行脚本。
然后，你就可以在`package.json`的`script`属性里面，不带路径的引用`eslint`这个脚本。
```shell
{
  "name": "Test Project",
  "devDependencies": {
    "eslint": "^1.10.3"
  },
  "scripts": {
    "lint": "eslint ."
  }
}
```
等到运行`npm run lint`的时候，它会自动执行`./node_modules/.bin/eslint .`。

如果希望一个操作的输出，是另一个操作的输入，可以借用Linux系统的管道命令`|`，将两个操作连在一起。
```javascript
{
  "build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js"
}
```
更方便的写法是引用其他`npm run`命令。
```javascript
{
  "build": "npm run build-js && npm run build-css"
}
```

## 参数
`npm run`命令还可以添加参数。
```javascript
"scripts": {
  "test": "mocha test/"
}
```
上面代码指定`npm test`，实际运行`mocha test/`。如果要通过`npm test`命令，将参数传到mocha，则参数之前要加上`两个连词线`。
```shell
$ npm run test -- anothertest.js
# 等同于
$ mocha test/ anothertest.js
```
上面命令表示，`mocha`要运行所有`test`子目录的测试脚本，以及另外一个测试脚本`anothertest.js`。

`npm run`本身有一个参数`-s`，表示关闭`npm`本身的输出，只输出脚本产生的结果。
```shell
// 输出npm命令头
$ npm run test

// 不输出npm命令头
$ npm run -s test
```

## pre- 和 post- 脚本
`npm run`为每条命令提供了`pre-`和`post-`两个钩子（hook）。以`npm run lint`为例，执行这条命令之前，`npm`会先查看有没有定义`prelint`和`postlint`两个钩子，如果有的话，就会先执行`npm run prelint`，然后执行`npm run lint`，最后执行`npm run postlint`。

如果执行过程出错，就不会执行排在后面的脚本，即如果`prelint`脚本执行出错，就不会接着执行`lint`和`postlint`脚本。

如果安装某些模块，还能支持Git相关的钩子。下面以husky模块为例。
```shell
$ npm install husky --save-dev
```
安装以后，就能在`package.json`添加`precommit`、`prepush`等钩子。
```javascript
{
    "scripts": {
        "lint": "eslint yourJsFiles.js",
        "precommit": "npm run test && npm run lint",
        "prepush": "npm run test && npm run lint",
        "...": "..."
    }
}
```
类似作用的模块还有pre-commit、precommit-hook等。

## package内部变量
cripts字段可以使用一些内部变量，主要是package.json的各种字段。

比如，package.json的内容是`{"name":"foo", "version":"1.2.5"}`，那么变量`npm_package_name`的值是`foo`，变量`npm_package_version`的值是`1.2.5`。
```javascript
{
  "scripts":{
    "bundle": "mkdir -p build/$npm_package_version/"
  }
}
```
运行`npm run bundle`以后，将会生成`build/1.2.5/`子目录。

`config`字段也可以用于设置内部字段。
```javascript
{
  "name": "fooproject",
  "config": {
    "reporter": "xunit"
  },
  "scripts": {
    "test": "mocha test/ --reporter $npm_package_config_reporter"
  }
}
```
上面代码中，变量`npm_package_config_reporter`对应的就是`reporter`。

## 通配符
npm的通配符的规则如下。
```shell
* 匹配0个或多个字符
? 匹配1个字符
[...] 匹配某个范围的字符。如果该范围的第一个字符是!或^，则匹配不在该范围的字符。
!(pattern|pattern|pattern) 匹配任何不符合给定的模式
?(pattern|pattern|pattern) 匹配0个或1个给定的模式
+(pattern|pattern|pattern) 匹配1个或多个给定的模式
*(a|b|c) 匹配0个或多个给定的模式
@(pattern|pat*|pat?erN) 只匹配给定模式之一
** 如果出现在路径部分，表示0个或多个子目录。
```

## npm link
开发NPM模块的时候，有时我们会希望，边开发边试用，比如本地调试的时候，`require('myModule')`会自动加载本机开发中的模块。Node规定，使用一个模块时，需要将其安装到全局的或项目的`node_modules`目录之中。对于开发中的模块，解决方法就是在全局的`node_modules`目录之中，生成一个符号链接，指向模块的本地目录。

`npm link`就能起到这个作用，会自动建立这个符号链接。

请设想这样一个场景，你开发了一个模块`myModule`，目录为`src/myModule`，你自己的项目`myProject`要用到这个模块，项目目录为`src/myProject`。首先，在模块目录（`src/myModule`）下运行`npm link`命令。
```shell
$ npm link
```
上面的命令会在NPM的全局模块目录内，生成一个符号链接文件，该文件的名字就是`package.json`文件中指定的模块名。
```shell
/path/to/global/node_modules/myModule -> src/myModule
```
这个时候，已经可以全局调用`myModule`模块了。但是，如果我们要让这个模块安装在项目内，还要进行下面的步骤。

切换到项目目录，再次运行`npm link`命令，并指定模块名。
```shell
$ npm link myModule
```
上面命令等同于生成了本地模块的符号链接。
```shell
src/myProject/node_modules/myModule -> /path/to/global/node_modules/myModule
```
然后，就可以在你的项目中，加载该模块了
```javascript
var myModule = require('myModule');
```
这样一来，`myModule`的任何变化，都可以直接反映在`myProject`项目之中。但是，这样也出现了风险，任何在`myProject`目录中对`myModule`的修改，都会反映到模块的源码中。

如果你的项目不再需要该模块，可以在项目目录内使用`npm unlink`命令，删除符号链接。
```shell
$ npm unlink myModule
```

## npm bin
npm bin命令显示相对于当前目录的，Node模块的可执行脚本所在的目录（即.bin目录）。
```shell
$ npm bin
/Users/yp-tc-m-2687/Documents/f2e/workspace/work13_fengshen/rule-platform/node_modules/.bin
```

## npm adduser
`npm adduser`用于在npmjs.com注册一个用户。
```shell
$ npm adduser
Username: YOUR_USER_NAME
Password: YOUR_PASSWORD
Email: YOUR_EMAIL@domain.com
```

## npm publish
`npm publish`用于将当前模块发布到`npmjs.com`。执行之前，需要向`npmjs.com`申请用户名。

如果已经注册过，就使用下面的命令登录。
```shell
$ npm login
```
登录以后，就可以使用`npm publish`命令发布。
```shell
$ npm publish
```
如果当前模块是一个beta版，比如`1.3.1-beta.3`，那么发布的时候需要使用`tag`参数，将其发布到指定标签，默认的发布标签是`latest`。
```shell
$ npm publish --tag beta
```
如果发布私有模块，模块初始化的时候，需要加上scope参数。只有npm的付费用户才能发布私有模块。
```shell
$ npm init --scope=<yourscope>
```
如果你的模块是用ES6写的，那么发布的时候，最好转成ES5。

## npm deprecate
如果想废弃某个版本的模块，可以使用`npm deprecate`命令。
```shell
$ npm deprecate my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"
```
运行上面的命令以后，小于`0.2.3`版本的模块的`package.json`都会写入一行警告，用户安装这些版本时，这行警告就会在命令行显示。

## npm owner
模块的维护者可以发布新版本。npm owner命令用于管理模块的维护者。
```shell
# 列出指定模块的维护者
$ npm owner ls <package name>

# 新增维护者
$ npm owner add <user> <package name>

# 删除维护者
$ npm owner rm <user> <package name>
```