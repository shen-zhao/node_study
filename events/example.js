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

myEmitter.emit('event');  //触发相应的事件(监听器)
myEmitter.emit('event');  //触发相应的事件(监听器)
myEmitter.emit('event');  //触发相应的事件(监听器)