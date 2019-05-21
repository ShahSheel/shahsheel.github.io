boil.Menu = function(){};

boil.Menu.prototype = {
    preload: function(){
        game.load.image('background', 'assets/dark_castle.jpg');
    },
    create: function(){
        game.add.tileSprite(30, 30, 650, 640, 'background')
        game.add.text(game.world.width*0.5, game.world.height*0.5, 'Start Game', { font: '18px Arial', fill: '#ffff'});

        
        console.log('You are in the Menu state');
        game.input.onDown.add(function(){
            changeState('Level1');
        }); 
    },
    update: function(){
        
    }
};