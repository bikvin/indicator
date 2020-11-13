const { Router } = require('express')
const baseController = require('../controllers/baseController');
const { requireAuth, checkUser} = require('../middleware/authMiddleware');


const router = Router();


router.get('*', checkUser) // apply checkUser to all pages so that they have user object on the client

router.get('/', baseController.home)
router.get('/smoothies', requireAuth, baseController.smoothies)

module.exports = router