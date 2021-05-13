const Room = require('../models/Room')

// const roomGet = async (req, res) => {
//     res.locals.header = 'Игровая комната - Indicator Games'
//     const csrfToken = req.csrfToken()
//     //console.log(csrfToken)
//     const user = JSON.parse(res.locals.user)

//     try{

//         let room = await Room.findOne({_id:req.params.roomId})

//         if(!room.players.find(player => player == user._id)){ // if user is not already in the room add him
//             console.log('User not in room')
//             room.players.push(user._id);
        
//             try{       
//                 await room.save();
                
                
//             }catch(err){
//                 res.status(400).send({ err })
//             }
//         }

//         try{
//             room = await Room.findOne({_id:req.params.roomId}).populate('players', 'username email').populate('messages.userId', 'username') // get the room again with players populated
//         }catch(err){
//             res.status(400).send({ err })
//         }

//         res.render('room', {players: JSON.stringify(room.players), messages: JSON.stringify(room.messages), csrfToken})
        
//     }catch(err){
//         //res.status(400).send({ err })
//         res.render('room', {error: JSON.stringify(err), csrfToken})
//     }
    
// }

const roomGet = async (req, res) => {
    res.locals.header = 'Игровая комната - Indicator Games'

    try{
            const csrfToken = req.csrfToken()
            room = await Room.findOne({_id:req.params.roomId}).populate('players', 'username email').populate('messages.user', 'username') // get the room again with players populated
            
            res.render('room', {players: JSON.stringify(room.players), messages: JSON.stringify(room.messages), csrfToken})
        }catch(err){
            res.status(400).send({ err })
        }

    
}

const roomsGet = async (req, res) => {
    res.locals.header = 'Комнаты'
    
    try{
        const rooms = await Room.find({}).populate('creator')
        //console.log(rooms)
        //console.log(JSON.stringify(rooms))
        res.render('rooms', {rooms: JSON.stringify(rooms)})
        
    }
    catch(err){
        res.status(400).send({ err })
    }
    
    
}

const createRoomGet = (req, res) => {
    const csrfToken = req.csrfToken()
    res.locals.header = 'Создать комнату'
    res.render('create_room', {csrfToken})
}

const createRoomPost = async (req, res) => {
    
    const user = JSON.parse(res.locals.user)
    const {name} = req.body
    

    try{
        const room = await Room.create({name:name, creator: user._id, players: [user._id] })
        res.status(201).json({room: room._id})
    }
    catch (err){
        res.status(400).send({ err })
    }
}

const leaveRoomPost = async (req, res) => {
    console.log('leaveRoomPost')
    const user = JSON.parse(res.locals.user)
    console.log(user)
    console.log(req.body.roomId)

    //const room = await Room.findOne( {_id: req.body.roomId})
    //console.log(room)
    try{
        await Room.updateOne( {_id: req.body.roomId}, { $pullAll: {players: [user._id] } } )
    }catch(err){
        console.log(err)
    }

}

const newMessagePost = async (req, res) => {
    console.log('newMessagePost')
    console.log(req.body.roomId)
    console.log(req.body.message)
    const user = JSON.parse(res.locals.user)
    console.log(user._id)
    const message = {
        user: user._id,
        text: req.body.message
    }

    try{
        await Room.update(
            { _id: req.body.roomId }, 
            { $push: { messages: message } }
        );
    }catch(err){
        console.log(err)
    }
    

    res.sendStatus(200)
}


module.exports = {
    roomGet,
    roomsGet,
    createRoomGet,
    createRoomPost,
    leaveRoomPost,
    newMessagePost
}