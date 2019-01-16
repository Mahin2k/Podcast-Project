winner = function(game){

}

winner.prototype ={
  preload: function(game){
    game.load.image('winner', 'assets/winner.png')
    game.load.image('backBtn', 'assets/backBtn.png')

  },
  create: function(game){
    var back_btn = game.add.image(game.world.centerX, game.world.centerY + 200, 'backBtn')
    game.add.image(0,0, 'winner')

    back_btn.inputEnabled = true;
    back_btn.events.onInputDown.add(function(){
      this.game.state.start('MainMenu')
    }, this)

  },
  update: function(game){

    }
}
