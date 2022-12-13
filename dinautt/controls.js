const gamemodes = require("./gamemodes");
const normalGameMode = require("./normalGameMode");
const rowsGameMode = require("./rowsGameMode");

///////////////////////
////    CONTROLS   ////
///////////////////////

function handleKeyEvent(e, game) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    if (game.gamemode.name !== "menu") {
        if (e.code === "KeyC")
            showDebugInfo(game.player);

        if (game.gamemode.name === "normal") {
            if (e.code === "ArrowUp") {
                normalGameMode.changeGravity(game);
            } else if (e.code === "Space") {
                normalGameMode.jump(game);
            } else if (e.code === "KeyV") {
                gamemodes.changeGamemode(game, rowsGameMode.gm);
            }
        } else if (game.gamemode.name === "rows") {
            if (e.code === "KeyV") {
                gamemodes.changeGamemode(game, normalGameMode.gm);
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
    handleKeyEvent
};