var Resume = Resume || {};
//title screen
Resume.Boss_4 = function(){};
  var player;
  var cursors;
  var bullet_time = 0;
  var bullet;
  var mummy;
  var bulletTime = 0;
  var firingTimer = 0;
  var bugs;
  var index = 0;
  var data;
  var pos = [];


Resume.Boss_4.prototype = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

      //  A simple castle wall background for our game
    wall = this.add.sprite(0, 0, 'level_4_wall');
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
    var ground = platforms.create(0, this.world.height - 64, 'castle_floor');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
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

    //Boss controls

    var tweenData = { x: 0, y: 0 };
    //  Here we'll tween the values held in the tweenData object to x: 500, y: 300
    tween = this.make.tween(tweenData).to( { x: 100, y: 400 }, 2000);
    //  Set the tween to yoyo so it loops smoothly
    tween.yoyo(true);

    data = tween.generateData(60);

    // console.log(data);

    //  Now create some sprites to shown the tween data in action
    bugs = this.add.group();

    pos.push(new Phaser.Point(500, 70));
    pos.push(new Phaser.Point(300, 100));
    pos.push(new Phaser.Point(32, 0));

    wasp_boss = bugs.create(pos[0].x, pos[0].y, 'wasp');
    this.physics.arcade.enable(bugs);
    // bugs.create(pos[1].x, pos[1].y, 'wasp');
    // bugs.create(pos[2].x, pos[2].y, 'wasp');

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  update: function() {
    //  Collision events
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(bullet, wasp_boss, this.reached_boss, null, this);
    this.physics.arcade.collide(player, treasure, this.reached_treasure, null, this);
     // Reset the mummy's velocity (movement)
  
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

    //  Because the tween data is pre-generated we can apply it however we want:
    //  Directly, by adding to the coordinates
    bugs.getAt(0).x = pos[0].x + data[index].x;
    bugs.getAt(0).y = pos[0].y + data[index].y;

    //  Half one of the values
    bugs.getAt(1).x = pos[1].x + (data[index].x / 2);
    bugs.getAt(1).y = pos[1].y + data[index].y;

    //  Inverse one of the values
    bugs.getAt(2).x = pos[2].x - data[index].x;
    bugs.getAt(2).y = pos[2].y + data[index].y;

    //  You can do all kinds of effects by modifying the tween data,
    //  without having loads of active tweens running.

    //  This just advances the tween data index
    //  It's crude and doesn't take target device speed into account at all, but works as an example
    index++;

    if (index === data.length)
    {
        index = 0;
    }
  },

  reached_boss: function(player, wasp_boss) { 
    this.resetBullet(bullet);
    wasp_boss.kill();
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

    text = this.add.text(0, 0, "- Knowledge -\n here is information about my coding Knowledge ", style);
    text.anchor.set(0.5);
    text.x = Math.floor(text_background.x + text_background.width / 2);
    text.y = Math.floor(text_background.y + text_background.height / 2);

  },
  reached_treasure: function(player, treasure){
    this.state.start('LevelFive', true, false);
  }
};