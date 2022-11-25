const bcrypt = require('bcrypt')

let db;

function init(mysql, user, password) {
    db = mysql.createPool({
        host: 'localhost',
        user: user,
        password: password,
        database: 'auttgames'
    })

    db.getConnection((err) => {
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
                if (result === [] || Object.keys.length !== 1) {
                    resolve(undefined)
                } else {
                    resolve(result[0])
                }
            }
        })
    })
}

function registerUser(username, password, ip, cb) {
    getUsersByName(username).then((result) => {
        if (result.length !== 0) {
            cb(null, false, "Nom d'utilisateur déjà utilisé")
        } else {
            db.query('INSERT INTO users (username, password, cheat, ip) VALUES (?, ?, 0, ip)', [username, bcrypt.hashSync(password, 10)], (err, result) => {
                if (err) {
                    cb(err)
                } else {
                    db.query('INSERT INTO stats (id) VALUES (?)', [result.insertId], (err) => {
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

async function getAllStats(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM stats WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err)
            } else {
                if (result === [] || Object.keys.length !== 1) {
                    resolve(undefined)
                } else {
                    let stats = result[0]
                    stats.Citations_ratioWins = stats.Citations_wins / ((stats.Citations_total_games) === 0 ? 1 : stats.Citations_total_games)
                    stats.Citations_ratioA = stats.Citations_nbA / ((stats.Citations_totalA) === 0 ? 1 : stats.Citations_totalA)
                    stats.Morpion_ratioWins = stats.Morpion_wins / ((stats.Morpion_total_games) === 0 ? 1 : stats.Morpion_total_games)
                    resolve(stats)
                }
            }
        })
    })
}

function getDinauttLeaderboard() {
    return new Promise((resolve, reject) => {
        db.query('SELECT username, Dinautt_highscore FROM stats JOIN users on users.id = stats.id ORDER BY Dinautt_highscore DESC LIMIT 10', (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function updateDinautt(id, highscore) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE stats SET Dinautt_highscore = GREATEST(Dinautt_highscore, ?), Dinautt_total_games = Dinautt_total_games +1 WHERE id = ?', [highscore, id], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function getNRandomCitation(n) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM citations ORDER BY RAND() LIMIT ?', [n], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function storeIP(id, ip) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET ip = ? WHERE id = ?', [ip, id], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    init,
    getUser,
    getUserById,
    registerUser,
    getStats: getAllStats,
    getDinauttLeaderboard: getDinauttLeaderboard,
    updateDinautt: updateDinautt,
    storeIP: storeIP
};