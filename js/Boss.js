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
  var ball;
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
    
    ball = this.add.sprite(400, 0, 'spiked_boss');
    this.physics.arcade.enable(ball);
    ball.scale.setTo(.7, .7);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.body.gravity.y = 200;
    //add the treasure chest
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

    //  Our controls.

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  update: function() {
    //  Collide the player with the platforms
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(ball, platforms);
    this.physics.arcade.collide(bullet, ball, this.reached_boss, null, this);
    this.physics.arcade.collide(player, treasure, this.reached_treasure, null, this);

    // this.physics.arcade.collide(mummy, platforms);
    // this.physics.arcade.overlap(player, castle, this.reached_castle, null, this);

     // Reset the players velocity (movement)

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

  reached_boss: function(player, ball) {
    // this.state.start('level_two'); 
    this.resetBullet(bullet);
    ball.kill();
    this.showtext();
    // this.state.start('AboutMe', true, false);
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
          bullet.reset(player.x + 30, player.y + 20);
          bullet.body.velocity.x = 300;
          bulletTime = this.time.now + 700;
      }
    }
  },
  showtext: function(){
    text_background = this.add.sprite(200, 0, 'night_sky');
    text_background.inputEnabled = true;
    text_background.scale.setTo(.6, .6);
  
    var style = { font: "20px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: text_background.width, align: "center", backgroundColor: "#ffff00" };

    text = this.add.text(0, 0, "- About Me -\n Committed and motivated web developer with exceptional team working and leadership skills. Proficient at learning new skills with a passion for arts and entertainment.  ", style);
    text.anchor.set(0.5);
    text.x = Math.floor(text_background.x + text_background.width / 2);
    text.y = Math.floor(text_background.y + text_background.height / 2);

  },
  reached_treasure: function(player, treasure){
    this.state.start('LevelTwo', true, false);
  }
};