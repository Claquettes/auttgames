const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')

function init(app, db, session_secret) {
    app.use(flash())
    app.use(session({
        secret: session_secret,
        resave: false,
        saveUninitialized: false
    }))

    require('./passport-config')(passport, db)

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
        db.registerUser(escapeHtml(req.body.username), req.body.password, (err, success, message) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            } else {
                if (success) {
                    res.render('login.ejs', { message: message })
                } else {
                    res.render('register.ejs', { message: message })
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