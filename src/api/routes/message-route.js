// Contoh Routing
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController')
const { auth } = require('../middleware/auth')

const messageController = new MessageController()

// Adding Middleware
router.use(auth)


// Getting Contacts And Group
router.get('/contacts', messageController.contacts)

// Getting Chats
router.get('/chats', messageController.chats)

// Sending Message
router.post('/', messageController.store)

// Sending Message with picture
router.post('/media', messageController.storePicture)

module.exports = router;