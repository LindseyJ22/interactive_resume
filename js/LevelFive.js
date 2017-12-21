var Resume = Resume || {};

//title screen
Resume.LevelFive = function(){};
  var player;
  var platforms;
  var cursors;
  var castle;
  var cloud;
 
Resume.LevelFive.prototype = {
  create: function() {
    //set world dimensions
    this.physics.startSystem(Phaser.Physics.ARCADE);
    background = this.add.sprite(0, 0, 'cloud_city');
    background.scale.setTo(2.3, 2.3);

     //The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    //  Now let's create the ledges
    
    var ledge = platforms.create(-20, 550, 'cloud_platform');
    ledge.body.immovable = true;
    // ledge.width = 150;
    // ledge.height = 150;
    ledge = platforms.create(100, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(180, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(260, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(340, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(420, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(500, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(580, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(660, 550, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(400, 450, 'cloud_platform');
    ledge.body.immovable = true;
    
    ledge = platforms.create(300, 100, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(200, 100, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(100, 100, 'cloud_platform');
    ledge.body.immovable = true;

    ledge = platforms.create(500, 200, 'cloud_platform');
    ledge.body.immovable = true;
    ledge.width = 300;
    ledge.height = 100

    ledge = platforms.create(80, 300, 'cloud_platform');
    ledge.body.immovable = true;
    ledge.width = 250;
    ledge.height = 100;

    ledge = platforms.create(470, 350, 'cloud_platform');
    ledge.body.immovable = true;
    // ledge.width = 250;
    // ledge.height = 250;

    //add the bomb to trigger blogageddon project
    bomb = this.add.sprite(130, 220, 'bomb');
    bomb.width = 100;
    bomb.height = 100;
    this.physics.arcade.enable(bomb);

    // // //add the level five castle
    castle = this.add.sprite(580, 15, 'cloud_castle');
    castle.width = 300;
    castle.height = 300;
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

      //reached_bomb function is triggered when player reaches the bomb
      this.physics.arcade.overlap(player, bomb, this.reached_bomb, null, this);

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
    this.state.start('Boss_5', true, false);
    music.stop();
  },

  reached_bomb: function(player, bomb){
    bomb.kill();
    window.open('https://blogageddon.herokuapp.com/sessions/new', '_blank');
  }
};