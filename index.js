let startedToToggle = false;
let lastIndex = [];
let level = 0;
// let randomNumber;
$(document).keypress(function () {
    console.log("5th Press Any Key");
    startedToToggle = true;
    console.log("7th  " + startedToToggle);
    newSequence();
})


let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];

function newSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    console.log("24th  " + randomNumber);
    level += 1;
    $("#level-title").text(`Level ${level}`);
    console.log("18th  " + level);
}

function makeSound(key) {
    let audio = new Audio(`sounds/${key}.mp3`);
    audio.play();
}

function animateRandomChosenColour(currentColour) {
    setInterval(() => {
        $("#" + currentColour).fadeOut();
        $("#" + currentColour).fadeIn();
    }, 500);
}

$(".btn").on("click", function (event) {
    console.log("45th  " + event.target.id);
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    makeSound(event.target.id);
    animatePress(event);
    lastIndex.push(buttonColours.indexOf(event.target.id));
    console.log("52th  " + buttonColours.indexOf(event.target.id));
    checkAnswer(lastIndex.length - 1);
});

function animatePress(currentColour) {
    console.log("59th  " + currentColour.target.id);
    $(`#${currentColour.target.id}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour.target.id}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                // userClickedPattern = [];
                newSequence();
            }, 1000);
            console.log("Success");
        }
    }
    else {
        console.log("Wrong! Try Again...");
        // makeSound(wrong);
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



