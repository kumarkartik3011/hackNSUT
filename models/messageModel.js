const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, "Message Cannot be empty!"],
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: [true, "chatId required!"]
    }
}, {
    timestamps: true
})

const messageModel = mongoose.model('Message', messageSchema)
module.exports = messageModel
// messageModel.watch().
//     on('change', data => console.log(new Date(), data));