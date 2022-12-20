///////////////////////
////     UTILS    ////
///////////////////////

const consts = require('./consts.js');

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function min(a, b) {
    return a < b ? a : b;
}

function updateScore(game) {
    game.player.score = Math.floor((Date.now() - game.startTime) / 10);
}

module.exports = {
    random,
    min,
    updateScore
}