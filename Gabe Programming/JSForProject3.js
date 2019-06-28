let canvas;
let ctx;
let scoreDiv;
let resetButton;
let LosingDiv;
let HighestScoreDiv;
let bgImage;
let bgMusic;


let intervalId;

const CircleX = 12.5; // x pos of circle
const RectW = 25;
const CircleR = 10;
let RectX = 0;  // x pos of all rect
let CircleY = 275;  // y pos of circle
let Checkpoint = 50 + RectW;
let points = 0;
let HighScore = 0;



document.addEventListener("DOMContentLoaded", initialize);

// called when DOM loads
function initialize() {
    canvas = document.getElementById("CanvasGame");
    ctx = canvas.getContext("2d");
    scoreDiv = document.getElementById("score");
    HighestScoreDiv = document.getElementById("HighScore");
    bgImage = document.createElement("img");
    bgImage.src = "YouWinYouLose.jpeg";
    bgMusic = document.createElement("audio");
    bgMusic.src = "Crab Rave Loop.mp3";
    bgMusic.volume = 1;
    bgMusic.loop = true;
    
    bgImage.addEventListener("load", function() {
        // once the image is loaded, draw the initial canvas
        ctx.drawImage(bgImage, 0,0, canvas.width, canvas.height);
        drawRects();
    });

    ctx.fillCircle = function(x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, 2 * Math.PI);
        this.fill();
    }

    canvas.addEventListener("click", startGame);

    resetButton = document.getElementById("Reset");
    resetButton.addEventListener("click", Reset);

    LosingDiv=document.getElementById("Losing");
}

// called when the game should start
function startGame() {
    canvas.removeEventListener("click", startGame);
    canvas.addEventListener("mousemove", updateBall);
    intervalId = setInterval(animate, 1000 / 60);  // call "animate" function 60 times per 1000ms

    bgMusic.play();
}

// this function will be called once every "frame"
function animate() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ctx.drawImage(bgImage, 0,0, canvas.width, canvas.height);

    drawRects();

    ctx.fillStyle="#0072ff";
    ctx.fillCircle(CircleX, CircleY, CircleR);
    
    RectX -= 2;
    if (RectX<=-400) {
        RectX=0;
        Checkpoint = 50 + RectW;
    }
    CheckGameEnd()

    if (RectX <= -Checkpoint) {
        points++;
        Checkpoint += 100;
        scoreDiv.innerHTML = "Points: " + points;
    }
}
// called when the mouse moves. should update the ball's y position.
function updateBall(event) {
    CircleY = event.offsetY - CircleR;
}

function drawRects() {
    ctx.fillStyle="#ed7002";
    ctx.fillRect( RectX + 50,    0, RectW, 250 );
    ctx.fillRect( RectX + 50,  300, RectW, 100 );
    ctx.fillRect( RectX + 150,   0, RectW, 225 );
    ctx.fillRect( RectX + 150, 275, RectW, 125 );
    ctx.fillRect( RectX + 250,   0, RectW, 200 );
    ctx.fillRect( RectX + 250, 250, RectW, 150 );
    ctx.fillRect( RectX + 350, 275, RectW, 125 );
    ctx.fillRect( RectX + 350,   0, RectW, 225 );
    ctx.fillRect( RectX + 450,   0, RectW, 250 );
    ctx.fillRect( RectX + 450, 300, RectW, 100 );
    ctx.fillRect( RectX + 550,   0, RectW, 225 );
    ctx.fillRect( RectX + 550, 275, RectW, 125 );
    ctx.fillRect( RectX + 650,   0, RectW, 200 );
    ctx.fillRect( RectX + 650, 250, RectW, 150 );
    ctx.fillRect( RectX + 750, 275, RectW, 125 );
    ctx.fillRect( RectX + 750,   0, RectW, 225 );
}
function CheckGameEnd() {
    let minX = CircleX + CircleR;
    let maxX = minX + RectW + 4 * CircleR;
    if ((CircleY-12<=250 || CircleY+12>=300) && (RectX<=-minX && RectX>=-maxX))
        EndGame();
    
    minX += 100;  // Note: 100 is x distance between each pair of rect.
    maxX += 100;
    if ((CircleY-12<=225 || CircleY+12>=275) && (RectX<=-minX && RectX>=-maxX))
        EndGame();
    
    minX += 100;
    maxX += 100;
    if ((CircleY-12<=200 || CircleY+12>=250) && (RectX<=-minX && RectX>=-maxX))
        EndGame();

    minX += 100;
    maxX += 100;
    if ((CircleY-12<=225 || CircleY+12>=275) && (RectX<=-minX && RectX>=-maxX))
        EndGame();
}

function Reset() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0,0, canvas.width, canvas.height);
    scoreDiv.innerHTML = "Points: 0";
    RectX = 0;
    Checkpoint = 50 + RectW;
    points = 0;
    canvas.addEventListener("click", startGame);
    drawRects();
    LosingDiv.innerHTML = "";
}

function EndGame() {
    clearInterval(intervalId);
    LosingDiv.innerHTML="You Lose!!!";
    HighScore = Math.max(HighScore,points);
    HighestScoreDiv.innerHTML=("High Score:"+ HighScore);

    bgMusic.pause();
    bgMusic.currentTime = 0;
}
