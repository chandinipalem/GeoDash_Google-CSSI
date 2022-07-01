// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, triangle, stroke, image, loadImage, collideCircleCircle, collideRectCircle, collideRectRect text, collidePointTriangle, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, collideRectPoly, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, loadSound */



// platforms heights
// music 
// neon colors 
// rotate

let backgroundColor, movingSquare, triangles, gravity, base, hit1, rectX, rectY, xVelocityTriangle, hit2, triArray, xPosArray, platformArray, triObstacle,x1Pos, gameOver, fontsize, hit3, hit4, sound, hit5, song, lineArray;

function preload() {
  
  sound = loadSound("https://cdn.glitch.com/d282ef15-a555-493e-b2e2-d234d0fb2c04%2FGeometry%20Dash%20-%20Level%201Stereo%20Madness%20(All%20Coins).mp3?v=1628100004294");
  
   
  
  
  // We load the image into our canvas
}
function setup() {
 
  // Canvas & color settings
  createCanvas(400, 400);
 // colorMode(HSB, 360, 100, 100);
  //angleMode(DEGREES);

  backgroundColor = 0
  
  //music settings
   
  //sound.play();
  //sound.loop();
  
  

  gameOver = false; 
  movingSquare = new Square(); 
  
  gravity = - 0.1; 
 
  
  
  base = ({ 
    x: 0,
    y: height/1.25,
    rectW : width, 
    rectH : height/4,
    color: ('#0bf40c')
  });  
  

triArray = [new Triangle(380), new Triangle(500), new Triangle(700), new Triangle(720), 
            new Triangle (890), new Triangle(990), new Triangle(1500), new Triangle(1650), new Triangle(1820), new Triangle(2200), new Triangle(2450), new Triangle(2700)]; 
  
platformArray = [new Platform(1200, 30, 50), new Platform(1250, 30, 70), new Platform(1300, 30, 90), new Platform(1700, 100, 20), new Platform(1950, 30, 60)];
 
lineArray = [new JumpRect(1850), new JumpRect(2100), new JumpRect(2350), new JumpRect(2600)]; 
  
    
   
}
       
function draw() {
  background(backgroundColor)
  // base
  fill(base.color); 
  rect(0, height/1.25, width, height/4)
  // platrform
  //fill(100)
  // rect(140, height/1.48, 25, 50); 
  
  if(gameOver){
      textSize(50);
      text(`GAME OVER`, (width/8), (height/3) + 50);
   
     
  }
  else{ 
    movingSquare.drawSquare(); 
    movingSquare.move(); 
    movingSquare.collideBase();  

   for(let i = 0; i < triArray.length; i++){
     triArray[i].drawTriangle(); 
     triArray[i].moveTriangle(); 
     movingSquare.collideObstacle(triArray[i]);
     if(triArray[triArray.length-1].x1 < 0){
       textSize(50);
       text(`WINNER`, (width/4), (height/3) + 50);
     }
   }
    for(let p = 0; p < platformArray.length; p++){
      platformArray[p].drawPlatform(); 
      platformArray[p].movePlatform(); 
      movingSquare.collidePlatform(platformArray[p]); 
    }
    for(let j = 0; j < lineArray.length; j++){ 
      lineArray[j].drawLine(); 
      lineArray[j].moveLine(); 
      movingSquare.collideJumpRect(lineArray[j]); 
    }
  
  }
}


  
// class for square
// move with key 
class Square{
  constructor(x, y, size, color, baseXVelocity, baseYVelocity){
    this.x = width/4;
    this.y = height/1.32;  
    this.color = "#f571ea";
    this.baseXVelocity = 0;
    this.baseYVelocity = 0;
    this.size = 20;
    //this.tempSize =70; 
  }
  // draw square
  drawSquare(){ 
    fill(this.color); 
    noStroke();
    rect(this.x, this.y, this.size, this.size) 
  
  
  }
  
