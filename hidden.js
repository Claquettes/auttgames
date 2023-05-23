// 
const path = require("path");
const { checkAuthenticated } = require("./auth");
const auth = require("./auth");

function init(app) {
    app.get('/hidden', checkAuthenticated, (req, res) => {
        db.getUserOrders(req.user.id).then((result) => {
            let str = JSON.stringify(Object.assign({}, result));
            str = str.replaceAll(/(\\r|\\n|\s)/g, '');
            res.render("hidden/index", { data: str });
        }).catch((err) => {
            res.sendStatus(500);
            console.log(err)
        });
    });
}


module.exports = {
    init
}
