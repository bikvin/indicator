const { Router } = require('express')
const baseController = require('../controllers/baseController');
const { requireAuth, checkUser} = require('../middleware/authMiddleware');


const router = Router();


router.get('*', checkUser) // apply checkUser to all pages so that they have user object on the client

router.get('/', baseController.home)
router.get('/smoothies', requireAuth, baseController.smoothies)

router.get('/.well-known/acme-challenge/Ew3FiKa_HyTf9jnDkc5S8Kq9ZLdhRoXnkp6YT0bB1Ow', baseController.certbot_verify
)

module.exports = router