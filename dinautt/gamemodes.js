const consts = require("./consts");
const animation = require("./animations");
const utils = require("./utils");
const {genColorComponent} = require("./utils");

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

    let a = animation.newAnimation(game.backgroundColor.getAsArray(), newBackground.getAsArray(), 2000, false, (color) => {
        game.backgroundColor = utils.genColorComponentRGB(color[0], color[1], color[2]);
    }, () => {
        console.log("Animation finished");
        game.animations.splice(game.animations.indexOf(a), 1);
    });

    game.animations.push(a);
}

module.exports = {
    changeGamemode
}