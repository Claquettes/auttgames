// CANVAS
const canvasWidth = 1000;
const canvasHeight = 200;
const backgroundColor = "#165eae";

// PLAYER
const playerWidth = 40;
const playerHeight = 40;
const jumpSize = 80;

const playerImageSrc = "/assets/dinautt/taco.png";

// BASIC OBSTACLES :
const minObstaclePlayerSpace = 2 * playerHeight + 40;

const shortObstaclesHeight = 60;
const longObstacleHeight = 100;
const basicObstacleWidth = 40;
const middleObstacleHeight = canvasHeight - minObstaclePlayerSpace;
const obstacleBorderOffset = 10;

// LIMITS
const groundY = canvasHeight - 10 - playerHeight;
const roofY = 10;

function newBasePlayer() {
    let player = {
        x: 10,
        y: canvasHeight - 10 - playerHeight,
        width: 0,
        height: 0,

        gravity: true, // 1 = on griybd, 0 = on roof
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
        obstacles: [],
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
    backgroundColor,

    playerWidth,
    playerHeight,
    jumpSize,

    playerImageSrc,

    minObstaclePlayerSpace,
    shortObstaclesHeight,
    longObstacleHeight,
    basicObstacleWidth,
    middleObstacleHeight,
    obstacleBorderOffset,

    groundY,
    roofY,

    newGame
};