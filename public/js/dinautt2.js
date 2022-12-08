let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let score = 0;

let player = new Image();
player.src = "/assets/dinautt/taco.png";

const jumpSize = 100;
let playerWidth = 40;
let playerHeight = 40;
let playerX = 10;
let playerY = canvas.height - 10 - playerHeight;

let groundY = canvas.height - 10 - playerHeight;
let roofY = 10;

let isJumping = false;
let preventJump = false; // prevent double jump
let changingGravity = false;
let currentGravity = true; // true = onGround, false = up

let obstacles = [];
let time;
let startTimestamp = Date.now();

// BASIC OBSTACLES :
const minObstaclePlayerSpace = 2 * playerHeight + 30;

const shortObstaclesHeight = 60;
const longObstacleHeight = 100;
const basicObstacleWidth = 50;
const middleObstacleHeight = canvas.height - minObstaclePlayerSpace;

// RANDOM SIZED OBSTACLE
//const maxObstacleHeight = canvas.height - minObstaclePlayerSpace;
//const minObstacleHeight = 50;

const obstacleBorderOffset = 10;

//const minDoubleObstaclePlayerSpace = Math.floor(3.0*playerWidth);

function addObstacle() {
    let difficulty = getCurrentDifficulty();

    let type = random(0, min(4, difficulty));
    if (type === 0) {
        genShortLowerObstacle();
    } else if (type === 1) {
        genShortUpperObstacle();
    } else if (type === 2) {
        genLongLowerObstacle();
    } else if (type === 3) {
        genLongUpperObstacle();
    } else if (type === 4) {
        genMiddleObstacle();
    }
}

function drawObstacle(obstacle) {
    ctx.fillStyle = obstacle.borderColor;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x + obstacleBorderOffset, obstacle.y + obstacleBorderOffset, obstacle.width - 2 * obstacleBorderOffset, obstacle.height - 2 * obstacleBorderOffset);
}

function tick() {
    if (time === undefined) {
        time = Date.now();
    } else {
        if (Date.now() - time < 10) {
            requestAnimationFrame(tick);
            Math.seedrandom(Date.now());
            return;
        }
    }

    time = Date.now()

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.x -= obstacle.speed;
        drawObstacle(obstacle);
    }

    ctx.fillStyle = "rgb(23 48 111)";
    ctx.fillRect(canvas.width - 130 - 10, 0, 130 + 10, 25 + 10);
    ctx.fillStyle = "#488ae8";
    ctx.fillRect(canvas.width - 130 - 5, 0, 130 + 5, 25 + 5);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, canvas.width - 128, 23);

    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 400) {
        addObstacle();
    }

    ctx.drawImage(player, 0, 0, 336, 339, playerX, playerY, playerWidth, playerHeight);

    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];

        let collideX = ((playerX < obstacle.x + obstacle.width) && (playerX + obstacle.width > obstacle.x));
        let collideY = ((playerY + playerHeight > obstacle.y) && (playerY < obstacle.y + obstacle.height));

        if (collideX && collideY) {
            ctx.fillText("Collide", 30, 30);
        }

        ctx.fillText("py : " + playerY, 30, 50);
    }

    if (changingGravity) {
        if (currentGravity) {
            playerY -= 6;
            if (playerY <= roofY) {
                currentGravity = false;
                changingGravity = false;
            }
        } else {
            playerY += 6;
            if (playerY >= groundY) {
                playerY = groundY;
                currentGravity = true;
                changingGravity = false;
            }
        }
    } else if (isJumping) {
        if (currentGravity) {
            playerY -= 6;
            if (playerY <= groundY - jumpSize) {
                playerY = groundY - jumpSize;
                isJumping = false;
            }
        } else {
            playerY += 6;
            if (playerY >= roofY + jumpSize) {
                playerY = roofY + jumpSize;
                isJumping = false;
            }
        }
    } else {
        if (currentGravity) {
            playerY += 3;
            if (playerY >= groundY) {
                playerY = groundY;
                preventJump = false;
            }
        } else {
            playerY -= 3;
            if (playerY <= roofY) {
                playerY = roofY;
                preventJump = false;
            }
        }
    }

