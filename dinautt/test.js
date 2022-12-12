const consts = require("./consts");

function clearCanvas(ctx) {
    ctx.fillStyle = "#165eae";
    console.log(ctx)
    ctx.fillRect(0, 0, consts.canvasWidth, consts.canvasHeight);
}

module.exports = {
    clearCanvas
}