const path = require('path');
let rooms = [];

function init(app, socketio) {
    
    morpionIO = socketio.of('/morpion');

    app.get('/morpion', (req, res) => {
        res.sendFile(path.join(__dirname, 'templates/morpion/index.html'));
    });

    morpionIO.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    morpionIO.on('connection', (socket) => {
        console.log(`[connection] ${socket.id}`);

        socket.on('playerData', (player) => {
            console.log(`[playerData] ${player.username}`);

            let room = null;

            if (!player.roomId) {
                room = createRoom(player);
                console.log(`[create room ] - ${room.id} - ${player.username}`);
            } else {
                room = rooms.find(r => r.id === player.roomId);

                if (room === undefined) {
                    return;
                }

                player.roomId = room.id;
                room.players.push(player);
            }

            socket.join(room.id);

            morpionIO.to(socket.id).emit('join room', room.id);

            if (room.players.length === 2) {
                morpionIO.to(room.id).emit('start game', room.players);
            }
        });

        socket.on('get rooms', () => {
            morpionIO.to(socket.id).emit('list rooms', rooms);
        });

        socket.on('play', (player) => {
            console.log(`[play] ${player.username}`);
            morpionIO.to(player.roomId).emit('play', player);
        });

        socket.on('play again', (roomId) => {
            const room = rooms.find(r => r.id === roomId);

            if (room && room.players.length === 2) {
                morpionIO.to(room.id).emit('play again', room.players);
            }
        })

        socket.on('disconnect', () => {
            console.log(`[disconnect] ${socket.id}`);
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