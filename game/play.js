boil.Play = function(){};

boil.Play.prototype = {
    preload: function(){

    },
    create: function(){
        console.log('You are in the Play state');
        game.stage.backgroundColor = '#00FF00';
        game.input.onDown.add(function(){
            changeState('GameOver');
        }); 
    },
    update: function(){
        
    }
};