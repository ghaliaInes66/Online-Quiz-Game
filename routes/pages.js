const { dashboard, registerPage, loginPage } = require('../controllers/pages');
const router = require('express').Router();

router.route('/').get(dashboard);
router.route('/register').get(registerPage);
router.route('/login').get(loginPage);

module.exports = router