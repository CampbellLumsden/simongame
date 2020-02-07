var buttonColors = ["red", "blue", "green", "yellow"]; //creates an array with strings as the value.

var gamePattern = []; //Creates an arry named gamePattern

var userClickedPattern = []; // ^^^

var started = false;

var level = 0; //Gives a value to "level"



$(document).keypress(function() { //Starts the game by pressing a key.
  if (!started) {

    $("#level-title").text("Level " + level); //Changes the title text to "level" + number of level.
    nextSequence();               //calls the nextSequence function to play a sound.
    started = true;
  }
});

$(".btn").click(function() {  //Detects that a button was clicked.

  var userChosenColor = $(this).attr("id"); //Tells us what button was pressed and names it userChosenColor.

  userClickedPattern.push(userChosenColor);  //Puts the value of userChosenColor into the userClickedPattern array.

  playSound(userChosenColor);  //calls playsound function of the color chosen.

  animatePress(userChosenColor); //calls the animatePress function when a button is pressd the button of the chosen button.

  checkAnswer(userClickedPattern.length - 1); //Gives the value of  userChosenColor to the checkAnswer function.
});



function checkAnswer(currentLevel) {  //Checks if the button pressed matches the button that nextSequence chose.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");    //Logs success to the console if the button pressed matched the button nextSequence played.

    if (userClickedPattern.length === gamePattern.length){ //If the buttons matched, sets a time delay then calls nextSequence again.

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {        //If the wrong button is chosen, plays a new sound, logs wrong to the console, changes the title text and flashes a red background.
    playSound("wrong");
    console.log("wrong");
    $("body").addClass("game-over");
     setTimeout(function() {
       $("body").removeClass("game-over");
     }, 200);
     $("#level-title").text("Game Over. Press any key to start again.");

     startOver(); //Calls the startOver fuction to reset all values to the beginnig.
  }

}

  function nextSequence() { //Chooses a random button to play a sound and flash.

    userClickedPattern = [];

    level++   //Adds one to the level variable every time the function is called.

    $("#level-title").text("Level " + level); //Changes the title text to "level" + the value of the level variable.

    var randomNumber = Math.floor(Math.random() * 4); // Creates a random number between 1-4

    var randomChosenColor = buttonColors[randomNumber]; //Uses the random number to match the color in the butonColors array with a number and puts it as the value of randomChosenColor.

    gamePattern.push(randomChosenColor); //Puts the value of randomChosenColor into the gamePattern array.

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animates the button that was chosen.

    playSound(randomChosenColor); //plays the corresponding sound for the randomChosenColor.



  }

  function playSound(name) { //Creates function that makes sounds.
    var audio = new Audio("sounds/" + name + ".mp3"); // Tells use where to find the sound.
    audio.play();
  }

  function animatePress(currentColor) { //Changes the css class of the button that was pressed.

    $("#" + currentColor).addClass("pressed"); //Changes css class by adding a new class to the element.
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed"); //changes the class back, by removing the class, after a delay.
    }, 100);
  }

  function startOver() { //function to reset the values back to the beggging after a failed button press.
    level = 0;
    gamePattern = [];
    started = false;
  }
