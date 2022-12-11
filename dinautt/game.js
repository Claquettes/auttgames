const consts = require('./consts.js');
const obstacleMgr = require('./obstacle');
const controls = require('./controls');
const playerAbilities = require('./playerAbilities')

const {min, random} = require('./utils');
const utils = require('./utils.js');
const {canvasHeight} = require("./consts");

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
        }
    }
    game.time = Date.now();

    // clear canvas
    utils.clearCanvas(ctx);

    game.obstacles.forEach((obstacle) => obstacle.tick(ctx));

    if (!game.isMenuGame) {
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
    } else {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        let text = "Press Space";
        let measure = ctx.measureText(text);

        ctx.fillText(text, consts.canvasWidth / 2 - measure.width / 2, consts.canvasHeight / 2);
    }

    // add obstacle
    if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < 400) {
        addObstacle(game);
    }

    if (game.player.showDebug)
        utils.showDebugInfo(game, ctx);
}

function startGame(context, game, gameEndCallback) {
    if (!game.isMenuGame) {
        // CONTROLS
        document.onclick = () => controls.jump(game.player);
    }

    document.onkeydown = (e) => controls.handleKeyEvent(e, game);

    function tickGame() {
        if (game.stopGame) {
            gameEndCallback();
            return;
        }

        tick(game, context)
        requestAnimationFrame(tickGame);
    }

    requestAnimationFrame(tickGame);

    return game;
}

module.exports = {
    startGame
}