var basicSpeed = 300;
var extraSpeed = 800;
var xAxisOrigin = 0;
var xAxisUnit = 101;
var yAxisOrigin = 50;
var yAxisUnit = 83;
var rowNum = 5;
var colNum = 5;
var startRowNum = 5;
var startColNum = 3;
var delta = 20;
// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = basicSpeed + extraSpeed * Math.random();
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + this.speed * dt;
    if (this.x > xAxisOrigin + xAxisUnit * colNum) {
        this.x = -xAxisUnit;
        this.speed = basicSpeed + extraSpeed * Math.random();
    }
    if (this.y === player.y) {
        if (this.x > player.x - delta && this.x < player.x + delta) {
            player.resetGame();
        }
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(){
    this.x = xAxisUnit * (startColNum - 1);
    this.y = yAxisOrigin + yAxisUnit * (startRowNum - 1);
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
    if (this.keypress === 'left') {
        this.x -= xAxisUnit;
        if (this.x <= xAxisOrigin) {
            this.x = xAxisOrigin;
        }
    }
    if (this.keypress === 'up') {
        this.y -= yAxisUnit;
    }
    if (this.keypress === 'right') {
        this.x += xAxisUnit;
        if (this.x >= xAxisOrigin + xAxisUnit * (colNum - 1)) {
            this.x = xAxisOrigin + xAxisUnit * (colNum - 1);
        }
    }
    if (this.keypress === 'down') {
        this.y += yAxisUnit;
        if (this.y > yAxisOrigin + yAxisUnit * (rowNum - 1)) {
            this.y = yAxisOrigin + yAxisUnit * (rowNum - 1);
        }
    }
    if (this.y < yAxisOrigin) {
        alert("YOU WIN!");
        this.resetGame();
    }
    this.keypress = null;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    this.keypress = key;
};

Player.prototype.resetGame = function() {
    this.x = xAxisUnit * (startColNum - 1);
    this.y = yAxisOrigin + yAxisUnit * (startRowNum - 1);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(xAxisOrigin,yAxisOrigin), new Enemy(xAxisOrigin,yAxisOrigin + yAxisUnit), new Enemy(xAxisOrigin,yAxisOrigin + 2 * yAxisUnit), new Enemy(xAxisOrigin, yAxisOrigin + 3 * yAxisUnit)];
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
