var player_sprite_sheet;
var player_walk;
var player_stand;
var mouse_moved = false;
var touch_started = false;

var circle1;
var circle2;
var player_sprite;

var startX;
var startY;

var endX;
var endY;
var kidbright;
var wheel;
var wheel_sprite;
var wheel_sprite2;


function preload() {
  console.log('preloaded');
  player_sprite_sheet = loadSpriteSheet('images/player_spritesheet.png',
    player_frames);
  player_walk = loadAnimation(player_sprite_sheet);

  // An animation with a single frame for standing
  player_stand = loadAnimation(new SpriteSheet('images/player_spritesheet.png',
    [
      {
        'name': 'player_stand',
        'frame': {'x': 284, 'y': 95, 'width': 70, 'height': 94},
      }]));

  circle1 = loadAnimation('images/wheel_0001.png',
    'images/wheel_0002.png',
    'images/wheel_0003.png',
    'images/wheel_0004.png',
  );
  circle1.looping = true;

  circle2 = loadAnimation('images/wheel_0001.png',
    'images/wheel_0002.png',
    'images/wheel_0003.png',
    'images/wheel_0004.png',
  );
  circle2.looping = true;
}

function setup() {
  console.log('setup');
  createCanvas(800, 600);

  kidbright = loadImage('assets/kidbright.png');  // Load the image
  wheel = loadImage('assets/wheel.png');  // Load the image

  player_sprite = createSprite(100, 284, 70, 94);
  player_sprite.addAnimation('walk', player_walk);
  player_sprite.addAnimation('stand', player_stand);

  wheel_sprite = createSprite(100, 100);
  wheel_sprite.addAnimation('normal', circle1);

  wheel_sprite2 = createSprite(100, 100);
  wheel_sprite2.addAnimation('normal', circle2);

}

function draw() {
  clear();
  drawSprites();
  wheel_sprite.position.x = player_sprite.position.x + 10,
  wheel_sprite.position.y = 100 + 80;

  wheel_sprite2.position.x = player_sprite.position.x + 140,
  wheel_sprite2.position.y = 100 + 80;

  image(kidbright, player_sprite.position.x, 100, kidbright.width / 2,
    kidbright.height / 2);

  var eventX;
  if (isTouch()) {
    eventX = touchX;
  } else {
    eventX = mouseX;
  }

  text(`hello x=${player_sprite.position.x}`, 10, .4 * height);

}

function touchStarted() {
  touch_started = true;
}

function mouseMoved() {
  mouse_moved = true;
}

function isTouch() {
  // player_sprite.position.x++
  return touch_started && !mouse_moved;
}

function mousePressed() {
  xPosition += 10;
  if(xPosition > 800) {
    xPosition = 0;
  }
  microgear.publish("/gearname/espRobot/$/command", xPosition, true);
  // player_sprite.position.x += 5;
  //create a sprite
  var splat = createSprite(mouseX, mouseY);
  splat.addAnimation('normal', 'images/asterisk_explode0001.png',
    'images/asterisk_explode0011.png');

  //set a self destruction timer (life)
  splat.life = 10;
}

function mouseReleased() {
  // console.log('mouse released.')
}

function touchStarted() {
  player_sprite.position.x++;
  startX = mouseX;
  startY = mouseY;

  var splat = createSprite(startX, startY);
  splat.addAnimation('normal', 'images/asterisk_explode0001.png',
    'images/asterisk_explode0011.png');

  //set a self destruction timer (life)
  splat.life = 10;
  return false;
}

function touchEnded() {
  endX = mouseX;
  endY = mouseY;
  return false;

}


