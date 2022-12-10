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

function drawRoundButton(ctx, x, y, width, height, arcsize) {
    ctx.beginPath();
    ctx.moveTo(x + arcsize, y);
    ctx.lineTo(x + width - arcsize, y);
    ctx.arcTo(x + width, y, x + width, y + arcsize, arcsize);
    ctx.lineTo(x + width, y + height - arcsize);
    ctx.arcTo(x + width, y + height, x + width - arcsize, y + height, arcsize);
    ctx.lineTo(x + arcsize, y + height);
    ctx.arcTo(x, y + height, x, y - arcsize, arcsize);
    ctx.lineTo(x, y + arcsize);
    ctx.arcTo(x, y, x + arcsize, y, arcsize);
    ctx.lineTo(x + arcsize, y);
    ctx.stroke();
    ctx.fill();
}

function showDebugInfo(game, ctx) {
    ctx.fillText("x : " + game.player.x, 30, 30);
    ctx.fillText("y : " + game.player.y, 30, 50);
    ctx.fillText("gravity : " + game.player.gravity, 30, 70);
    ctx.fillText("jumping : " + game.player.jumping, 30, 90);
    ctx.fillText("grounded : " + game.player.grounded, 30, 110);
    ctx.fillText("changingGravity : " + game.player.changingGravity, 30, 130);
    ctx.fillText("difficulty : " + getCurrentDifficulty(), 30, 150);
    ctx.fillText("speed : " + getCurrentSpeed(), 30, 170);
}

module.exports = {
    random,
    min,
    drawScore,
    clearCanvas,
    drawRoundButton,
    showDebugInfo
}