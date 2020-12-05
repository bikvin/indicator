const { Router } = require('express')
const baseController = require('../controllers/baseController');
const { requireAuth, checkUser} = require('../middleware/authMiddleware');
const { addBaseHeader} = require('../middleware/baseMiddleware');


const router = Router();


router.get('*', checkUser) // apply checkUser to all pages so that they have user object on the client
router.get('*', addBaseHeader)

router.get('/', baseController.home)
router.get('/durak', baseController.durak)


//router.get('/.well-known/acme-challenge/Ew3FiKa_HyTf9jnDkc5S8Kq9ZLdhRoXnkp6YT0bB1Ow', baseController.certbot_verify)



module.exports = router