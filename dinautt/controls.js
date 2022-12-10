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
    } else if (e.code === "KeyC") {
        showDebugInfo(player);
    }
};

function jump(player) {
    if (player.changingGravity || !player.grounded) return;
    player.jumping = true;
    player.grounded = false;
}

function changeGravity(player) {
    if (player.jumping || !player.grounded) return;
    player.changingGravity = true;
}

function showDebugInfo(player) {
    player.showDebug = !player.showDebug;
}

module.exports = {
    handleKeyEvent,
    jump
};