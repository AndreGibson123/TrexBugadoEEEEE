var Trex, TrexRunning, TrexCollided;
var edges;
var ground, groundImage;
var invisibleGround;
var cloud,cloudImage
var cacto, cactoImage1, cactoImage2, cactoImage3, cactoImage4, cactoImage5, cactoImage6
var score=0
var play=1
var end=0
var gameState=play
var cactoGp, cloudGp
var gameover,gameOverimg
var restart,restartimg



//preload carrega as midías do jogo 
function preload(){
  groundImage=loadImage("ground2.png");
  TrexRunning=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  cloudImage=loadImage("cloud.png");
  cactoImage1=loadImage("obstacle1.png");
  cactoImage2=loadImage("obstacle2.png");
  cactoImage3=loadImage("obstacle3.png");
  cactoImage4=loadImage("obstacle4.png");
  cactoImage5=loadImage("obstacle5.png");
  cactoImage6=loadImage("obstacle6.png");
  TrexCollided=loadAnimation("trex_collided.png");
  gameOverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")

}
//setup faz a configuração
function setup(){
  createCanvas(600,200);
  edges=createEdgeSprites();
  cactoGp=new Group ()
  cloudGp=new Group ()
  

  // criando as bordas
  Trex=createSprite(50, 160, 20, 50);
  Trex.addAnimation("Running", TrexRunning);
  Trex.scale=0.5;
  Trex.addAnimation("Collided", TrexCollided);
  Trex.debug=false
  Trex.setCollider("rectangle",0,0,50,50,60)
  //Trex.setCollider("circle",0,0,30)
  ground=createSprite(300, 160, 600, 2);
  ground.addAnimation("ground", groundImage);

  invisibleGround=createSprite(300, 180, 600, 2)
  invisibleGround.visible=false

  gameover=createSprite(300,80,100,10)
  gameover.addImage(gameOverimg)
  gameover.scale=0.5
  gameover.visible=false

  restart=createSprite(300,120,100,10)
  restart.addImage(restartimg)
  restart.scale=0.5 
  restart.visible=false



}
//draw faz o movimento, a ação do jogo
function draw(){
  background("#f0f9f7");

  if (Trex.isTouching(cactoGp)) {
    gameState=end
  }


  if (gameState==play) {
    score=Math.round(frameCount/4)
    
    if (keyDown("space")&& Trex.y > 150) {
      Trex.velocityY=-12;
    }

    ground.velocityX=-10;

    if (ground.x<0){
      ground.x=ground.width/2;
      
    } 

    clouds();
    cactos();
  }

  


  if (gameState==end) {
    Trex.changeAnimation("Collided", TrexCollided);
    ground.velocityX=0
    cactoGp.setVelocityXEach(0)
    cloudGp.setVelocityXEach(0)
    cactoGp.setLifetimeEach(-1)
    cloudGp.setLifetimeEach(-1)
  
    gameover.visible=true

  restart.visible=true

  }


  

  stroke ("blue")
  fill ("black")
  textAlign (CENTER, TOP)
  textSize (25)
  text("Pontos: "+score,76,23)
  


  Trex.collide(invisibleGround);
  gravity();
   //coordenadas do mouse na tela
  //text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
  drawSprites();

}
function gravity(){
  Trex.velocityY+=0.5;
}

function clouds() {
  if (frameCount%60==0){
    cloud=createSprite(600, random(15,100), 40, 10)
    cloud.velocityX=-3
    cloud.addImage(cloudImage)
    cloud.scale=random(0.5,1.4)
    cloud.depth=Trex.depth-1
    cloud.lifetime=210
    cloudGp.add(cloud)
  }
}


function cactos() {
  if (frameCount%100==0){
  
    cacto=createSprite(600, 160, 40, 10)
    cacto.velocityX=-4
    cacto.scale = 0.7
    cacto.lifetime=215
    cactoGp.add(cacto)


    var SorteioC=Math.round(random(1,6));
    switch (SorteioC) {
      case 1: cacto.addImage(cactoImage1)
        break;
        
        case 2: cacto.addImage(cactoImage2)
        break;
        
        case 3: cacto.addImage(cactoImage3)
        break;
        
        case 4: cacto.addImage(cactoImage4)
        break;
        
        case 5: cacto.addImage(cactoImage5)
        break;
        
        case 6: cacto.addImage(cactoImage6)
        break;
    }

  }
}











