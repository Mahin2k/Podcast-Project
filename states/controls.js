controls = function(game){

}

controls.prototype = {
  preload: function(game){
    game.load.image('controls',  'assets/controls.png')
    game.load.image('backBtn',  'assets/backBtn.png')

  },
  create: function(game){
    game.add.image(0, 0, 'controls')
  },
  update: function(game){
    var back_btn = game.add.image(game.world.centerX, game.world.centerY + 150, 'backBtn')
    back_btn.anchor.set(.5)

    back_btn.inputEnabled = true

    back_btn.events.onInputDown.add(function(){
      this.game.state.start('MainMenu')
    }, this)


  }
}
