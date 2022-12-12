const consts = require('./consts.js');
const obstacleMgr = require('./obstacle');
const controls = require('./controls');
const playerAbilities = require('./playerAbilities')

const animation = require('./animations');
const utils = require('./utils');
const drawingUtils = require("./drawingUtils");
const {min} = require("./utils");

function addObstacle(game) {
    let obstacle;

    let difficulty = game.getDifficulty()
    let speed = game.getSpeed();

    if (game.gamemode === "normal") {
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
    } else if (game.gamemode === "rows") {
        let type = utils.random(difficulty, 2);
        if (type === 0) {
            obstacle = obstacleMgr.genRowsTopObstacle(speed);
        } else if (type === 1) {
            obstacle = obstacleMgr.genRowsMiddleObstacle(speed);
        } else if (type === 2) {
            obstacle = obstacleMgr.genRowsBottomObstacle(speed);
        }
    }

    obstacle.animation = animation.newStaticAnimation(game, obstacle.x, -obstacle.speed, (x) => {
            obstacle.x = Math.floor(x);
        }, () => {
            game.obstacles.splice(game.obstacles.indexOf(obstacle), 1);
        },
        () => {
            return obstacle.x < 0;
        });

    game.obstacles.push(obstacle);
}

function tick(game, ctx) {
    // clear canvas
    drawingUtils.clearCanvas(ctx, game.backgroundColor);

    game.obstacles.forEach((obstacle) => obstacleMgr.drawObstacle(ctx, obstacle));

    if (!game.isMenuGame) {
        game.player.draw(ctx);

        if (obstacleMgr.checkCollisions(game)) {
            if (game.player.showDebug) {
                ctx.fillStyle = "black";
                ctx.fillText("Collide", 4000, 300);
            }
        }

        // UPDATE SCORE
        game.player.score = Math.floor((Date.now() - game.startTime) / 10);
        drawingUtils.drawScore(ctx, game.player.score);
    } else {
        ctx.fillStyle = "black";
        ctx.font = "200px Arial";
        let text = "Press Space";
        let measure = ctx.measureText(text);

        ctx.fillText(text, consts.canvasWidth / 2 - measure.width / 2, consts.canvasHeight / 2);
    }

    game.animations.forEach((animation) => animation.tick());

    // add obstacle
    if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < 4000)
        addObstacle(game);

    if (game.player.showDebug) drawingUtils.showDebugInfo(game, ctx);
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