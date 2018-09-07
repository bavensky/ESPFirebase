// var player_sprite_sheet;
// var player_walk;
// var player_stand;
// var mouse_moved = false;
// var touch_started = false;

// function preload() {
//   player_sprite_sheet = loadSpriteSheet('images/player_spritesheet.png',
//     player_frames);
//   player_walk = loadAnimation(player_sprite_sheet);

//   // An animation with a single frame for standing
//   player_stand = loadAnimation(new SpriteSheet('images/player_spritesheet.png',
//     [
//       {
//         'name': 'player_stand',
//         'frame': {'x': 284, 'y': 95, 'width': 70, 'height': 94},
//       }]));

// }

// var startX;
// var startY;

// var endX;
// var endY;
// var kidbright;
// var wheels = [];

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   kidbright = loadImage('assets/kidbright.png');  // Load the image
//   wheel = loadImage('assets/wheel.png');  // Load the image

//   player_sprite = createSprite(100, 284, 70, 94);
//   player_sprite.addAnimation('walk', player_walk);
//   player_sprite.addAnimation('stand', player_stand);
// }

// function draw() {
//   clear();

//   image(kidbright, player_sprite.position.x, 100, kidbright.width / 2,
//     kidbright.height / 2);

//   var eventX;
//   if (isTouch()) {
//     eventX = touchX;
//   } else {
//     eventX = mouseX;
//   }

//   text(`hello x=${player_sprite.position.x}`, 10, .4 * height);
//   drawSprites();
// }

// function touchStarted() {
//   touch_started = true;
// }

// function mouseMoved() {
//   mouse_moved = true;
// }

// function isTouch() {
//   // player_sprite.position.x++
//   return touch_started && !mouse_moved;
// }

// function mousePressed() {
//   microgear.publish("/espRobot","ON");
//   player_sprite.position.x += 50;
//   //create a sprite
//   var splat = createSprite(mouseX, mouseY);
//   splat.addAnimation('normal', 'images/asterisk_explode0001.png',
//     'images/asterisk_explode0011.png');

//   //set a self destruction timer (life)
//   splat.life = 10;
// }

// function mouseReleased() {
//   // console.log('mouse released.')
// }

// function touchStarted() {
//   player_sprite.position.x++;
//   startX = mouseX;
//   startY = mouseY;

//   var splat = createSprite(startX, startY);
//   splat.addAnimation('normal', 'images/asterisk_explode0001.png',
//     'images/asterisk_explode0011.png');

//   //set a self destruction timer (life)
//   splat.life = 10;
//   return false;
// }

// function touchEnded() {
//   endX = mouseX;
//   endY = mouseY;
//   return false;
// }


//Accessing and deleting sprites
//click to create new sprites

var GRAVITY = 0.2;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255, 255, 255);

  fill(0);
  textAlign(CENTER);
  text('Click to create a new sprite', width/2, height-20);

  //the best way to organize sprites is to use a custom group (see Group class)
  //however, all sprites are automatically added to a default group allSprites
  //that you can access like a normal array of objects

  for(var i=0; i<allSprites.length; i++)
  {
    var mySprite = allSprites[i];

    //adding a speed at 90 degrees (down)
    //equivalent to: mySprite.velocity.y += GRAVITY;
    mySprite.addSpeed(GRAVITY, 90);

    //even if they are out of the canvas, sprites keep getting updated
    //consuming precious memory
    //use Sprite.remove() to remove a sprite from the sketch
    if(mySprite.position.y > height + 100)
      mySprite.remove();
  }

  if(frameCount%10 == 0)
    print('Sprite in the scene: ' +allSprites.length);

  //draw the sprites
  drawSprites();
}

//every mouse press
function mousePressed() {
  microgear.publish("/gearname/espRobot/$/command","ON");
  //I create a sprite at mouse position
  var newSprite = createSprite(mouseX, mouseY);

  //assign an animation
  newSprite.addAnimation('normal', 'assets/asterisk.png', 'assets/triangle.png', 'assets/square.png', 'assets/cloud.png', 'assets/star.png', 'assets/mess.png', 'assets/monster.png');

  //and set it to a random frame
  newSprite.animation.stop();
  var f = round(random(0, newSprite.animation.getLastFrame()));
  newSprite.animation.changeFrame(f);
}
