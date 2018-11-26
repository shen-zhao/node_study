# events(事件)

大多数 Node.js 核心 API 构建于惯用的异步事件驱动架构，其中某些类型的对象（又称触发器，`Emitter`）会触发命名事件来调用函数（又称监听器，`Listener`）。
Node.js 中的事件模型就是我们常见的订阅发布模式,Node.js核心API都采用异步事件驱动,所有可能触发事件的对象都是一个继承自`EventEmitter`类的`子类实例对象`。简单来说就是Node帮我们实现了一个订阅发布模式(Subscribe/Publish)。

订阅发布模式定义了一种一对多的依赖关系,在Node中EventEmitter 对象上开放了一个可以用于监听的`on(eventName,callback)`函数,允许将一个或多个函数绑定到对应的事件上。当 `EventEmitter` 对象触发(`emit(eventName)`)一个事件时,所有绑定在该事件上的函数都被同步地调用!这种模式在node中大量被使用

上官方实例：
```javascript
const EventEmitter = require('events'); //父类

class MyEmitter extends EventEmitter {} //子类

const myEmitter = new MyEmitter(); //子类实例
myEmitter.on('event', () => {  //自定义监听器注册指定的监听回调
  console.log('触发事件');
});
myEmitter.emit('event');  //触发相应的事件(监听器)
```

基于on和emit功能简单模拟`EventEmitter`类(不具备完整功能)
```javascript
class EventEmitter {
    constructor() {
        this.queue = {};
    }
    on(eventName, callback) {
        if (this.queue[eventName] === undefined) {
            this.queue[eventName] = [callback]
        } else {
            this.queue[eventName].push(callback);
        }
    }
    emit(eventName) {
        const cbs = this.queue[eventName];

        if (cbs === undefined) return;

        cbs.forEach(cb => {
            cb();
        });
    }
}

class MyEmitter extends EventEmitter {} //子类

const myEmitter = new MyEmitter(); //子类实例
myEmitter.on('event', () => {  //自定义监听器注册指定的监听回调
  console.log('触发事件');
});
myEmitter.emit('event');  //触发相应的事件(监听器)
```

## EventEmitter类

### 内置事件 'newListener' 事件、 'removeListener' 事件
**'newListener' 事件**

- eventName {string} | {symbol} 事件的名称。
- listener {Function} 事件的句柄函数。
`EventEmitter` 实例在*新的监听器*被添加到其内部监听器数组之前，会触发自身的 'newListener' 事件。

在添加监听器之前触发 `'newListener'` 事件有一个副作用： 如果在回调中注册同名事件的监听器，则该监听器会被插入到正被添加的监听器*前面*。

**注**：普通事件订阅触发`'newListener'`事件，此时事件订阅器还没真正添加到事件队列中，所以导致`'newListener'`事件回调执行时进行相同的事件绑定会早于触发前的绑定。切忌如果在`'newListener'`回调中执行普通事件的订阅，`'newListener'`事件必须用`once`进行，避免发生死循环
```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();
// 只处理一次，避免无限循环。
myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // 在前面插入一个新的监听器。
        myEmitter.on('event', () => {
            console.log('B');
        });
    }
});
myEmitter.on('event', () => {
    console.log('A');
});
myEmitter.emit('event');
```
**'removeListener' 事件**
- eventName {string} | {symbol} 事件的名称。
- listener {Function} 事件的句柄函数。
`'removeListener'` 事件在 `listener` 被移除后触发。

### 事件订阅(添加监听器) emitter.on(eventName, listener), emitter.addListener(eventName, listener)
添加 `listener` 函数到名为 `eventName` 的事件的监听器数组的末尾。 不会检查 `listener` 是否已被添加。 多次调用并传入相同的 `eventName` 与 `listener` 会导致 `listener` 会被添加多次。

- eventName {string} | {symbol} 事件名称
- listener {Function} 回调函数。
- return {EventEmitter}

默认情况下，事件监听器会按照 `listener` 添加的顺序依次调用。

### emitter.prependListener(eventName, listener)
添加 `listener` 函数到名为 `eventName` 的事件的监听器数组的*开头*。

