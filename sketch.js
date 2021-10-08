var mario, marioimg, marioLeft, stillMario, mario1, mario2, mario3, img1, img2, img3, jump;
var coin, coinGroup, coinSound, coinImage, redCoin, redCoinImg, redCoinGroup;
var tiles, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10;
var grounds, ground1, ground2, ground3, ground4;
var backgroundImg, background;
var enemy, enemyImg, enemy2, enemyGroup, enemyPos;
var gameOver, gameOverImg;
var color;
var theme;
var score = 0;
let font;
var gameState = 1;
var play = 1;
var end = 0;
function preload(){
backgroundImg = loadImage("Images/SuperMario.png");
marioimg = loadAnimation("Images/mario-3.png", "Images/mario-2.png", "Images/mario-1.png");
marioLeft = loadAnimation("Images/mario-left-3.png", "Images/mario-left-2.png", "Images/mario-left-1.png");
marioLeft.scale = 0.2;
stillMario = loadImage("Images/mario-2.png");
theme = loadSound("Images/Theme.mp3");
coinSound = loadSound("Images/Mario-coin-sound.mp3");
coinImage = loadImage("Images/Star-coin.png")
font = loadFont('Images/BungeeShade-Regular.ttf');
redCoinImg = loadImage("Images/redCoin.png");
enemyImg = loadImage("Images/enemy.png");
enemy2 = loadImage("Images/enemy-2.png");
gameOverImg = loadImage("Images/Game Over.png");
jump = loadSound("Images/Jump.mp3");
}
function setup(){
    createCanvas(785, 687);
    mario = createSprite(200, 150, 20, 20);
    //mario.addAnimation("stiff", stillMario);
    mario.scale = 0.4;
    tile1 = createSprite(0, 207, 700, 27);
    tile2 = createSprite(790, 207, 700, 27);
    tile3 = createSprite(392, 355, 390, 27);
    tile4 = createSprite(-55, 505, 700, 27);
    tile5 = createSprite(840, 505, 700, 27);
    tile6 = createSprite(-255, 380, 700, 27);
    tile7 = createSprite(1035, 380, 700, 27);
    tile8 = createSprite(0, 650, 1700, 27);
    tile9 = createSprite(0, 650, 27, 1700);
    tile10 = createSprite(780, 650, 27, 1700);
    gameOver = createSprite(392, 343, 100, 100);
    gameOver.addImage("end", gameOverImg);
    ground1 = createSprite(370, 150, 10, 100);
    ground1.visible = false;
    ground2 = createSprite(400, 150, 10, 100);
    ground2.visible = false;
    ground3 = createSprite(70, 150, 10, 100);
    ground3.visible = false;
    ground4 = createSprite(700, 150, 10, 100);
    ground4.visible = false;
    tile1.visible = false;
    tile2.visible = false;
    tile3.visible = false;
    tile4.visible = false;
    tile5.visible = false;
    tile6.visible = false;
    tile7.visible = false;
    tile8.visible = false;
    tile9.visible = false;
    tile10.visible = false;
    coinGroup = createGroup();
    redCoinGroup = createGroup();
    enemyGroup = createGroup();
    grounds = createGroup();
    //theme.play();
}
function draw(){
    background(backgroundImg);

    textSize(30);
    textFont(font);
    fill("white");
    strokeWeight(5);
    textStyle(BOLD);
    text("Score : "+ score, 20, 55);
    if(keyDown("p")) {
      gameState === play; 
    }
    if (gameState === play){
      gameOver.visible = false;
      if((keyDown("space") || keyDown("up_arrow")) && mario.y > 110) {
        mario.velocityY = -10;
        mario.scale = 0.4;
        //jump.play();
    mario.addAnimation("walking", marioimg);
      }
      if(keyDown("right_arrow")) {
        mario.velocityX = 5;
        mario.scale = 0.4;
    mario.addAnimation("walking", marioimg);
      }
      if(keyDown("down_arrow")) {
        mario.velocityX = 0;
        mario.scale = 0.4;
        mario.addAnimation("walking", marioimg);
      }
      if(keyDown("left_arrow")) {
        mario.velocityX = -5;
        mario.addAnimation("walking", marioLeft);
        mario.scale = 0.4;
      }
      if(mario.velocityX === 0 && mario.velocityY === 0){
        mario.changeAnimation("walking", stillMario);
      }
      if (keyDown("s")){
        theme.stop();
      theme.play();
      }
      if(keyDown("m")){
        theme.stop();
      }
      if(keyDown("h")){
        score = score + 100;
      }
      if(coinGroup.isTouching(mario)){
        coinGroup.destroyEach();
        score = score + 1;
        coinSound.play();
      }
      if(redCoinGroup.isTouching(mario)){
        redCoinGroup.destroyEach();
        score = score + 3;
        coinSound.play();
      }
      enemyGroup.bounceOff(ground1);
      enemyGroup.bounceOff(ground2);
      enemyGroup.bounceOff(ground3);
      enemyGroup.bounceOff(ground4);
      if(enemyGroup.isTouching(mario)){
        enemyGroup.destroyEach();
        gameState = "end";
      }
      spawnCoin();
      spawnEnemy();
    mario.velocityY = mario.velocityY + 0.5;
    enemyGroup.velocityY = 10
  }
  else if(gameState === "end"){
    mario.visible = false;
    enemyGroup.destroyEach();
    coinGroup.destroyEach();
    redCoinGroup.destroyEach();
    gameOver.visible = true;
    gameOver.scale = 0.9;
    if(mousePressedOver(gameOver)){
      reset();
    }
  }
    mario.collide(tile1);
    mario.collide(tile2);
    mario.collide(tile3);
    mario.collide(tile4);
    mario.collide(tile5);
    mario.collide(tile6);
    mario.collide(tile7);
    mario.collide(tile8);
    mario.collide(tile9);
    mario.collide(tile10);
    enemyGroup.collide(grounds);
    enemyGroup.velocityY = 20;
    /*enemyGroup.collide(ground2);
    enemyGroup.collide(tile2);
    enemyGroup.collide(tile3);
    enemyGroup.collide(tile4);
    enemyGroup.collide(tile5);
    enemyGroup.collide(tile6);
    enemyGroup.collide(tile7);
    enemyGroup.collide(tile8);*/
    drawSprites();
}
function reset(){
  mario.visible = true;
  gameState = play;
  gameOver.visible = false;
  score = 0;
}
function spawnCoin(){
if(World.frameCount % 190 === 0){
  position = Math.round(random(1, 4));
  coin = createSprite(600, 110, 100, 100);
  coin.addImage("coin", coinImage);
  coin.scale = 0.075;
  if(position === 1){
    coin.x = 620; 
    coin.lifetime = 230;
    coin.velocityX = -3
  }
  else if(position === 2){
    coin.x = 165;
    coin.lifetime = 230;
    coin.velocityX = 3
  }
  else if(position === 3){
    coin.x = 110;
    coin.y = 580;
    coin.lifetime = 230;
    coin.velocityX = 3
  }
  else if(position === 4){
    coin.x = 675;
    coin.y = 580;
    coin.lifetime = 230;
    coin.velocityX = -3;
  }

coinGroup.add(coin);
}
  if(World.frameCount % 990 === 0){
    position = Math.round(random(1, 4));
    coin = createSprite(600, 110, 100, 100);
    coin.addImage("coin", redCoinImg);
    coin.scale = 0.07;
    if(position === 1){
      coin.x = 620; 
      coin.velocityX = -3
    }
    else if(position === 2){
      coin.x = 165;
      coin.velocityX = 3
    }
    else if(position === 3){
      coin.x = 110;
      coin.y = 580;
      coin.velocityX = 3
    }
    else if(position === 4){
      coin.x = 675;
      coin.y = 580;
      coin.velocityX = -3;
    }
redCoinGroup.add(coin);
}
}
function spawnEnemy(){
  if(World.frameCount % 190 === 0){
    enemyPos = Math.round(random(1, 2));
    enemy = createSprite(600, 110, 100, 100);
    enemy.scale = 0.07;
    /*ground1 = createSprite(-20, 207, 100, 27);
    ground2 = createSprite(1000, 207, 100, 27);*/
    if(enemyPos === 1){
      enemy.x = 620; 
      enemy.y = 170;
      enemy.addImage("enemy", enemyImg);
      //enemy.collide(ground2);
      enemy.velocityX = -3;
      //ground2.velocityX = -3;
      enemy.lifetime = 160
    }
    else if(enemyPos === 2){
      enemy.changeImage("enemy", enemy2);
      enemy.x = 165;
      enemy.y = 170;
      enemy.addImage("enemy", enemy2);
      //enemy.collide(ground1);
      enemy.velocityX = 3;
      //ground1.velocityX = 3;
      enemy.lifetime = 160
    }
    enemyGroup.add(enemy);
    grounds.add(ground2);
    grounds.add(ground1);
    //enemyGroup.collide(grounds);
}
}