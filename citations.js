function init(app) {
    app.get('/citations', (req, res) => {
        res.sendFile(path.join(__dirname, 'templates/citations/index.html'));
    });    
}

module.exports = {
    init: init
}