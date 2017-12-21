var Resume = Resume || {};

//title screen
Resume.Knowledge = function(){};

Resume.Knowledge.prototype = {

  create: function() {
    var text = this.createText(100, 'shadow 5');
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('LevelFive');
    }
  },

  createText: function(y) {
    var aboutMe = "- Knowledge - ";
    var stuff = "here is some facts\n about my knowledge of things and stuff";
    var about = this.add.text(this.world.centerX, y, aboutMe);
    var text = this.add.text(this.world.centerX, 200, stuff);
    text.anchor.set(0.5);
    text.align = 'center';
    about.anchor.set(0.5);
    about.align = 'center';


    about.font = 'Arial Black';
    about.fontSize = 50;
    about.fontWeight = 'bold';
    about.fill = '#ff00ff';
    //  Font style
    text.font = 'Arial Black';
    text.fontSize = 30;
    text.fontWeight = 'bold';
    text.fill = '#ff00ff';

    return text;

  }
};