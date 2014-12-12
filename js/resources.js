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
  var updateCount = 0;
  var drawCount = 0;
}

Mob.prototype = {
  constructor: Mob,
  update: function(){
    //console.log('Updating ' + this.name);
    this.updateCount++;
    this.loc.x += this.velX;
    this.loc.y += this.velY;
  },
  draw: function(ctx){
    //console.log('Drawing ' + this.name);
    ctx.fillStyle = "#00FFF0";
    ctx.fillRect(this.loc.x,this.loc.y, this.width, this.height);
    this.drawCount++;
  },
};
