 // Create the state that will contain the whole game
boil.BossLevel = function(){};


var livesText;
var lifeLostText;
var sprite;
var bullets;
var fireRate = 100;
var nextFire = 0;
var enemyHealth = 100;
var enemyBullets; 
var enemyBulletTime = 0; 
var livingEnemies = [];

boil.BossLevel.prototype = {  
    preload: function() { 
        game.load.image('nav', 'assets/nav.png');
        game.load.spritesheet('player', 'assets/player.png',22,34);
        game.load.spritesheet('enemy', 'assets/boss.png');
        game.load.image('wall', 'assets/background.png');
        game.load.image('sidewall', 'assets/sidebackground.png');
        game.load.image('collapsefloor', 'assets/collapsefloor.png');
        game.load.spritesheet('coin', 'assets/coin.png',24,24);
        game.load.spritesheet('lava', 'assets/lava.png');
        game.load.spritesheet('enemy1','assets/protector.png');
        game.load.spritesheet('detect','assets/enemydetect.png');
        game.load.image('dooropen', 'assets/closeddoor.png');
        game.load.image('doorlocked', 'assets/animatedcastledoors.png');
        game.load.image('key', 'assets/key.png');
        game.load.image('heart', 'assets/heartshealth.png',0,0);
        game.load.spritesheet('power1', 'assets/crystal-blue-flight.png',16,15);
        game.load.image('background', 'assets/backgroundMain.png');
        game.load.image('laser', 'assets/laser.png');
        game.load.image('laserhold', 'assets/laserhold.png');
        game.load.image('button', 'assets/button.png');
        game.load.image('power1','assets/fireball.png');
        game.load.image('power2','assets/bluefireball.png');
    },

    create: function() {  
        
     // Set the background color to blue
    game.add.tileSprite(30, 30, 650, 640, 'background');
    // Start the Arcade physics system (for movements and collisions)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add the physics engine to all game objects
    game.world.enableBody = true;
        
    // Variable to store the arrow key pressed
    this.cursor = game.input.keyboard.createCursorKeys();
        
    // Create the player in the middle of the game
    this.player = game.add.sprite(100, 600, 'player');
    


    // speech.anchor.setTo(0.5, 0.5); 
           //  Create our Timer
    //this.player.scale.setTo(1,1);
    this.navbar = game.add.sprite(0, 0, 'nav'); 
    this.bottomBar = game.add.sprite(0,675, 'nav'); 
    
    // Add gravity to make it fall
    this.player.body.gravity.y = 600;
   
        
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'power1');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
        
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true; 
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE; 
    enemyBullets.createMultiple(30, 'power2');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
        
        
    obj = "Find the key";
    objective = game.add.text(250,5, 'Objective: ' + obj,{ fontSize: '20px', fill: '#fff'});
    //Set climbing to false  
        
    // Create 3 groups that will contain our objects
    this.doors = game.add.group();
    this.lasers = game.add.group();
    this.walls = game.add.group();
    this.sidewalls = game.add.group(); 
    this.collapsefloors = game.add.group();   
    this.coins = game.add.group();
    this.enemies = game.add.group();
    this.keys = game.add.group();
    this.flights = game.add.group();
    this.poisons = game.add.group();
    this.enemies = game.add.group();
    this.detection = game.add.group();
    this.buttons = game.add.group();
    this.fireballs = game.add.group();
    //this.navbar = game.add.group();

    // Design the level. s = side wall x = wall, o = coin, ! = lava, d = door locked , do = door open, f = collapable floors,
    //1 = flight, p = protector, h laser hold, l laser, f = fireball
    var level = [
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',                       
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        'x                               x', 
        'x                        e      x', 
        'x   m                           x', 
        'x                               x', 
        'x                               x',
        'x                               x',
        'x     2                         x',
        'x                               x',
        ' aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ',
    ];
// Create the level by going through the array
toggle = 100; //speed
direction = 0.5; //direction
Pdirection = 1; //player direction



for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {
         if (level[i][j] == 'd') {
            var dooropen = game.add.sprite(30+20*j, 30+20*i, 'doorlocked');
            dooropen.body.immovable = true;
             this.doors.add(dooropen);

        }
        
        if (level[i][j] == 'l') {
            var laser = game.add.sprite(30+20*j, 30+20*i, 'laser');
            laser.body.immovable = true;
            this.lasers.add(laser);

        }
        
        if (level[i][j] == 'h') {
            var laserHold = game.add.sprite(30+20*j, 35, 'laserhold');
            laserHold.body.immovable = true;

        }
        
        if (level[i][j] == 'b') {
            var button = game.add.sprite(30+20*j, 30+20*i, 'button');
            button.body.immovable = true;
            this.buttons.add(button);
        }

        if (level[i][j] == '2') {
            var fireball = game.add.sprite(30+20*j, 30+20*i, 'power1');
            //flight.scale.setTo(1.5,1.5);
            fireball.scale.setTo(0.06,0.06);
            fireball.body.immovable = true;
            this.fireballs.add(fireball);
        }
        
        
         if (level[i][j] == 'p') {
             var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy1');
            enemy.body.velocity.x = toggle;
            this.enemies.add(enemy);
        }
        
        if (level[i][j] == 'e') {
            var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
            enemy.scale.setTo(0.5,0.5);
            enemy.body.velocity.x = toggle;
            this.enemies.add(enemy);
            
        }
        
         if (level[i][j] == 'k') {
            var key = game.add.sprite(30+20*j, 30+20*i, 'key');
             key.scale.setTo(0.7, 0.7);
            key.animations.add('spin');
             
            key.animations.play('spin',0.1,true);
            this.keys.add(key);
        }

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
            var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
            wall.scale.setTo(2,1);
            this.walls.add(wall);
            wall.body.immovable = true; 
        }
        if (level[i][j] == 'a') {
            var sidewall = game.add.sprite(30+20*j, 30+20*i, 'sidewall');
            this.sidewalls.add(sidewall);
            sidewall.body.immovable = true; 
        }
        
        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'm') {
            var detect = game.add.sprite(30+20*j, 30+20*i, 'detect');
            this.detection.add(detect);
            detect.body.immovable = true; 
        }
        
         if (level[i][j] == 'f') {
            var collapsefloor = game.add.sprite(30+20*j, 30+20*i, 'collapsefloor');
            this.collapsefloors.add(collapsefloor);
            sidewall.body.immovable = false; 
        }

        // Create a coin and add it to the 'coins' group
        else if (level[i][j] == 'o') {
            var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
            coin.animations.add('spin');
            coin.animations.play('spin',20,true);
            coin.body.immovable = true;
            this.coins.add(coin);
            
        }

        // Create a enemy and add it to the 'enemies' group
        else if (level[i][j] == '!') {
            var lava = game.add.sprite(30+20*j, 30+20*i, 'lava');
            this.enemies.add(lava);
        }
    }
   
}   
    levelState = game.add.text(game.world.width-108, 0.5, 'Level 3', { fontSize: '24px', fill: '#fff' });
    score = 0;
    scoreText = game.add.text(50,0,"Score: " + score,{fontSize: '24px',fill:'#fff'});  
    livesText = game.add.text(game.world.width-26, 675, 'Lives: '+lives, { fontSize: '24px', fill: '#fff' });
    livesText.anchor.set(1,0);
    lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, '', {  });
    lifeLostText.anchor.set(0.5);
    lifeLostText.visible = false;
    weapon = game.add.text(50, 674, 'Weapon: ', { fontSize: '24px', fill: '#fff' });
    ENTER = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    SPACEBAR = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jump = -300;
    speedLeft = -200;
    speedRight = 200;
    hasKey = false;
    on = true;
    hovered = false;
    canFire = false;
    facing = false;
    },

    update: function() {
    var laserState = true;
   
    game.time.events.loop(Infinity,Infinity ,this.updateState(), this);
  
    //Make the player and the walls collide
    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.collide(this.player, this.sidewalls);
    game.physics.arcade.collide(this.player, this.collapsefloors);
    game.physics.arcade.collide(bullets, this.walls, this.removeBullet, null, this);
    game.physics.arcade.collide(bullets, this.lasers, this.removeBullet, null, this);
    game.physics.arcade.collide(enemyBullets, this.walls, this.removeEnemyBullet, null, this);
    game.physics.arcade.collide(enemyBullets, this.sidewalls, this.removeEnemyBullet, null, this);
    
    game.physics.arcade.collide(this.enemies, this.detection, this.flipEnemy,null,this);
    game.physics.arcade.collide(this.enemies, this.walls, this.flipEnemy,null,this);
    game.physics.arcade.collide(this.enemies, this.sidewalls);
    game.physics.arcade.collide(this.enemies, this.collapsefloors);

    game.physics.arcade.collide(bullets, this.enemies, this.collisionEnemyBullet, null, this);
     game.physics.arcade.collide(enemyBullets, this.player, this.collisionPlayerBullet, null, this);


    // Call the 'takeCoin' function when the player takes a coin
    game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
    //Take the key and unlock the door
    game.physics.arcade.overlap(this.player, this.keys, this.takeKey, null, this);
        
    game.physics.arcade.overlap(this.player, this.doors, this.openDoor, null, this);
    
    game.physics.arcade.overlap(this.player, this.flights, this.takeFlight, null, this);
    
    game.physics.arcade.overlap(this.player, this.fireballs, this.learntFire, null, this);
        
    game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionEnemyBullet, null, this);
        
    // kill enemy
    game.physics.arcade.overlap(this.player, this.enemies, this.killEnemy, null, this);
    
    // kill player if touches laser
    game.physics.arcade.overlap(this.player, this.lasers, this.LaserOn, null, this);

    game.physics.arcade.overlap(this.player, this.buttons, this.disableLaser, null, this);

    //game.physics.arcade.collide(this.player, this.enemies, this.enemy, null, this)   
    // Move the player when an arrow key is pressed
   if (this.cursor.left.isDown){
        this.player.body.velocity.x = speedLeft;
        this.player.scale.x = -1;  
        facing = false;
    }
    else if(this.cursor.right.isDown){
        this.player.body.velocity.x = speedRight;
        this.player.scale.x = 1; 
        facing = true;
    }
    else{ 
        this.player.body.velocity.x = 0;
    }
    
    // Make the player jump if he is touching the ground
    if (this.cursor.up.isDown && this.player.body.touching.down) 
        this.player.body.velocity.y = jump;
        
    if (SPACEBAR.isDown)
        this.fire();
    
    this.EnemyFire();
    },

