const AstVkLevel = require('../models/AstVkLevel')


const home = (req,res) => {
    res.locals.header = 'Indicator Games - Главная'
    res.render('home')
   
}
// const test = async (req, res) => {
    
//      try{
//                 console.log('try save to db')
//                 const astVkLevel = await AstVkLevel.create({vkUserId:1111, topOpenLevel: topOpenLevel })
//                 //res.status(201).json({room: room._id})
//                 //AstVkLevel.create({vkUserId:1111, topOpenLevel: topOpenLevel }).then(()=>{console.log('Saved')})
//             }
//             catch (err){
//                 //res.status(400).send({ err })
//                 console.error(err);
//             }
//     res.locals.header = 'Indicator Games - Test'


//     res.render('home')
// }


module.exports = {
    home,
    test

}

