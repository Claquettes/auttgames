let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

const game = require('./game');
game.startGame(ctx);