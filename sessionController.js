const session = require('express-session')
require('dotenv').config()

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

module.exports = { sessionMiddleware, wrap }