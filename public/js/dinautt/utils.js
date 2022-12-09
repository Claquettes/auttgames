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

function drawScore(ctx, score) {
    ctx.fillStyle = "rgb(23 48 111)";
    ctx.fillRect(consts.canvasWidth - 130 - 10, 0, 130 + 10, 25 + 10);
    ctx.fillStyle = "#488ae8";
    ctx.fillRect(consts.canvasWidth - 130 - 5, 0, 130 + 5, 25 + 5);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, consts.canvasWidth - 128, 23);
}

function clearCanvas(ctx) {
    ctx.fillStyle = consts.backgroundColor;
    ctx.fillRect(0, 0, consts.canvasWidth, consts.canvasHeight);
}

module.exports = {
    random,
    min,
    drawScore,
    clearCanvas
}