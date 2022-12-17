const colors = require('./colors');
const obstacleMgr = require("./obstacle");
const utils = require("./utils");
const drawingUtils = require("./drawingUtils");
const animation = require("./animations");
const consts = require("./consts");

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

    game.gamemode.data = genGmData();

    setRow(game, 1);

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

function move(game, direction) {
    if (direction === "up") {
        if (game.gamemode.data.row === 0) return;
        setRow(game, game.gamemode.data.row - 1);
    } else if (direction === "down") {
        if (game.gamemode.data.row === 2) return;
        setRow(game, game.gamemode.data.row + 1);
    }
}

function setRow(game, row) {
    if (game.gamemode.data.changingRow) return;
    game.gamemode.data.row = row;
    game.gamemode.data.changingRow = true;

    animation.newTimedAnimation(game, game.player.y, consts.rowsGMConsts.rowsY(row), 200, "cubic", (y) => {
        game.player.y = y;
    }, () => {
        game.gamemode.data.changingRow = false;
    });
}

module.exports = {
    gm,
    move
}