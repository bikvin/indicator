const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: { type: Schema.Types.ObjectId, ref: 'user' },
    players: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages: [{user: { type: Schema.Types.ObjectId, ref: 'user' },
                text: String,
                date: {type: Date, default: Date.now}
     }],
     game: mongoose.ObjectId,
     closed: {type: Boolean, default: false},
     gameEnded: {type: Boolean, default: false}
})


const Room = mongoose.model('room', roomSchema)

module.exports = Room 