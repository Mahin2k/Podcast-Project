
var player
var bullets;
var gun;
var fireRate = 150;
var nextFire = 0;
var cursors;
var map;
var layer;
var enemyspeed = 20;
var W, A, S, D;
var scoreText;
var livesText;
var scoreCount;
var livesCount;
var aio;
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, { preload: preload, create: create, update: update, render: render });
(function() {
				var game = new Phaser.Game(800, 600, Phaser.CANVAS, "game-area");
				game.state.add("Boot", boot);
        game.state.start("Boot");
				game.state.add("preload", Preload);
				game.state.add("MainMenu", MainMenu);
        game.state.add('winner', winner)
				game.state.add("app",app);
        game.state.add('controls', controls)
        game.state.add('gameover', gameover)

        playAio = function(){
          aio = game.add.audio('happy')
          aio.play('happy', 0.5 ,0.5 ,true)
        }
        fire = function() {

            if (game.time.now > nextFire && bullets.countDead() > 0)
            {
                nextFire = game.time.now + fireRate;
                var bullet = bullets.getFirstDead();
                bullet.reset(gun.x - 1, gun.y - 1);
                game.physics.arcade.moveToPointer(bullet, 800);
            }
        }

			})();

      checkOverlap = function(spriteA, spriteB) {
          var boundsA = spriteA.getBounds();
          var boundsB = spriteB.getBounds();
          return Phaser.Rectangle.intersects(boundsA, boundsB);
      }

      changeTexture = function (){
        if(item.key = 'monster'){
          item.loadTexture('explodeMonster')
        }
        else{
          item.loadTexture('monster')
        }
      }
