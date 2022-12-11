const path = require("path");

function init(app) {
    app.get('/mimir', (req, res) => {
        res.sendFile(path.join(__dirname, './amimir/' + Math.floor((Math.random() * (5 + 1 - 1)) + 1) + '.gif'));
    });
}

module.exports = {
    init
}