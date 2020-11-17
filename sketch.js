var climber,door,ghost1,ghost2,tower;

var climberImg,doorImg,ghost1Img,ghost2Img,towerImg;

var climberGroup,doorGroup;

var sound;

var play = 1;
var end = 0;

var gameState = play;

var invisibleGround;

var invisibleGroundGroup;

function preload(){
  climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
  ghost1Img=loadImage("ghost-jumping.png");
  ghost2Img=loadImage("ghost-standing.png");
  towerImg=loadImage("tower.png");
  
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,20,20);
  tower.addImage("screen",towerImg);
  tower.velocityY=4;
  
  ghost1=createSprite(300,300,10,10);
  ghost1.addImage("dan",ghost2Img);
  ghost1.scale=0.4;
  
  climberGroup=new Group();
  doorGroup=new Group();
  invisibleGroundGroup=new Group();
  
  gameState = play;

  
 
  
}

function draw(){
  background(0);
  if(tower.y >600){
    tower.y=300;
  }
  ghost1.velocityY=5;
  if(gameState === play ){
 
    if(invisibleGroundGroup.isTouching(ghost1)|| ghost1.y>600){
      gameState=end;
      ghost1.destroy();
    }
 
   if(keyDown("Space")){
    ghost1.velocityY=-10;
    sound.play(); 
  }
    if(keyDown("RIGHT_ARROW")){
    ghost1.velocityX=2;
  }
  if(keyWentUp("RIGHT_ARROW")){
    ghost1.velocityX=0;
  }
  if(keyDown("LEFT_ARROW")){
    ghost1.velocityX=-2;
  }
  if(keyWentUp("LEFT_ARROW")){
    ghost1.velocityX=0;
  }
  spawnDoor();
 
  if(climberGroup.isTouching(ghost1)){
      ghost1.velocityY=0;
  }
  drawSprites();
  }
   if(gameState===end){
   stroke("red");
   fill("red");
   textSize(30);
   text("game over",250,250); 
  }
  
  }

function spawnDoor(){
   if(frameCount%250===0){
   door=createSprite(120,-40,10,10);
   door.addImage("out",doorImg);
   door.velocityY=2;
     door.x=Math.round(random(120,500))
     doorGroup.add(door);
     door.lifetime=400;
     door.depth=ghost1.depth/2;
     
     climber=createSprite(120,-40,10,10);
     climber.addImage("fe",climberImg);
     climber.velocityY=2;
     climber.x=door.x;
     climber.y=door.y+50;
     climber.debug=true;
     climberGroup.add(climber);
     climber.setCollider("rectangle",0,0,100,10);
     climber.lifetime=300;
  
     invisibleGround=createSprite(120,20);
     invisibleGround.width=climber.width;
     invisibleGround.height=15;
     invisibleGround.visible=false;
     invisibleGround.x=door.x;
     invisibleGround.velocityY=2;  
    invisibleGroundGroup.add(invisibleGround);
   }
}