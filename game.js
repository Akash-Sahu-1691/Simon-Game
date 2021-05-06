

var userClickedPattern=[];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow" ];
var randomChosenColour;
var level = 1;
var flag = true;


// $(document).one("keypress", nextSequence);
$(document).keypress(function(){
    if(flag==true)
    {
        nextSequence();
        flag=false;
    }
})


$(".btn").on("click",function(){

    var userChosenColor = $(this).attr("id");   //returns string.

    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

    playSound(userChosenColor);
    animatePress(userChosenColor);
});





//--------------------------------------------------------  FUNCTIONS DEFINITIONS   -------------------------------------------------
function nextSequence()
{
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);

    randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);


    //Adding Animation
    $("button #" + randomChosenColour).addClass("pressed");
    //setTimeout( function(){ $("button #" + randomChosenColour).removeClass("pressed");} , 100 );
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Adding Music
    playSound(randomChosenColour);

    $("h1").text("Level " + level);
    level++;
    

}



function playSound( name ){

    //Adding Music
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();

}


function animatePress( currentColour )
{
        $("#" + currentColour).addClass("pressed");
        setTimeout( function(){  $("#" + currentColour).removeClass("pressed");},100);
    
}


function checkAnswer(currentLevel){     //currentLevel is index of last element.        userClickedPattern.length-1
    
    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern[currentLevel]);
    
    
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
        {
            if(userClickedPattern.length === gamePattern.length)
            {
                setTimeout(function(){nextSequence();},1000);
                
            }
            
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout( function(){  $("body").removeClass("game-over"); },200  );
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}


function startOver(){
    level=1;
    gamePattern=[];
    flag=true;
}





