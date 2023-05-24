require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const mysql = require('mysql2');
const db = require('./db');
const auth = require('./auth');
const fs = require('fs');
const mm = require('music-metadata');

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

app.use('/AUTT', express.static(path.join(__dirname, 'AUTT')));
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
require('./morpion').init(app, socketio.of('/morpion'));
require('./envoie').init(app);
require('./mimir').init(app);
require('./mcstats').init(app);

// Add the code for the music player routes below

const songsDirectory = path.join(__dirname, 'mcstats/my_music');

app.get('/', async (req, res) => {
  const songs = await getSongs();
  res.render('index', { songs });
});

app.use('/my_music', express.static(songsDirectory));

async function getSongs() {
  const files = await fs.promises.readdir(songsDirectory);
  const songs = [];

  for (const file of files) {
    if (file.endsWith('.mp3')) {
      const path = `/my_music/${file}`;
      const metadata = await mm.parseFile(path);
      const title = metadata.common.title || file.slice(0, -4);
      const duration = formatTime(metadata.format.duration);
      const artist = metadata.common.artist || 'Artist Name';

      songs.push({ title, duration, artist, path });
    }
  }

  return songs;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  return formattedTime;
}

http.listen(port, () => {
  console.log(`Letsgo ca marche, tu peux test ici http://localhost:${port}/`);
});
