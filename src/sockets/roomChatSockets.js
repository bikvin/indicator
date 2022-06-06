const Room = require('../models/Room')
const BattleshipServerSockets = require('../games/battleship/scripts/server/BattleshipServerSockets')

class roomChatSockets {
    constructor(io){
        this.io = io
    }

    init(socket){

        const battleship = new BattleshipServerSockets(this.io)

        const user = socket.user  

        socket.on('joinRoom', async(roomName) => {

            
            //console.log('Join room: ' + roomName + ' User: ' + user.username + ' User_id: ' + user._id)     
            try{
                socket.join(roomName)
                socket.playroom = roomName
                console.log('RoomName: ', roomName)

                await Room.updateOne({
                    _id: roomName
                    }, 
                    {
                        $addToSet: 
                            {players: user._id
                                
                            }
                    })
                
                const room = await Room.findOne({_id: roomName}).populate('players', 'username email').populate('games')

                //console.log("Room players" + room.players)
                
                battleship.init(socket, room, roomName)

                this.io.to(roomName).emit('userJoined', room.players)

                //io.to(room._id).emit('userJ', room.players)

            }catch(err){
                console.log("Error joining the room")
                console.log(err)
                
                this.io.to(roomName).emit('custom_error', 'Error joining the room')
            }

        })

        socket.on('disconnecting', async () => {
            console.log('Room Disconnect. Socket id is ' + socket.id + ' Username: ' + user.username)

            if(socket.playroom){
                try{
                    //console.log("socket.playroom" + socket.playroom)
                    //console.log("socket" + socket)
                    
                    await Room.updateOne({
                        _id: socket.playroom
                        }, 
                        {
                            $pull: 
                                {players: user._id          
                                    
                                }
                    })
        
                    const room = await Room.findOne({_id: socket.playroom}).populate('players', 'username email')
        
                    console.log("Room players after exit" + room.players)
        
                    this.io.to(socket.playroom).emit('userLeft', room.players)
    
                }catch(err){
                    console.log("Error leaving the room")
                    console.log(err)
                    
                    socket.emit('custom_error', 'Error leaving the room')
                }
            }
            
            




        });

        socket.on('newMessage', async (message) => {
            //console.log('Room: ' + socket.playroom)
            //console.log('Username: ' + socket.user.username)
            //console.log('New message: ' + message)

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

                //console.log(room.messages)
                //console.log("socket.playroom: " + socket.playroom)
                //socket.rooms.forEach(room => console.log('Socket room: ' + room))
                //console.log('Socket rooms: ' + socket.rooms)
                this.io.to(socket.playroom).emit('messageReceived', room.messages)

                //io.to(socket.playroom).emit('userLeft', room.players)

            }catch(e){
                socket.emit('custom_error', 'Error sending message')
            }
        })
    }
}

module.exports = roomChatSockets
