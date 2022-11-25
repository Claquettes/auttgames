const sessionController = require('./sessionController');
const { checkAuthenticated } = require('./auth');
const db = require('./db');

let rooms = [];

function init(app, socketio) {
    socketio.use(sessionController.wrap(sessionController.sessionMiddleware));

    app.get('/citations', checkAuthenticated, (req, res) => {
        res.render("citations/citations", { username: req.user.username });
    });

    app.get('/citations/loading', checkAuthenticated, (req, res) => {
        res.render("citations/loading");
    });

    socketio.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    socketio.on('connection', (socket) => {
        if (socket.request.session.passport === undefined) {
            return;
        }

        let user = socket.request.session.passport.user;

        socket.data.id = user.id;

        socket.on('disconnect', () => {
            console.log("user disconnected");
            rooms.map((room) => {
                room.players.map((player) => {
                    if (player.id === user.id) {
                        if (player.owner) var owner = true;
                        room.players.splice(room.players.indexOf(player), 1);
                        if (room.players.length === 0) {
                            rooms.splice(rooms.indexOf(room), 1);
                        } else if (owner) {
                            room.players[0].owner = true;
                            room.owner = room.players[0].id;
                        }
                        socketio.in(room.id).fetchSockets().then((sockets) => {
                            sockets.map((socket) => {
                                console.log(socket.data.id);
                                console.log(room.owner);
                                socket.emit('display room', room, socket.data.id === room.owner);
                            });
                        });
                    }
                });
            });
        });

        socket.on('start game', () => {
            rooms.map((room) => {
                if (room.owner === user.id) {
                    socketio.to(room.id).emit('start game');
                    console.log("game started");
                }
            })
        });


        socket.on('create room', async () => {
            console.log(`[create room] ${socket.id}`);

            let id = roomId();
            rooms.push({
                owner: user.id, id: id, players: [{
                    username: user.username,
                    id: user.id,
                    owner: true,
                    score: 0,
                    answers: [],
                    avatar: user.avatar
                }]
            });
            socket.emit('display room', rooms[0], true);
            socket.join(id);
        });
        socket.on('join room', async () => {
            socket.join(rooms[0].id);
            rooms[0].players.push({
                username: user.username,
                id: user.id,
                owner: false,
                score: 0,
                answers: [],
                avatar: user.avatar
            })

            socketio.in(rooms[0].id).fetchSockets().then((sockets) => {
                sockets.map((socket) => {
                    console.log(socket.data.id);
                    console.log(rooms[0].owner);
                    socket.emit('display room', rooms[0], socket.data.id === rooms[0].owner);
                });
            });
        });
    });
}

function roomId() {
    return Math.random().toString(36).substring(2, 2 + 9);
}

module.exports = {
    init: init
}

