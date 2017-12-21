
//loading the game assets
Resume.Preload = function(){};

Resume.Preload.prototype = {
  preload: function() {
  	//show loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  //load game shared assets
    this.load.spritesheet('bullets', 'assets/images/rgblaser.png');
    this.load.image('bullet', 'assets/images/red_ball.png');
    this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    this.load.spritesheet('mummy', 'assets/images/mummy.png', 37, 45, 18);
    //level one assets
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('castle', 'assets/images/castle_1.png');
    this.load.image('tree', 'assets/images/tree.png');
    this.load.image('jukebox', 'assets/images/jukebox.png');
    this.load.image('cloud', 'assets/images/cloud.png');
    //level one boss assets
    this.load.image('wall', 'assets/images/wall.jpg');
    
    //level two assets
    this.load.image('night_sky', 'assets/images/space1.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('bush', 'assets/images/bush1.png');
    this.load.image('castleTwo', 'assets/images/castle_two.png');
    this.load.image('wheel', 'assets/images/wof.png');
    this.load.image('grass_ledge', 'assets/images/ledge.png');
    this.load.image('space', 'assets/images/space.png');
    this.load.audio('song', 'assets/audio/suspense.ogg');
     //level 2 boss assets
    this.load.image('wall_2', 'assets/images/wall_2.png');
    this.load.image('castle_floor', 'assets/images/castle_floor.png');
    //level three assets
    this.load.image('underSea', 'assets/images/undersea.png');
    this.load.image('sand', 'assets/images/sand.png');
    this.load.image('crate', 'assets/images/crate.png');
    this.load.image('turtle', 'assets/images/turtle.png');
    this.load.image('boat', 'assets/images/boat.png');
    this.load.image('castle_3', 'assets/images/underwater_castle.png');
    this.load.image('boss', 'assets/images/boss.png');
    //level three boss assets
    this.load.image('wall_4', 'assets/images/wall_4.jpg');
    this.load.image('water', 'assets/images/water.png');
    //level four assets
    this.load.image('mountain', 'assets/images/mountain.png');
    this.load.image('mountain_ledge', 'assets/images/mountain_ledge.png');
    this.load.image('mountain_ledge_1', 'assets/images/mountain_ledge_left.png');
    this.load.image('mountain_ledge_2', 'assets/images/mountain_ledge_tilt.png');
    this.load.image('mountain_background', 'assets/images/mountain_background.jpg');
    this.load.image('mushroom1', 'assets/images/mushroom1.png');
    this.load.image('mushroom2', 'assets/images/mushroom2.png');
    this.load.image('skull', 'assets/images/skull_candle.png');
    this.load.image('mountain_castle', 'assets/images/mountain_castle_2.png')
    //level four boss assets
    this.load.image('level_4_wall', 'assets/images/wall_5.png');
    this.load.image('wasp', 'assets/images/wasp.png');
    //leve five assests
    this.load.image('cloud_platform', 'assets/images/cloud_platform.png');
    this.load.image('cloud_city', 'assets/images/cloud_city.jpg');
    this.load.image('bomb', 'assets/images/bomb_2.png');
    this.load.image('cloud_castle', 'assets/images/cloud_castle_2.png');
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};