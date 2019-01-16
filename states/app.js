app = function(game){
  //global variables that get updated in functions
  var player
  var bullets;
  var gun;
  var fireRate = 150;
  var nextFire = 0;
  var cursors;
  var map;
  var layer;
  var enemyspeed = 70;
  var W, A, S, D;
  var scoreText;
  var livesText;
  var scoreCount;
  var livesCount;
  var game;
  var aio;
}



app.prototype = {
  preload: function(game) {
    //loading all assets
      this.load.tilemap('world', 'assets/world.csv')
      this.load.image('tileset', 'assets/Spritesheet/Tilesheet/tilesheet_complete.png')
      this.load.image('downGun', 'assets/guns/laser/laser_down.png')
      this.load.image('rightGun', 'assets/guns/laser/laser_side.png')
      this.load.image('leftGun', 'assets/guns/laser/laser_side_2.png')
      this.load.image('empty', 'assets/guns/laser/empty.png')
      this.load.spritesheet('monster', 'assets/monster/slime1_front.png', 32, 32, 4)
      this.load.spritesheet('player', 'assets/characters/sprite-sheet.png', 35, 47, 16)
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('gun', 'assets/guns/laser/laser_side.png');
      this.load.audio('happy', 'assets/audio/background_music.mp3')

  },
  create: function(game) {
      var aio = this.add.audio('happy')
      aio.play()
      //controls definition
      W = this.input.keyboard.addKey(Phaser.Keyboard.W);
      A = this.input.keyboard.addKey(Phaser.Keyboard.A);
      S = this.input.keyboard.addKey(Phaser.Keyboard.S);
      D = this.input.keyboard.addKey(Phaser.Keyboard.D);

      this.physics.startSystem(Phaser.Physics.ARCADE);
      //tilemap settings
      map = this.add.tilemap('world', 32, 32)
      map.addTilesetImage('tileset')
      layer = map.createLayer(0)
      layer.resizeWorld()
      //adding bullet group and physics
      bullets = this.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.createMultiple(50, 'bullet');
      bullets.setAll('checkWorldBounds', true);
      bullets.setAll('outOfBoundsKill', true);
      //adding sprites
      player = this.add.sprite(380,275, 'player')
      gun = this.add.sprite(400, 300, 'gun');
      //declaring enemies as a group object
      enemies = this.add.group();
      //actually creating enemies
      for(var i = 0; i<10; i++){
        enemies.create(this.world.randomX, this.world.randomY, 'monster')
      }
      //handling each enemy
      enemies.forEach( function(item){
        item.enableBody= true;
        item.physicsBodyType = Phaser.Physics.ARCADE;
        item.animations.add('move', [0,1,2,3], 8, true, true)
        item.anchor.set(0.5)
      })
      //centering anchor for gun for better collision management
      player.anchor.set(0)
      gun.anchor.set(0.5)
      // enabling physics
      this.physics.enable(gun, Phaser.Physics.ARCADE);
      this.physics.enable(player, Phaser.Physics.ARCADE);

      //adding animations
      player.animations.add('right', [4,5,6,7], 8, true, true)
      player.animations.add('up', [0,1,2,3], 8, true, true)
      player.animations.add('left', [8,9,10,11], 8, true, true)
      player.animations.add('down', [12,13,14,15], 8, true, true)
       //camera settings
      this.camera.follow(player)
      this.camera.follow(gun)
      //collision settings
      player.body.collideWorldBounds=true;
      gun.body.collideWorldBounds=true;
      //lives/score count
      scoreCount = 0;
      livesCount = 3;

      text_style = {font: '25px Montserrat', fill:'white', fontWeight:"600"}

      scoreText = this.add.text(16, 16, 'Score: ' + scoreCount, text_style)
      livesText = this.add.text(684, 16, 'Lives: ' + livesCount, text_style)
      //fixed camera so the livesText and scoreText doesn't move when the camera is moving
      livesText.fixedToCamera = true
      scoreText.fixedToCamera = true

  },


  update: function(game) {
      playAio()
      //accesses each enemy and add physics/animations
      enemies.forEach(function(item){
        item.animations.play('move')
        game.physics.arcade.enable(item)
        game.physics.arcade.moveToObject(item, player, enemyspeed)
        item.enableBody = true;
        item.body.immovable = true;
        //collsion events
      if(checkOverlap(item, player)){
          player.reset(380,275)
          gun.reset(400, 300)
          livesCount = livesCount - 1
          livesText.text = "Lives: " + livesCount
      }
      if(checkOverlap(bullets, item)){
            scoreCount = scoreCount + 100
            scoreText.text = 'Score: ' + scoreCount
            item.destroy()
            //deleting memory for each bullet used to kill enemy
            bullets.forEach(function(item){
              if(checkOverlap(item, enemies)){
                item.destroy()
              }
            })
      }

      })
      //input handler for shooting
      if (this.input.activePointer.isDown){
          fire();
      }
      //keyboard controls
      if(W.isDown){
        player.body.velocity.y =  -200;
        gun.body.velocity.y =  -200;
        player.animations.play('up');
        gun.loadTexture('empty', 0)

      }
      else if(A.isDown){
        player.body.velocity.x = -200;
        player.animations.play('left')
        gun.body.velocity.x = -200;
        gun.loadTexture('leftGun', 0)
        this.camera.x -= 5;
      }
      else if(S.isDown){
        player.body.velocity.y = 200;
        player.animations.play('down')
        gun.body.velocity.y = 200;
        gun.loadTexture('downGun', 0)
      }
      else if(D.isDown){
        player.body.velocity.x = 200;
        player.animations.play('right')
        gun.body.velocity.x = 200;
        gun.loadTexture('rightGun', 0)

      }
      else{
        gun.body.velocity.x = 0
        gun.body.velocity.y = 0
        player.body.velocity.x = 0
        player.body.velocity.y = 0
        player.animations.stop(null, true);
      }
      // win/lose checker
      if(scoreCount === 1000){
        this.game.state.start('winner')
      }
      if(livesCount === 0){
        this.game.state.start('gameover')
      }



  }

}
