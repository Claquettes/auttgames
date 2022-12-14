require('dotenv').config()

const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const mysql = require('mysql2');
const db = require('./db')
const auth = require('./auth')

const port = 80;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

db.init(mysql, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);
auth.init(app, db, process.env.SESSION_SECRET)

app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

const socketio = require('socket.io')(http, {'pingInterval': 3000, 'pingTimeout': 5000});

app.use('/AUTT', express.static(path.join(__dirname, 'AUTT')));

app.get('/2048', (req, res) => {
    res.render('2048/2048');
});

require('./dinautt').init(app, socketio.of('/dinautt'));
require('./citations').init(app, socketio.of('/citations'));
require('./morpion').init(app, socketio.of('/morpion'));
require('./envoie').init(app);
require('./mimir').init(app);
require('./mcstats').init(app);


db.getUserOrders(1).then((result) => {
    for (let i = 0; i < result.length; i++) {
        result[i].order_json = JSON.parse(result[i].order_json);
    }

    let commande = result[0].order_json

    console.dir(result);
    console.dir(result[0].order_json);
    console.dir(result[0].order_json.menus[0].products);
});

http.listen(port, () => {
    console.log(`Letsgo ca marche, tu peux test ici http://localhost:${port}/`);
});
