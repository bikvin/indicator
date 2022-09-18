const AstLevel = require('../../models/AstLevel')

module.exports.asteroidHunters = (req,res) => {
    res.locals.header = 'Asteroid Hunters by Indicator Games'
    //console.log('req', req);
    //console.log('res', res);
    //console.log('req.headers.referer', req.headers.referer)
    res.render('asteroid_hunters', {target: req.query.target, referer: process.env.URL})
    
}

module.exports.create_top_level_post = async (req,res) => {
    
    //const {email, password, username} = req.body
    console.log('create_top_level_post')
    try{
        const astLevel = await AstLevel.create({userId: 666, topOpenLevel: 42, site: 'vk'})
        //const token = createToken(user._id)
        //sendWelcomeEmail(user.email, user.username)
        //res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({astLevel})
    }
    catch (err) {
        //const errors = handleErrors(err)
        res.status(400).send({ err })
    }
}

