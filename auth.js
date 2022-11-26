const flash = require('express-flash')
const methodOverride = require('method-override')
const passport = require('passport')

const sessionController = require('./sessionController')
const {sanitize} = require("./passport-config");

function init(app, db, session_secret) {
    app.use(flash())
    app.use(sessionController.sessionMiddleware)

    require('./passport-config').initialize(passport, db)

    app.use(passport.initialize())
    app.use(passport.session(
        {
            secret: session_secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                sameSite: true,
                secure: true
            },
        }
    ))
    app.use(methodOverride('_method'))

    app.get('/profile', checkAuthenticated, (req, res) => {
        console.dir(req.user)
        db.getStats(req.user.id).then((stats) => {
            res.render('profile',
                {
                    username: req.user.username,
                    avatar: req.user.avatar,
                    banner: req.user.banner,
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
        })
    )
    app.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('register')
    })

    app.post('/register', checkNotAuthenticated, async (req, res) => {
        if (req.body.username.trim() === '' || req.body.password.trim() === '') {
            res.render('/games/register', {message: "Nom d'utilisateur ou mot de passe vide"})
        }

        db.registerUser(sanitize(req.body.username), sanitize(req.body.password), (req.headers['x-forwarded-for'] || req.socket.remoteAddress), (err, success, message) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            } else {
                if (success) {
                    res.render('login', {message: message})
                } else {
                    res.render('register', {message: message})
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

    app.get('/settings', checkAuthenticated, (req, res) => {
        res.render('settings', {user: req.user});
    })

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

module.exports = {
    init: init,
    checkAuthenticated: checkAuthenticated,
    checkNotAuthenticated: checkNotAuthenticated
}