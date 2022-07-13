const { Router } = require('express')
const gamesController = require('../controllers/gamesController');

const router = Router();

router.get('/asteroid_hunters', gamesController.asteroidHunters)

module.exports = router