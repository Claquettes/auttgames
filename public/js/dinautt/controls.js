///////////////////////
////    CONTROLS   ////
///////////////////////

function handleKeyEvent(e, player) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    if (e.code === "ArrowUp") {
        changeGravity(player);
    } else if (e.code === "Space") {
        jump(player);
    }
};

function jump(player) {
    if (player.changingGravity || !player.grounded) return;
    player.jumping = true;
    player.grounded = false;
}

function changeGravity(player) {
    if (player.jumping) return;
    player.changingGravity = true;
}

module.exports = {
    handleKeyEvent,
    jump
};