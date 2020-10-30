var tower, towerImage;
var ghost, ghostImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup, sit, sitGroup;
var PLAY=1;
var END=0;
var score
var gameState=PLAY;
var backgroundSound;


function preload(){
  
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  backgroundSound=loadSound("spooky.wav")
  
}

function setup(){
  createCanvas(400,600);
  tower=createSprite(200,300);
  tower.addImage("tower", towerImage);
  tower.velocityY=3;
  tower.scale=0.7;
  
  ghost=createSprite(200, 300);
  ghost.addImage("ghost", ghostImage);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  sitGroup=new Group();
  
  score=0;
    
}

function draw(){
  background("red");
  
  if(gameState===PLAY){
    
    backgroundSound.play();
    
    if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-4;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+4;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-4;
  }
  
  ghost.velocityY=ghost.velocityY+0.5
  
  if(sitGroup.isTouching(ghost)){
    gameState=END;
  }
                       
  if(ghost.y>600){
    gameState=END;
  }              
                       
  if(ghost.isTouching(doorGroup)){
    score=score+1;
  }                     
  
  spawnDoors();  
}
  
  else if (gameState===END){
    ghost.visible=false;
    tower.visible=false;
    textSize(35);
    text("Game Over", 150, 300);
  
  }
  
  drawSprites();
  fill("red");
  textFont("Chiller");
  textSize(30);               
  text("Kills: "+score, 160, 170);       
}

function spawnDoors(){
  
  if(frameCount % 240===0){
    door=createSprite(100, -15);
    door.addImage("door", doorImage);
    door.x=Math.round(random(100,300));
    door.velocityY=3;
    door.lifetime=300;
    doorGroup.add(door);
    
    climber=createSprite(100,40);
    climber.addImage("climber", climberImage);
    climber.x=door.x
    climber.velocityY=3;
    climber.lifetime=300;
    climberGroup.add(climber);
    
    sit=createSprite(100, 48, 100, 5);
    sit.visible=false;
    sit.velocityY=3;
    sit.x=door.x
    sit.lifetime=300;
    sitGroup.add(sit);
    
    ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  }
  
}
