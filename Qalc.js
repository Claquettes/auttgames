const db = require("./db");
const path = require("path");
const { checkAuthenticated } = require("./auth");

function init(app) {
  //we need to check if the user is authenticated; and if is id is 3, if so we redirect him to claq.fr/Qalc/index.html
  app.get('/Qalc', checkAuthenticated, (req, res) => {
    let id = req.user.id;
    if (req.user.id !== 3) {
      res.sendStatus(403);
    } else {
      //on redirige vers la page de Qalc: https://claq.fr/Qalc/idex.html
      res.redirect('https://claq.fr/Qalc/index.html');
      console.log("Accès autorisé à la page Qalc");
    }
  });
}

module.exports = {
  init: init
};