 // jump 
   jump(){
    this.baseYVelocity = 3;
  }
  
  move(){
    this.y -= this.baseYVelocity; 
    this.baseYVelocity += gravity;
    if(this.y > height - 20) {
      this.y = height - 20;
    }
  }
  // collision with base
  collideBase(){
  hit1 = collideRectRect(this.x, this.y, this.size, this.size, base.x, base.y, base.rectW, base.rectH);
    if(hit1){
      this.y = height/1.33;   
    }
  }
  // collision with obstacles 
  collideObstacle(triangle) {
    hit2 = collideRectPoly(this.x, this.y, this.size, this.size, triangle.vertices());
    if(hit2) {
      gameOver = true; 
      
    }
  }
  collidePlatform(platform){
    hit3 = collideRectRect(this.x, this.y, this.size, this.size, platform.x1, platform.y1 - 200, platform.rectW, 200) ; 
    hit4 = collideRectRect(this.x, this.y, this.size, this.size, platform.x1, platform.y1, platform.rectW, platform.rectH); 
       
    if(hit3){
    //this.y = platform.rectH + 200;   
    this.y = platform.y1 - this.size; 
     }
    
    else if(hit4){
      gameOver = true; 
    }
   }
  
  collideJumpRect(jumpRect){
    hit5 = collideRectRect(this.x, this.y, this.size, this.size, jumpRect.x1, jumpRect.y1, jumpRect.rectW, jumpRect.rectH); 
    if(hit5){
      this.jump(); 
    }
  }
  

}

  

class Triangle{
  constructor(x1){
    this.x1 = x1; 
    this.y1 = height/1.25; 
    this.x2 = this.x1 + 20; 
    this.y2 = height/1.25; 
    this.x3 = this.x1 + 10; 
    this.y3 = height/1.35; 
    this.xVelocityTriangle = 1.7; 
    this.color = ('#e2fe02'); 
     
  }
  
  drawTriangle(){
    fill(this.color); 
    noStroke();
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);  
  }
  
  
  // moves triangles
  moveTriangle(){
  //triangle(triangles.x1, triangles.y1, triangles.x2, triangles.y2, triangles.x3, triangles.y3);  
  this.x1 -= this.xVelocityTriangle; 
  this.x2 -= this.xVelocityTriangle; 
  this.x3 -= this.xVelocityTriangle;  
  }
  
  vertices() {
    let vertices = [
      {
        x: this.x1,
        y: this.y1
      },
      
      {
        x: this.x2,
        y: this.y2
      },
      
       {
       x: this.x3, 
       y: this.y3
      }
    ]
    return vertices; 
  }
}


// rect(140, height/1.48, 25, 50);          
class Platform{
  constructor(x1, rectW, rectH){
    this.x1 = x1; 
    //this.y1 = height/1.49; 
    this.y1 = height/1.25 - rectH; 
    this.rectW = rectW; 
    this.rectH = rectH; 
    this.xVelocityPlatform = 1.7;
    this.color = ('#3ef4ec'); 
  }
  drawPlatform(){
    fill(this.color); 
    noStroke();
    rect(this.x1, this.y1, this.rectW, this.rectH); 
  }
  movePlatform(){
    this.x1 -= this.xVelocityPlatform; 
  }
  
}

class JumpRect{
  constructor(x1){
    this.x1 = x1; 
    this.rectH = 4; 
    this.y1 = height/1.25 - this.rectH;
    this.rectW = 30; 
    this.xVelocityLine = 1.7; 
    this.color = ('#f8b202'); 
  }
  drawLine(){
    fill(this.color); 
    noStroke(); 
    rect(this.x1, this.y1, this.rectW, this.rectH); 
    
  }
  moveLine(){
    this.x1 -= this.xVelocityLine; 
  }
}

// move with keys 
function keyPressed(){
  // right side paddle 
  if (keyCode === 32) {  
    movingSquare.jump();
    //movingSquare.rotate(90); 
    
  }
}

