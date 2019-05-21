var boil = {};

boil.Load = function(){};

boil.Load.prototype = {
    create: function(){
        console.log('You are in the Load state');
        game.time.events.add(100, function(){ changeState('Menu') });
    }
};

function changeState(state){
    game.state.start(state);
}