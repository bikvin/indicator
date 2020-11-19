const { Router } = require('express')
const authController = require('../controllers/authController')
const csrfMiddleware = require('../middleware/csrfProtection') 

const router = Router();

router.get('/signup', csrfMiddleware, authController.signup_get)
router.post('/signup', csrfMiddleware, authController.signup_post)

router.get('/login', csrfMiddleware, authController.login_get)
router.post('/login', csrfMiddleware, authController.login_post)

router.get('/logout', authController.logout_get)
router.get('/recover_pass', csrfMiddleware, authController.recover_pass_get)
router.post('/recover_pass', csrfMiddleware, authController.recover_pass_post)

router.get('/new_pass/:token', csrfMiddleware, authController.new_pass_get)
router.post('/new_pass', csrfMiddleware, authController.new_pass_post)

module.exports = router