const gamemodes = require("./gamemodes");
const {changeGravity, jump} = require("./playerAbilities");

///////////////////////
////    CONTROLS   ////
///////////////////////

function handleKeyEvent(e, game) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    if (!game.isMenuGame) {
        if (e.code === "KeyC")
            showDebugInfo(game.player);

        if (game.gamemode === "normal") {
            if (e.code === "ArrowUp") {
                changeGravity(game);
            } else if (e.code === "Space") {
                jump(game);
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

function showDebugInfo(player) {
    player.showDebug = !player.showDebug;
}

module.exports = {
    handleKeyEvent,
    jump
};