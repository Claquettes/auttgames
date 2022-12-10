const consts = require('./consts.js');
const obstacleMgr = require('./obstacle');
const controls = require('./controls');
const playerAbilities = require('playerAbilities')

const {min, random} = require('./utils');
const utils = require('./utils.js');

let game;
let ctx;

function addObstacle() {
    let difficulty = getCurrentDifficulty();

    let type = random(0, difficulty);
    if (type === 0) {
        game.obstacles.push(obstacleMgr.genShortLowerObstacle(getCurrentSpeed()));
    } else if (type === 1) {
        game.obstacles.push(obstacleMgr.genShortUpperObstacle(getCurrentSpeed()));
    } else if (type === 2) {
        game.obstacles.push(obstacleMgr.genLongLowerObstacle(getCurrentSpeed()));
    } else if (type === 3) {
        game.obstacles.push(obstacleMgr.genLongUpperObstacle(getCurrentSpeed()));
    } else if (type === 4) {
        game.obstacles.push(obstacleMgr.genMiddleObstacle(getCurrentSpeed()));
    }
}

function tick() {
    if (game.time === undefined) {
        game.time = Date.now();
    } else {
        if (Date.now() - game.time < 8) {
            requestAnimationFrame(tick);
            Math.seedrandom(Date.now());
            return;
        }
    }
    game.time = Date.now();

    // clear canvas
    utils.clearCanvas(ctx);

    game.obstacles.forEach((obstacle) => obstacle.tick(ctx));

    utils.drawScore(ctx, game.player.score);
    game.player.draw(ctx);

    if (obstacleMgr.checkCollisions(game)) {
        if (game.player.showDebug)
            ctx.fillText("Collide", 60, 30);
    }

    playerAbilities.tick();

    // add obstacle
    if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < 400) {
        addObstacle();
    }
    // UPDATE SCORE
    game.player.score = Math.floor((Date.now() - game.startTime) / 10);

    if (game.player.showDebug)
        utils.showDebugInfo();

    requestAnimationFrame(tick);
}

function getCurrentDifficulty() {
    return 1 + Math.floor(game.player.score / 3000);
}

function getCurrentSpeed() {
    return 5 + Math.floor(game.player.score / 3000);
}

// CONTROLS
document.onclick = () => controls.jump(game.player);
document.onkeydown = (e) => controls.handleKeyEvent(e, game.player)

function startGame(context) {
    ctx = context;
    game = consts.newGame();
    game.startTime = Date.now();

    tick();
}

module.exports = {
    startGame
}