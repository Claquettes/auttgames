const canvasWidth = 1000;
const canvasHeight = 200;
const backgroundColor = "#165eae";

const playerWidth = 40;
const playerHeight = 40;
const jumpSize = 80;

const playerImageSrc = "/assets/dinautt/taco.png";

// BASIC OBSTACLES :
const minObstaclePlayerSpace = 2 * playerHeight + 30;

const shortObstaclesHeight = 60;
const longObstacleHeight = 100;
const basicObstacleWidth = 40;
const middleObstacleHeight = canvasHeight - minObstaclePlayerSpace;
const obstacleBorderOffset = 10;

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
    obstacleBorderOffset
};