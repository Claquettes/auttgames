const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}).join('');

function hexToRgb(hexColor) {
    return {
        r: (hexColor >> 16) & 0xFF,
        g: (hexColor >> 8) & 0xFF,
        b: hexColor & 0xFF,
    }
}

function genColorComponentRGB(r, g, b) {
    let c = {
        r: Math.floor(r),
        g: Math.floor(g),
        b: Math.floor(b),
        getAsHex: () => rgbToHex(c.r, c.g, c.b),
        getAsArray: () => [c.r, c.g, c.b]
    }

    return c;
}

function genColorComponentHEX(hex) {
    let rgb = hexToRgb(hex);

    let c = {
        r: Math.floor(rgb.r),
        g: Math.floor(rgb.g),
        b: Math.floor(rgb.b),
        getAsHex: () => rgbToHex(c.r, c.g, c.b),
        getAsArray: () => [c.r, c.g, c.b]
    }

    return c;
}

module.exports = {
    rgbToHex,
    hexToRgb,
    genColorComponentRGB,
    genColorComponentHEX
}