function init(app) {
    app.get('/dinautt', (req, res) => {
        res.sendFile(path.join(__dirname, 'templates/dinautt/index.html'));
    });
}

module.exports = {
    init: init
}