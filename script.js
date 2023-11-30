function keyCheck(event) {

    //enter
    if (event.which == 13) {

        if (runWorkerId == 0) {

            blockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlock, 100);

            runWorkerId = setInterval(run, 100);
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100)
        }

    }
    //space
    if (event.which == 32) {

        if (jumpWorkerId == 0) {


            clearInterval(runWorkerId);
            jumpWorkerId = setInterval(jump, 100);
        }

    }

}

var player = document.getElementById("player");

//run
var runWorkerId = 0;
var runImageNumber = 1;

function run() {

    runImageNumber++; //2 3 4 5 6 7 8 9

    if (runImageNumber == 9) {
        runImageNumber = 1
    }

    player.src = "Run (" + runImageNumber + ").png"; //2 3 4 5 6 7 8 - 1 
}

//jump
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 320;

function jump() {
    jumpImageNumber++;

    //fly
    if (jumpImageNumber <= 7) { //jump images 2 - 7
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";
    }

    //land
    if (jumpImageNumber >= 8) { //jump images 8 - 1
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";
    }

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run, 100);
        jumpWorkerId = 0;

        if (backgroundWorkerId == 0) {
            backgroundWorkerId = setInterval(moveBackground, 100);
        }

        if (blockWorkerId == 0) {
            blockWorkerId = setInterval(createBlock, 100);
        }

        if (moveBlockWorkerId == 0) {
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }

        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 100);
        }
    }

    player.src = "Jump (" + jumpImageNumber + ").png";
}

//background
var background = document.getElementById("background");

//move backward
var positionX = 0;
var backgroundWorkerId = 0;

function moveBackground() {
    positionX = positionX - 20;

    background.style.backgroundPositionX = positionX + "px";

}

//Create block
var blockWorkerId = 0;
var blockMarginLeft = 700;
var blockNumber = 1;

function createBlock() {
    var block = document.createElement("div");
    block.className = "block";

    block.id = "block" + blockNumber;

    blockNumber++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = gap + blockMarginLeft;
    block.style.marginLeft = blockMarginLeft + "px";

    background.appendChild(block);
}

//move blocks
var moveBlockWorkerId = 0;

function moveBlock() {

    for (var i = 1; i <= blockNumber; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;

        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft < 178 & newMarginLeft > 58) {
            if (playerMarginTop > 260) {
                clearInterval(runWorkerId);
                clearInterval(backgroundWorkerId);
                clearInterval(blockWorkerId);
                clearInterval(moveBlockWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(jumpWorkerId);
                jumpWorkerId = jumpWorkerId - 1; //Above, there's a process to assign 0 to jumpWorkerId.

                deadWorkerId = setInterval(dead, 100);

            }
        }
    }

}

// update score
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore() {
    newScore++;
    score.innerHTML = newScore;
}

//Dead
var deadWorkerId = 0;
var deadImageNumber = 1;

function dead() {
    deadImageNumber++;
    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        player.style.marginTop = "320px";
    }


    player.src = "Dead (" + deadImageNumber + ").png"
}