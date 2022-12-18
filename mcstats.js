const path = require("path");

function init(app) {
    app.get('/mcstats', (req, res) => {
       res.render("mcstats/mcstats")
    });
}

module.exports = {
    init
}