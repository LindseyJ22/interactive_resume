var Resume = Resume || {};

//title screen
Resume.Game = function(){};
  var player;
  var platforms;
  var cursors;
  var castle;
  var tree;
  var jukebox;
  var cloud;
  var bullet_time = 0;
  var bullet;
 
Resume.Game.prototype = {
  create: function() {
    //set world dimensions
    // this.physics.startSystem(Phaser.Physics.ARCADE);

      //  A simple background for our game
      this.add.sprite(0, 0, 'sky');
      
      // the trees group will create the background trees for design
      trees = this.add.group();

      //the cloud group will create clouds in the sky
      clouds = this.add.group();
      
      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = this.add.group();

      //  We will enable physics for any object that is created in this group
      platforms.enableBody = true;

      // Here we create the ground.
      var ground = platforms.create(0, this.world.height - 64, 'grass_platform');

      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(2, .3);

      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      //  Now let's create two ledges
      var ledge = platforms.create(400, 400, 'grass_platform');
      ledge.body.immovable = true;
      ledge.scale.setTo(1, .2);

      ledge = platforms.create(-150, 250, 'grass_platform');
      ledge.body.immovable = true;
      ledge.scale.setTo(1, .2);
      
      //now I add the trees to the game board
      var ground_tree = trees.create(400,450, 'tree');
      ground_tree.width = 100;
      ground_tree.height = 100;

      var ground_tree_left = trees.create(100, 450, 'tree');
      ground_tree_left.width = 100;
      ground_tree_left.height = 100;

      var platform_tree = trees.create(500, 310, 'tree');
      platform_tree.width = 100;
      platform_tree.height = 100;

      //now I add the clouds to the game board
      var cloud_left = clouds.create(100, 50, 'cloud');
      cloud_left.width = 150;
      cloud_left.height = 100;

      var cloud_middle = clouds.create(350, 90, 'cloud');
      cloud_middle.width = 150;
      cloud_middle.height = 100;

      var cloud_right = clouds.create(450, 60, 'cloud');
      cloud_right.width = 150;
      cloud_right.height = 100;
      
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
      
      //adding the level one castle
      castle = this.add.sprite(20, 160, 'castle');
      this.physics.arcade.enable(castle);
      castle.body.immovable = true;
      castle.width = 100;
      castle.height = 100;

      //adding the jukebox
      jukebox = this.add.sprite(650, 310, 'jukebox');
      this.physics.arcade.enable(jukebox);
      jukebox.width = 100;
      jukebox.height = 100;
       
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

      //reached_jukebox functino is triggered when player reaches the jukebox
      this.physics.arcade.overlap(player, jukebox, this.reached_jukebox, null, this);

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
      this.state.start('Boss', true, false);
      music.stop();
  },

  reached_jukebox: function(player, jukebox){
      jukebox.kill();
      window.open('https://lindseys-juke-box.herokuapp.com/index.html', '_blank');
  }
};