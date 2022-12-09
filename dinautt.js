// noinspection JSUnresolvedVariable

const sessionController = require('./sessionController');
const {checkAuthenticated} = require('./auth');
const db = require('./db');

function init(app, socketio) {
    socketio.use(sessionController.wrap(sessionController.sessionMiddleware));

    socketio.on('connection', (socket) => {
            socket.on("newscore", (score) => {
                if (socket.request.session.passport === undefined) {
                    return;
                }

                let user = socket.request.session.passport.user;
                if (Number.isInteger(score)) {
                    db.updateDinautt(user.id, score).catch((err) => {
                        console.log(err);
                    });
                }
            });
        }
    );


    app.get('/dinautt', checkAuthenticated, (req, res) => {
        db.getDinauttLeaderboard().then((leaderboard) => {
            res.render('dinautt/dinautt.ejs', {leaderboard: leaderboard});
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)
        });
    });
}

module.exports = {
    init: init
}
