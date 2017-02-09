

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt,i) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed* dt;
    // player.checkCollision(this);


    if(this.x > 500){
        this.x = 0;
        this.y = i*40;
        // this.speed = Math.floor(Math.random()*100)+Math.floor(Math.random()*20);
        this.speed = (Math.random() * 300) + 50;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = "images/char-boy.png";
    this.x = 300;
    this.y = 0;

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function(){

    this.checkCollision();

};

Player.prototype.collisionDetection = function(enemy_bug){
    var distance_x = enemy_bug.x - this.x;
    var distance_y = enemy_bug.y - this.y;

    var total_distance = Math.sqrt(distance_x*distance_x + distance_y*distance_y);

    if(total_distance < 30){
        return true;
    }
};

Player.prototype.handleInput = function(kCode){
    if(kCode === "up"){
        // var result = this.check_toward_axes(this.y);
        if(this.y - 100 >= 0)
        {
            this.y = this.y - 100;
        }


    }
    else if(kCode === "down"){
        // var result = this.check_away_axes(this.y);
        if(this.y + 100 < 430)
        {
            this.y = this.y + 100;
        }
    }

    else if(kCode === "right"){
        var result = this.check_away_axes(this.x);
        if(result!=-1){
            this.x = this.x + 100;
        }

    }

    else if(kCode === "left"){
        var result = this.check_toward_axes(this.x);
        if(result!=-1){
            this.x = this.x - 100;
        }


    }



};



Player.prototype.reset = function(){

        this.x = 300;
        this.y = 400;
};

Player.prototype.checkCollision = function(enemy_bug){
    for (var i = 0; i < allEnemies.length; i++) {
        if(this.collisionDetection(allEnemies[i])){
            this.reset();
        }
    }




};



Player.prototype.check_toward_axes = function(pos){
    if(pos-100 < 0)
        {return -1;}

};

Player.prototype.check_away_axes = function(pos){
    if(pos+100 > 500)
        {return -1;}
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = []; //or allEnemies = [];
var num = 4;
var i;
for(i = 1;i <= num;i++){
    allEnemies.push(new Enemy(0,i*40,(Math.random() * 300) + 50));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);


});