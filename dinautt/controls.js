const gamemodes = require("./gamemodes");

///////////////////////
////    CONTROLS   ////
///////////////////////

function handleKeyEvent(e, game) {
    console.dir(gamemodes);

    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    if (!game.isMenuGame) {
        if (game.gamemode === "normal") {
            if (e.code === "ArrowUp") {
                changeGravity(game.player);
            } else if (e.code === "Space") {
                jump(game.player);
            } else if (e.code === "KeyC") {
                showDebugInfo(game.player);
            } else if (e.code === "KeyV") {
                gamemodes.changeGamemode(game, "rows");
            }
        } else if (game.gamemode === "rows") {
            if (e.code === "KeyV") {
                gamemodes.changeGamemode(game, "normal");
            }
        }
    } else {
        if (event.code === "Space") {
            game.stopGame = true;
        }
    }
};

function jump(player) {
    if (player.changingGravity || !player.grounded) return;
    player.jumping = true;
    player.grounded = false;
}

function changeGravity(player) {
    if (player.jumping || !player.grounded) return;
    player.changingGravity = true;
}

function showDebugInfo(player) {
    player.showDebug = !player.showDebug;
}

module.exports = {
    handleKeyEvent,
    jump
};