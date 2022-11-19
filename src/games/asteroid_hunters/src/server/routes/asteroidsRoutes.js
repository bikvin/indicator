const { Router } = require('express')
const astController = require('../controllers/astController');

const router = Router();

router.get('/asteroid_hunters', astController.asteroidHunters)

router.post('/asteroid_hunters/set_top_level', astController.set_top_level_post)

router.get('/asteroid_hunters/get_top_level', astController.get_top_level)

// router.get('/test/:parameter', gamesController.testGet)

// router.get('/test', gamesController.testGet)

module.exports = router