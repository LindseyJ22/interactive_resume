var Resume = Resume || {};
//title screen
Resume.Boss_5 = function(){};
  var player;
  var cursors;
  var bullet_time = 0;
  var bullet;
  var mummy;
  var bulletTime = 0;
  var firingTimer = 0;

Resume.Boss_5.prototype = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

      //  A simple castle wall background for our game
    background = this.add.sprite(0, 0, 'cloud_city');
    background.scale.setTo(2.3, 2.3);
    // wall.scale.setTo(1, 1);

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

    cloud_boss = this.add.sprite(400, 0, 'cloud_boss');
    this.physics.arcade.enable(cloud_boss);
    cloud_boss.scale.setTo(.1, .1);
    cloud_boss.body.collideWorldBounds = true;
    cloud_boss.body.bounce.set(1);
    cloud_boss.body.gravity.x = 200;
    cloud_boss.body.gravity.y = 200;

     //adding the treasure chest
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

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  update: function() {
    //  Collision events
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(bullet, cloud_boss, this.reached_boss, null, this);
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

  reached_boss: function(player, cloud_boss) {
    cloud_boss.kill();
    this.showtext();
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

    text = this.add.text(0, 0, "- Goals -\n I would like to work for a company where I can continue to progress both in education and posistion. \nI want a job that challanges me and where I can be proud of my work at the end of the day. ", style);
    text.anchor.set(0.5);
    text.x = Math.floor(text_background.x + text_background.width / 2);
    text.y = Math.floor(text_background.y + text_background.height / 2);

  },
  reached_treasure: function(player, treasure){
    this.state.start('FinalScene', true, false);
  }
};