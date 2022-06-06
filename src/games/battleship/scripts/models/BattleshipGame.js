const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const battleshipGameSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'battleship'
    },
    //player1: { type: Schema.Types.ObjectId, ref: 'user' },
    //player2: { type: Schema.Types.ObjectId, ref: 'user' },

    players: {
                type: [{
                        user: { 
                        type: Schema.Types.ObjectId, 
                        ref: 'user' 
                        },
                        ready: {
                            type: Boolean,
                            default: false
                        },
                        online: {
                            type: Boolean,
                            default: true
                        },
                        firstPlayer: {
                            type: Boolean,
                            default: false
                        },
                        lastActive: {
                            type: Date,
                            default: new Date()
                        },
                        matrixStates: [String]           
                }
                ],
                validate: [arrayLimit, 'Max number of players is 2']
            },


    

    turns: [{
        row: Number,
        col: Number,
        date: {type: Date, default: Date.now}
    }],

    gameEnded: {type: Boolean, default: false},
    gameStarted: {type: Boolean, default: false},
})

function arrayLimit(val) {
    return val.length <= 2; // for 2 players max
  }

const battleshipGame = mongoose.model('battleshipGame', battleshipGameSchema)

module.exports = battleshipGame 