let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

const game = require('./game');
const consts = require("./consts");

console.log(game)

let g = consts.newGame(true);
game.startGame(ctx, g, () => {
    game.startGame(ctx, consts.newGame(false));
});