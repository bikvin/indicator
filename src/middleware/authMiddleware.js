const jwt =require('jsonwebtoken')
const User = require('../models/User')


const requireAuth = (req, res, next) => {
   const token = req.cookies.jwt

   // check json web token exist and verified
   if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                //console.log(err.message)
                res.redirect('/login')
            }
            else{
                //console.log(decodedToken)
                next()
            }
        })
   }
   else{
       res.redirect('/login')
   }
}

// check current user
const checkUser = async (req, res, next) => {
   
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                //console.log(err.message)
                res.locals.user = null
                next()
            }
            else{
                //console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                user = {// keeping only _id and username properties to pass to client
                    _id: user._id,
                    username: user.username,

                }
                //console.log(user)
                res.locals.user = JSON.stringify(user)
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }