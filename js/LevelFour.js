var Resume = Resume || {};

//title screen
Resume.LevelFour = function(){};
  var player;
  var platforms;
  var cursors;
  var castle;
  var cloud;
 
Resume.LevelFour.prototype = {
  create: function() {
    //set world dimensions
    this.physics.startSystem(Phaser.Physics.ARCADE);
      background = this.add.sprite(0, 0, 'mountain_background');
      background.scale.setTo(2.3, 2.3);
      //  A simple background for our game
     var mountain =  this.add.sprite(0, 0, 'mountain');
     mountain.scale.setTo(1.3, 1.3);
      
      //the mushroom group will create mushrooms on the ground
      mushrooms = this.add.group();

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
      
      var ledge = platforms.create(300, 200, 'mountain_ledge_1');
      ledge.body.immovable = true;
      ledge.width = 150;
      ledge.height = 150;


      ledge = platforms.create(400, 450, 'mountain_ledge_1');
      ledge.body.immovable = true;
      ledge.width = 150;
      ledge.height = 150;

      ledge = platforms.create(120, 80, 'mountain_ledge_1');
      ledge.body.immovable = true;
      ledge.width = 250;
      ledge.height = 250;

      ledge = platforms.create(520, 350, 'mountain_ledge_1');
      ledge.body.immovable = true;
      ledge.width = 250;
      ledge.height = 250;

      var mushroom = mushrooms.create(50, 500, 'mushroom1');
      mushroom = mushrooms.create(20, 510, 'mushroom2');
      mushroom = mushrooms.create(120, 490, 'mushroom2');
      mushroom = mushrooms.create(710, 530, 'mushroom2');
      mushroom = mushrooms.create(740, 540, 'mushroom1');
      //add the skull to trigger hexinomicon project
      skull = this.add.sprite(630, 270, 'skull');
      skull.scale.setTo(.25, .25);
      this.physics.arcade.enable(skull);
      // //add the level four castle
      castle = this.add.sprite(120, -10, 'mountain_castle');
      castle.width = 150;
      castle.height = 150;
      this.physics.arcade.enable(castle);
    
     
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

      //reached_skull function is triggered when player reaches the skull
      this.physics.arcade.overlap(player, skull, this.reached_skull, null, this);

      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;

      if (cursors.left.isDown) {
          //  Move to the left
          player.body.velocity.x = -150;
          player.animations.play('left');
      }
      else if (cursors.right.isDown) {
           //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
      }
      else {
          //  Stand still
        player.animations.stop();
        player.frame = 4;
      }
      
      //  Allow the player to jump if they are touching the ground.
      if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
      }
  },

  reached_castle: function(player, castle) {
      // this.state.start('level_two'); 
    castle.kill();
    this.state.start('Boss_4', true, false);
    music.stop();
  },

  reached_skull: function(player, skull){
    skull.kill();
    window.open('https://thawing-shore-30846.herokuapp.com/', '_blank');

  }
};