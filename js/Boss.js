var Resume = Resume || {};

//title screen
Resume.Boss = function(){};
  var player;
  var cursors;
  var bullet_time = 0;
  var bullet;
  var mummy;
  var resetBullet;
  var bulletTime = 0;
  var firingTimer = 0;
Resume.Boss.prototype = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple castle wall background for our game
    wall = this.add.sprite(0, 0, 'wall');
    wall.scale.setTo(1.56, 1.56);

     //create bullets group
    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 1);
    bullets.setAll('anchor.y', 0.2);
    bullets.setAll('outOfBoundsKill', true);
      
      
    //  The platforms group contains the ground 
    platforms = this.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, this.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    
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

    //  Our controls.
    mummy = this.add.sprite(700, 490, 'mummy');
    mummy.enableBody = true;
    // mummy.collideWorldBounds = true;
    this.physics.arcade.enable(mummy);
    //I need to flip the sprite in a different horizontal direction

    mummy.scale.x *= -1;
  //  Here we add a new animation called 'walk'
  //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    walk = mummy.animations.add('walk');

  //  And this starts the animation playing by using its key ("walk")
  //  30 is the frame rate (30fps)
  //  true means it will loop when it finishes
    mummy.animations.play('walk', 30, true);

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  update: function() {
    //  Collide the player with the platforms
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(bullet, mummy, this.reached_boss, null, this);

    // this.physics.arcade.collide(mummy, platforms);
    // this.physics.arcade.overlap(player, castle, this.reached_castle, null, this);

     // Reset the players velocity (movement)
     mummy.x -= .004;

    if (mummy.x < -mummy.width) {
      mummy.x = this.world.width;
    }


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
     //  Firing?
      if (fireButton.isDown) {
        this.fireBullet();
      }
  },

  reached_boss: function(player, mummy) {
    // this.state.start('level_two'); 
    this.resetBullet(bullet);
    mummy.kill();
    alert('reached');
    this.state.start('AboutMe', true, false);
  },

  resetBullet: function(bullet) {
    //destroy the bullet
    bullet.kill();
  },

  fireBullet: function() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
      bullet = bullets.getFirstExists(false);

      if (bullet) {
          //  And fire it
          bullet.reset(player.x, player.y + 8);
          bullet.body.velocity.x = 300;
          bulletTime = this.time.now + 200;
      }
    }
  }
};