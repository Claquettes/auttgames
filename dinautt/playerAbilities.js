const consts = require("./consts");

function tick(game) {
    if (game.player.changingGravity) {
        if (game.player.gravity) {
            game.player.y -= 6;
            if (game.player.y <= consts.roofY) {
                game.player.gravity = false;
                game.player.changingGravity = false;
            }
        } else {
            game.player.y += 6;
            if (game.player.y >= consts.groundY) {
                game.player.y = consts.groundY;
                game.player.gravity = true;
                game.player.changingGravity = false;
            }
        }
    } else if (game.player.jumping) {
        if (game.player.gravity) {
            game.player.y -= 4;
            if (game.player.y <= consts.groundY - consts.jumpSize) {
                game.player.y = consts.groundY - consts.jumpSize;
                game.player.jumping = false;
            }
        } else {
            game.player.y += 4;
            if (game.player.y >= consts.roofY + consts.jumpSize) {
                game.player.y = consts.roofY + consts.jumpSize;
                game.player.jumping = false;
            }
        }
    } else {
        if (game.player.gravity) {
            game.player.y += 2;
            if (game.player.y >= consts.groundY) {
                game.player.y = consts.groundY;
                game.player.grounded = true;
            }
        } else {
            game.player.y -= 2;
            if (game.player.y <= consts.roofY) {
                game.player.y = consts.roofY;
                game.player.grounded = true;
            }
        }
    }
}

module.exports = {
    tick
};
