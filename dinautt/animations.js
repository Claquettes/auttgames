function tickAnimation(animation) {
    let coef = 1;

    if (!animation.logarithmic) {
        coef = (Date.now() - animation.startTime) / animation.duration;
        console.log(coef)
    } else
        coef = Math.log(Date.now() - animation.startTime) / Math.log(animation.startTime + animation.duration);

    if (coef > 1)
        coef = 1;

    let newValues = animation.startValues.map((startValue, idx) => {
        let endValue = animation.endValues[idx];
        let delta = endValue - startValue;

        return startValue + delta * coef;
    });

    console.log(newValues)
    animation.setValuesCallback(newValues);

    if (coef === 1) {
        animation.endCb();
    }
}

function newAnimation(startValues, endValues, duration, logarithmic, setValueFunc, endCb) {
    let animation = {
        startTime: Date.now(),
        startValues: startValues,
        endValues: endValues,
        duration: duration,
        logarithmic: logarithmic,
        setValuesCallback: setValueFunc,
        endCb: endCb,
        tick: () => tickAnimation(animation)
    }

    return animation;
}

module.exports = {
    tickAnimation,
    newAnimation
}