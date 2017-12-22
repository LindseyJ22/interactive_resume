var Resume = Resume || {};
//title screen
Resume.FinalScene = function(){};
  var player;
  var cursors;
  

Resume.FinalScene.prototype = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

      //  A simple castle wall background for our game
    background = this.add.sprite(0, 0, 'cloud_city');
    background.scale.setTo(2.3, 2.3);
      
      
    //  The platforms group contains the ground 
    platforms = this.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
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
    //add cartoon me
    me = this.add.sprite(600, 420, 'me');
    me.scale.setTo(.3, .3);
    this.physics.arcade.enable(me);
    // The player and its settings
    player = this.add.sprite(32, this.world.height - 150, 'dude');
    
    // //  We need to enable physics on the player
    this.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    text_background = this.add.sprite(170, 0, 'night_sky');
    text_background.inputEnabled = true;
    text_background.scale.setTo(.6, .6);
  
    var style = { font: "20px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: text_background.width, align: "center", backgroundColor: "#ffff00" };

    text = this.add.text(0, 0, "Thankyou for saving me from the unemployment monsters!\n \n- Contact Info -\n Phone: 801-635-0453\n Email: redhook@hotmail.com ", style);
    text.anchor.set(0.5);
    text.x = Math.floor(text_background.x + text_background.width / 2);
    text.y = Math.floor(text_background.y + text_background.height / 2);

    cursors = this.input.keyboard.createCursorKeys();

  },
  update: function() {
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(player, me, this.reached_me, null, this);
    //player controls
    //player controls
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
  reached_me: function(player, bomb){
    window.open('https://noob-overflow.herokuapp.com/', '_blank');
  } 

};



