const sessionController = require('./sessionController');
const {checkAuthenticated} = require('./auth');
const db = require('./db');

function init(app, socketio) {
    socketio.use(sessionController.wrap(sessionController.sessionMiddleware));

    socketio.on('connection', (socket) => {
        socket.on("newscore", (score) => {
            if (socket.request.session.passport.user !== undefined) {
                if (Number.isInteger(score)) {
                    db.updateHighscore(socket.request.session.passport.user, score).catch((err) => {
                        console.log(err);
                    });
                }
            }
        });
    });


    app.get('/dinautt', checkAuthenticated, (req, res) => {
        db.getDinauttLeaderboard().then((leaderboard) => {
            res.render('dinautt/dinautt', {leaderboard: leaderboard});
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)
        });
    });
}

module.exports = {
    init: init
}
