document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");


//VARIABLES
var rightPressed = false;
var leftPressed = false;
const paddleSpeed = 5; // pixels per second
var lastTime;
var timeStep = 1000/60; // 60fps
var maxSpeed = 10;

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    //on donne une vitesse initiale à la balle, aléatoire et entre 2 et 4
    speedX: Math.floor(Math.random() * 3) + 2,
    speedY: Math.floor(Math.random() * 3) + 2,  
    color: "white"
};

var paddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    y: canvas.height - 20,
    color: "white"
};

var bricks = [];

function colorBricks() {
    for (var i = 0; i < bricks.length; i++) {
        if (bricks[i].durability == 1) {
            bricks[i].color = "rgb(255, 255, 255)"; //white
        }
        if (bricks[i].durability == 2) {
            bricks[i].color = "rgb(192, 192, 192)"; //light grey
        }
        if (bricks[i].durability == 3) {
            bricks[i].color = "rgb(103, 100, 106)"; //dark grey
        }
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function checkGameOver() {
    if (ball.y - ball.radius > canvas.height) {
        alert("Game Over!");
        // a remplacer par un bouton restart
    }
}

function update(dt) {
    updateBallPosition();
    checkPaddleCollision();
    checkBordersCollision();
    checkBrickCollision();
    checkGameOver();
    updatePad(dt);
}
function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBall();
    renderPaddle();
    renderBricks();
}

function fixedUpdate() {
    var currentTime = Date.now();
    var dt = (currentTime - lastTime) / 1000; // time in seconds
    while (dt > timeStep) {
        update(timeStep); // update the game state
        dt -= timeStep;
    }
    update(dt); // update the game state
    render(); // render the game
    lastTime = currentTime;
    requestAnimationFrame(fixedUpdate);
}


function start() {
    bricks = Level0();
    checkURLParams();
    colorBricks();
    //on attends que le joueur appuie sur espace pour lancer le jeu
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 32) {
            
            lastTime = Date.now();
             requestAnimationFrame(fixedUpdate);
        }
    });     
    //on affiche un message d'attente, en attendant que le joueur appuie sur espace, en utilisant le canvas et la police qui est dans le dossier assets
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText("Press space to start", 100, 300);

                                   
}

function checkURLParams() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var level = url.searchParams.get("level");
    console.log(level);
    if (level == 0) {
        bricks = Level0();
    }
    if (level == 1) {
        bricks = Level1();
    }
    if (level == 2) {
        bricks = Level2();
    }
    if (level == 3) {
        bricks = Level3();
    }
    if (level == 4) {
        bricks = Level4();
    }
    if (level == 5) {
        bricks = Level5();
    }
}
start();
