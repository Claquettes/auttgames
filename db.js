const bcrypt = require('bcrypt')

var db;

function init(mysql, user, password) {
    db = mysql.createPool({
        host: 'localhost',
        user: user,
        password: password,
        database: 'auttgames'
    })

    db.getConnection((err, connection) => {
        if (err) throw err;
        console.log('MySQL connected')
    })
}

function getUsersByName(username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function getUser(username, password) {
    return new Promise((resolve, reject) => {
        getUsersByName(username).then((result) => {
            if (result.length !== 1 || !bcrypt.compareSync(password, result[0].password))
                resolve(null)
            else
                return resolve(result[0])
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

async function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err)
            } else {
                if (result === [] || Object.keys.length != 1) {
                    resolve(undefined)
                } else {
                    resolve(result[0])
                }
            }
        })
    })
}

function registerUser(username, password, cb) {
    getUsersByName(username).then((result) => {
        if (result.length !== 0) {
            cb(null, false, "Nom d'utilisateur déjà utilisé")
        } else {
            db.query('INSERT INTO users (username, password, cheat) VALUES (?, ?, 0)', [username, bcrypt.hashSync(password, 10)], (err, result) => {
                if (err) {
                    cb(err)
                } else {
                    db.query('INSERT INTO stats (id) VALUES (?)', [result.insertId], (err, result2) => {
                        if (err) {
                            cb(err)
                        } else {
                            cb(null, true, null)
                        }
                    })
                }
            })
        }
    }).catch((err) => {
        cb(err)
    })
}

async function getStats(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM stats WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err)
            } else {
                if (result === [] || Object.keys.length != 1) {
                    resolve(undefined)
                } else {
                    stats = result[0]
                    stats.Citations_ratioWins = stats.Citations_wins / ((stats.Citations_total_games) == 0 ? 1 : stats.Citations_total_games)
                    stats.Citations_ratioA = stats.Citations_nbA / ((stats.Citations_totalA) == 0 ? 1 : stats.Citations_totalA)
                    stats.Morpion_ratioWins = stats.Morpion_wins / ((stats.Morpion_total_games) == 0 ? 1 : stats.Morpion_total_games)
                    resolve(stats)
                }
            }
        })
    })
}

module.exports = {
            init,
            getUser,
            getUserById,
            registerUser,
            getStats
        };