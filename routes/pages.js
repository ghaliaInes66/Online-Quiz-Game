const { home, duoGamePage } = require("../controllers/pages");
const { dashboard, registerPage, loginPage } = require("../controllers/public");
const router = require("express").Router();

router.route("/").get(dashboard);
router.route("/register").get(registerPage);
router.route("/login").get(loginPage);
router.route("/home").get(home);
router.route("/duo-game").get(duoGamePage);
module.exports = router;
