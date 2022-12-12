let animArray = [];

function tickAnimation(animation) {
    let x = 1;

    x = (Date.now() - animation.startTime) / animation.duration;
    console.log(x)

    if (animation.easeType === "cubic") {
        x = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    if (x > 1)
        x = 1;

    let newValues = animation.startValues.map((startValue, idx) => {
        let endValue = animation.endValues[idx];
        let delta = endValue - startValue;

        return startValue + delta * x;
    });

    //console.log(newValues)
    console.log(x)
    animArray.push(x);

    animation.setValuesCallback(newValues);

    if (x === 1) {
        animation.endCb();
        console.log(JSON.stringify(animArray))
    }
}

function newAnimation(game, startValues, endValues, duration, easeType, setValueFunc, endCb) {
    if (!(startValues instanceof Array))
        startValues = [startValues];
    if (!(endValues instanceof Array))
        endValues = [endValues];

    if (startValues.length !== endValues.length)
        throw new Error("Start and end values have different lengths");

    let animation = {
        startTime: Date.now(),
        startValues: startValues,
        endValues: endValues,
        duration: duration,
        easeType: easeType,
        setValuesCallback: setValueFunc,
        endCb: () => {
            endCb();
            game.animations.splice(game.animations.indexOf(animation), 1);
        },
        tick: () => tickAnimation(animation)
    }

    game.animations.push(animation);
}

module.exports = {
    tickAnimation,
    newAnimation
}