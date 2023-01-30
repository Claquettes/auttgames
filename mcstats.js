const db = require("./db");
const path = require("path");
const { checkAuthenticated } = require("./auth");

function init(app) {
    app.get('/mcstats',(req, res) => { //todo: checkAuthenticated
        db.getUserOrders(1).then((result) => {  //changer 1 par req.user.id
            let str = JSON.stringify(Object.assign({}, result));
            str = str.replaceAll(/(\\r|\\n|\s)/g, '');
            res.render("mcstats/mcstats", { data: str });
        }).catch((err) => {
            res.sendStatus(500);
            console.log(err)
        });
    });
}


module.exports = {
    init
}
