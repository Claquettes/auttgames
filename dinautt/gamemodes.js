const consts = require("./consts");
const animation = require("./animations");
const utils = require("./utils");
const {genColorComponent} = require("./utils");
const colors = require("./colors");

function changeGamemode(game, gamemode) {
    console.log("Changing gamemode to " + gamemode);
    game.gamemode = gamemode;
    game.obstacles = [];

    console.log(gamemode)

    let newBackground;

    if (gamemode === "normal")
        newBackground = consts.normalGMConsts.backgroundColor;
    else if (gamemode === "rows")
        newBackground = consts.rowsGMConsts.backgroundColor;

    console.log("newbackground: " + newBackground.getAsHex());

    animation.newTimedAnimation(game, game.backgroundColor.getAsArray(), newBackground.getAsArray(), 2000, "linear", (color) => {
        game.backgroundColor = colors.genColorComponentRGB(color[0], color[1], color[2]);
    }, () => {
        console.log("Animation finished");
    });
}

module.exports = {
    changeGamemode
}