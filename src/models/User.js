const mongoose = require('mongoose')
const { isEmail } = require('validator')
//const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        //required: [true, 'Please enter an email'],
        required: [true, 'Пожалуйста укажите почту'],
        unique: true,
        lowercase: true,
        //validate: [isEmail, 'Please enter a valid email']
        validate: [isEmail, 'Пожалуйста укажите корректный адрес почты']
    },
    password: {
        type: String,
        required: [true,'Please enter a password' ],
        //minlength: [6, 'Minimum password length is 6 characters']
        minlength: [6, 'Минимальная длина пароля - 6 символов']
    },
    username: {
        type: String,
        default: 'Anonimous User'
    },
    resetPasswordToken: {
        type: String},
    resetPasswordExpires: {
        type:  Date
    }
})


// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})

    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')


}

const User = mongoose.model('user', userSchema)

module.exports = User 