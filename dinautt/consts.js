const colors = require("./colors");

// CANVAS
const canvasWidth = 10000;
const canvasHeight = 2000;

// PLAYER AND LIMITS
const playerWidth = 400;
const playerHeight = 400;

const playerImageSrc = "/assets/dinautt/taco.png";

// GAMEMODES

const minObstaclePlayerSpace = 2 * playerHeight + 400;

const normalGMConsts = {
    backgroundColor: colors.genColorComponentRGB(22, 74, 174),

    groundY: canvasHeight - 200 - playerHeight,
    roofY: 100,

    shortObstaclesHeight: 600,
    longObstacleHeight: 1000,
    basicObstacleWidth: 400,
    obstacleBorderOffset: 100,

    middleObstacleHeight: canvasHeight - minObstaclePlayerSpace,

    jumpSize: 700,
    halfJumpTime: 350,
    gravityChangeTime: 350,

    jumpY: (gravity) => (gravity) ? (normalGMConsts.groundY - normalGMConsts.jumpSize) : (normalGMConsts.roofY + normalGMConsts.jumpSize)
}

const rowsGMConsts = {
    backgroundColor: colors.genColorComponentHEX(0xe038e1),

    obstacleWidth: 400,
    obstacleHeight: 400,

    rowsY: (row) => Math.round(canvasHeight / 7 * (2 * (row + 1)) - rowsGMConsts.obstacleHeight / 2 - playerHeight / 2)
};

function newBasePlayer() {
    let player = {
        x: 200,
        y: normalGMConsts.groundY,
        width: 0,
        height: 0,

        img: new Image(),

        score: 0,

        draw: (ctx) => ctx.drawImage(player.img, 0, 0, 336, 339, player.x, player.y, playerWidth, playerHeight),

        showDebug: false
    }

    player.img.src = playerImageSrc;
    return player;
}

function newGame(gamemode) {
    return {
        player: newBasePlayer(),
        obstacles: [],
        animations: [],
        gamemode: gamemode,
        backgroundColor: gamemode.backgroundColor,
        changingGM: false,
        score: 0,
        startTime: Date.now(),
        stopGame: false,
    };
}

module.exports = {
    canvasWidth,
    canvasHeight,

    playerWidth,
    playerHeight,

    playerImageSrc,

    normalGMConsts,
    rowsGMConsts,

    newGame
};