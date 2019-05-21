boil.GameOver = function(){};

var score;

boil.GameOver.prototype = {
    preload: function(){

    },
    create: function(){
        game.add.text(game.world.width*0.5, game.world.height*0.5, 'You have completed the game! \n Score: ' + score , { fontColor: '#fff', fontSize: '12px' });
        console.log('You have completed the game! \n Score: ' + score );
        game.stage.backgroundColor = '#eee';
        game.input.onDown.add(function(){
            changeState('Menu');
        }); 
    },
    update: function(){
        
    }
};