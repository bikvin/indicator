const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { sendWelcomeEmail, sendResetEmail} = require('../emails/authEmails.js')
const crypto = require('crypto')
//const { resolve } = require('path')
//const { use } = require('../routes/authRoutes')

// Handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', username: '', password: ''}

    // dublicate error code
    if(err.code === 11000){
        //errors.email = 'that email is already registered'
        errors.email = 'эта почта уже зарегистрирована'
        return errors
    }

    // incorrect email
    if(err.message === 'incorrect email'){
        //errors.email = 'that email is not registered'
        errors.email = 'эта почта не зарегистрирована'
    }

    // incorrect password
    if(err.message === 'incorrect password'){
        //errors.password = 'that password is incorrect'
        errors.password = 'неверный пароль'
    }

    // no username
    if(err.message === 'incorrect username'){
        //errors.password = 'please provide a name'
        errors.password = 'пожалуйста укажите имя'
    }


    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}
 
module.exports.signup_get = (req,res) => {
    const csrfToken = req.csrfToken()
    res.locals.header = 'Indicator Games - Регистрация'
    res.render('auth/signup', {csrfToken})
}

module.exports.login_get = (req,res) => {
    const csrfToken = req.csrfToken()
    res.locals.header = 'Indicator Games - Вход'
    res.render('auth/login', {csrfToken})
}

module.exports.signup_post = async (req,res) => {
    
    const {email, password, username} = req.body
    
    try{
        const user = await User.create({email, password, username})
        const token = createToken(user._id)
        sendWelcomeEmail(user.email, user.username)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).send({ errors })
    }
}

module.exports.login_post = async (req,res) => {

    const {email, password} = req.body
    //console.log(req.body)

   try{
    //console.log("try")
    const user = await User.login(email, password)

    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: false, maxAge: maxAge * 1000})
    res.status(200).json({user: user._id})
   }
   catch (err) {
       //console.log('catch')
    const errors = handleErrors(err)
    res.status(400).json({errors})
   }
}
 
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge:1})
    res.redirect('/')
}

module.exports.recover_pass_get =(req, res) => {
    const csrfToken = req.csrfToken()
    res.locals.header = 'Indicator Games - Восстановление пароля'
    res.render('auth/recover_pass', {csrfToken})
}

module.exports.recover_pass_post = async (req, res) => {

    const {email} = req.body

    const user = await User.findOne({email})
    
    if(user){
        res.status(200).json({user: user.email})

        const token = await getResetToken()

        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000
        //user.resetPasswordExpires = Date.now() + 20000
        await user.save()
        sendResetEmail(user.email, user.name, token, req.headers.host)

        

    }
    else{
        // const errors = {email:'User with this email does not exist'}
        const errors = {email:'Пользователь с такой почтой не существует'}
        res.status(400).send({ errors })
    }
    

}

module.exports.new_pass_get = async(req, res) => {
    const csrfToken = req.csrfToken()
    res.locals.header = 'Indicator Games - Новый пароль'
    const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: new Date() }})

    if(!user){
        res.render('auth/no_token')
    }
    else{
        res.render('auth/new_pass', {csrfToken, resetToken: req.params.token})
    }
}

module.exports.new_pass_post = async (req, res) => {
    const {resetToken, password} = req.body


    const user = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: new Date() }})
    if(user){
        try{

            user.password = password
            await user.save()
            res.status(200).json({user: user.email})
        }catch(err){
            const errors = handleErrors(err)
            res.status(400).send({ errors })
        }

    }else{
        //const errors = {password:'Reset token is invalid or outdated. Please try again.'}
        const errors = {password:'Токен для восстановления неверный или просрочен. Пожалуйста попробуйте еще раз'}
        res.status(400).send({ errors })
    }
}




/// function to get reset pass token with await syntaxis
const getResetToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(24, function(err, buffer) {
            var token = buffer.toString('hex');
            if(token){
                resolve(token);
            }
            else {
                reject(err)
            }
        });
    })
    
}