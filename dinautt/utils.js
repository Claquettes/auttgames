///////////////////////
////     UTILS    ////
///////////////////////

const consts = require('./consts.js');

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function min(a, b) {
    return a < b ? a : b;
}

module.exports = {
    random,
    min,
}