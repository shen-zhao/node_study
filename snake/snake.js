class Snake {
    constructor(options) {
        options = options || {
            container: 'body'
        };
        this.step = 10;
        this.snakes = [];
        this.timer = null;
        this.interval = 100;
        this.food = {
            el: null,
            size: {
                width: 10,
                height: 10
            },
            pos: {
                x: '',
                y: ''
            }
        }

        this.direction = 'right';
        this.keyCodeMap = {
            '38': 'top',
            '40': 'bottom',
            '37': 'left',
            '39': 'right'
        };
        this.directionOpt = {
            top: ['y', 'top' ,-this.step],
            bottom: ['y', 'top' ,this.step],
            left: ['x', 'left' ,-this.step],
            right: ['x', 'left', this.step]
        }
        this.container = document.querySelector(options.container);
        this.region = null;
        this.regionOpts = this.getRegionOpts();
        this.init();

        window.addEventListener('resize', () => {
            this.snakes = [];
            clearTimeout(this.timer);
            this.direction = 'right';
            this.regionOpts = this.getRegionOpts();
            this.init();
        });
    }

    init() {
        this.createRegion();
        this.createFood();
        this.createSnake();
        this.bindEvent();
        this.moveBegin();

        this.container.appendChild(this.region);
    }

    createRegion() {
        this.region && this.container.removeChild(this.region);
        const box = this.region = document.createElement('div');

        box.style.width = `${this.food.size.width * this.regionOpts.xNum}px`;
        box.style.height = `${this.food.size.height * this.regionOpts.yNum}px`;
        box.style.position = 'relative';
        box.style.background = '#ccc';
    }

    createFood() {
        const food = this.food.el = document.createElement('div');
        const x = this.food.size.width * Math.floor(Math.random() * this.regionOpts.xNum);
        const y = this.food.size.height * Math.floor(Math.random() * this.regionOpts.yNum);
        this.food.pos.x = x;
        this.food.pos.y = y;

        food.style.width = this.food.size.width + 'px';
        food.style.height = this.food.size.height + 'px';
        food.style.position = 'absolute';
        food.style.left = x + 'px';
        food.style.top = y + 'px';
        food.style.background = 'red';
        
        this.region.appendChild(food);
    }

    createSnake() {
        const snake = document.createElement('div');
        snake.style.width = this.food.size.width + 'px';
        snake.style.height = this.food.size.height + 'px';
        snake.style.background = 'blue';
        snake.style.position = 'absolute';

        let snakeOpt = {
            el: snake,
            pos: {
                x: 0,
                y: 0
            },
            direction: 'right'
        };

        if (this.snakes.length) {
            const lastOne = this.snakes[this.snakes.length - 1];

            snakeOpt.pos = {
                x: lastOne.pos.x,
                y: lastOne.pos.y
            }
            snakeOpt.direction = lastOne.direction;

            snakeOpt.pos[this.directionOpt[snakeOpt.direction][0]] += this.directionOpt[snakeOpt.direction][2];
        }

        this.snakes.push(snakeOpt);

        snake.style.left = snakeOpt.pos.x + 'px';
        snake.style.top = snakeOpt.pos.y + 'px';
        
        this.region.appendChild(snake);
    }

    /**
     * keyCode: ↑ 38, ↓ 40, ← 37, → 39
     */
    bindEvent() {
        document.addEventListener('keydown', (event) => {
            const direction = this.keyCodeMap[event.keyCode];
            switch (direction) {
                case 'top': 
                    if (this.direction === 'bottom') return;
                    break;
                case 'bottom':
                    if (this.direction === 'top') return;
                    break;
                case 'left':
                    if (this.direction === 'right') return;
                    break;
                case 'right':
                    if (this.direction === 'left') return;
                    break;
                default:
            }

            direction && (this.direction = direction);
        });
    }

    moveBegin() {
        let snake, next;
        for (let i = this.snakes.length - 1; i > 0; i--) {
            snake = this.snakes[i];
            next = this.snakes[i-1];
            snake.pos.x = next.pos.x;
            snake.pos.y = next.pos.y;
            snake.direction = next.direction;
            snake.el.style.left = next.pos.x + 'px';
            snake.el.style.top = next.pos.y + 'px';
        }

        const opts = this.directionOpt[this.direction];
        const leader = this.snakes[0]

        leader.pos[opts[0]] += opts[2];
        leader.el.style[opts[1]] = leader.pos[opts[0]] + 'px';

        this.timer = setTimeout(() => {
            this.moveBegin();
        }, this.interval);

        if (leader.pos.x === this.food.pos.x
            && leader.pos.y === this.food.pos.y) {
            //删除被吃的食物
            this.region.removeChild(this.food.el);
            //创建新的食物
            this.createFood();
            //增加蛇的长度
            this.createSnake();
        }
    }

    getRegionOpts() {
        return {
            xNum: Math.floor(this.container.offsetWidth / this.food.size.width),
            yNum: Math.floor(this.container.offsetHeight / this.food.size.height)
        }
    }
}