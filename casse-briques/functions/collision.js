function checkPaddleCollision() {
    if (ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
        var paddleCenter = paddle.x + paddle.width / 2;
        var ballDistFromPaddleCenter = ball.x - paddleCenter;
        if (ballDistFromPaddleCenter < 0.1) {
            ball.speedX = ballDistFromPaddleCenter * 0.15 + 8.5;
        }
        else {ball.speedX = ballDistFromPaddleCenter * 0.15 + 4.5;}
    }
}

function checkBordersCollision() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
    //on check la collision du pad avec les bords du canvas
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

function checkBrickCollision() { //on check la collision avec les briques
    for (var i = 0; i < bricks.length; i++) {
        if ((ball.x > bricks[i].x) && (ball.x < bricks[i].x + bricks[i].width )&& (ball.y > bricks[i].y )&& (ball.y < bricks[i].y + bricks[i].height)) {
            ball.speedY = -ball.speedY;
            //on diminue la durabilité de la brique
            bricks[i].durability -= 1;   
            //si la durabilité est à 0, on la supprime
            if (bricks[i].durability == 0) {
            bricks.splice(i, 1);
            }
        }
    }
}