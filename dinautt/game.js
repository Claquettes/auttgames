const consts = require('./consts.js');
const obstacleMgr = require('./obstacle');
const controls = require('./controls');
const playerAbilities = require('./normalGameMode')

const animation = require('./animations');
const utils = require('./utils');
const drawingUtils = require("./drawingUtils");
const {min} = require("./utils");

function addObstacle(game) {
    let obstacle;

    let difficulty = game.gamemode.getDifficulty(game)
    let speed = game.gamemode.getSpeed(game);

    if (game.gamemode.name === "normal" || game.gamemode.name === "menu") {
        let type = utils.random(0, min(difficulty, 4));
        if (type === 0) {
            obstacle = obstacleMgr.genShortLowerObstacle(speed);
        } else if (type === 1) {
            obstacle = obstacleMgr.genShortUpperObstacle(speed);
        } else if (type === 2) {
            obstacle = obstacleMgr.genLongLowerObstacle(speed);
        } else if (type === 3) {
            obstacle = obstacleMgr.genLongUpperObstacle(speed);
        } else if (type === 4) {
            obstacle = obstacleMgr.genMiddleObstacle(speed);
        }
    } else if (game.gamemode.name === "rows") {
        console.log(difficulty);

        let type = utils.random(0, difficulty);
        if (type === 0) {
            obstacle = obstacleMgr.genRowsTopObstacle(speed);
        } else if (type === 1) {
            obstacle = obstacleMgr.genRowsMiddleObstacle(speed);
        } else if (type === 2) {
            obstacle = obstacleMgr.genRowsBottomObstacle(speed);
        }
    }

    console.log("Adding obstacle: " + obstacle);

    obstacle.animation = animation.newStaticAnimation(game, obstacle.x, -obstacle.speed, (x) => {
            obstacle.x = Math.floor(x);
        }, () => {
            game.obstacles.splice(game.obstacles.indexOf(obstacle), 1);
        },
        () => {
            return obstacle.x < -obstacle.width;
        });

    game.obstacles.push(obstacle);
}

function tick(game, ctx) {
    // clear canvas
    drawingUtils.clearCanvas(ctx, game.backgroundColor);

    console.log(game.gamemode.name);

    game.obstacles.forEach((obstacle) => obstacleMgr.drawObstacle(ctx, obstacle));

    game.gamemode.tick(ctx, game);

    game.animations.forEach((animation) => animation.tick());

    // add obstacle
    if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < 4000)
        addObstacle(game);

    if (game.player.showDebug) drawingUtils.showDebugInfo(game, ctx);
}

function startGame(context, game, gameEndCallback) {
    if (game.gamemode.name !== "menu") {
        // CONTROLS
        document.onclick = () => controls.jump(game);
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