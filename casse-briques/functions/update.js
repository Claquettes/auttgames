function updatePad(dt) {
    dt= dt*100;
    if (rightPressed) {
        paddle.x += paddleSpeed * dt;
    } else if (leftPressed) {
        paddle.x -= paddleSpeed * dt;
    }
}
function renderBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function renderPaddle() {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Render the bricks on the canvas
function renderBricks() {
    for (var i = 0; i < bricks.length; i++) {
        ctx.fillStyle = bricks[i].color;
        ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
        colorBricks();
    }
}

function updateBallPosition() {
    ball.x += ball.speedX + 0.1;
    ball.y += ball.speedY + 0.1;
    if (ball.speedX > maxSpeed) {
        ball.speedX = maxSpeed;
    }
    if (ball.speedX < -maxSpeed) {
        ball.speedX = -maxSpeed;
    }
    if (ball.speedY > maxSpeed) {
        ball.speedY = maxSpeed;
    }
    if (ball.speedY < -maxSpeed) {
        ball.speedY = -maxSpeed;
    }
}
