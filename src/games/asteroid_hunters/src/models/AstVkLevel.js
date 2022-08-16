const mongoose = require('mongoose')
//const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    vkUserId: {
        type: 'integer',
    },
    topOpenLevel:{
        type: 'integer',
    }
})

const AstVkLevel = mongoose.model('user', userSchema)

module.exports = AstVkLevel 