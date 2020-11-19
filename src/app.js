const express = require('express');
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const baseRoutes = require('./routes/baseRoutes')
const cookieParser = require('cookie-parser')
const csrfMiddleware = require('./middleware/csrfProtection')
require('./db/dbConnect')

const app = express();

// middleware
app.use(express.static('src/public'))
app.use(express.json())
app.use(cookieParser())
app.use(csrfMiddleware)

// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// routes
app.use(baseRoutes)
app.use(authRoutes)


app.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + process.env.PORT)
})