

const home = (req,res) => {
    res.locals.header = 'Indicator Games - Главная'
    res.render('home')
   
}



module.exports = {
    home

}

