const colors = require('./colors');
const obstacleMgr = require("./obstacle");
const utils = require("./utils");
const drawingUtils = require("./drawingUtils");
const animation = require("./animations");

const gm = {
    name: "rows",
    tick: tick,
    backgroundColor: colors.genColorComponentHEX(0xe038e1),
    getSpeed: (game) => 5000,
    getDifficulty: (game) => 2,
    data: genGmData(),
    switchMode: switchMode
};

function genGmData() {
    return {
        row: 1, // 0 = up; 1 = middle; 2 = down
        changingRow: false
    };
}

function switchMode(game, cb) {
    game.obstacles.forEach((obstacle) => {
        obstacle.animation.stop = true;
    });

    animation.newTimedAnimation(game, game.backgroundColor.getAsArray(), gm.backgroundColor.getAsArray(), 2000, "linear", (color) => {
        game.backgroundColor = colors.genColorComponentRGB(color[0], color[1], color[2]);
    }, () => {
        console.log("Animation finished");
        cb()
    });
}

function tick(ctx, game) {
    game.player.draw(ctx);

    if (obstacleMgr.checkCollisions(game)) {
        if (game.player.showDebug) {
            ctx.fillStyle = "black";
            ctx.fillText("Collide", 4000, 300);
        }
    }

    // UPDATE SCORE
    utils.updateScore(game);
    drawingUtils.drawScore(ctx, game.player.score);
}

function move(direction) {
    if (direction === "up") {
    } else if (direction === "down") {

    }
}

module.exports = {
    gm
}