### 单次监听器(触发之前被移除) emitter.once(eventName, listener)
- eventName {string} | {symbol} 事件名称。
- listener {Function} 回调函数。
- return: {EventEmitter}

添加单次监听器 `listener` 到名为 `eventName` 的事件。 当 `eventName` 事件下次触发时，监听器会先被移除，然后再调用。

### emitter.prependOnceListener(eventName, listener)
添加单次监听器 `listener` 到名为 `eventName` 的事件的监听器数组的*开头*。

## 事件触发 emitter.emit(eventName[, ...args])
- eventName {string} | {symbol}
- ...args {any}
- 返回: {boolean}
按照监听器注册的顺序，同步地调用每个注册到名为 `eventName` 的事件的监听器，并传入提供的参数。
如果事件有监听器，则返回 `true`，否则返回 `false`。

## 移除事件订阅

### emitter.removeAllListeners([eventName])
- eventName {string} | {symbol} 事件名称。
- return: {EventEmitter}
移除*全部*监听器或指定的 `eventName` 事件的监听器。

### emitter.off(eventName, listener), emitter.removeListener(eventName, listener)
- eventName {string} | {symbol} 事件名称。
- listener {Function} 监听器(回调函数)。
- return: {EventEmitter}
从名为 `eventName` 的事件的监听器数组中移除指定的 `listener`。

## 设置/获取最大监听器个数
### EventEmitter.defaultMaxListeners(默认最大监听器个数，可读写)
默认情况下，每个事件可以注册最多 10 个监听器。 可以使用 `emitter.setMaxListeners(n)` 方法改变单个 `EventEmitter` 实例的限制。 可以使用 `EventEmitter.defaultMaxListeners` 属性改变所有 `EventEmitter` 实例的默认值。

设置 `EventEmitter.defaultMaxListeners` 要*谨慎*，因为会影响所有 `EventEmitter` 实例，包括之前创建的。 因而，优先使用 `emitter.setMaxListeners(n)` 而不是 `EventEmitter.defaultMaxListeners`。

限制不是硬性的。 `EventEmitter` 实例可以添加超过限制的监听器，但会向 `stderr` 输出跟踪警告，表明检测到可能的内存泄漏。 对于单个 `EventEmitter` 实例，可以使用 `emitter.getMaxListeners()` 和 `emitter.setMaxListeners()` 暂时地消除警告

### emitter.setMaxListeners(n)
- n {integer}
- return: {EventEmitter}
默认情况下，如果为特定事件添加了超过 10 个监听器，则 `EventEmitter` 会打印一个警告。 这有助于发现内存泄露。 但是，并不是所有的事件都要限制 10 个监听器。 `emitter.setMaxListeners()` 方法可以为指定的 `EventEmitter` 实例修改限制。 值设为 Infinity（或 0）表示不限制监听器的数量。

### emitter.getMaxListeners()
- return: {integer}
返回 `EventEmitter` 当前的监听器最大限制数的值，该值可以使用 `emitter.setMaxListeners(n)` 设置或默认为 `EventEmitter.defaultMaxListeners`。

## 获取监听器数量：emitter.listenerCount(eventName)
- eventName {string} | {symbol} 事件名称。
- return: {integer}
获取emitter正在监听的名为 `eventName` 的事件监听器(`listener`)的数量

## 获取事件名称 emitter.eventNames()
- return {Array}
返回已注册监听器的事件名数组。 数组中的值为`字符串`或 `Symbol`。

## 获取监听器队列：emitter.listeners(eventName)
- eventName {string} | {symbol}
- 返回: {Function[]}
返回名为 `eventName` 的事件的监听器数组的副本。
```javascript
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// 打印: [ [Function] ]
```

## emitter.rawListeners(eventName)
新增于: v9.4.0

- eventName {string} | {symbol} 事件名称。
- return {Function[]}
返回 eventName 事件的监听器数组的拷贝，包括封装的监听器（例如由 .once() 创建的）。
```javascript
const EventEmitter = require('events');

const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```
`emitter.rawListeners(eventName)`和`emitter.listeners(eventName)`的区别：
rawListeners返回的监听器数组中**某些订阅方式**(比如once)会包装监听器回调(listener), 若想调用回调，需要读取listener属性获取，如：
```javascript
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();
```
listeners直接返回无包装的监听器。