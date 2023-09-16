const { dashboard, registerPage, loginPage , home } = require("../controllers/pages");
const router = require("express").Router();

router.route("/").get(dashboard);
router.route("/register").get(registerPage);
router.route("/login").get(loginPage);
router.route("/home").get(home);
module.exports = router;