removeBullet: function(bullets){
    bullets.kill();
},


 EnemyFire: function() {
      livingEnemies.length = 0; 
        this.enemies.forEachAlive(function(enemy){
            livingEnemies.push(enemy)
        });
     
    if(this.time.now > enemyBulletTime) { 
                enemyBullet = enemyBullets.getFirstExists(false); 
                var shooter = livingEnemies[0];
                enemyBullet.reset(shooter.body.x, shooter.body.y + 30);
                enemyBulletTime = this.time.now + 500;
                this.physics.arcade.moveToObject(enemyBullet,this.player,300);
        }  
},

removeEnemyBullet: function(enemyBullets){
    enemyBullets.kill();
},    
    
updateState: function(){
this.lasers.visible ^= true;
    

},

learntFire : function(fire,fireballs){
    fireballs.kill();
    canFire = true;
    fireball1 = game.add.sprite(150, 675, 'power1');
    fireball1.scale.setTo(0.1,0.1);


},
    
fire :function(){
if(canFire){
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();
        bullet.scale.setTo(0.05,0.05);

        bullet.reset(this.player.x,this.player.y + 8);
        console.log("Shooting");
        bullet.body.velocity.x = 400;

    }
}

},

    
disableLaser: function(player,buttons){
  if(!hovered){
      hovered = true;
      game.add.text(300, 40, 'Press Enter to disable the laser!', { fontSize: '12px'});  
  }
  if(ENTER.isDown){
   if(on){
        this.lasers.destroy();
        on = false;
    }
  }
  

},

