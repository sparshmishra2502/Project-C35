var bg,balloonImage,balloon;
var database,position;

function preload(){
   bg = loadImage("cityImage.png");
   balloonImage=loadAnimation("hotairballoon1.png","hotairballoon2.png",
   "hotairballoon3.png");
  }


  function setup() {

  createCanvas(1500,700);
  database = firebase.database();

  balloon = createSprite(250,450,150,150);
  balloon.addAnimation("hotairballoon",balloonImage);
  balloon.scale = 0.5;
  
  var ballPosition = database.ref('balloon/position');
  ballPosition.on("value",readPosition,showError);
}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotairballoon",balloonImage);
    balloon.x = balloon.x - 10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotairballoon",balloonImage);
    balloon.x = balloon.x + 10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotairballoon",balloonImage);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotairballoon",balloonImage);
    balloon.scale = balloon.scale + 0.01;
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

  fill(0);
  stroke("white");
  textSize(25);
  text("** ↑ to decrease the size and ↓ to increase",1000,40);
}
function updatePosition(x,y){
  database.ref("balloon/position").set(
      { 
          'x':position.x+x,
          'y':position.y+y
      }
  )
}
function readPosition(data){

  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}
function showError(){
  console.log("Error in writing to the database");    
}

