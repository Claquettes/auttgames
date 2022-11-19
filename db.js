const bcrypt = require('bcrypt')

var db;

function init(mysql, user, password) {
    db = mysql.createConnection({
        host: 'localhost',
        user: user,
        password: password,
        database: 'auttgames'
    });

    db.connect(function (err) {
        if (err) throw err;
        console.log("MySQL Connected!");
    });
}

function getUser(username, password) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
            if (err)
                reject(err)

            if (result.length != 1 || !bcrypt.compareSync(password, result[0].password)) {
                resolve(undefined)
            } else {
                resolve(result[0])
            }
        })
    })
}

function getUserById(id) {
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


module.exports = {
    init,
    getUser,
    getUserById
};