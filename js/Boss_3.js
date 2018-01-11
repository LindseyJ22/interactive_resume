var Resume = Resume || {};
//title screen
Resume.Boss_3 = function(){};
  var player;
  var cursors;
  var bullet_time = 0;
  var bullet;
  var mummy;
  var bulletTime = 0;
  var firingTimer = 0;
  var text;

Resume.Boss_3.prototype = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);


      //  A simple castle wall background for our game
    wall = this.add.sprite(0, 0, 'wall_4');
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
    //adding the treasure chest
    treasure = this.add.sprite(670, 450, 'treasure');
    treasure.scale.setTo(.15, .15);
    this.physics.arcade.enable(treasure);
    //add the boss
    shark = this.add.sprite(660, 450, 'shark');
    shark.width = 250;
    shark.height = 100;
    shark.scale.x *= -1;
    shark.enableBody = true;
    // shark.collideWorldBounds = true;
    this.physics.arcade.enable(shark);
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

    //Boss controls
    

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  update: function() {
    shark.x -= .004;
    if (shark.x < shark.width) {
      shark.x = this.world.width;
    }
    //  Collision events
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(bullet, shark, this.reached_boss, null, this);
    this.physics.arcade.collide(player, treasure, this.reached_treasure, null, this);
    

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

    text = this.add.text(0, 0, "- Education -\n\n New York Code and Design Acadamy\n Certified in full stack web development\n2017-2018\n\nUniversity of Utah \n Entertainment arts and engineering\n 2012-2014\n\n Salt Lake Community College \n General Education \n 2010-2012 ", style);
    text.anchor.set(0.5);
    text.x = Math.floor(text_background.x + text_background.width / 2);
    text.y = Math.floor(text_background.y + text_background.height / 2);

  },
  reached_treasure: function(player, treasure){
    this.state.start('LevelFour', true, false);
  }
  //create winning text

};