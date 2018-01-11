var Resume = Resume || {};
//title screen
Resume.Boss_2 = function(){};
  var player;
  var cursors;
  var platforms;
  var bullet_time = 0;
  var bullet;
  var mummy;
  var bulletTime = 0;
  var firingTimer = 0;

Resume.Boss_2.prototype = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

      //  A simple castle wall background for our game
    wall = this.add.sprite(0, 0, 'wall_2');
    wall.scale.setTo(1, 1.2);

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
    var ground = platforms.create(0, this.world.height - 64, 'castle_floor');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    //add treasure
    treasure = this.add.sprite(670, 450, 'treasure');
    treasure.scale.setTo(.15, .15);
    this.physics.arcade.enable(treasure);
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
    //  add the boss
    mummy = this.add.sprite(660, 455, 'mummy');
    mummy.enableBody = true;
    // mummy.collideWorldBounds = true;
    this.physics.arcade.enable(mummy);
    //I need to flip the sprite in a different horizontal direction
    mummy.scale.setTo(1.8, 1.8);
    mummy.scale.x *= -1;
    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    walk = mummy.animations.add('walk');
    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    mummy.animations.play('walk', 30, true);
    //add any keyboard or curser events
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  update: function() {
    //  Collision events
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(bullet, mummy, this.reached_boss, null, this);
    this.physics.arcade.collide(player, treasure, this.reached_treasure, null, this);
     // Reset the boss' velocity (movement)
    mummy.x -= .004;
    if (mummy.x < mummy.width) {
      mummy.x = this.world.width;
    }
    //controls for the player
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
    // alert('reached');
    this.showtext();
  },

  resetBullet: function(bullet) {
    //destroy the bullet
    bullet.kill();
  },//ends resetBullet function

  fireBullet: function() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
      bullet = bullets.getFirstExists(false);
      if (bullet) {
          //  And fire it
        bullet.reset(player.x + 30, player.y + 20);
        bullet.body.velocity.x = 300;
        bulletTime = this.time.now + 700;
      }//ends if (bullet)
    }//ends if (this.,time.now > bulletTime)
  },//ends fireBullet function
  showtext: function(){
    text_background = this.add.sprite(170, 0, 'night_sky');
    text_background.inputEnabled = true;
    text_background.scale.setTo(.6, .6);
  
    var style = { font: "20px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: text_background.width, align: "center", backgroundColor: "#ffff00" };

    text = this.add.text(0, 0, "- Work Experience -\n Night shift lead/supervisor at Red Wing Shoe Co.\nJun 2006 – Aug 2016\n-delegated work tasks for a shift of 15-20 people\n- machine safety checking\n- managed and stored 10's of thousands of units of inventory\n- successfully kept moral high and promoted healthy relationships amongst employees\n- successfully managed multiple teams\n- created new and innovative systems to keep track of inventory\n- quick to learn all new technology that was introduced ", style);
    text.anchor.set(0.5);
    text.x = Math.floor(text_background.x + text_background.width / 2);
    text.y = Math.floor(text_background.y + text_background.height / 2);

  },
  reached_treasure: function(player, treasure){
    this.state.start('LevelThree', true, false);
  }
};