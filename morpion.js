const sessionController = require('./sessionController');
const { checkAuthenticated } = require('./auth');

let rooms = [];

function init(app, socketio) {
    socketio.use(sessionController.wrap(sessionController.sessionMiddleware));

    app.get('/morpion', checkAuthenticated, (req, res) => {
        res.render('morpion/morpion', { username: req.user.username });
    });

    socketio.on("connect_error", (err) => {
        console.log(`[MORPION] connect_error due to ${err.message}`);
    });

    socketio.on('connection', (socket) => {
        console.log(`[MORPION] connection ${socket.id}`);

        socket.on('playerData', (player) => {
            console.log(`[MORPION] playerData ${player.username}`);

            let room = null;

            if (!player.roomId) {
                room = createRoom(player);
                console.log(`[MORPION] create room - ${room.id} - ${player.username}`);
            } else {
                room = rooms.find(r => r.id === player.roomId);

                if (room === undefined) {
                    return;
                }

                player.roomId = room.id;
                room.players.push(player);
            }

            socket.join(room.id);

            socketio.to(socket.id).emit('join room', room.id);

            if (room.players.length === 2) {
                socketio.to(room.id).emit('start game', room.players);
            }
        });

        socket.on('get rooms', () => {
            socketio.to(socket.id).emit('list rooms', rooms);
        });

        socket.on('play', (player) => {
            console.log(`[play] ${player.username}`);
            socketio.to(player.roomId).emit('play', player);
        });

        socket.on('play again', (roomId) => {
            const room = rooms.find(r => r.id === roomId);

            if (room && room.players.length === 2) {
                socketio.to(room.id).emit('play again', room.players);
            }
        })

        socket.on('disconnect', () => {
            console.log(`[MORPION] disconnect ${socket.id}`);
            let room = null;

            rooms.forEach(r => {
                r.players.forEach(p => {
                    if (p.socketId === socket.id && p.host) {
                        room = r;
                        rooms = rooms.filter(r => r !== room);
                    }
                })
            })
        });
    });

}

function createRoom(player) {
    const room = { id: roomId(), players: [] };

    player.roomId = room.id;

    room.players.push(player);
    rooms.push(room);

    return room;
}

function roomId() {
    return Math.random().toString(36).substring(2, 2 + 9);
}

module.exports = {
    init: init
}