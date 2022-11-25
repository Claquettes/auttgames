const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, db) {
    const authenticateUser = async (req, name, password, done) => {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        db.getUser(name, password).then((user) => {
            //console.log("got user: ")
            //console.dir(user)

            if (user !== null) {
                db.storeIP(user.id, ip);
                return done(null, user)
            } else {
                return done(null, false, {message: 'Mot de passe incorrect'})
            }
        }).catch((err) => {
            console.log(err)
            return done(err)
        })
    }

    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passReqToCallback: true
        }
        , authenticateUser))
    passport.serializeUser((user, done) => done(null, {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        banner: user.banner
    }))
    passport.deserializeUser((data, done) => {
        db.getUserById(data.id).then((user) => {
            return done(null, {id: user.id, username: user.username, avatar: user.avatar, banner: user.banner})
        }).catch((err) => {
            return done(err)
        })
    })
}

module.exports = initialize