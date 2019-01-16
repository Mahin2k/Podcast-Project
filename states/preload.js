Preload = function(){}

Preload.prototype = {
  preload: function() {
    // load all game assets
    // images, spritesheets, atlases, audio etc..

  },
  create: function() {
    this.state.start('MainMenu');

  }
};
console.log('preloaded')
