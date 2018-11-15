
# cluster

## 概览
Node.js默认单进程运行，对于32位系统最高可以使用512MB内存，对于64位最高可以使用1GB内存。对于多核CPU的计算机来说，这样做效率很低，因为只有一个核在运行，其他核都在闲置。`cluster`模块就是为了解决这个问题而提出的。

`cluster`模块允许设立一个主进程和若干个`worker`进程，由主进程监控和协调`worker`进程的运行。`worker`之间采用进程间通信交换消息，`cluster`模块内置一个负载均衡器，采用Round-robin算法协调各个`worker`进程之间的负载。运行时，所有新建立的链接都由主进程完成，然后主进程再把TCP连接分配给指定的`worker`进程。
```javascript
const http = require('http');
const cluster = require('cluster');
const cpuLen = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < cpuLen; i++) {
        cluster.fork();
    }
} else {
    http.createServer((request, response) => {
        response.writeHead(200);
        response.write('cluster is on ' + process.pid);
        response.end();
    }).listen(3000, '0.0.0.0');
    console.log('cluster is on ' + process.pid);
}
```
上面代码先判断当前进程是否为主进程（`cluster.isMaster`），如果是的，就按照CPU的核数，新建若干个`worker`进程；如果不是，说明当前进程是`worker`进程，则在该进程启动一个服务器程序。

## 事件
### 'fork' 事件
当新的工作进程被fork时，`cluster`模块将触发`'fork'`事件。 可以被用来记录工作进程活动，产生一个自定义的`timeout`。

- worker {cluster.Worker} 回调参数

*官方实例*
```javascript
onst timeouts = [];
function errorMsg() {
  console.error('Something must be wrong with the connection ...');
}

cluster.on('fork', (worker) => {
  timeouts[worker.id] = setTimeout(errorMsg, 2000);
});
cluster.on('listening', (worker, address) => {
  clearTimeout(timeouts[worker.id]);
});
cluster.on('exit', (worker, code, signal) => {
  clearTimeout(timeouts[worker.id]);
  errorMsg();
});
```

### 'listening' 事件
当一个工作进程调用`listen()`后，工作进程上的server会触发`'listening'` 事件，同时主进程上的 cluster 也会被触发`'listening'`事件。

事件处理器使用两个参数来执行，其中`worker`包含了工作进程对象，`address` 包含了以下连接属性： `address`、`port` 和 `addressType`。当工作进程同时监听多个地址时，这些参数非常有用。

```javascript
const http = require('http');
const cluster = require('cluster');
const cpuLen = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < cpuLen; i++) {
        cluster.fork();
    }
    cluster.on('listening', (worker, address) => {
        console.log('worker', address);
    });
} else {
    http.createServer((request, response) => {
        response.write('cluster is on ' + process.pid);
        response.end();
    }).listen(3000, '0.0.0.0');
    console.log('cluster is on ' + process.pid);
}
```
### 'message' 事件
- worker {cluster.Worker}
- message {Object}
- handle {undefined> | <Object}
当`cluster主进程`接收任意工作进程发送的消息后被触发。
*注：*在Node.js v6.0版本之前，这个事件仅仅接受两个参数：消息和handle，而没有工作进程对象。
```javascript
const http = require('http');
const cluster = require('cluster');
const cpuLen = require('os').cpus().length;

const worders = [];

if (cluster.isMaster) {
    for (let i = 0; i < cpuLen; i++) {
        worders.push(cluster.fork());
    }
    cluster.on('listening', (worker, address) => {
        console.log('worker', address);
    });

    //主进程监听子进程发送的消息
    cluster.on('message', (worker, message, handle) => {
        console.log('message', message);
    });

    worders.forEach((worker) => {
        //主进程向子进程中发送消息
        worker.send(worker.id);
    });
} else {
    http.createServer((request, response) => {
        response.write('cluster is on ' + process.pid);
        response.end();
    }).listen(3000, '0.0.0.0');
    console.log('cluster is on ' + process.pid);

    //监听主进程中发送的消息
    process.on('message', (msg) => {
        console.log('main', msg);
    });

    //子进程向主进程发送消息
    process.send('worker ' + process.pid);
}
```
发送消息的方法：`process.end()`和`worker.end()`;

