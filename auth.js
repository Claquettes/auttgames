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

    app.get('/mcstats', checkAuthenticated, (req, res) => { //on autorise l'accès seulement à l'user 3, c'est à dire le propriétaire du site, car la page qu'il va accéder est à usage personnelle, elle ne contient pas de données sensibles, mais des données soumises à des droits d'auteurs, et le site claq.fr n'est pas un site de streaming, et ne cherche en rien à enfraindre les droits d'auteurs, c'est pour cela que seul le propriétaire du site peut y accéder, et il a accès à cette page seulement pour son usage personnel, et toutes les données qu'il va y accéder sont des données dont il possède une copie physique.
        //on recupère l'id du compte
        let id = req.user.id;
        if (req.user.id !==3) { //user 3 == propriétaire du site (Mathieu P.)
            res.sendStatus(403); //on renvoie une erreur 403 (forbidden) CAR LA PAGE EST A USAGE PERSONNEL.
          } else {
            //on redirige vers la page Qalc/private.php
            res.redirect('https://claq.fr/mcstats');
          }
    });

    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login')
    })

    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })
    )
    app.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('register')
    })

    app.post('/register', checkNotAuthenticated, async (req, res) => {
        if (req.body.username.trim() === '' || req.body.password.trim() === '') {
            res.render('/register', {message: "Nom d'utilisateur ou mot de passe vide"})
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
            res.redirect('/login');
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
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile')
    }
    next()
}

module.exports = {
    init: init,
    checkAuthenticated: checkAuthenticated,
}