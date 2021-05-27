var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];


function nextSequence(){
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//playing sound
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3")
    audio.play();
    
}
//animating mouse click
function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },100);
    
}
//starting game on keyboard press
var started=false;
var level=0;
$("#startbtn").click(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        $("button").fadeOut(100);
        nextSequence();
        started=true;
    }
});

//checking answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("gameOver");
        setTimeout(function(){
            $("body").removeClass("gameOver");
            $("#level-title").text("Game Over! Press a key to start again.");
        },500);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $("button").fadeIn(100);
}