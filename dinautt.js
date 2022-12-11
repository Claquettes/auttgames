// noinspection JSUnresolvedVariable

const sessionController = require('./sessionController');
const {checkAuthenticated} = require('./auth');
const db = require('./db');

let fs = require('fs');
let browserify = require('browserify');
let watchify = require('watchify');

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

    app.get('/dinautt2', (req, res) => {
        res.render('dinautt2/dinautt2.ejs');
    });

    let b = browserify({
        entries: ['dinautt/base.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });

    b.on('update', bundle);
    bundle();

    function bundle() {
        b.bundle()
            .on('error', console.error)
            .pipe(fs.createWriteStream('public/js/dinautt2.js'))
        ;
    }
}

module.exports = {
    init: init
}
