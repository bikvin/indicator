const mongoose = require('mongoose')
//const Schema = mongoose.Schema;

const asteroidsSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    topOpenLevel:{
        type: Number,
    },
    target:{
        type: String,
    }
})

const AstLevel = mongoose.model('asteroids', asteroidsSchema)
console.log('AstLevel',AstLevel)

module.exports = AstLevel 