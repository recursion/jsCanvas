// Create our game object
var Game = {};
Game.running = false;
Game.fps = 60;
// TODO this is all super wonky in order to just get something running
// but will most definitely need refinment in order to allow for 
// multiple mobs and multiple types of mobs (arrays of objects)
Game.mobs = [];

////////////////////////////////
//
// game methods
/////////////////////////////////
Game.update = function() {
  //console.log("In update");
};

Game.draw = function(){
  //console.log("In draw");
  // clear the screen
  Game.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  Game.ctx.fillRect(0,0, Game.canvas.width, Game.canvas.height);
  for(var mob in Game.mobs){
    Game.mobs[mob].draw(Game.ctx);
  }
};

Game.run = function(){
  var loops = 0, skipTicks = 1000 / Game.fps, maxFrameSkip = 10, nextGameTick = (new Date()).getTime();

  return function() {
    loops = 0;

    while ((new Date()).getTime() > nextGameTick && loops < maxFrameSkip) {
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }

    Game.draw();
  };
};


// Create a new mob
var Mob = {};
Mob.pos = {x: 0, y: 0};
Mob.width = 55;
Mob.height = 50;
Mob.fillStyle = 'rgba(0, 0, 200, 0.5)';

// each mob draws itself
Mob.draw = function(canvasContext){
  canvasContext.fillStyle = this.fillStyle;
  canvasContext.fillRect(this.pos.x, this.pos.y, this.width, this.height);
}
// Push that text mob object onto our stack of mobs.
Game.mobs.push(Mob);



////////////////////////////////////
// Keyboard event handler
function onKeyPressEvent(event){
   var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
   /*
    * w = 119
    * a = 97
    * s = 115
    * d = 100
    * space = 32
    * q = 113 
    * e = 101
    */

  switch(chCode){
    case 119:
      console.log("w");
      if(Game.mobs[0].pos.y > 1){
        Game.mobs[0].pos.y--;
      }
      break;
    case 97:
      console.log("a");
      if(Game.mobs[0].pos.x > 1){
        Game.mobs[0].pos.x--;
      }
      break;
    case 115:
      console.log("s");
      if(Game.mobs[0].pos.y < Game.canvas.height-1){
        Game.mobs[0].pos.y++;
      }
      break;
    case 100:
      console.log("d");
      if(Game.mobs[0].pos.x < Game.canvas.width-1){
        Game.mobs[0].pos.x++;
      }
      break;
    case 32:
      console.log("Space");
      break;
    case 113:
      // TODO: This shouldnt actually be the q key.. but for now
      // as a control to break out of the game loop.. it will do.
      console.log("q");
      running = false;
      break;
    case 101:
      console.log("e");
      break;
    default:
      console.log("Unhandled Key: " + chCode);
  }

}

// Attempt to get the game canvas
Game.canvas = document.getElementById('game');
if(Game.canvas.getContext){
  console.log("Starting game!");
  Game.ctx = Game.canvas.getContext('2d');
  Game._intervalId = setInterval(Game.run(), 1000 / Game.fps);
} else {
  console.log("Error. Unable to get Canvas - Exiting.");
}


