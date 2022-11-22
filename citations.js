const sessionController = require('./sessionController');
const { checkAuthenticated } = require('./auth');
const db = require('./db');

let rooms = [];
let players = [];
function init(app, socketio) {
    socketio.use(sessionController.wrap(sessionController.sessionMiddleware));

    app.get('/citations', checkAuthenticated, (req, res) => {
        res.render("citations/citations", { username: req.user.username });
    });

    socketio.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    socketio.on('connection', (socket) => {
        console.log(`[connection] ${socket.id}`);
        socket.emit('get rooms', rooms);
        socket.on('create room', async () => {
            console.log(socket.request.session.passport.user)
            let user = await db.getUserById(socket.request.session.passport.user);
            console.log('Got user : ' + user.username)

            let id = roomId();
            rooms.push({owner: user.username, id: id});
            players.push({
                username: "test",
                roomId: id,
                owner: true,
                score: 0,
                answers: []
            })
            console.log(rooms);
        });
    });
}

function roomId() {
    return Math.random().toString(36).substring(2, 2 + 9);
}

module.exports = {
    init: init
}

app.get('/citations/loading', checkAuthenticated, (req, res) => {
    res.render("citations/loading");
});