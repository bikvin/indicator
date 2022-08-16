const { Router } = require('express')
const baseController = require('../controllers/baseController');
const {checkUser} = require('../middleware/authMiddleware');
const { addBaseHeader} = require('../middleware/supportMiddleware');



const router = Router();


router.get('*', checkUser) // apply checkUser to all pages so that they have user object on the client
router.post('*', checkUser)
router.get('*', addBaseHeader)

router.get('/',baseController.home)

//router.get('/test', baseController.test)

//router.get('/.well-known/acme-challenge/Ew3FiKa_HyTf9jnDkc5S8Kq9ZLdhRoXnkp6YT0bB1Ow', baseController.certbot_verify)



module.exports = router