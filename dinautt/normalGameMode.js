const consts = require("./consts");
const animations = require("./animations");
const colors = require("./colors");
const obstacleMgr = require("./obstacle");
const drawingUtils = require("./drawingUtils");
const utils = require("./utils");
const animation = require("./animations");

const gm = {
    name: "normal",
    tick: tickGm,
    backgroundColor: colors.genColorComponentRGB(22, 74, 174),
    getSpeed: (game) => (10 + Math.floor(game.player.score / 3000)) * 300,
    getDifficulty: (game) => (15 + Math.floor(game.score / 3000)) * 300,

    data: genGmData(),
    switchMode: switchMode
}

function genGmData() {
    return {
        gravity: true, // 1 = on ground, 0 = on roof
        jumping: false,
        grounded: true, // prevent double jump
        changingGravity: false,
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

function tickGm(ctx, game) {
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

function jump(game) {
    if (game.gamemode.data.changingGravity || !game.gamemode.data.grounded) return;
    game.gamemode.data.jumping = true;
    game.gamemode.data.grounded = false;

    animations.newTimedAnimation(game, game.player.y, consts.normalGMConsts.jumpY(game.gamemode.data.gravity), consts.normalGMConsts.halfJumpTime, "cubic", (y) => {
        game.player.y = Math.round(y);
    }, () => {
        game.gamemode.data.jumping = false;
        animations.newTimedAnimation(game, game.player.y, (game.gamemode.data.gravity) ? (consts.normalGMConsts.groundY) : consts.normalGMConsts.roofY, consts.normalGMConsts.halfJumpTime, "cubic", (y) => {
            game.player.y = Math.round(y);
        }, () => {
            game.gamemode.data.grounded = true;
        });
    });
}

function changeGravity(game) {
    if (game.gamemode.data.jumping || !game.gamemode.data.grounded || game.gamemode.data.changingGravity) return;
    game.gamemode.data.changingGravity = true;

    animations.newTimedAnimation(game, game.player.y, (game.gamemode.data.gravity) ? consts.normalGMConsts.roofY : consts.normalGMConsts.groundY, consts.normalGMConsts.gravityChangeTime, "cubic", (y) => {
        game.player.y = Math.round(y);
    }, () => {
        game.gamemode.data.gravity = !game.gamemode.data.gravity;
        game.gamemode.data.changingGravity = false;
    });
}

module.exports = {
    gm,
    jump,
    changeGravity
}
