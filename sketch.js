var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;
var addFood, feedDog;
var fedTime, lastFed=0;
var dogFood;
var gameState;
var dog
var foodS=0
function preload()
{
	dogImage = loadImage("dogImg.png")
  happyDogImage = loadImage("dogImg1.png")
}

function setup() {
  database = firebase.database();
	createCanvas(800, 700);
  foodObj = new Food();
  //.ref refers to the location of the value we care about.
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
   dog = createSprite(400, 350 , 50, 50);
  dog.addImage(dogImage);
  dog.scale= 0.5

  //happyDog.addImage(happyDogImage);
feed = createButton("Feed your dog now!")
feed.position(400,100);
AddSomeFood = createButton("Add some food to your storage!")
AddSomeFood.position(700,100);

feed.mousePressed(feedDog)
AddSomeFood.mousePressed(addFoods)

}


function draw() {  
  background(46,139,87);
 foodObj.display();
  fedTime = database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed = data.val();
  } );

  

  /*if(feed.mousePressed){
    dogFood.deductFoodStock(foodS);
    gameState = 3;
    feedDog();
    
  }

  if(AddSomeFood.mousePressed){
    dogFood.addFoodStock(foodS);
    gameState = 0;
    
  }*/

  drawSprites();
  textSize(20);
  fill ("red")
  text ( "Food:" + foodS, 100,100 );
  //add styles here
 fill("purple")

 fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
}

function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS)


}
function feedDog(){
  dog.addImage(happyDogImage);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}