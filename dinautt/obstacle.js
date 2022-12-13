const consts = require('./consts');

/////////////////////////////
////     OBSTACLE GEN    ////
/////////////////////////////

function genBasicObstacle(speed) {
    let obstacle = {
        speed: speed,
        width: consts.normalGMConsts.basicObstacleWidth,
        x: consts.canvasWidth,
        y: 0,
        tick: () => {
            console.log(obstacle);
        }
    };

    return obstacle;
}

/// NORMAL GM

function genShortUpperObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.speed = speed;
    obstacle.height = consts.normalGMConsts.shortObstaclesHeight;
    obstacle.color = "green";
    obstacle.borderColor = "darkgreen";

    return obstacle;
}

function genShortLowerObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.normalGMConsts.shortObstaclesHeight;
    obstacle.color = "green";
    obstacle.borderColor = "darkgreen";
    obstacle.y = consts.canvasHeight - obstacle.height;

    return obstacle;
}

function genLongUpperObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.normalGMConsts.longObstacleHeight;
    obstacle.color = "pink";
    obstacle.borderColor = "red";

    return obstacle;
}

function genLongLowerObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.normalGMConsts.longObstacleHeight;
    obstacle.color = "pink";
    obstacle.borderColor = "red";
    obstacle.y = consts.canvasHeight - obstacle.height;

    return obstacle;
}

function genMiddleObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.normalGMConsts.middleObstacleHeight;
    obstacle.y = consts.canvasHeight / 2 - consts.normalGMConsts.middleObstacleHeight / 2;
    obstacle.color = "yellow";
    obstacle.borderColor = "gold";

    return obstacle;
}

/// ROWS GM

function genRowsTopObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.rowsGMConsts.obstacleHeight;
    obstacle.y = consts.canvasHeight / 6 - consts.rowsGMConsts.obstacleHeight / 2;
    obstacle.color = "yellow";
    obstacle.borderColor = "gold";

    return obstacle;
}

function genRowsMiddleObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.rowsGMConsts.obstacleHeight;
    obstacle.y = consts.canvasHeight / 2 - consts.rowsGMConsts.obstacleHeight / 2;
    obstacle.color = "yellow";
    obstacle.borderColor = "gold";

    return obstacle;
}

function genRowsBottomObstacle(speed) {
    let obstacle = genBasicObstacle(speed);

    obstacle.height = consts.rowsGMConsts.obstacleHeight;
    obstacle.y = consts.canvasHeight / 6 * 5 - consts.rowsGMConsts.obstacleHeight / 2;
    obstacle.color = "yellow";
    obstacle.borderColor = "gold";

    return obstacle;
}

//////////////////////////
//// OBSTACLE DRAWING ////
//////////////////////////

function drawObstacle(ctx, obstacle) {
    ctx.fillStyle = obstacle.borderColor;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x + consts.normalGMConsts.obstacleBorderOffset, obstacle.y + consts.normalGMConsts.obstacleBorderOffset, obstacle.width - 2 * consts.normalGMConsts.obstacleBorderOffset, obstacle.height - 2 * consts.normalGMConsts.obstacleBorderOffset);
}

////////////////////
//// COLLISIONS ////
////////////////////

function checkCollisions(game, ctx) {
    for (let i = 0; i < game.obstacles.length; i++) {
        let obstacle = game.obstacles[i];

        let collideX = ((game.player.x < obstacle.x + obstacle.width) && (game.player.x + obstacle.width > obstacle.x));
        let collideY = ((game.player.y + consts.playerHeight > obstacle.y) && (game.player.y < obstacle.y + obstacle.height));

        if (collideX && collideY) {
            return true;
        }
    }

    return false;
}

module.exports = {
    genShortUpperObstacle,
    genShortLowerObstacle,
    genLongUpperObstacle,
    genLongLowerObstacle,
    genMiddleObstacle,

    genRowsTopObstacle,
    genRowsMiddleObstacle,
    genRowsBottomObstacle,

    drawObstacle,

    checkCollisions
};