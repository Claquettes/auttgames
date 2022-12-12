const utils = require("./utils");

// CANVAS
const canvasWidth = 1000;
const canvasHeight = 200;

// PLAYER
const playerWidth = 40;
const playerHeight = 40;
const jumpSize = 80;

const playerImageSrc = "/assets/dinautt/taco.png";

// BASIC OBSTACLES :
const minObstaclePlayerSpace = 2 * playerHeight + 40;

const normalGMConsts = {
    shortObstaclesHeight: 60,
    longObstacleHeight: 100,
    basicObstacleWidth: 40,
    middleObstacleHeight: canvasHeight - minObstaclePlayerSpace,
    obstacleBorderOffset: 10,
    backgroundColor: utils.genColorComponentRGB(22, 74, 174)
}

const rowsGMConsts = {
    obstacleWidth: 40,
    obstacleHeight: 40,
    backgroundColor: utils.genColorComponentHEX(0xe038e1)
}


// LIMITS
const groundY = canvasHeight - 10 - playerHeight;
const roofY = 10;

function newBasePlayer() {
    let player = {
        x: 10,
        y: canvasHeight - 10 - playerHeight,
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

    game.getDifficulty = () => ((isMenuGame) ? 4 : 1 + Math.floor(game.player.score / 3000));
    game.getSpeed = () => ((isMenuGame) ? 10 : 5 + Math.floor(game.player.score / 3000));

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