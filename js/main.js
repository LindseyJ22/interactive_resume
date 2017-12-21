 var Resume = Resume || {};

Resume.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
//These will add and give us access to all of the game states (levels) 
Resume.game.state.add('Boot', Resume.Boot);
Resume.game.state.add('Preload', Resume.Preload);
Resume.game.state.add('MainMenu', Resume.MainMenu);
Resume.game.state.add('Game', Resume.Game);
Resume.game.state.add('Boss', Resume.Boss);
Resume.game.state.add('AboutMe', Resume.AboutMe);
Resume.game.state.add('LevelTwo', Resume.LevelTwo);
Resume.game.state.add('Boss_2', Resume.Boss_2);
Resume.game.state.add('WorkExperience', Resume.WorkExperience);
Resume.game.state.add('LevelThree', Resume.LevelThree);
Resume.game.state.add('Boss_3', Resume.Boss_3);
Resume.game.state.add('Education', Resume.Education);
Resume.game.state.add('LevelFour', Resume.LevelFour);
Resume.game.state.add('Boss_4', Resume.Boss_4);
Resume.game.state.add('Knowledge', Resume.Knowledge);
Resume.game.state.add('LevelFive', Resume.LevelFive);
Resume.game.state.add('Boss_5', Resume.Boss_5);
Resume.game.state.add('Goals', Resume.Goals);
Resume.game.state.add('FinalScene', Resume.FinalScene);


Resume.game.state.start('Boot');