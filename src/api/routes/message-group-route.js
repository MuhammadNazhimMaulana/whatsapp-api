// Contoh Routing
const express = require('express');
const router = express.Router();
const MessageGroupController = require('../controllers/MessageGroupController')
const { auth } = require('../middleware/auth')

const messageGroupController = new MessageGroupController()

// Adding Middleware
router.use(auth)

// Sending Group Chat
router.post('/groupChat', messageGroupController.groupChat)

// Update Group Description
router.post('/udpateGroupDescription', messageGroupController.udpateGroupDescription)

module.exports = router;