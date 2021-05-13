const { Router } = require('express')
const roomController = require('../controllers/roomController');
const { requireAuth} = require('../middleware/authMiddleware');
const csrfMiddleware = require('../middleware/csrfProtection') 

const router = Router();

router.get('/room/:roomId',  requireAuth, csrfMiddleware, roomController.roomGet)

router.get('/rooms', roomController.roomsGet)


router.get('/create_room', csrfMiddleware, requireAuth, roomController.createRoomGet)
router.post('/create_room', csrfMiddleware, requireAuth, roomController.createRoomPost)

router.post('/leaveroom', csrfMiddleware, roomController.leaveRoomPost)

router.post('/new-message', csrfMiddleware, roomController.newMessagePost)

module.exports = router