const AstLevel = require('../models/AstLevel')

asteroidHunters = (req,res) => {
    res.locals.header = 'Asteroid Hunters by Indicator Games'
    //console.log('req', req);
    //console.log('res', res);
    //console.log('req.headers.referer', req.headers.referer)
    res.render('asteroid_hunters', {target: req.query.target, referer: process.env.URL})
    
}

set_top_level_post = async (req,res) => {
    

    
    const newTopOpenLevel = req.body.level;
    const target = req.body.target;
    const userId = req.body.userId;

    if(!newTopOpenLevel || !target || !userId) throw new Error('Wrong data for setting new level')
  

    try{      
        
        //get topOpenLevel of that user if it exists
        const playerAsteroidsInfo = await AstLevel.findOne({userId: userId, target: target});

        if(!playerAsteroidsInfo) { // the player has no record about level in db - create new playerAsteroidsInfo
            const playerAsteroidsInfo = await AstLevel.create({userId: userId, topOpenLevel: newTopOpenLevel, target: target});
            //console.log('playerAsteroidsInfo', playerAsteroidsInfo);
            res.status(200).json({topOpenLevel:playerAsteroidsInfo.topOpenLevel});
            return; 
        }
        else{ // the user has record about level in db - update playerAsteroidsInfo
     
   
           playerAsteroidsInfo.topOpenLevel = newTopOpenLevel; // save the new topOpenLevel received from the client

           const newPlayerAsteroidsInfo = await playerAsteroidsInfo.save();
           //console.log('newPlayerAsteroidsInfo: ' + newPlayerAsteroidsInfo);
                      
            res.status(201).json({topOpenLevel:playerAsteroidsInfo.topOpenLevel});
            return;

        }
        
    }
    catch (err) {
     
        res.status(400).json({'Error': err});
    }
}

get_top_level = async (req,res) => {
    
    //console.log('req.query', req.query);
    const target = req.query.target;   
    const userId = req.query.userId;

    if(!target || !userId) throw new Error('Wrong data for getting top level')


    try{

        const playerAsteroidsInfo = await AstLevel.findOne({userId: userId, target: target});
    
        let topOpenLevel;
    
        if(playerAsteroidsInfo) topOpenLevel = playerAsteroidsInfo.topOpenLevel;

        console.log('playerAsteroidsInfo', playerAsteroidsInfo);
    
        if(!topOpenLevel) topOpenLevel = 0;
    
        res.status(200).json({topOpenLevel:topOpenLevel});
    }
    catch (err){
        res.status(400).send("Error getting topOpenLevel");
        return;
    }
  
}


module.exports = {
    asteroidHunters,
    set_top_level_post,
    get_top_level

    //test

}

