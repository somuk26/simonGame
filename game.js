var buttonColors = ["red", "blue", "green", "yellow"];
var pressedButton = [];
var askedButton = [];
var level = 1;
var started = false;
var ended = false;


$("body").on("keypress",function(event){
    if(!started && event.key === "a"){
        $("#title").text("Level "+(level));
        started = true;
        $(".btn").on("click",function(){
            var color = $(this).attr("id");
            pressedButton.push(color);
            console.log(pressedButton);
            pressedAnimation(color);
            playSound(color);
            resultComparision(pressedButton.length - 1);
            
        }); 
        
        sequenceByComputer();
    }
});


function resultComparision(currentPosition){
    if(askedButton[currentPosition] === pressedButton[currentPosition]){
        // console.log("success");
        if(askedButton.length === pressedButton.length){
            setTimeout(function(){
                sequenceByComputer();
            },1000);        }
    }
    // else if(askedButton.length == pressedButton.lenght == 0){
    //     // alert("The Game is'nt Started yet. To start the game press the key 'A'");
    // }
    else{
        // console.log("failure");
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press R key to Restart");
        pressedButton = NaN;
        ended = false;
        $(document).on("keypress", function(event){
            if(!ended && event.key === "r"){
                restart();
                ended = true;
            }
        });
        
    }
}


function sequenceByComputer(){

    var randomNumber = Math.floor(Math.random()*4);
    var generatedColor = buttonColors[randomNumber];
    $("#title").text("Level "+(level++));
    pressedButton = [];
    askedButton.push(generatedColor);
    // console.log(generatedColor);
    console.log(askedButton);
    pressedAnimation(generatedColor);
    playSound(generatedColor);

}


function playSound(button){
    var sound = new Audio("sounds/"+(button)+".mp3");
    sound.play();
}

function pressedAnimation(button){
    $("#"+(button)).addClass("pressed");
    setTimeout(function(){
        $("#"+(button)).removeClass("pressed");
    },100);
}

function restart(){
    pressedButton = [];
    askedButton = [];
    level = 1;
    $("#title").text("Level "+(level));
    sequenceByComputer();
}