LaserOn: function(player,lasers){
 if(on){
     this.lives();
 }   
},
    
// Function to kill a coin
takeCoin: function(player, coin) {
    coin.kill();
    score++;
    scoreText.text = "Score: " + score;
},

takeFlight: function(player, flights) {
    flights.kill();
    jump = -515;
    powerFlight = game.add.text(300, 40, 'Super Jump Activated', { fontSize: '12px'});  
},
    
openDoor: function(player, doors) {
 if(hasKey){
 }else
 {
 }

},
   

takeKey: function(player, key) {
    key.kill();
    hasKey = true;
    objective.text = "Objective: Unlock the door";

},

flipEnemy: function(enemy){
   direction = direction *= -1;
   enemy.scale.x = direction;  
   toggle = toggle*=-1;
   enemy.body.velocity.x = toggle;    
},



// Function to restart the game
killEnemy: function(player,enemies) {
   // jump to kill enemy
if(enemies.body.touching.up && player.body.touching.down){
    enemyHealth =- 100;
    // in this case just jump again
    this.player.body.velocity.y =  -200;
    enemies.kill();
    score+=10;
    scoreText.text = "Score: " + score;
}
else{

    
   this.lives();
}
},
    
collisionEnemyBullet: function(bullets, enemies) {
    console.log("Killing");
    bullets.kill();
    enemyHealth -= 10;
    if(enemyHealth < 0){
        enemies.kill();
        score += 50;
        scoreText.text = "Score: " + score;
        changeState('GameOver');

    }
},
    
    
collisionPlayerBullet: function(bullets, player) {
    console.log("Killing");
    bullets.kill();
    this.lives();
},
   
    
    
lives: function(){
lives--;
    if(lives >= 0 ) {
        livesText.setText('Lives: '+lives);
        lifeLostText.visible = true; 
        this.player.reset(100,600);
        game.input.onDown.addOnce(function(){
            lifeLostText.visible = false;
            this.player.visibility = true;
            this.player.reset(100,600);
            this.player.body.velocity.set(150, -150);
        }, this);
    }
    else {
       lives = 4;
       changeState("Level1");

    }
}
};


