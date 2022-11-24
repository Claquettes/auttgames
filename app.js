require('dotenv').config()

const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const mysql = require('mysql2');
const db = require('./db')
const auth = require('./auth')

const port = 8080;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

db.init(mysql, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);
auth.init(app, db, process.env.SESSION_SECRET)

app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

const socketio = require('socket.io')(http);

require('./dinautt').init(app, socketio.of('/dinautt'));
require('./citations').init(app, socketio.of('/citations'));
require('./morpion').init(app, socketio.of('/morpion'));

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
