const { Router } = require('express')
const astController = require('../controllers/astController');

const router = Router();

router.get('/asteroid_hunters', astController.asteroidHunters)

router.post('/asteroid_hunters/create_top_level', astController.create_top_level_post)

// router.get('/test/:parameter', gamesController.testGet)

// router.get('/test', gamesController.testGet)

module.exports = router