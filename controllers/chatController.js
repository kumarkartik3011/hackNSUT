const asyncHandler = require('express-async-handler');
const { findOne, findById } = require('../models/chatModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');


//  @desc:     Create a new chat between currently logged in user and user using the UserId in body
//  @route:    POST /api/chats/oneToOneChats
//  @access:   Protected

const accessChat = asyncHandler(async (req, res) => {
    const existingChat = await Chat.findOne({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.body.userId}}},
            {users: {$elemMatch: {$eq: req.user._id}} }
        ]
    })   
    if(existingChat) {
        res.status(400)
        throw new Error('Chat already exists!')
    } 
    const chat = await Chat.create({
        isGroupChat: false,
        users: [req.body.userId, req.user._id],
        chatName: `Sender`
    })
    const fullChat = await Chat.findById(chat._id).populate('users', '-password')    
    res.status(200).json(fullChat) 
})


//  @desc:     Get a single chat for the currently logged in user and the mentioned user from the DB
//  @route:    GET /api/chats/oneToOneChats
//  @access:   Protected

const getChat = asyncHandler(async (req, res) => {
    const {userId} = req.body
    let chat = await Chat.findOne({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    }).populate('users', '-password').populate('lastMessage')
    chat = await User.populate(chat, {
        path: "lastMessage.sender",
        select: "name email displayPicture"
    })
    if(chat){
        res.status(200)
        res.json(chat)
    }
})


//  @desc:     Get All the Chatsfor the currently logged in user from the DB
//  @route:    GET /api/chats/all
//  @access:   Protected

const fetchChats = asyncHandler(async (req, res) => {
    let chats = await Chat.find({users: {$elemMatch: {$eq: req.user._id}}}).populate('users', '-password').populate('groupAdmin', '-password').populate('lastMessage').sort({updatedAt: -1})
    if(chats.length > 0){
        chats = await User.populate(chats, {
            path: "lastMessage.sender",
            select: "-password"
        })
        res.status(200)
        res.json(chats)
    }
    else {
        res.status(404)
        throw new Error('No Chats Found found for the currently logged-in user!')
    }
})


//  @desc:     Create a new Group Chat
//  @route:    POST /api/chats/group
//  @access:   Protected

const createGroupChat = asyncHandler(async (req, res) => {
    const chatName = req.body.chatName  
    const users = JSON.parse(req.body.users)
    if(users.length < 2) {
        res.status(400) 
        throw new Error('Atleast 3 Participants are required to initiate a Group Chat!')
    }
    users.push(req.user)
    const groupChat = await Chat.create({
        isGroupChat: true,
        users: users,
        chatName: chatName,
        groupAdmin: req.user
    })
    const fullGroupChat = await Chat.findOne({_id: groupChat._id}).populate("users", "-password").populate("groupAdmin", "-password")
    res.status(200).json(fullGroupChat)
})


//  @desc:     Rename an existing Group Chat
//  @route:    PUT /api/chats/group/rename
//  @access:   Protected

const renameGroupChat = asyncHandler(async (req, res) => {
    const {chatId, chatNewName} = req.body
    const renamedGroupChat = await Chat.findByIdAndUpdate(chatId, {chatName: chatNewName}, {new: true}).populate("users", "-password").populate("lastMessage").populate("groupAdmin", "-password")
    if(renameGroupChat) {
        res.status(200).json(renamedGroupChat)
    } else {
        res.status(404)
        throw new Error ('Unable to Find the Chat!')
    }

})


//  @desc:     Remove a participant from an existing Group Chat
//  @route:    PUT /api/chats/group/removeParticipant
//  @access:   Protected

const addToGroupChat = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body
    const updatedGroupChat = await Chat.findByIdAndUpdate(chatId,{$push: {users: userId}},{new: true}).populate("users", "-password").populate("lastMessage").populate("groupAdmin", "-password")
    if(updatedGroupChat) {
        res.status(200).json(updatedGroupChat)
    } else {
        res.status(404)
        throw new Error ('Unable to Find the Chat!')
    }
})

//  @desc:     Add a new participant to an existing Group Chat
//  @route:    PUT /api/chats/group/addParticipant
//  @access:   Protected

const removeFromGroupChat = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body
    const updatedGroupChat = await Chat.findByIdAndUpdate(chatId,{$pull: {users: userId}},{new: true}).populate("users", "-password").populate("lastMessage").populate("groupAdmin", "-password")
    if(updatedGroupChat) {
        res.status(200).json(updatedGroupChat)
    } else {
        res.status(404)
        throw new Error ('Unable to Find the Chat!')
    }
})
module.exports = {
    accessChat,
    getChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroupChat,
    removeFromGroupChat
}