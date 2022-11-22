const flash = require('express-flash')
const { Stats } = require('fs')
const methodOverride = require('method-override')
const passport = require('passport')
const db = require('./db')

const sessionController = require('./sessionController')

function init(app, db, session_secret) {
    app.use(flash())
    app.use(sessionController.sessionMiddleware)

    require('./passport-config')(passport, db)

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))

    app.get('/profile', checkAuthenticated, (req, res) => {
        db.getStats(req.user.id).then((stats) => {
            res.render('profile',
                {
                    username: req.user.username,
                    banner: req.user.username,
                    avatar: req.user.avatar,
                    stats: stats
                })
        }).catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
    })

    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login')
    })

    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/games/profile',
        failureRedirect: '/games/login',
        failureFlash: true
    }
    ))

    app.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('register')
    })

    app.post('/register', checkNotAuthenticated, async (req, res) => {
        db.registerUser(escapeHtml(req.body.username), req.body.password, (err, success, message) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            } else {
                if (success) {
                    res.render('login', { message: message })
                } else {
                    res.render('register', { message: message })
                }
            }
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

}

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

module.exports = {
    init: init,
    checkAuthenticated: checkAuthenticated,
    checkNotAuthenticated: checkNotAuthenticated
}