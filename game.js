var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

function faded(color){
  color.fadeOut(200).fadeIn(200);
}

$("#level-title").click(function(){
  if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // $(".btn").click(function nextSequence(){
    //   level++;
    //   $("h1").text("Level " + level);
    // });

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

function gameOver(){
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 3000);

}

function nextSequence(){

  level ++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  var randomChosenBox = $("." + randomChosenColor);

  faded(randomChosenBox);

  playSound(randomChosenColor);
  // animatePress(randomChosenColor);

  userClickedPattern = [];
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
