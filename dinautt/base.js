let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

ctx.translate(0.5, 0.5);

const game = require('./game');
const consts = require("./consts");
const menuGameMode = require("./menuGameMode");
const normalGameMode = require("./normalGameMode");

let g = consts.newGame(menuGameMode.gm);
game.startGame(ctx, g, () => {
    console.log("starting game")
    game.startGame(ctx, consts.newGame(normalGameMode.gm));
});