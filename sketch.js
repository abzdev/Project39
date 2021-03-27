var monkey, monkey_running, monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground, groundLength = 1000;
var gameState = 1;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyImage = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(300,500,groundLength,10);
  
  monkey = createSprite(100,460,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.velocityX = 8;
  
  monkey.scale = 0.1;
}


function draw() {
  background("white");
  
  if(gameState === 1) {
    text("score: " + score, monkey.x,200);
    
    if(keyDown("space") && monkey.y >= 460) {
        monkey.velocityY = -15;
      }
    monkey.velocityY += 1;

    monkey.collide(ground);

    if (frameCount % Math.round(random(100,400)) === 0) {
      drawObstacle();
    }
    if (frameCount % 100 === 0) {
      drawBanana();
    }
    
    if(monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score ++;
    }
    
    if(monkey.isTouching(obstacleGroup)) {
      gameState = 0;
    }
  }
  if(gameState === 0) {
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      monkey.velocityY = 0;
      monkey.velocityX = 0;

      monkey.addImage(monkeyImage);
      
      obstacle.lifetime = -1;
      banana.lifetime = -1;
      
      text("score: " + score, monkey.x,200);
  }
  ground.x = ground.width/2
  
  drawSprites();

  camera.position.x = monkey.x+200;
  ground.width += 8;
}

function drawBanana() {
  var rand = Math.round(random(350,450));
  banana = createSprite(monkey.x + 800,rand,10,10);
  banana.addImage(bananaImage);
  //banana.velocityX = -6;
  banana.scale = 0.1;
  banana.lifetime = 150;
  banana.setCollider("rectangle",0,0,550,230);
  bananaGroup.add(banana);
}

function drawObstacle() {
  obstacle = createSprite(monkey.x + 800,470,10,10);
  obstacle.addImage(obstacleImage);
  //obstacle.velocityX = -6;
  obstacle.scale = 0.2;
  obstacle.lifetime = 150;
  obstacle.setCollider("circle",0,0,200);
  obstacleGroup.add(obstacle);
}