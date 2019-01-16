function boot(game) {
  console.log('starting game...')
};

boot.prototype = {
  preload: function() {
    // load preloader assets
  },
  create: function() {
    // setup game environment
    // scale, input etc..

    this.game.state.start('preload');
    console.log('booted')
  }
};
