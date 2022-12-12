const colors = require("./colors");

// CANVAS
const canvasWidth = 10000;
const canvasHeight = 2000;

// PLAYER
const playerWidth = 400;
const playerHeight = 400;
const jumpSize = 800;

const playerImageSrc = "/assets/dinautt/taco.png";

// BASIC OBSTACLES :
const minObstaclePlayerSpace = 2 * playerHeight + 400;

const normalGMConsts = {
    shortObstaclesHeight: 600,
    longObstacleHeight: 1000,
    basicObstacleWidth: 400,
    middleObstacleHeight: canvasHeight - minObstaclePlayerSpace,
    obstacleBorderOffset: 100,
    backgroundColor: colors.genColorComponentRGB(22, 74, 174)
}

const rowsGMConsts = {
    obstacleWidth: 400,
    obstacleHeight: 400,
    backgroundColor: colors.genColorComponentHEX(0xe038e1)
}


// LIMITS
const groundY = canvasHeight - 100 - playerHeight;
const roofY = 100;

function newBasePlayer() {
    let player = {
        x: 100,
        y: canvasHeight - 100 - playerHeight,
        width: 0,
        height: 0,

        gravity: true, // 1 = on ground, 0 = on roof
        jumping: false,
        grounded: true, // prevent double jump
        changingGravity: false,

        img: new Image(),

        score: 0,

        draw: (ctx) => ctx.drawImage(player.img, 0, 0, 336, 339, player.x, player.y, playerWidth, playerHeight),

        showDebug: false
    }

    player.img.src = playerImageSrc;
    return player;
}

function newGame(isMenuGame) {
    let game = {
        player: newBasePlayer(),
        backgroundColor: normalGMConsts.backgroundColor,
        obstacles: [],
        animations: [],
        gamemode: "normal",
        score: 0,
        startTime: Date.now(),
        stopGame: false,
        isMenuGame: isMenuGame
    }

    game.getDifficulty = () => ((isMenuGame) ? 4 : 1 + Math.floor(game.player.score / 3000)) * 2;
    game.getSpeed = () => ((isMenuGame) ? 10 : 5 + Math.floor(game.player.score / 3000)) * 2;

    return game;
}

module.exports = {
    canvasWidth,
    canvasHeight,

    playerWidth,
    playerHeight,
    jumpSize,

    playerImageSrc,

    minObstaclePlayerSpace,
    normalGMConsts,
    rowsGMConsts,

    groundY,
    roofY,

    newGame
};