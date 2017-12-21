var Resume = Resume || {};

//title screen
Resume.LevelThree = function(){};
  var player;
  var platforms;
  var cursors;
  var castle;
  var cloud;
 
Resume.LevelThree.prototype = {
  create: function() {
    //set world dimensions
    this.physics.startSystem(Phaser.Physics.ARCADE);

      //  A simple background for our game
      this.add.sprite(0, 0, 'underSea');
      
       //The platforms group contains the ground and the 2 ledges we can jump on
      platforms = this.add.group();

      //  We will enable physics for any object that is created in this group
      platforms.enableBody = true;

      // Here we create the ground.
      var ground = platforms.create(0, this.world.height - 24, 'sand');

      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(2, 2);

      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      //  Now let's create the ledges
      
      var ledge = platforms.create(150, 400, 'crate');
      ledge.body.immovable = true;
      ledge.width = 150;
      ledge.height = 150;

      ledge = platforms.create(520, 250, 'crate');
      ledge.body.immovable = true;
      ledge.width = 200;
      ledge.height = 200;

      ledge = platforms.create(250, 150, 'crate');
      ledge.body.immovable = true;
      //add the turtle that carries the castle
      turtle = this.add.sprite(210, 100, 'turtle');
      turtle.width = 200;
      turtle.height = 200;
      turtle.scale.x *= -1;
     
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
      
      //adding the level three castle
      castle = this.add.sprite(50, 60, 'castle_3');
      this.physics.arcade.enable(castle);
      castle.body.immovable = true;
      castle.width = 120;
      castle.height = 120;

      //adding the boat
      boat = this.add.sprite(600, 150, 'boat');
      this.physics.arcade.enable(boat);
      boat.width = 100;
      boat.height = 100;
       
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

      //reached_boat function is triggered when player reaches the boat
      this.physics.arcade.overlap(player, boat, this.reached_boat, null, this);

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
      this.state.start('Boss_3', true, false);
      music.stop();
  },

  reached_boat: function(player, boat){
      boat.kill();
      window.open('https://warm-castle-99627.herokuapp.com/users/sign_in', '_blank');
  }
};