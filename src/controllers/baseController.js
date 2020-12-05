module.exports.home = (req,res) => {
    res.locals.header = 'Indicator Games - Главная'
    res.render('home')
}


module.exports.durak = (req, res) => {
    res.locals.header = 'Дурак - Indicator Games'
    res.render('durak')
}

// module.exports.certbot_verify = (req,res) => {
//     res.send('Ew3FiKa_HyTf9jnDkc5S8Kq9ZLdhRoXnkp6YT0bB1Ow.p6gQrgoIGdfp8Uk42890pfkOv3nhX3TKCOqa23pt7_U')
// }