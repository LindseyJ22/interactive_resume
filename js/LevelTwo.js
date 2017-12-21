var Resume = Resume || {};

//title screen
Resume.LevelTwo = function(){};
  var player;
  var platforms;
  var cursors;
  var castle;
  var bullet_time = 0;
  var bullet;
 
Resume.LevelTwo.prototype = {
  create: function() {
    //set world dimensions
    // this.physics.startSystem(Phaser.Physics.ARCADE);

      //  A simple background for our game
      this.add.sprite(0, 0, 'night_sky');
      
      //the star group will create stars in the sky
      stars = this.add.group();
      // the bushes group will create the background bushes for design
      bushes = this.add.group();

      
      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = this.add.group();

      //  We will enable physics for any object that is created in this group
      platforms.enableBody = true;

      // Here we create the ground.
      var ground = platforms.create(0, this.world.height - 64, 'grass_ledge');

      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(2, 2);

      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      //  Now let's create two ledges
      var ledge = platforms.create(150, 400, 'grass_ledge');
      ledge.body.immovable = true;

      ledge = platforms.create(450, 250, 'grass_ledge');
      ledge.body.immovable = true;

      ledge = platforms.create(-250, 150, 'grass_ledge');
      ledge.body.immovable = true;
      
      

      //now I add the stars to the game board
      var star = stars.create(100, 50, 'star');
      star= stars.create(350, 90, 'star');
      star = stars.create(450, 60, 'star');
      star = stars.create(500, 200, 'star');
      star = stars.create(300, 300, 'star');
      star = stars.create(100, 400, 'star');
      star = stars.create(200, 300, 'star');
      star = stars.create(50, 250, 'star');
      star = stars.create(600, 50, 'star');
      star = stars.create(700, 150, 'star');
      star = stars.create(750, 500, 'star');
      star = stars.create(650, 450, 'star')
      
      //now I add the bushes to the game board
      var bush = bushes.create(700,470, 'bush');
      bush = bushes.create(200, 350, 'bush');
      bush = bushes.create(650, 200, 'bush');
      // The player and its settings
      player = this.add.sprite(32, this.world.height - 150, 'dude');

      //  We need to enable physics on the player
      this.physics.arcade.enable(player);

      //  Player physics properties. Give the little guy a slight bounce.
      player.body.bounce.y = 0.2;
      player.body.gravity.y = 300;
      player.body.collideWorldBounds = true;

      //  Our two animations, walking left and right.
      player.animations.add('left', [0, 1, 2, 3], 10, true);
      player.animations.add('right', [5, 6, 7, 8], 10, true);
      
      //adding the level two castle
      castle = this.add.sprite(0, 0, 'castleTwo');
      this.physics.arcade.enable(castle);
      castle.body.immovable = true;
      castle.width = 200;
      castle.height = 200;

      //adding the jukebox
      wheel = this.add.sprite(570, 100, 'wheel');
      this.physics.arcade.enable(wheel);
      wheel.width = 100;
      wheel.height = 150;
       
      //add audio
      music = new Phaser.Sound(this, 'song', 1, true);
      music.play();
       // this.Sound = this.game.add.audio('song');
      //  Our controls.
      cursors = this.input.keyboard.createCursorKeys();
  },
  update: function() {
    //  Collide the player with the platforms
      this.physics.arcade.collide(player, platforms);
      //reached_castle function is triggered when player reaches the castle
      this.physics.arcade.overlap(player, castle, this.reached_castle, null, this);

      //reached_wheel functino is triggered when player reaches the wheel
      this.physics.arcade.overlap(player, wheel, this.reached_wheel, null, this);

      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;

      if (cursors.left.isDown)
      {
          //  Move to the left
          player.body.velocity.x = -150;

          player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
          //  Move to the right
          player.body.velocity.x = 150;

          player.animations.play('right');
      }
      else
      {
          //  Stand still
          player.animations.stop();

          player.frame = 4;
      }
      
      //  Allow the player to jump if they are touching the ground.
      if (cursors.up.isDown && player.body.touching.down)
      {
          player.body.velocity.y = -350;
      }
  },

  reached_castle: function(player, castle) {
      // this.state.start('level_two'); 
      castle.kill();
      this.state.start('Boss_2', true, false);
      music.stop();
  },

  reached_wheel: function(player, wheel){
      wheel.kill();
      window.open('https://lindseys-wheel-of-fortune.herokuapp.com/index.html', '_blank');
  }
};