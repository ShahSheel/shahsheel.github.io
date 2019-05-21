// Initialize the game and start our state
var game = new Phaser.Game(700, 700,Phaser.AUTO);

game.state.add('Load', boil.Load);
game.state.add('Menu', boil.Menu);
game.state.add('Level1', boil.Play); 
game.state.add('Level2', boil.Level2)
game.state.add('Level3', boil.Level3); 
game.state.add('BossLevel', boil.BossLevel); 
game.state.add('GameOver', boil.GameOver);
game.state.start('Load');

