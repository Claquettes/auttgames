const consts = require("./consts");
const animations = require("./animations");

function jump(game) {
    if (game.player.changingGravity || !game.player.grounded) return;
    game.player.jumping = true;
    game.player.grounded = false;

    animations.newAnimation(game, game.player.y, consts.jumpY(game.player.gravity), consts.halfJumpTime, "cubic", (y) => {
        game.player.y = Math.round(y);
    }, () => {
        game.player.jumping = false;
        animations.newAnimation(game, game.player.y, (game.player.gravity) ? (consts.groundY) : consts.roofY, consts.halfJumpTime, "cubic", (y) => {
            game.player.y = Math.round(y);
        }, () => {
            game.player.grounded = true;
        });
    });
}

function changeGravity(game) {
    if (game.player.jumping || !game.player.grounded) return;
    game.player.changingGravity = true;

    animations.newAnimation(game, game.player.y, (game.player.gravity) ? consts.roofY : consts.groundY, consts.gravityChangeTime, "cubic", (y) => {
        game.player.y = Math.round(y);
    }, () => {
        game.player.gravity = !game.player.gravity;
        game.player.changingGravity = false;
    });
}

module.exports = {
    jump,
    changeGravity
};
