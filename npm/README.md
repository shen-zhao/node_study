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