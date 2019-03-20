function Next() {
    const middleware = [];

    this.use = function(fn) {
        middleware.push(fn);
    };

    var self = this;

    this.next = function() {
        const fn = middleware.shift();

        if (fn == null) {
            self.main();
        } else {
            fn(self.next);
        }
    }

    this.main = function() {
        console.log('done!!!');
    };
};

const n = new Next();

n.use(function(next) {
    console.log(111);
    next();
});

n.use(function(next) {
    console.log(222);
    setTimeout(function() {
        next();
    }, 3000);
});

n.use(function(next) {
    console.log(333);
    next();
});

n.use(function(next) {
    console.log(444);
    next();
});


n.next();