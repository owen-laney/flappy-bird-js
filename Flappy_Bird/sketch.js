var speed = 2.5;
var score = 0;
var lose = 0;
var canvasWidth = 400;
var canvasHeight = 500;
var groundHeight = 80;
var highScore = 0;

let birdImg;
let fallImg;
let pipeImg;
let bgImg;
let btnImg;
let grassImg;
let nexa;

function preload() {
  birdImg = loadImage('assets/Flappy-Bird.png');
  fallImg = loadImage('assets/Flappy-Bird-Falling.png');
  pipeImg = loadImage('assets/pipe.png');
  bgImg = loadImage('assets/Background.png');
  btnImg = loadImage('assets/button.png');
  grassImg = loadImage('assets/Grass.png')
  nexa = loadFont('assets/NexaText-Trial-Bold.otf');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  textFont(nexa);
}

//OBJECTS
function Pipe(x, y, width, height) {
  this.x = x;
  this.y = y; 
  this.width = width;
  this.height = height;
}

function Player(x, y, size, img) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.img = birdImg;
}

function CrashScreen(x, y, width, height) {
  this.x = x;
  this.y = y; 
  this.width = width;
  this.height = height;
}

function Button(x, y, width, height, size) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.size = size;
}

function Grass(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}

//DRAW OBJECTS
Pipe.prototype.draw = function() {
  fill(32, 200, 32);
  image(pipeImg, this.x, this.y, pipeImg.width, pipeImg.height);
}

Player.prototype.draw = function() {
  image(birdImg, this.x, this.y, birdImg.width / this.size, birdImg.height / this.size);
}
Player.prototype.fall = function() {
  image(fallImg, this.x, this.y, fallImg.width / this.size, fallImg.height / this.size);
}

CrashScreen.prototype.draw = function() {
    
    fill(255, 255, 255);
    textSize(15);
    text("BEST", this.width, this.height - this.height / 2);
    text("SCORE", this.width, this.height - this.height / 5);
    textSize(40);
    text(highScore, this.width, this.height - this.height / 2 + 35);
    text(score, this.width, this.height - this.height / 5 + 35);
}

Button.prototype.draw = function() {
  image(btnImg, this.x, this.y, this.size, this.size);
  fill(255, 255, 255);
  textSize(15);
  text("RESTART", this.x, this.y)
}

Grass.prototype.draw = function() {
  image(grassImg, canvasWidth, this.y, this.size, this.size);
}

//OBJECT INSTANCES
var pipe1Top = new Pipe(canvasWidth, 0, 60, 400);
var pipe1Bottom = new Pipe(canvasWidth, pipe1Top.y + 500, 60, 400);
var pipe2Top = new Pipe(canvasWidth + canvasWidth / 1.5, 0, 60, 400);
var pipe2Bottom = new Pipe(canvasWidth + canvasWidth / 1.5, pipe1Top.y + 500, 60, 400);

var player1 = new Player(100, canvasHeight / 2, 20, birdImg);

var crashScreen = new CrashScreen(canvasWidth / 4, canvasHeight / 2, canvasWidth / 2, canvasWidth / 2);

var buttonRestart = new Button(canvasWidth / 2, canvasHeight / 2, 100, 100, 200);

var grass1 = new Grass(canvasWidth, canvasHeight - groundHeight / 2, 20);
var grass2 = new Grass(canvasWidth, canvasHeight - groundHeight / 2, 20);

//DRAW
function draw() {
  
  //ENVIRONMENT
  background(0, 0, 0);
  image(bgImg, width / 2, height / 2);  
  
  pipe1Top.draw();
  pipe1Bottom.draw();
  pipe2Top.draw();
  pipe2Bottom.draw();
    
  grass1.draw();
  grass2.draw();
  
  //MOVE PIPES
  if (pipe1Top.x > -pipe1Top.width && lose === 0) {
    pipe1Top.x -= speed;
    pipe1Bottom.x -= speed;
    
    grass1.x -= speed;
  }
  
  else if (lose === 0) {
    pipe1Top.x = width + pipe1Top.width;
    pipe1Top.y = random(-150, 0);
    pipe1Bottom.x = width + pipe1Bottom.width;
    pipe1Bottom.y = pipe1Top.y + 500;
    
    grass2.x = pipe1Top.x;
  }
  
  if (pipe2Top.x > -pipe2Top.width && lose === 0) {
    pipe2Top.x -= speed;
    pipe2Bottom.x -= speed;
    
    grass2.x -= speed;
  }
  else if (lose === 0) {
    pipe2Top.x = width + pipe2Top.width;
    pipe2Top.y = random(-150, 0);
    pipe2Bottom.x = width + pipe2Bottom.width;
    pipe2Bottom.y = pipe2Top.y + 500;
    
    grass2.x = pipe1Top.x;
  }
  
  //MOVE GRASS
  
  //MOVE PLAYER
  if (keyIsPressed && player1.y > 0 && lose === 0 || mouseIsPressed && lose === 0) {
    player1.draw();
    player1.y -= speed * 4;
  }
  else if (player1.y < height - groundHeight / 2 && lose === 0) {
    player1.y += speed + 1;
    player1.draw();
  }
  
  else if (lose === 1) {
    if (player1.y < height - groundHeight / 2) {
      player1.y += speed * 4;
    }
    player1.fall();
  }
  
  else {
    lose = 1;
  } 
  
  //HIT PIPE
  if (player1.x <= pipe1Top.x + pipe1Top.width / 2 && player1.x >= pipe1Top.x - pipe1Top.width / 2 && player1.y <= pipe1Top.y + 200) {
    lose = 1;
  }
  else if (player1.x <= pipe1Top.x + pipe1Top.width / 2 && player1.x >= pipe1Top.x - pipe1Top.width / 2 && player1.y >= pipe1Bottom.y - 200) {
    lose = 1;
  }
  
  else if (player1.x <= pipe2Top.x + pipe2Top.width / 2 && player1.x >= pipe2Top.x - pipe2Top.width / 2 && player1.y <= pipe2Top.y + 200) {
    lose = 1;
  }
  else if (player1.x <= pipe2Top.x + pipe2Top.width / 2 && player1.x >= pipe2Top.x - pipe2Top.width / 2 && player1.y >= pipe2Bottom.y - 200) {
    lose = 1;
  }

  //COUNT SCORE
  if (pipe1Top.x < player1.x + 1 && pipe1Top.x > player1.x - 1 && lose === 0) {
    score++;
  }
  else if (pipe2Top.x < player1.x + 1 && pipe2Top.x > player1.x - 1 && lose === 0) {
    score++;
  }
  if (score > highScore) {
    highScore = score
  }

  //DISPLAY SCORE
  if (lose === 0) {
    fill(255, 255, 255);
    textSize(50);
    text(score, width / 2, height / 6);
  }
  
  //CRASH SCREEN
  if (lose === 1) {
    crashScreen.draw();
    buttonRestart.draw();
  }
  
  //GROUND
  noStroke();
  fill(38, 222, 121);
  rect(width / 2, height + 6, width, groundHeight);
  
  
  //MOUSE THINGS
  if (mouseIsPressed && mouseX < buttonRestart.x + buttonRestart.width && mouseX > buttonRestart.x - buttonRestart.width && mouseY < buttonRestart.y + buttonRestart.height && mouseY > buttonRestart.y - buttonRestart.height && lose === 1) {
    pipe1Top.x = width;
    pipe1Bottom.x = width;
    pipe2Top.x = width + width / 1.5;
    pipe2Bottom.x = width + width / 1.5;
    player1.y = height / 2;
    
    
    score = 0;
    lose =0;
        
  }
}