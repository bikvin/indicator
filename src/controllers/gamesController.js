const asteroidHunters = (req,res) => {
    res.locals.header = 'Asteroid Hunters by Indicator Games'
    res.render('asteroid_hunters')
   
}



module.exports = {
    asteroidHunters

}