var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var pressKey = false;
var level = 0;



$("button").click(function() {
  if(!pressKey){
  $("#level-title").text("Level " + level);
  nextSequence();
  pressKey = true;
}

});


$( ".btn" ).on("click",function() {
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);


playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

}

function playSound(soundName){
  var audio = new Audio("sounds/"+ soundName +".mp3");
  audio.play();
}

function WrongSound(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function animateWrong(){
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else{
    WrongSound();
    animateWrong();
    $("#level-title").text("Game Over,click button to restart");
    startOver()
  }

}

function startOver(){
   gamePattern = [];
   level = 0;
   pressKey = false;
   $("button").click(function(){
     if(!pressKey){
     $("#level-title").text("Level " + level);
     nextSequence();
     pressKey = true;
   }

   });

}
