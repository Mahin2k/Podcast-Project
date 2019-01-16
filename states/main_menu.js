MainMenu = function(game){

}

MainMenu.prototype = {
  preload: function(game){
    game.load.image('background', 'assets/Spritesheet/Tilesheet/bgMainMenu.png')
    game.load.image('play', 'assets/playBtn.png')
    game.load.image('controlsBtn', 'assets/controlsBtn.png')

  },
  create: function(game){
    text_style = {font: '50px Montserrat', fill:'white', fontWeight:"600"}
    //adding main menu assets
    var title = game.add.text(game.world.centerX, 100, 'War Of The Worlds', text_style)
    var background = this.add.image(0, 0, 'background')
    var play = this.add.image(game.world.centerX, game.world.centerY - 60, 'play')
    var controls_btn = this.add.image(game.world.centerX,game.world.centerY+10, 'controlsBtn')
    //centering anchors
    play.anchor.set(.5)
    title.anchor.set(.5)
    controls_btn.anchor.set(.5)
    //enabling input for images
    play.inputEnabled= true
    controls_btn.inputEnabled= true
    //on input handler
    play.events.onInputDown.add(function(){
      this.game.state.start('app')
    }, this)
    controls_btn.events.onInputDown.add(function(){
      this.game.state.start('controls')
    }, this)




  },
  update: function(game){

  }
}
