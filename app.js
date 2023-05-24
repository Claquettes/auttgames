require('dotenv').config();

const express = require('express');
const url = require('url');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const mysql = require('mysql2');
const db = require('./db');
const auth = require('./auth');
const fs = require('fs');
const { parseFile } = require('music-metadata'); // Updated module import


const port = 80;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

db.init(mysql, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);
auth.init(app, db, process.env.SESSION_SECRET);

app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/', express.static('public'));

const socketio = require('socket.io')(http, { 'pingInterval': 3000, 'pingTimeout': 5000 });


app.use('/2048', express.static(path.join(__dirname, '2048')));
//perso claquettes
app.use('/casse-briques', express.static(path.join(__dirname, 'casse-briques')));
app.use('/polyressources', express.static(path.join(__dirname, 'polyressources')));
app.use('/snak', express.static(path.join(__dirname, 'snak')));
app.use('/garden', express.static(path.join(__dirname, 'garden')));
app.use('/host', express.static(path.join(__dirname, 'host')));


app.get('/2048', (req, res) => {
  res.render('2048/2048');
});

require('./dinautt').init(app, socketio.of('/dinautt'));
require('./citations').init(app, socketio.of('/citations'));
require('./Qalc').init(app, socketio.of('/Qalc'));
require('./morpion').init(app, socketio.of('/morpion'));
require('./envoie').init(app);
require('./mimir').init(app);
require('./mcstats').init(app);



  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }

http.listen(port, () => {
  console.log(`Letsgo ca marche, tu peux test ici http://localhost:${port}/`);
});
