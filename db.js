const { use } = require("passport");

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
        console.log("username: " + username)
        db.query('SELECT * FROM users WHERE username = "' + username + '"', (err, result) => {
            if (err)
                reject(err)

            console.dir(JSON.stringify(result))

            console.log(result === [])
            console.log(Object.keys.length != 1)

            if (result === [] || Object.keys.length != 1) {
                resolve(undefined)
            } else {
                console.log(JSON.stringify(result[0]))
                resolve(result[0])
            }
        })
    })


    /*db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return result
        }
    })*/
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
                    console.log(JSON.stringify(result[0]))
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