### 'online' 事件
- worker {cluster.Worker}
当新建一个工作进程后，工作进程应当响应一个`online`消息给主进程。当主进程收到`online`消息后触发这个事件。 `'fork'` 事件和 `'online'`事件的不同之处在于，前者是在主进程新建工作进程后触发，而后者是在工作进程运行的时候触发。
**fork在online之前触发**
```javascript
cluster.on('online', (worker) => {
  console.log('Yay, the worker responded after it was forked');
});
```

### 'setup' 事件
- settings {Object}

每当 `.setupMaster()`被调用的时候触发。
`settings` 对象是 `setupMaster()` 被调用时的 `cluster.settings` 对象，并且只能查询，因为在一个 `tick` 内 `.setupMaster()` 可以被调用多次。
如果精确度十分重要，请使用 `cluster.settings`

## 属性

### cluster.isMaster {boolean}
当该进程是主进程时，返回 true。这是由process.env.NODE_UNIQUE_ID决定的，当process.env.NODE_UNIQUE_ID未定义时，isMaster为true。

### cluster.isWorker {boolean}
当进程不是主进程时，返回 true。（和`cluster.isMaster`刚好相反）

### cluster.settings
{Object}
- execArgv {Array}: 传递给Node.js可执行文件的参数列表。 (Default=process.execArgv)
- exec {String}: worker文件路径。 (Default=process.argv[1]) 
- args {Array}: 传递给worker的参数。(Default=process.argv.slice(2))  
- silent {boolean}: 是否需要发送输出值父进程的stdio。(Default=false) 
- stdio {Array}: 配置fork进程的stdio。  由于cluster模块运行依赖于IPC，这个配置必须包含'ipc'。当提供了这个选项后，将撤销silent。
- uid {number}: 设置进程的user标识符。
- gid {number}: 设置进程的group标识符。 
调用`.setupMaster()` (或 `.fork()`)后，这个`settings`对象将会包含这些设置项，包括默认值。

### cluster.worker
当前工作进程对象的引用，对于主进程则无效。
```javascript
const cluster = require('cluster');

if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
}
```

### cluster.workers
这是一个哈希表，储存了活跃的工作进程对象，`id`作为`key`。有了它，可以方便地遍历所有工作进程。只能在主进程中调用。
工作进程断开连接以及退出后，将会从`cluster.workers`里面移除。这两个事件的先后顺序并不能预先确定，但可以保证的是， cluster.workers的移除工作在'disconnect' 和 'exit'两个事件中的最后一个触发之前完成。
```javascript
// Go through all workers
function eachWorker(callback) {
  for (const id in cluster.workers) {
    callback(cluster.workers[id]);
  }
}
eachWorker((worker) => {
  worker.send('big announcement to all workers');
});
```

# Worker 类
Worker对象包含了关于工作进程的所有public信息和方法。
在一个主进程里，可以使用`cluster.workers`来获取Worker对象, 或者为`cluster.fork()`的返回值
在一个工作进程里，可以使用`cluster.worker`来获取Worker对象, 在工作进程中`cluster.worker`的行为可以用`process`的行为代替

## 事件

