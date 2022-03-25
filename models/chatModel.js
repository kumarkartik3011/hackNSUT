const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String, 
        required: true,
        trim: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
})

const chatModel = mongoose.model('Chat', chatSchema)
module.exports = chatModel