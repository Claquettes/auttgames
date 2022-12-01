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
                                socket.emit('display room', room, socket.data.id === room.owner);
                            });
                        });
                        return;
                    }
                });
            });
        });

        socket.on('start game', () => {
            rooms.map((room) => {
                if (room.owner === user.id) {
                    socketio.to(room.id).emit('new citation', room.citations[room.curQuote].citation);
                    room.curQuote++;
                    console.log("game started");
                    const gameInterval = setInterval(() => {
                        if (room.curQuote >= 10) {
                            clearInterval(gameInterval);
                            setTimeout(() => {
                                room.curQuote = 0;
                                socketio.to(room.id).emit('end game');
                            }, 11000);
                        }
                        socketio.to(room.id).emit('new citation', room.citations[room.curQuote].citation);
                        room.curQuote++;
                      }, 11000)
                }
            })
        });

        socket.on('answer', (answer) => {
            rooms.map((room) => {
                room.players.map((player) => {
                    if (player.id === user.id) {
                        player.answers.push(answer);
                        console.log(player.answers);
                        return;
                    }
                });
            });
        });


        socket.on('create room', async () => {
            let id = roomId();
            console.log(`[create room] ${id}`);
            rooms.push({
                owner: user.id, 
                id: id, 
                players: [{
                    username: user.username,
                    id: user.id,
                    owner: true,
                    score: 0,
                    answers: [],
                    avatar: user.avatar
                }],
                citations: await db.getNRandomCitations(20),
                curQuote: 0
            });
            socket.emit('display room', rooms[0], true);
            socket.join(id);
        });

        socket.on('join room', async (roomId) => {
            rooms.map((room) => {
                if (room.id === roomId) {
                    socket.join(roomId);
                    room.players.push({
                        username: user.username,
                        id: user.id,
                        owner: false,
                        score: 0,
                        answers: [],
                        avatar: user.avatar
                    })
                    socket.emit('display room', room, socket.data.id === room.owner);
                    socketio.in(roomId).fetchSockets().then((sockets) => {
                        sockets.map((socket) => {
                            socket.emit('display room', room, socket.data.id === room.owner);
                        });
                    });
                }
            })
        });
    });
}

function roomId() {
    return Math.random().toString(36).substring(2, 2 + 9);
}

module.exports = {
    init: init
}

