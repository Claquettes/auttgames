function tickAnimation(animation) {
    if (animation.stop) {
        animation.endCb();
        return;
    }

    let x = 1;
    let newValues;

    if (animation.type === "timed") {
        x = (Date.now() - animation.startTime) / animation.duration;
        console.log(x)

        if (animation.easeType === "cubic") {
            x = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }

        if (x > 1)
            x = 1;

        newValues = animation.startValues.map((startValue, idx) => {
            let endValue = animation.endValues[idx];
            let delta = endValue - startValue;

            return startValue + delta * x;
        });
    } else if (animation.type === "static") {
        if (animation.endCheck && animation.endCheck())
            return animation.endCb();

        x = (Date.now() - animation.startTime) / 1000;

        newValues = animation.startValues.map((startValue, idx) => {
            return startValue + animation.increase[idx] * x;
        });
    }

    animation.setValuesCallback(newValues);

    if (x === 1 && animation.type === "timed") {
        animation.endCb();
    }
}

function newTimedAnimation(game, startValues, endValues, duration, easeType, setValueFunc, endCb) {
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
        type: "timed",
        setValuesCallback: setValueFunc,
        endCb: () => {
            endCb();
            game.animations.splice(game.animations.indexOf(animation), 1);
        },
        tick: () => tickAnimation(animation)
    }

    game.animations.push(animation);

    return animation;
}

function newStaticAnimation(game, startValues, increasePerSecond, setValueFunc, endCb, endCheck) {
    if (!(startValues instanceof Array))
        startValues = [startValues];
    if (!(increasePerSecond instanceof Array))
        increasePerSecond = [increasePerSecond];

    if (startValues.length !== increasePerSecond.length)
        throw new Error("Start and end values have different lengths");

    let animation = {
        startTime: Date.now(),
        startValues: startValues,
        increase: increasePerSecond,
        type: "static",
        setValuesCallback: setValueFunc,
        endCb: () => {
            endCb();
            game.animations.splice(game.animations.indexOf(animation), 1);
        },
        endCheck: endCheck,
        tick: () => tickAnimation(animation)
    }

    game.animations.push(animation);

    return animation;
}

module.exports = {
    tickAnimation,
    newTimedAnimation: newTimedAnimation,
    newStaticAnimation: newStaticAnimation
}