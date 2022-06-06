const jwt =require('jsonwebtoken')
const User = require('./../models/User')
const Room = require('../models/Room')
const BattleshipServerSockets = require('../games/battleship/scripts/server/BattleshipServerSockets')
const roomChatSockets = require('./roomChatSockets')

//const connectedUsers = new Map();

module.exports = (io) => {
    
    //console.log('lets see if it runs here')
    //const battleship = new BattleshipServerSockets(socket, room.players, roomName, io)
    //const battleship = new BattleshipServerSockets(io)

    const chat = new roomChatSockets(io)

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;

        //console.log('Token: ' + token)
        //console.log('Socket id: ' + socket.id)

        if(token){

            try{
                const user = await getUserFromToken(token);
                //console.log('And the user is ', user.username)

                socket.join(user._id); // join the user to the room of his user id to allow acces on all his devices

                socket.user = user; // add user as socket property to access it later

                next();
            }
            catch{
                next(new Error("User with this token no found. Please login."));
            }
            

        }else{
            next(new Error("No user token found. Please login."));
        }

    });

    io.on('connection', (socket) => {

        socket.emit('connected')
        

        chat.init(socket)
        //battleship.init(socket)
        

  
       
    })
}



const getUserFromToken = (token) => {
    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                reject(err)
                     
            }
            else{
                //console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                //console.log(user)
                resolve(user)        
            }
        })
    })
    
}
    

  