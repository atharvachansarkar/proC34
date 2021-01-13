//Create variables here
var dogImg;
var dogImg1;
var foodStock;
var foodS;
var database;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 650);
  database = firebase.database();
  console.log(database);
  dog = createSprite(500,450,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  textSize(20);
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 
}


function draw() {  
  background(46,139,87);
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();

  textSize(20);
fill("white");
stroke("pink");
text("Note:Please Press the Up Arrow for feeding the dog ", 350,10,300,20);
text("Food remaining : "+foodS,390,200); 
}



//function to read the values from database
function readStock(data){
foodS = data.val();
}
function writeStock(x){
  if (x <= 0){
    x = 0;
   } else{
    x=x-1;
  }
 
 database.ref('/').update({
  Food:x
})
};



