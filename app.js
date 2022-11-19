if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { Socket } = require('socket.io');
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bcrypt = require('bcrypt')
const passport = require('passport')
const mysql = require('mysql2');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const db = require('./db')

const port = 8080;

db.init(mysql, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);

const initializePassport = require('./passport-config')
initializePassport(passport)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/profile', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { username: req.user.username })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/games/profile',
    failureRedirect: '/games/login',
    failureFlash: true
}
))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    db.registerUser(req.body.username, req.body.password).then((result) => {
        res.redirect('/games/login')
    }).catch((err) => {
        console.log(err)
        res.redirect('/games/register')
    })
})

app.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/games/login');
    });

});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/games/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/games/profile')
    }
    next()
}


function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}



/**
 * @type {Socket}
 */
const io = require('socket.io')(http);

app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.get('/dinautt', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/dinautt/index.html'));
});

app.get('/morpion', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/morpion/index.html'));
});

app.get('/citations', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/citations/index.html'));
});

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

let rooms = [];

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

io.on('connection', (socket) => {
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

        io.to(socket.id).emit('join room', room.id);

        if (room.players.length === 2) {
            io.to(room.id).emit('start game', room.players);
        }
    });

    socket.on('get rooms', () => {
        io.to(socket.id).emit('list rooms', rooms);
    });

    socket.on('play', (player) => {
        console.log(`[play] ${player.username}`);
        io.to(player.roomId).emit('play', player);
    });

    socket.on('play again', (roomId) => {
        const room = rooms.find(r => r.id === roomId);

        if (room && room.players.length === 2) {
            io.to(room.id).emit('play again', room.players);
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
