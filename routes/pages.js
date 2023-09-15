const { dashboard, registerPage, loginPage } = require("../controllers/pages");
const router = require("express").Router();

router.route("/").get(dashboard);
router.route("/register").get(registerPage);
router.route("/login").get(loginPage);
router.route("/landing").get(landingPage);
module.exports = router;
