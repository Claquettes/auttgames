const sessionController = require('./sessionController');
const {checkAuthenticated} = require('./auth');
const db = require('./db');

let rooms = [];
let players = [];

function init(app, socketio) {
    socketio.use(sessionController.wrap(sessionController.sessionMiddleware));

    app.get('/citations', checkAuthenticated, (req, res) => {
        res.render("citations/citations", {username: req.user.username});
    });

    app.get('/citations/loading', checkAuthenticated, (req, res) => {
        res.render("citations/loading");
    });

    socketio.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    socketio.on('connection', (socket) => {
        let user = socket.request.session.passport.user;

        if (user === undefined) {
            return;
        }

        if (players.map(p => p.id).includes(user.id))
            socket.emit('already connected', rooms[0], players);

        socket.on('create room', async () => {
            console.log(`[create room] ${socket.id}`);

            let id = roomId();
            rooms.push({owner: user.username, id: id});
            players.push({
                username: user.username,
                roomId: id,
                id: user.id,
                owner: true,
                score: 0,
                answers: []
            })
            console.log(rooms);
            socket.emit('get rooms', rooms);
            socket.join(id);
        });
        socket.on('join room', async () => {
            socket.join(rooms[0].id);

            players.push({
                username: user.username,
                roomId: rooms[0].id,
                id: user.id,
                owner: false,
                score: 0,
                answers: []
            })

            socket.emit('get rooms', rooms);
            socketio.to(rooms[0].id).emit('get players', players);
            console.log('test');
        });
    });
}

function roomId() {
    return Math.random().toString(36).substring(2, 2 + 9);
}

module.exports = {
    init: init
}

