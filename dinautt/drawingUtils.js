const consts = require("./consts");

function drawScore(ctx, score) {
    ctx.fillStyle = "rgb(23 48 111)";
    ctx.fillRect(consts.canvasWidth - 1400 - 100, 0, 1400 + 100, 250 + 100);
    ctx.fillStyle = "#488ae8";
    ctx.fillRect(consts.canvasWidth - 1400 - 50, 0, 1400 + 50, 250 + 50);

    ctx.fillStyle = "black";
    ctx.font = "200px Arial";
    ctx.fillText("Score: " + score, consts.canvasWidth - 1400, 230);
}

function clearCanvas(ctx, bg) {
    ctx.fillStyle = bg.getAsHex();
    ctx.fillRect(0, 0, consts.canvasWidth, consts.canvasHeight);
}


/*function drawRoundButton(ctx, x, y, width, height, arcsize) {
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
*/
function showDebugInfo(game, ctx) {
    ctx.fillText("x : " + game.player.x, 300, 300);
    ctx.fillText("y : " + game.player.y, 300, 500);
    if (game.gamemode.name === "normal") {
        ctx.fillText("gravity : " + game.gamemode.data.gravity, 300, 700);
        ctx.fillText("jumping : " + game.gamemode.data.jumping, 300, 900);
        ctx.fillText("grounded : " + game.gamemode.data.grounded, 300, 1100);
        ctx.fillText("changingGravity : " + game.gamemode.data.changingGravity, 300, 1300);
    } else if (game.gamemode.name === "rows") {
        ctx.fillText("row : " + game.gamemode.data.row, 300, 700);
        ctx.fillText("changingRow : " + game.gamemode.data.changingRow, 300, 900);
    }
    ctx.fillText("difficulty : " + game.gamemode.getDifficulty(game), 300, 1500);
    ctx.fillText("speed : " + game.gamemode.getSpeed(game), 300, 1700);
    ctx.fillText("gamemode : " + game.gamemode.name, 1500, 300);
    ctx.fillText("changingGM : " + game.changingGM, 1500, 500);
}


module.exports = {
    drawScore,
    clearCanvas,
    showDebugInfo,
}