const { startSoloGame, endSoloGame } = require('../controllers/soloGames');
const router = require('express').Router();

router.route('/start').post(startSoloGame);
router.route('/end').put(endSoloGame);

module.exports = router