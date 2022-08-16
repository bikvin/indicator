const mongoose = require('mongoose')
//const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    vkUserId: {
        type: Number,
    },
    topOpenLevel:{
        type: Number,
    }
})

const AstVkLevel = mongoose.model('user', userSchema)

module.exports = AstVkLevel 