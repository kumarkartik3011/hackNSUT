const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "A valid email address is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    displayPicture: {
        type: String,
        required: [true, "Please upload a Display Picture for your profile!"],
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    isAppAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.matchPasswords = async function (enterPassword) {  //schema.methods.nameoftheMethod = function () {}
    return bcrypt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
module.exports = User