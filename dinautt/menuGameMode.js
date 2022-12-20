const consts = require("./consts");

const gm = {
    name: "menu",
    tick: tick,
    backgroundColor: consts.normalGMConsts.backgroundColor,
    getSpeed: () => 4000,
    getDifficulty: () => 3000,
};

function tick(ctx, game) {
    ctx.fillStyle = "black";
    ctx.font = "200px Arial";
    let text = "Press Space";
    let measure = ctx.measureText(text);

    ctx.fillText(text, consts.canvasWidth / 2 - measure.width / 2, consts.canvasHeight / 2);
}

module.exports = {
    gm
};