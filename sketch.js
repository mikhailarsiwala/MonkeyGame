var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survivalTime=0;  
var END=0;
var PLAY=1;
var gameState=PLAY;    

function preload(){
  
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
   //monkeyCollide = loadAnimation("monkey_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,300);
  monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(300,340,600,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
}

    

function draw() {
  background(220);
  if(gameState === PLAY){
    if(keyDown("space")){
   monkey.velocityY=-10;
}
     monkey.velocityY = monkey.velocityY + 0.8
 
  if(ground.x<0){
    ground.x=ground.width/2;
    
  }
      
    if (monkey.isTouching(foodGroup)){
      score++;
      
      foodGroup.destroyEach();
    }
  
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  

    
  
  
  if (gameState === END){
    ground.velocityX = 0;
    
   
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
      
  
 
  monkey.collide(ground);
  drawSprites();

  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score,500,50 );
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime,100,50);
   
  spawnObstaclesGroup();
 }




 function spawnObstaclesGroup(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
 }
  }

function bananas(){
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;   
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
   foodGroup.add(banana);
    foodGroup.add(banana);
}
  
  function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}

  
  
  