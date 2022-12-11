function init(app) {
    app.get('/mimir', (req, res) => {
        res.sendfile("amimir/" + Math.floor((Math.random() * (5 + 1 - 1)) + 1) + ".gif");
    });
}

module.exports = {
    init
}