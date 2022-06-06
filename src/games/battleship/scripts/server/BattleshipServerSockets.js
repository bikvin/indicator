const BattleShipGame = require('../models/BattleshipGame')
const Room = require('../../../../models/Room')

class BattleshipServerSockets {
    constructor(io){
        console.log('BattleshipServerSocketss constructore')
        //this.init(socket, players, roomName, io)
        this.io = io


    }

    init(socket, room, roomName){
        console.log('Init Battleship Game')

        let unfinishedGame = room.games.find(game => !game.gameEnded) 


        socket.on('joinGame', async () => {
            console.log('Join Game Battleship')

            

            if( (room.games.length > 0) && (unfinishedGame )){
                console.log('There is at least one unfinished game')
                //console.log(socket.user._id.toString())


                const youAreInGame = !!unfinishedGame.players.find(player => {
                    //console.log('Player.user:')
                    //console.log(player.user)
                    return player.user.toString() == socket.user._id.toString()
                })
                console.log('youAreInGame', youAreInGame)
                

                 
                if(youAreInGame){
                    // set yourself online
                    console.log('set yourself online')
         
                    const yourIndex = unfinishedGame.players.findIndex(player => player.user.toString() == socket.user._id.toString())

                    unfinishedGame.players[yourIndex].online = true



                    if(unfinishedGame.players[yourIndex].ready){
                        console.log('You are ready already. Sending you the setup.')
                        //console.log(unfinishedGame.players[yourIndex].matrixStates[0])
                        socket.emit('youAreReadyAlready', unfinishedGame.players[yourIndex].matrixStates[0])
                    }

                    try{
                        await unfinishedGame.save();
                    }
                    catch(err){
                        console.log(err)
                    }

                    
                    
                    

                }
                else if(unfinishedGame.players.length >= 2){
                    // send error message to client
                    console.log('roomIsFull - send error message to client')
                    socket.emit('roomIsFull')

                }
                else{
                    // add youself to game
                    console.log('add youself to game')
      

                    
                    try{
                        unfinishedGame.players.push({user: socket.user._id});
                        await unfinishedGame.save();
                        unfinishedGame = await BattleShipGame.findOne({_id: unfinishedGame._id}).populate('players.user', 'username email')
                    }
                    catch(err){
                        console.log(err)
                    }


                    console.log('unfinishedGame.players ');
                    //console.log(unfinishedGame.players);
                    

                    this.io.to(roomName).emit('playerJoinedGame', unfinishedGame.players)
                }


                //console.log(unfinishedGame.players)

                //console.log(socket.user._id.toString() == unfinishedGame.players[0].toString())
                    
                       
            } else{ // no unfinished games
                console.log('There are no unfinished games')
                // create new game (with you as player 0)
                
                try{
                    const game = await BattleShipGame.create(
                        {
                            players: [{user: socket.user._id}] 
                        }
                        )
                    
                    await Room.updateOne({
                        _id: socket.playroom
                            }, 
                            {
                                $push: 
                                    {games: game._id,
                                                                              
                                    }
                        })
                    
                    unfinishedGame = game;
                    

                }
                catch (err){
                    //res.status(400).send({ err })
                    console.log(err)
                }
                
                // push the new game id to room.games
            };


        })

        socket.on('disconnecting', async () => {
            // set youself offline
            console.log('game disconnecting')
            //console.log('unfinishedGame', unfinishedGame)
            // set yourself offline

            try{
                unfinishedGame = await BattleShipGame.findOne({_id: unfinishedGame._id}).populate('players.user', 'username email')


                console.log('unfinishedGame.gameStarted', unfinishedGame.gameStarted)
                //console.log('unfinishedGame', unfinishedGame)


                const yourIndex = unfinishedGame.players.findIndex(player => player.user._id.toString() == socket.user._id.toString())// your index in players array

                if(unfinishedGame.gameStarted || unfinishedGame.players[yourIndex].ready){
                    // set yourself offline but keep in the game
                    console.log('set yourself offline but keep in the game')
                    

                    unfinishedGame.players[yourIndex].online = false

                
                    await unfinishedGame.save();
                
                }else{
                    // remove yourself from game
                    console.log('remove yourself from game')

                    unfinishedGame.players.splice(yourIndex, 1); // remove yourself from players array
                    await unfinishedGame.save();
                }

                this.io.to(roomName).emit('playerLeftGame',unfinishedGame.players)
            }
            catch(err){
                console.log(err)
            }
            
            

        })

        socket.on('playerReady', async (player, matrix) => {
            console.log('Player ready')


            try{
                const game = await BattleShipGame.findOne({_id: unfinishedGame._id}).populate('players.user', 'username email')
                //.populate('players.matrixStates')
                console.log("game.players", game.players)
                //console.log("game", game)

                game.players.forEach(pl => {
                if(pl.user._id == player._id) {
                    pl.ready = true;
                    pl.lastActive = new Date()


                    pl.matrixStates = [matrix]
                    console.log("pl.matrixStates[0]", pl.matrixStates[0])


                    return
                }
                });


                await game.save();
            }catch(err){
                console.log(err)
            }

        })
        
    }

}

module.exports = BattleshipServerSockets