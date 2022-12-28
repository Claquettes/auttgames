const db = require("./db");
const path = require("path");
const { checkAuthenticated } = require("./auth");

function init(app) {
    app.get('/mcstats',(req, res) => { //todo: checkAuthenticated
        db.getUserOrders(1).then((result) => {  //changer 1 par req.user.id
            res.render("mcstats/mcstats", { data: result })
            //console.dir(result);
            //console.dir(result[0].order_json);
            //console.dir(result[0].order_json.menus[0].products);
            
        }).catch((err) => {
            res.sendStatus(500);
            console.log(err)
        });
    });
}


module.exports = {
    init
}