### 'disconnect' 事件
在主进程中监听, 或在子进程中使用`process.on('disconnect')`监听;
```javascript
const http = require('http');
const cluster = require('cluster');
const cpuLen = require('os').cpus().length;

const worders = [];

if (cluster.isMaster) {
    for (let i = 0; i < cpuLen; i++) {
        worders.push(cluster.fork());
    }

    worders.forEach((worker) => {
        //添加监听
        worker.on('disconnect', () => {
            console.log(`The id ${worker.id} of Worker has disconnected`);
        });
    });
} else {
    http.createServer((request, response) => {
        response.write('cluster is on ' + process.pid);
        response.end();
    }).listen(3000, '0.0.0.0');
    console.log('cluster is on ' + process.pid);

    //5s后断开worker进程
    setTimeout(() => {
        cluster.worker.disconnect();
    }, 5000);
    //添加监听
    process.on('disconnect', () => {
        console.log(`id: ${cluster.worder.id} process disconnect`);
    });
}
```
```shell
id: 1 process disconnect
id: 2 process disconnect
The id 1 of Worker has disconnected
The id 2 of Worker has disconnected
The id 3 of Worker has disconnected
id: 3 process disconnect
id: 4 process disconnect
The id 4 of Worker has disconnected
```
虽然与 `cluster.on('disconnect')`事件 是相似的,但是这个进程又有其他特征。 

### 'error' 事件
此事件和 `child_process.fork()`提供的error事件相同。
在一个工作进程中，可以使用`process.on('error')`or`cluster.worker.on('error')`。

### 'exit' 事件
- code {number} 若正常退出，表示退出代码.
- signal {string} 引发进程被kill的信号名称（如'SIGHUP'）.
和`cluster.on('exit')`事件类似，但针对特定的工作进程。
在工作进程内，可以使用`process.on('exit')`

### 'listening' 事件
- address {Object}
和`cluster.on('listening')`事件类似，但针对特定的工作进程。
在工作进程内，可以使用`process.on('listening')`

### 'message' 事件
- message {Object}
- handle {undefined> | <Object}
和`cluster.on('message')`事件类似，但针对特定的工作进程。
在工作进程内，可以使用`process.on('message')`

### 'online' 事件
和`cluster.on('online')`事件类似，但针对特定的工作进程。
在工作进程内，可以使用`process.on('online')`

## 方法

### worker.disconnect()
- Returns: {cluster.Worker} 一个 worker 的引用。

在一个工作进程内，调用此方法会关闭所有的server，并等待这些server的 `'close'`事件执行，然后关闭IPC管道。

### worker.isConnected()
当工作进程通过IPC管道连接至主进程时，这个方法返回true，否则返回false。
一个工作进程在创建后会自动连接到它的主进程，当'`disconnect'` 事件被触发时才会断开连接。

### worker.isDead()
当工作进程被终止时（包括自动退出或被发送信号），这个方法返回true ，否则返回false。

### worker.kill([signal='SIGTERM'])
- signal {string} 被发送kill信号的工作进程名称。
这个方法将会kill工作进程。在主进程中，通过断开与`worker.process`的连接来实现，一旦断开连接后，通过`signal`来杀死工作进程。在工作进程中，通过断开IPC管道来实现，然后以代码0退出进程。

### worker.send(message[, sendHandle][, callback])
- message {Object}
- sendHandle {Handle}
- callback {Function}
- 返回: {boolean}
发送一个消息给工作进程或主进程，也可以附带发送一个`handle`。
主进程调用这个方法会发送消息给具体的工作进程。还有一个等价的方法是`ChildProcess.send()`。
工作进程调用这个方法会发送消息给主进程。还有一个等价方法是`process.send()`。

## 属性
### worker.exitedAfterDisconnect
- {boolean} 主动：true， 被动： false
当调用 `.kill()` 或者 `.disconnect()`方法时被设置，在这之前都是 `undefined`。
`worker.exitedAfterDisconnect`可以用于区分自发退出还是被动退出，主进程可以根据这个值决定是否重新衍生新的工作进程。

### worker.id
- {number}
每一个新衍生的工作进程都会被赋予自己独一无二的编号，这个编号就是储存在`id`里面。
当工作进程还存活时，`id`可以作为在`cluster.workers`中的索引。

### worker.process
- {ChildProcess}
所有的工作进程都是通过`child_process.fork()`来创建的，这个方法返回的对象被存储为`.process`。在工作进程中， `process`属于全局对象。
需要注意：当`process`上发生 `'disconnect'`事件，并且`.exitedAfterDisconnect`的值不是true时，工作进程会调用 `process.exit(0)`。这样就可以防止连接意外断开。
