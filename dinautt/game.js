const consts = require('./consts.js');
const obstacleMgr = require('./obstacle');
const controls = require('./controls');
const playerAbilities = require('./playerAbilities')

const {min, random} = require('./utils');
const utils = require('./utils.js');

function addObstacle(game, ctx) {
    let difficulty = game.getDifficulty()
    let speed = game.getSpeed();

    let type = random(0, difficulty);
    if (type === 0) {
        game.obstacles.push(obstacleMgr.genShortLowerObstacle(speed));
    } else if (type === 1) {
        game.obstacles.push(obstacleMgr.genShortUpperObstacle(speed));
    } else if (type === 2) {
        game.obstacles.push(obstacleMgr.genLongLowerObstacle(speed));
    } else if (type === 3) {
        game.obstacles.push(obstacleMgr.genLongUpperObstacle(speed));
    } else if (type === 4) {
        game.obstacles.push(obstacleMgr.genMiddleObstacle(speed));
    }
}

function tick(game, ctx) {
    if (game.time === undefined) {
        game.time = Date.now();
    } else {
        if (Date.now() - game.time < 8) {
            Math.seedrandom(Date.now());
            return true;
        }
    }
    game.time = Date.now();

    // clear canvas
    utils.clearCanvas(ctx);

    game.obstacles.forEach((obstacle) => obstacle.tick(ctx));

    game.player.draw(ctx);

    if (obstacleMgr.checkCollisions(game)) {
        if (game.player.showDebug) {
            ctx.fillStyle = "black";
            ctx.fillText("Collide", 100, 30);
        }
    }

    // UPDATE SCORE
    game.player.score = Math.floor((Date.now() - game.startTime) / 10);
    utils.drawScore(ctx, game.player.score);

    playerAbilities.tick(game);

    // add obstacle
    if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < 400) {
        addObstacle(game);
    }

    if (game.player.showDebug)
        utils.showDebugInfo(game, ctx);

    return true;
}

function startGame(context, game) {
    game = consts.newGame();
    game.startTime = Date.now();

    // CONTROLS
    document.onclick = () => controls.jump(game.player);
    document.onkeydown = (e) => controls.handleKeyEvent(e, game.player)

    function tickGame() {
        if (game.stopGame) {
            return;
        }

        if (tick(game, context)) {
            requestAnimationFrame(tickGame);
        }
    }

    tickGame();
}

module.exports = {
    startGame
}