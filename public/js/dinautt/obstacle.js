/////////////////////////////
////     OBSTACLE GEN    ////
/////////////////////////////

const consts = require('./consts');

function genShortUpperObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.speed = speed;
    obstacle.height = consts.shortObstaclesHeight;
    obstacle.color = "green";
    obstacle.borderColor = "darkgreen";

    return obstacle;
}

function genShortLowerObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.shortObstaclesHeight;
    obstacle.color = "green";
    obstacle.borderColor = "darkgreen";
    obstacle.y = consts.canvasHeight - obstacle.height;

    return obstacle;
}

function genLongUpperObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.longObstacleHeight;
    obstacle.color = "pink";
    obstacle.borderColor = "red";

    return obstacle;
}

function genLongLowerObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.longObstacleHeight;
    obstacle.color = "pink";
    obstacle.borderColor = "red";
    obstacle.y = consts.canvasHeight - obstacle.height;

    return obstacle;
}

function genMiddleObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.middleObstacleHeight;
    obstacle.y = consts.canvasHeight / 2 - consts.middleObstacleHeight / 2;
    obstacle.color = "yellow";
    obstacle.borderColor = "gold";

    return obstacle;
}

function genBasicObstacle(speed) {
    let obstacle = {
        speed: speed,
        width: consts.basicObstacleWidth,
        x: consts.canvasWidth,
        y: 0,
    };

    obstacle.tick = (ctx) => {
        obstacle.x -= obstacle.speed;
        drawObstacle(ctx, obstacle);
    }

    return obstacle;
}

//////////////////////////
//// OBSTACLE DRAWING ////
//////////////////////////

function drawObstacle(ctx, obstacle) {
    ctx.fillStyle = obstacle.borderColor;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x + consts.obstacleBorderOffset, obstacle.y + consts.obstacleBorderOffset, obstacle.width - 2 * consts.obstacleBorderOffset, obstacle.height - 2 * consts.obstacleBorderOffset);
}

module.exports = {
    genShortUpperObstacle,
    genShortLowerObstacle,
    genLongUpperObstacle,
    genLongLowerObstacle,
    genMiddleObstacle,
    drawObstacle
};