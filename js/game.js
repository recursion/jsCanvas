// Create our game object
function Game(canvas){
  // Make sure we can get a context from the canvas object passed in
  if(!canvas.getContext){
    console.log("Error. Unable to get Canvas - Exiting.");
    // TODO something like this?   =>  throw new Error("No canvas given.");
    // or should it we create an empty object since we have to return something?
    // like so => this = {};
  } else {

    console.log("Starting game!");

    // Init variables since we have a canvas
    var running = true;
    var paused = false;
    var fps = 60;
    
    var player = new Mob('player 1', 50, 50, 50, 50 );
    
    var mobs = [];
    mobs.push(new Mob('someEnemy', 150, 150, 25, 25 ));

    var canvas = canvas;
    var ctx = canvas.getContext('2d');
    
    var update = function(){
      //console.log("Updating");
      player.update(canvas);
      for(var mob in mobs){
        mobs[mob].update(canvas);
      }
    };
    var draw = function(){
      //console.log("Drawing");

      // clear the screen
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // then draw any background stuff

      // add the player
      player.draw(ctx);

      // draw each mob
      for(var mob in mobs){
        mobs[mob].draw(ctx);
      }

      // any other object arrays should be drawn here


      // Draw any HUD items here
  
    };
    
    /////////////////////////
    // PUBLIC METHODS
    /////////////////////////
    
    // return the fps setting
    this.fps = (function(){
      return fps;
    })();
   
    this.player = (function(){
      return player;
    })();

    // the main game loop.
    // this is really the only public method (for now)
    this.run = function(){
      //console.log("In Run " + running);
      if(running){
        update();
        draw();
      }
    };
    this.resizeCanvas = function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    }
  }
}

/*********************************************************
 *
 *                KEYBOARD EVENT HANDLERS
 *
 * The following two functions handle onkeydown and onkeyup events
 * we grab the keycode and respond to it if needed.
 * keycodes are unicode 
 ********************************************************/
// For smoother input it makes sense to capture keydown and keyup events
// and set movement accordingly.
function onKeyDownEvent(event){
  var chCode = ('which' in event) ? event.which : event.keyCode;
  switch(chCode){
    case 87:
      console.log("w pressed");
      if(game.player.velY > -game.player.speed){
        game.player.velY--;
      }
      break;
    case 65:
      console.log("a pressed");
      if(game.player.velX > -game.player.speed){
        game.player.velX--;
      }
      break;
    case 83:
      console.log("s pressed");
      if(game.player.velY < game.player.speed){
        game.player.velY++;
      }
      break;
    case 68:
      console.log("d pressed");
      if(game.player.velX < game.player.speed){
        game.player.velX++;
      }
      break;
    case 32:
      console.log("Space pressed");
      game.player.velX = 0;
      game.player.velY = 0;
      break;
    case 81:
      console.log("q pressed");
      break;
    case 69:
      console.log("e pressed");
      break;
    default:
      console.log("Unhandled Key: " + chCode);
  }

}
function onKeyUpEvent(event){
  var chCode = ('which' in event) ? event.which : event.keyCode;
  switch(chCode){
    case 87:
      console.log("w released");
      break;
    case 65:
      console.log("a released");
      break;
    case 83:
      console.log("s released");
      break;
    case 68:
      console.log("d released");
      break;
    case 32:
      console.log("Space released");
      break;
    case 81:
      console.log("q released");
      break;
    case 69:
      console.log("e released");
      break;
    default:
      console.log("Unhandled Key: " + chCode);
  }

}

//  Create a new game 
var game = new Game(document.getElementById('game-canvas'));
if(typeof game.fps === 'undefined'){
  console.log("Did not get a proper game object");
} else {
  game._intervalId = setInterval(game.run, 1000 / game.fps);
}


// Event listener for window resize
window.addEventListener('resize', function(){
  game.resizeCanvas();
}, false);

// Go ahead and do an initial resize.
game.resizeCanvas();
