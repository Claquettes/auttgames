let rooms = [];
let players = [];

const path = require('path');
const auth = require('./auth');
function init(app, socketio) {

    citationsIO = socketio.of('/citations');

    app.get('/citations', auth.checkAuthenticated, (req, res) => {
        res.render("citations/citations", { username: req.user.username });
    });

    citationsIO.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    citationsIO.on('connection', (socket) => {
        console.log(`[connection] ${socket.id}`);
        socket.emit('get rooms', rooms);
        socket.on('create room', (username) => {
            let id = roomId();
            rooms.push({owner: username, id: id});
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