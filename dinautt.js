// noinspection JSUnresolvedVariable

const sessionController = require('./sessionController');
const {checkAuthenticated} = require('./auth');
const db = require('./db');

function init(app, socketio) {
    socketio.use(sessionController.wrap(sessionController.sessionMiddleware));

    socketio.on('connection', (socket) => {
        console.log(`[connection] ${socket.id}`);
        socket.on("newscore", (score) => {
            if (socket.request.session.passport === undefined) {
                console.log("no session");
                return;
            }

            let user = socket.request.session.passport.user;
            console.log("score" + score)
            if (Number.isInteger(score)) {
                console.log("score is integer")
                db.updateDinautt(user.id, score).catch((err) => {
                    console.log(err);
                });
                console.log("score updated");
                }
            });
        }
    );


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
