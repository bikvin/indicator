const express = require('express');
const path = require('path')
const http = require('http')
const authRoutes = require('./routes/authRoutes')
const baseRoutes = require('./routes/baseRoutes')
const roomRoutes = require('./routes/roomRoutes')
const gamesRoutes = require('./routes/gamesRoutes')
const cookieParser = require('cookie-parser')
const csrfMiddleware = require('./middleware/csrfProtection')
require('./db/dbConnect')

const app = express();
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)


// middleware
app.use(express.static(path.join(__dirname, '../public')))


app.use(express.json())
app.use(cookieParser())
app.use(csrfMiddleware)

// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// routes
app.use(baseRoutes)
app.use(authRoutes)
app.use(roomRoutes)
app.use(gamesRoutes)


//const User = require('/models/User')
const initSocket = require('./sockets/initSocket')
initSocket(io)


server.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + process.env.PORT)
})