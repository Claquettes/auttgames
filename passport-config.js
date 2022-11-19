const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./db')

function initialize(passport) {
    const authenticateUser = async (name, password, done) => {
        db.getUser(name, password).then((user) => {
            console.log("got user: ")
            console.dir(user)

            if (user !== undefined) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Mot de passe incorrect' })
            }
        }).catch((err) => {
            console.log(err)
            return done(err)
        })
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        let user = db.getUserById(id).then((user) => {
            return done(null, user)
        }).catch((err) => {
            return done(err)
        })
    })
}

module.exports = initialize