const jwt =require('jsonwebtoken')
const User = require('./../models/User')
const Room = require('../models/Room')

const connectedUsers = new Map();

module.exports = (io) => {
    
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;

        //console.log('Token: ' + token)
        //console.log('Socket id: ' + socket.id)

        if(token){

            try{
                const user = await getUserFromToken(token);
                console.log('And the user is ', user.username)

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

        const user = socket.user
        

        socket.emit('connected')

        socket.on('joinRoom', async(roomName) => {
            //console.log('Join room: ' + roomName + ' User: ' + user.username + ' User_id: ' + user._id)

            

            try{
                socket.join(roomName)
                socket.playroom = roomName

                
                

                await Room.updateOne({
                    _id: roomName
                    }, 
                    {
                        $addToSet: 
                            {players: user._id
                                
                            }
                    })
                
                const room = await Room.findOne({_id: roomName}).populate('players', 'username email')

                //console.log("Room players" + room.players)

                io.to(roomName).emit('userJoined', room.players)

            }catch(err){
                console.log("Error joining the room")
                console.log(err)
                
                io.to(roomName).emit('custom_error', 'Error joining the room')
            }

        })

        socket.on('disconnecting', async () => {
            //console.log('Disconnect. Socket id is ' + socket.id + ' Username: ' + user.username)

            try{
                await Room.updateOne({
                    _id: socket.playroom
                    }, 
                    {
                        $pull: 
                            {players: user._id
                                
                            }
                })
    
                const room = await Room.findOne({_id: socket.playroom}).populate('players', 'username email')
    
                //console.log("Room players" + room.players)
    
                io.to(socket.playroom).emit('userLeft', room.players)

            }catch{
                console.log("Error leaving the room")
                console.log(err)
                
                socket.emit('custom_error', 'Error leaving the room')
            }
            




        });

        socket.on('newMessage', async (message) => {
            console.log('Room: ' + socket.playroom)
            console.log('Username: ' + socket.user.username)
            console.log('New message: ' + message)

            try{
                await Room.updateOne({
                    _id: socket.playroom
                    }, 
                    {
                        $push: 
                            {messages: {
                                user: socket.user._id,
                                text: message
                            }
                                
                            }
                })

                const room = await Room.findOne({_id: socket.playroom}).populate('messages.user', 'username email')

                console.log(room.messages)
                console.log("socket.playroom: " + socket.playroom)
                socket.rooms.forEach(room => console.log('Socket room: ' + room))
                //console.log('Socket rooms: ' + socket.rooms)
                io.to(socket.playroom).emit('messageReceived', room.messages)

                //io.to(socket.playroom).emit('userLeft', room.players)

            }catch(e){
                socket.emit('custom_error', 'Error sending message')
            }
        })

        //console.log(socket.handshake.auth)
      
        // socket.on('setup', async (token) => {
  
        //     const user = await getUserFromToken(token);
        //     console.log('And the user is ', user.username)

        // })

        // socket.on('joinRoom', async (roomName, token) => {
            
        //     socket.join(roomName)
        //     let user = await getUserFromToken(token);
        //     //user = user.toObject()
        //     user = {// create new user object to add socketId and get rid of all unneded stuff from mongo
        //         _id: user.id,
        //         username: user.username,
        //         socketId: socket.id
        //     }      
        //     // create users array, if key not exists
        //     if (!connectedUsers.has(roomName)) {
        //         connectedUsers.set(roomName, []);
        //     }

        //     // add user to room array
        //     connectedUsers.get(roomName).push(user);
        //     // call update function
        //     updateUsersList(roomName, io);

        // })

        // socket.on('disconnecting', () => {
        //     console.log('Disconnect. Socket id is ', socket.id)

        //     console.log(socket.rooms); // the Set contains at least the socket ID
        //   });
      
    })
}

// function updateUsersList(room, io){
//     io.to(room).emit('updateUsersList', {
//         room: room,
//         users: connectedUsers.get(room)
//     });
// }


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
    

  