// UPDATE SCORE
    score = Math.floor((Date.now() - startTimestamp) / 10);

    requestAnimationFrame(tick);
}

///////////////////////
////    CONTROLS   ////
///////////////////////

document.onclick = jump;
document.onkeydown = function (e) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    if (e.code === "ArrowUp") {
        changeGravity();
    } else if (e.code === "Space") {
        jump();
    }
};

function jump() {
    if (changingGravity || preventJump) return;
    isJumping = true;
    preventJump = true;
}

function changeGravity() {
    if (isJumping) return;
    changingGravity = true;
}

function getCurrentDifficulty() {
    return 4//2 + Math.floor(score/3000);
}

function getCurrentSpeed() {
    return 5 + Math.floor(score / 3000);
}

///////////////////////
////     UTILS    ////
///////////////////////
function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function min(a, b) {
    return a < b ? a : b;
}

/////////////////////////////
////     OBSTACLE GEN    ////
/////////////////////////////

function genShortUpperObstacle() {
    let obstacle = {
        speed: getCurrentSpeed(),
        width: basicObstacleWidth,
        height: shortObstaclesHeight,
        x: canvas.width,
        y: 0,
        color: "green",
        borderColor: "darkgreen"
    };

    obstacles.push(obstacle);
}

function genShortLowerObstacle() {
    let obstacle = {
        speed: getCurrentSpeed(),
        width: basicObstacleWidth,
        height: shortObstaclesHeight,
        x: canvas.width,
        color: "green",
        borderColor: "darkgreen"
    };

    obstacle.y = canvas.height - obstacle.height;
    obstacles.push(obstacle);
}

function genLongUpperObstacle() {
    let obstacle = {
        speed: getCurrentSpeed(),
        width: basicObstacleWidth,
        height: longObstacleHeight,
        x: canvas.width,
        y: 0,
        color: "pink",
        borderColor: "red"
    };

    obstacles.push(obstacle);
}

function genLongLowerObstacle() {
    let obstacle = {
        speed: getCurrentSpeed(),
        width: basicObstacleWidth,
        height: longObstacleHeight,
        x: canvas.width,
        color: "pink",
        borderColor: "red"
    };

    obstacle.y = canvas.height - obstacle.height;
    obstacles.push(obstacle);
}

function genMiddleObstacle() {
    let obstacle = {
        speed: getCurrentSpeed(),
        width: basicObstacleWidth,
        height: middleObstacleHeight,
        x: canvas.width,
        y: canvas.height / 2 - middleObstacleHeight / 2,
        color: "yellow",
        borderColor: "gold"
    };

    obstacles.push(obstacle);
}

/*function genRandomSizedObstacle() {
    let obstacle = {};
    obstacle.speed = getCurrentSpeed();
    obstacle.width = 50;
    obstacle.height = random(minObstacleHeight, maxObstacleHeight);
    obstacle.x = canvas.width;
    obstacle.y = random(0, canvas.height - obstacle.height);
    obstacle.color = "yellow";
    obstacle.borderColor = "gold";

    obstacles.push(obstacle);
}*/

/*function genDoubleObstacle() {
    let freeSpace = random(minDoubleObstaclePlayerSpace, canvas.height - 30);
    let firstObstacleHeight = random(10, freeSpace -10);
    let secondObstacleHeight = freeSpace - firstObstacleHeight;

    let obstacle1 = {
        speed: 3,
        width: 20,
        height: firstObstacleHeight,
        x: canvas.width,
        y: 0,
        color: "blue"
    };

    let obstacle2 = {
        speed: 3,
        width: 20,
        height: secondObstacleHeight,
        x: canvas.width,
        y: canvas.height - secondObstacleHeight,
        color: "blue"
    };

    obstacles.push(obstacle1);
    obstacles.push(obstacle2);
}*/


// START GAME
tick();
