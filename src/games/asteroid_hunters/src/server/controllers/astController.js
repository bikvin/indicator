const AstLevel = require('../models/AstLevel')

asteroidHunters = (req,res) => {
    res.locals.header = 'Asteroid Hunters by Indicator Games'
    //console.log('req', req);
    //console.log('res', res);
    //console.log('req.headers.referer', req.headers.referer)
    res.render('asteroid_hunters', {target: req.query.target, referer: process.env.URL})
    
}

set_top_level_post = async (req,res) => {
    
    //const {email, password, username} = req.body
    console.log('set_top_level_post');
    console.log('req.body.level',req.body.level);
    console.log('req.body.target',req.body.target);
    console.log('req.body.userId',req.body.userId);

    const newTopOpenLevel = req.body.level;

    // get current user logged in at indicator.games
    const user = JSON.parse(req.res.locals.user);
    const target = req.body.target;
    //const userId = user._id;

    // if(!user && target === 'indicator'){
    //     throw new Error('User not logged in');
    // }
    
    let userId;

    if(req.body.target === 'indicator' ){
        if(user){
            userId = user._id;
        }
        else if(req.body.userId){
            userId = req.body.userId;
        }
        else{
            throw new Error('User not logged in');
        }
    }

    console.log(user);

    try{      
        
        //get topOpenLevel of that user if it exists
        const playerAsteroidsInfo = await AstLevel.findOne({userId: userId});

        if(!playerAsteroidsInfo) { // the player has no record bout level in db
            const playerAsteroidsInfo = await AstLevel.create({userId: userId, topOpenLevel: newTopOpenLevel, target: target});
            console.log('playerAsteroidsInfo', playerAsteroidsInfo);
            res.status(200).json({topOpenLevel:playerAsteroidsInfo.topOpenLevel});
            return; 
        }
        else{ // the user has record about level in db
     
   
           playerAsteroidsInfo.topOpenLevel = newTopOpenLevel; // save the new topOpenLevel received from the client

           const newPlayerAsteroidsInfo = await playerAsteroidsInfo.save();
           console.log('newPlayerAsteroidsInfo: ' + newPlayerAsteroidsInfo);
            
            
            
            res.status(201).json({topOpenLevel:playerAsteroidsInfo.topOpenLevel});
            return;

        }
        
    }
    catch (err) {
        //const errors = handleErrors(err)
        //console.log(err);
        res.status(400).json({'Error': err});
    }
}

get_top_level = async (req,res) => {
    
    //console.log('get_top_level')
    // get user currently logged in at indicator.games
    const user = JSON.parse(req.res.locals.user);
    console.log('user', user);

    console.log('req.query', req.query);

    const target = req.query.target;
    //const userId = req.query.userId;
    

    let userId;
    if(target === 'indicator' ){
        if(user){/// if user is logged in at indicator.games then use his id
            userId = user._id;
        }
        else if(req.query.userId){// if user is not logged in but has an asteroids id in localstorage the use it
            userId = req.query.userId;
        }
        else{
            // if no user is found anywhere we don't want to ask the db and can send topOpenLevel=0 immediately'
            res.status(200).json({topOpenLevel:0});
            return;
        }
    }else{
        res.status(400).send("Error. No target.");
        return;
    }
    //console.log(user);

    // get topOpenLevel of that user

    try{

        const playerAsteroidsInfo = await AstLevel.findOne({userId: userId});
    
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

