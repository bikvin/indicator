const { Router } = require('express')
const authController = require('../controllers/authController')
const csrfMiddleware = require('../middleware/csrfProtection') 

const router = Router();

router.get('/signup', csrfMiddleware, authController.signup_get)
router.post('/signup', csrfMiddleware, authController.signup_post)
router.get('/login', csrfMiddleware, authController.login_get)
router.post('/login', csrfMiddleware, authController.login_post)
router.get('/logout', authController.logout_get)

module.exports = router