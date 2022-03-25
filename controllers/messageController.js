const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const { status } = require('express/lib/response')


//  @desc:     Send a message in a chat
//  @route:    POST /api/messages/
//  @access:   Protected

const sendMessage = asyncHandler(async (req, res) => {
    const {chatId, content} = req.body
    let message = await Message.create({
        sender: req.user._id,
        content: content,  
        chat: chatId
    })
    message = await message.populate([{path: 'sender', select: 'name email displayPicture'}, {path: "chat"}])
    message = await User.populate(message, {path: 'chat.users', select: "name email displayPicture"})

    if(message){
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message
        })
        res.status(200).json(message)
    }
    
})


//  @desc:     Get all the message from a chat
//  @route:    GET /api/messages/:chatId
//  @access:   Protected

const fetchMessages = asyncHandler(async (req, res) => {
    const chatId = req.params.chatId
    const messages = await Message.find({chat: chatId}).populate('sender', "name email displayPicture").populate('chat')
    if(messages.length > 0) {
        res.status(200)
        res.json(messages)
    } else {
        res.json([])
    }
})



module.exports = {
    sendMessage,
    fetchMessages
}