let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

const consts = require('./consts.js');
const obstacleMgr = require('./obstacle');
const controls = require('./controls');
const {min, random} = require('./utils');
const utils = require('./utils.js');


let player = {
    x: 10,
    y: consts.canvasHeight - 10 - consts.playerHeight,
    width: 0,
    height: 0,

    gravity: true, // 1 = on griybd, 0 = on roof
    jumping: 0,
    grounded: true, // prevent double jump
    changingGravity: false,

    img: new Image(),

    score: 0,

    draw: (ctx) => ctx.drawImage(player.img, 0, 0, 336, 339, player.x, player.y, consts.playerWidth, consts.playerHeight)
}

player.img.src = consts.playerImageSrc;

const groundY = consts.canvasHeight - 10 - consts.playerHeight;
const roofY = 10;

let obstacles = [];
let time;
let startTimestamp = Date.now();

function addObstacle() {
    let difficulty = getCurrentDifficulty();

    let type = random(0, min(4, difficulty));
    if (type === 0) {
        obstacles.push(obstacleMgr.genShortLowerObstacle(getCurrentSpeed()));
    } else if (type === 1) {
        obstacles.push(obstacleMgr.genShortUpperObstacle(getCurrentSpeed()));
    } else if (type === 2) {
        obstacles.push(obstacleMgr.genLongLowerObstacle(getCurrentSpeed()));
    } else if (type === 3) {
        obstacles.push(obstacleMgr.genLongUpperObstacle(getCurrentSpeed()));
    } else if (type === 4) {
        obstacles.push(obstacleMgr.genMiddleObstacle(getCurrentSpeed()));
    }
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
    time = Date.now();

    // clear canvas
    utils.clearCanvas(ctx);

    obstacles.forEach((obstacle) => obstacle.tick(ctx));

    utils.drawScore(ctx, player.score);
    player.draw(ctx);

    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];

        let collideX = ((player.x < obstacle.x + obstacle.width) && (player.x + obstacle.width > obstacle.x));
        let collideY = ((player.y + consts.playerHeight > obstacle.y) && (player.y < obstacle.y + obstacle.height));

        if (collideX && collideY) {
            ctx.fillText("Collide", 30, 30);
        }

        ctx.fillText("py : " + player.y, 30, 50);
    }

    if (player.changingGravity) {
        if (player.gravity) {
            player.y -= 6;
            if (player.y <= roofY) {
                player.gravity = false;
                player.changingGravity = false;
            }
        } else {
            player.y += 6;
            if (player.y >= groundY) {
                player.y = groundY;
                player.gravity = true;
                player.changingGravity = false;
            }
        }
    } else if (player.jumping) {
        if (player.gravity) {
            player.y -= 4;
            if (player.y <= groundY - consts.jumpSize) {
                player.y = groundY - consts.jumpSize;
                player.jumping = false;
            }
        } else {
            player.y += 4;
            if (player.y >= roofY + consts.jumpSize) {
                player.y = roofY + consts.jumpSize;
                player.jumping = false;
            }
        }
    } else {
        if (player.gravity) {
            player.y += 2;
            if (player.y >= groundY) {
                player.y = groundY;
                player.grounded = true;
            }
        } else {
            player.y -= 2;
            if (player.y <= roofY) {
                player.y = roofY;
                player.grounded = true;
            }
        }
    }

    // add obstacle
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 400) {
        addObstacle();
    }
    // UPDATE SCORE
    player.score = Math.floor((Date.now() - startTimestamp) / 10);

    requestAnimationFrame(tick);
}

function getCurrentDifficulty() {
    return 4 //2 + Math.floor(player.score/3000);
}

function getCurrentSpeed() {
    return 5 + Math.floor(player.score / 3000);
}

// CONTROLS
document.onclick = () => controls.jump(player);
document.onkeydown = (e) => controls.handleKeyEvent(e, player)

// START GAME
tick();

