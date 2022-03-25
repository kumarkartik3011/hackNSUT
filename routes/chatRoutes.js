const express = require('express')
const { accessChat, getChat, fetchChats, createGroupChat, renameGroupChat, addToGroupChat, removeFromGroupChat } = require('../controllers/chatController')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router
    .route('/all')
    .get(protect, fetchChats)         
router
    .route('/oneToOneChats')
    .post(protect, accessChat)
    .get(protect, getChat )

router.route('/group').post(protect, createGroupChat)
router.route('/group/rename').put(protect, renameGroupChat)
router.route('/group/addParticipant').put(protect, addToGroupChat)
router.route('/group/removeParticipant').put(protect, removeFromGroupChat)

module.exports = router