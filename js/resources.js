/******************************************************
 *
 *              RESOURCES.JS
 *
 *  This file contains javascript resources for the game
 *  such as game objects like Mobs etc..
 *
 *****************************************************/
function Mob(name, xCoord, yCoord, width, height){
  // set properties 
  this.name = name;
  this.width = width;
  this.height = height;
  this.speed = 5;

  // Current position
  this.loc = {};
  this.loc.x = xCoord;
  this.loc.y = yCoord;

  // Current heading
  this.velX = 0;
  this.velY = 0;

  // Set up some local variables
  
}

/////////////////////////////////////////////////////////////////////
//        We've now come to the part in the show where
//        we need to make a decision about how to handle the
//        differences between player and mob
//
//        Mobs will have some sort of random movement algo that the player doesnt use
//        so we need to decide how to build that out.
//
/////////////////////////////////////////////////////////////////////
Mob.prototype = {
  constructor: Mob,
  update: function(canvas){

    ///////////////////////////////////////////////////////////////////
    // Edge Detection
    // Currently this just stops the object from going off the screen
    // but we may want to implement screen wrapping 
    // or some sort of map the player traverses here later.
    ///////////////////////////////////////////////////////////////////

    // Check X coordinate.
    if(this.loc.x + this.width + this.velX >= canvas.width){
      this.loc.x = canvas.width - this.width;
    } else if(this.loc.x + this.velX <= 0){
      this.loc.x = 0;
    } else {
      this.loc.x += this.velX;
    }
    // Check Y coordinate.
    if(this.loc.y + this.height + this.velY >= canvas.height){
      this.loc.y = canvas.height - this.height;
    } else if(this.loc.y + this.velY <= 0){
      this.loc.y = 0;
    } else {
      this.loc.y += this.velY;
    }
  },
  draw: function(ctx){
    //console.log('Drawing ' + this.name);
    ctx.fillStyle = "#00FFF0";
    ctx.fillRect(this.loc.x,this.loc.y, this.width, this.height);
  },
};
