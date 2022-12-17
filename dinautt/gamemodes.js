const consts = require("./consts");
const animation = require("./animations");
const utils = require("./utils");
const {genColorComponent} = require("./utils");
const colors = require("./colors");

function changeGamemode(game, gamemode) {
    if (game.gamemode.name === gamemode.name || game.changingGM) return;
    game.changingGM = true;

    console.log("Changing gamemode to " + gamemode.name);
    game.gamemode = gamemode;

    gamemode.switchMode(game, () => {
        game.changingGM = false;
    });
}

module.exports = {
    changeGamemode
}