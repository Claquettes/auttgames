const consts = require("./consts");

function tick(game) {
    if (game.gamemode === "normal")
        tickNormalGM(game.player);
    else if (game.gamemode === "rows")
        tickRowsGM(game.player);
}

function tickNormalGM(player) {
    if (player.changingGravity) {
        if (player.gravity) {
            player.y -= 6;
            if (player.y <= consts.roofY) {
                player.gravity = false;
                player.changingGravity = false;
            }
        } else {
            player.y += 6;
            if (player.y >= consts.groundY) {
                player.y = consts.groundY;
                player.gravity = true;
                player.changingGravity = false;
            }
        }
    } else if (player.jumping) {
        if (player.gravity) {
            player.y -= 4;
            if (player.y <= consts.groundY - consts.jumpSize) {
                player.y = consts.groundY - consts.jumpSize;
                player.jumping = false;
            }
        } else {
            player.y += 4;
            if (player.y >= consts.roofY + consts.jumpSize) {
                player.y = consts.roofY + consts.jumpSize;
                player.jumping = false;
            }
        }
    } else {
        if (player.gravity) {
            player.y += 2;
            if (player.y >= consts.groundY) {
                player.y = consts.groundY;
                player.grounded = true;
            }
        } else {
            player.y -= 2;
            if (player.y <= consts.roofY) {
                player.y = consts.roofY;
                player.grounded = true;
            }
        }
    }
}

function tickRowsGM(player) {

}


module.exports = {
    tick
};
